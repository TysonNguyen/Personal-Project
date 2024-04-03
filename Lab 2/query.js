//***********************************************************************************
//Program: Lab 2
//Description: Mine Sweeper Lab
//Date: Mar 04 2024
//Author: Tyson Nguyen
//Course: CMPE2000
//Class: CNTA01
//***********************************************************************************

//***********************************************************************************
//Global Declaration
//***********************************************************************************
function Cell(bomb_id, mine, exposed, adCount) {
  (this.bid = bomb_id),
    (this.is_mine = mine),
    (this.is_exposed = exposed),
    (this.adjacent_count = adCount);
}
var games = [
  {
    diffculty: "Easy",
    num_mines: 10,
    row_max: 10,
    col_max: 10,
    bomb_size: 60
  },
  {
    diffculty: "Medium",
    num_mines: 40,
    row_max: 18,
    col_max: 18,
    bomb_size: 30
  },
  {
    diffculty: "Hard",
    num_mines: 99,
    row_max: 24,
    col_max: 24,
    bomb_size: 25
  }
]
var startGame = false;
var iX, iY, gm;
var showedBomb, totalBombExposed = 0;
var displayScreen, shiftPressed;
//***********************************************************************************


//********************************************************************************************
//Method: window.onload
//Purpose: Loading as well as intialize
//Parameters:
//Returns: nothing
//*********************************************************************************************
window.onload = function () {
  console.clear();
  var toAppend = document.createElement("div");
  toAppend.setAttribute("id", "minefield");
  document.getElementById("outside").appendChild(toAppend);
  document.querySelector("#NewGame").addEventListener("click", NewGame);
  document.querySelector("#Difficulty").addEventListener("change", NewGame);
  displayScreen = document.querySelector('#screen');
  NewGame();
};

//********************************************************************************************
//Method: NewGame()
//Purpose: Initialize game state 
//Parameters:
//Returns: nothing
//*********************************************************************************************
function NewGame() {
  console.clear();
  displayScreen.style.display = "none";
  totalBombExposed = 0;
  gm = document.getElementById("Difficulty").value;
  cells = [];
  NewGrid();
  startGame = false;
}

//********************************************************************************************
//Method: NewGrid()
//Purpose: Intialize Grid Game and 2d array
//Parameters:
//Returns: nothing
//*********************************************************************************************
function NewGrid() {
  buttons = "";
  buttons += `<div style="
  grid-template-columns:repeat(${games[gm].col_max},${games[gm].bomb_size}px); 
  grid-template-rows: repeat(${games[gm].row_max},${games[gm].bomb_size}px); 
  width:${games[gm].row_max * games[gm].bomb_size}px">`;
  for (let i = 0; i < games[gm].row_max; i++) {
    cells[i] = [];
    for (let j = 0; j < games[gm].col_max; j++) {
      cells[i][j] = new Cell(`r_${i}_c_${j}`, false, false, 0);
      buttons += `<button class="mine" value="${cells[i][j].bid}" id="${cells[i][j].bid}""></button>`;
    }
  }
  buttons += `</div>`;
  document.getElementById("minefield").innerHTML = buttons;
  BindGrid();
}

//********************************************************************************************
//Method: Show()
//Purpose: Expose Cell
//Parameters:
//Returns: 1 if expose is a bomb else 0
//*********************************************************************************************
function Show() {
  if (cells[iX][iY].adjacent_count == 0 && !cells[iX][iY].is_mine) {
    CheckCell(iX, iY, cells[iX][iY]);
    return 0;
  }
  if (cells[iX][iY].adjacent_count > 0 && !cells[iX][iY].is_mine) {
    document.querySelector(`#r_${iX}_c_${iY}`).innerHTML =
      cells[iX][iY].adjacent_count;
    document.querySelector(`#r_${iX}_c_${iY}`).style.backgroundColor = "green";
    return 0;
  }
  if (cells[iX][iY].is_mine) {
    if (!shiftPressed) {
      document.querySelector(
        `#r_${iX}_c_${iY}`
      ).innerHTML = `<img src="./lab2-boom.png" alt="" style="width: ${games[gm].bomb_size - 10}px;height: ${parseInt(games[gm].bomb_size) - 10}px;" >`;
      displayScreen.innerHTML = `YOU <br> LOST`;
      displayScreen.style.display = "block";
      displayScreen.style.color = "red";
    }
    else if (shiftPressed) {
      document.querySelector(
        `#r_${iX}_c_${iY}`
      ).innerHTML = `<img src="./flag.jpg" alt="" style="width: ${games[gm].bomb_size - 10}px;height: ${parseInt(games[gm].bomb_size) - 10}px;" >`;
      return 1;
    }
  }
}

