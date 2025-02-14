/*
    FILE: portj.h
    Created on: October 15th 2024 by Tyson Nguyen
    Edit: October 15th 2024
*/

typedef enum PORTJ_ChannelTyepedef_
{
    PORTJ0 = 00000001,
    PORTJ1 = 00000010
}PORTJ_Channel;

typedef enum PORTJ_DataDirectionTyepedef_
{
    PORTJ_INPUT = 0,
    PORTJ_OUTPUT = 1
}PORTJ_DataDirection;

typedef enum PORJ_InterruptTyepedef_
{
    PORTJ_IENA = 1,
    PORTJ_IDIS = 0
}PORTJ_Interrupt;

typedef enum PORTJ_TriggerEdgeTyepedef_
{
    PORTJ_RISING = 1,
    PORTJ_FALLING = 0
}PORTJ_TriggerEdge;

/// @brief Configures a portj
/// @param portj selected portj
/// @param direction direction of data as input or output
/// @param interrupt enable or disable interrupt
void PORTJ_Init(PORTJ_Channel portj,PORTJ_TriggerEdge trigger ,PORTJ_DataDirection direction,PORTJ_Interrupt ie);  

/// @brief Check which port has been pushed then return the port that trigger ISR
/// @param portj Checking which has been push
/// @return the one that trigger ISR
int PORTJ_Pushed(PORTJ_Channel portj);

/// @brief Check which port has been hold then return the port that trigger ISR
/// @param portj Checking which has been holded
/// @return the one that trigger ISR
int PORTJ_Holded(PORTJ_Channel portj);