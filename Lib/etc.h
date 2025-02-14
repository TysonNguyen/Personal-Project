// Enhanced Capture Timer
// FILE: etc.h
//  Created on: Nov 07 2024 by Tyson Nguyen
typedef enum ETC_InputActionTyepedef_
{
    Disable = 0,
    Rising = 1,
    Falling = 2,
    Both = 3
}ETC_InputAction;

typedef enum ETC_OutputActionTyepedef_
{
    Disconnect = 0,
    Toggle = 1,
    Clear = 2,
    Set = 3
}ETC_OutputAction;

/// @brief Setting etc to percise mode 
/// @param iPrescaler the prescaler ex 20Mhz bus / *any* = 1Mhz => 1us per tick 
ETC_Init_PreciseMode(int iPrescaler);

/// @brief Setting etc to legacy mode 
/// @param iPrescaler the prescaler ex 8Mhz bus / 8 Prescaler => 1Mhz => 1us per tick
ETC_Init_LegacyMode(int Prescaler);

/// @brief Intialize ETC channel as an output
/// @param Channel choose channel to initialzie
/// @param iInterrupt enable interrupt or not
/// @param action choose action disconnect/toggle/clear/set
ETC_ChannelOutput(int Channel,int iInterrupt, ETC_OutputAction action);

/// @brief Initialize ETC channel as an input
/// @param Channel choose channel to intialize
/// @param iInterrupt enable interrpt or not
/// @param action choose action disable,rising,falling,both
ETC_ChannelInput(int Channel,int iInterrupt, ETC_InputAction action);
/// @brief Start ETC
ETC_Start();