//********************************************************************************************
//Method: window.onload
//Purpose: Check the win condition
//Parameters:
//Returns: nothing
//*********************************************************************************************
function ShowGrid() {
  totalBombExposed += Show();
  if (totalBombExposed == games[gm].num_mines) {
    displayScreen.innerHTML = `YOU <br> WIN`;
    displayScreen.style.display = "block";
    displayScreen.style.color = "blue";
  }
}

//********************************************************************************************
//Method: ProccessClick(event)
//Purpose: Porcess the load of on click button
//Parameters:
// event : get the shift click
//Returns: nothing
//*********************************************************************************************
function ProccessClick(event) {
  var currentSplit = this.value.split("_");
  iX = currentSplit[1];
  iY = currentSplit[3];
  if (!startGame) {
    Begin();
    startGame = true;
  }
  if (cells[iX][iY].is_exposed == false) {
    if (event.shiftKey) {
      shiftPressed = true;
    }
    else shiftPressed = false;
    ShowGrid();
  }
  cells[iX][iY].is_exposed = true;
}

//********************************************************************************************
//Method: BindGrid()
//Purpose: Binding the on click function for each button
//Parameters:
//Returns: nothing
//*********************************************************************************************
function BindGrid() {
  const mines = document.querySelectorAll(".mine");
  for (let i = 0; i < mines.length; i++) {
    mines[i].addEventListener("click", ProccessClick);
  }
}

//********************************************************************************************
//Method: RandomCells()
//Purpose: Randomize the bomb position
//Parameters:
//Returns: nothing
//*********************************************************************************************
function RandomCells() {
  let i = 0;

  while (i < games[gm].num_mines) {
    r = Math.floor(Math.random() * games[gm].row_max);
    c = Math.floor(Math.random() * games[gm].col_max);
    if (cells[r][c].is_mine == false && r != iX && c != iY) {
      cells[r][c].is_mine = true;
      i++;
    }
  }
}


//********************************************************************************************
//Method: CountAdjacent()
//Purpose: Initialize the number for cell that has a bomb next to it
//Parameters:
//Returns: nothing
//*********************************************************************************************
function CountAdjacent() {
  for (var i = 0; i < games[gm].row_max; i++) {
    for (var j = 0; j < games[gm].col_max; j++) {
      if (cells[i][j].is_mine) {
        Around(i + 1, j); //Down
        Around(i - 1, j); //Up
        Around(i, j + 1); //Right
        Around(i, j - 1); //Left
        Around(i + 1, j + 1); //Down Right
        Around(i + 1, j - 1); //Down Left
        Around(i - 1, j + 1); //Up Right
        Around(i - 1, j - 1); //Down Right
      }
    }
  }
}

//********************************************************************************************
//Method: CheckCell(i, j)
//Purpose: Recurively fill the blank
//Parameters:
//i : x-coordinate
//j : y-coordinate
//Returns: nothing
//*********************************************************************************************
function CheckCell(i, j) {
  if (i >= 0 && i < games[gm].row_max && j >= 0 && j < games[gm].col_max) {
    if (cells[i][j].is_mine == false && cells[i][j].is_exposed == false) {
      if (cells[i][j].adjacent_count == 0) {
        document.querySelector(`#r_${i}_c_${j}`).style.backgroundColor =
          "white";
        cells[i][j].is_exposed = true;
        CheckCell(parseInt(i) + 1, j);
        CheckCell(parseInt(i) - 1, j);
        CheckCell(i, parseInt(j) + 1);
        CheckCell(i, parseInt(j) - 1);
        CheckCell(parseInt(i) + 1, parseInt(j) + 1);
        CheckCell(parseInt(i) - 1, parseInt(j) + 1);
        CheckCell(parseInt(i) - 1, parseInt(j) - 1);
        CheckCell(parseInt(i) + 1, parseInt(j) - 1);
      }
      if (cells[i][j].adjacent_count > 0) {
        cells[i][j].is_exposed = true;
        document.querySelector(`#r_${i}_c_${j}`).innerHTML =
          cells[i][j].adjacent_count;
        document.querySelector(`#r_${i}_c_${j}`).style.backgroundColor =
          "green";
      }
    }
  }
}

//********************************************************************************************
//Method: Around(ir, ic)
//Purpose: For CountAdjacent method to use to check the bomb of the surrounding cells
//Parameters:
//Returns: nothing
//*********************************************************************************************
function Around(ir, ic) {
  if (ir <= games[gm].row_max - 1 && ir >= 0) {
    if (ic <= games[gm].col_max - 1 && ic >= 0) {
      cells[ir][ic].adjacent_count = cells[ir][ic].adjacent_count + 1;
    }
  }
}

//********************************************************************************************
//Method: Begin()
//Purpose: for it to trigger RandomCells and CountAdjacent on first click 
//Parameters:
//Returns: nothing
//*********************************************************************************************
function Begin() {
  RandomCells();
  CountAdjacent();
}
