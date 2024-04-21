use tnguyen248_Northwind
go

----conditional drop statement for the replaceEmployee procedure
--drop procedure if exists replaceEmployee
--go

--create procedure replaceEmployee
----integer parameter oldId
--@oldId int,
----varchar size 30 parameter newLast
--@newLast varchar(30),
----varchar size 30 parameter newFirst
--@newFirst varchar(30)
--as
--	declare @numRows int = 0
--	--check if former employee record exists
--	--@numRows will have 0 if not exists, 1 if exists. Due to PK 
--	--it shouldn't have any other number
--	select @numRows = count(*)
--	from Employees
--	where  EmployeeID = @oldID --fill in the where clause
--	if @numRows != 1
--	begin
--	  print 'Old employee not found'
--	  return -1
--	end
--	--check if new employee is already in db
--	declare @newEmployee int
--	--populate @newEmployee using the below select statement
--	select *
--	from Employees e
--	where e.FirstName = @newFirst and e.LastName = @newLast
--	--store the number of rows returned by the above select
--	--using the appropriate system function
--	set @numRows = @@ROWCOUNT
--	if @numRows > 1
--	begin
--	  print 'Too many employees found that match new employee name'
--	  return -2
--	end
--	--start handling transactions now - all update/insert/delete transactions
--	--must succeed or fail together
--	begin transaction
--	if @numRows = 0
--	begin
--	  --insert record into Employees. Catch any errors and handle appropriately
--	  begin try
--		insert into Employees (LastName,FirstName )
--		values (@newLast, @newFirst)
--		--store new employeeid using system function into @newEmployee
--		set @newEmployee = @@IDENTITY
--	  end try
--	  begin catch
--		print 'Error inserting new employee ' + Error_Message()
--		--handle transaction appropriately
--		ROLLBACK
--		return -3
--	  end catch
--	end
--	--now we have @newEmployee, so reassign all orders from the terminated
--	--employee to the new employee
--	begin try
--		update Orders
--		set EmployeeID = @newEmployee
--		where EmployeeID = @oldId
--	end try
--	begin catch
--		print 'Update Orders failed ' + Error_Message()
--		rollback
--		return -4
--	end catch
--	--assign the new employee the territories from the terminated employee
--	begin try
--		update EmployeeTerritories 
--		set EmployeeID = @newEmployee
--		where EmployeeID = @oldId
--	end try
--	begin catch
--		print 'Update EmployeeTerritories failed ' + Error_Message()
--		rollback
--		return -5
--	end catch
--	--ensure if anyone reports to the terminated employee,
--	--that they now report to the new employee
--	begin try
--		update  Employees
--		set  ReportsTo = @newEmployee
--		where  ReportsTo = @oldId
--	end try
--	begin catch
--		print 'Update Employees failed ' + Error_Message()
--		rollback
--		return -6
--	end catch
--	--delete the former employee
--	begin try
--	DELETE FROM Employees WHERE EmployeeID = @oldId
--	end try
--	begin catch
--		print 'Delete Employees failed ' + Error_Message()
--		rollback
--		return -7
--	end catch
--	Rollback
--	return 0
--go

drop procedure if exists addNewSensor
go

create or alter procedure addNewSensor
	@sensorId tinyint,
	@description varchar(50),
	@location varchar(50),
	@readValue smallint,
	@statusMsg varchar(50) output

as
	declare @numCount int
	select *
	from Sensors
	where SensorId = @sensorId
	set @numCount = @@ROWCOUNT
	begin transaction
		if @numCount < 1
			begin
				begin try
					insert into Sensors(SensorId,[Description],[Location])
					values (@sensorId,@description,@location)

					insert into Readings(SensorId,TimeStampValue,[Value])
					values (@sensorId,GETDATE(),@readValue)
					set @statusMsg = 'new Sensor and Read Value added'
					COMMIt
					return 0
				end try
				begin catch
					ROLLBACK
					set @statusMsg = 'Error1'
					return -2 
				end catch
			end
		if @numCount > 0
			begin
				begin try
					insert into Readings(SensorId,TimeStampValue,[Value])
					values (@sensorId,GETDATE(),@readValue)
					set @statusMsg = 'new Read Value added'
					COMMIT
					return -1
				end try
				begin catch
					ROLLBACK
					set @statusMsg = 'Error2'
					return -2 
				end catch
			end
go

drop table if exists Readings
go

drop table if exists Sensors
go

create table Sensors 
(
    SensorId        tinyint            not null    
        primary key clustered,
    [Description]    varchar(50)        not null,
    [Location]        varchar(50)        not null
)
go

create table Readings 
(
    SensorId        tinyint            not null
        constraint FK_SensorId foreign key references Sensors(SensorId),
    TimeStampValue    datetime        not null,
    [Value]            smallint        not null,    constraint PK_SensorId_TimeStampValue 
        primary key clustered (SensorId,TimeStampValue) --composite primary key
)
go

declare @Status        varchar(50),
        @ReturnCode    int

exec @ReturnCode = addNewSensor 97,'Temperature Sensor 15','Building 332',780,@statusMsg = @Status output
print    ''
select    * 
from    Sensors
select    * 
from    Readings
print    @Status
print    ''
print    'The code returned from the procedure was: ' + cast(@ReturnCode as varchar)
go