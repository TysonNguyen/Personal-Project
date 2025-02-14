#include "etc.h"
#include <hidef.h>
#include "derivative.h"

/// @brief Setting etc to legacy mode 
/// @param iPrescaler the prescaler ex 8Mhz bus / 8 Prescaler => 1Mhz => 1us per tick
ETC_Init_LegacyMode(int iPrescaler)
{   
    int iPower = 0;
    TSCR1 &= ~TSCR1_PRNT_MASK;
    
    while(iPrescaler != 1)
    {
        iPrescaler /= 2;
        iPower++;
    }

    TSCR2_PR0 = iPower && 0x001;
    TSCR2_PR1 = iPower >> 1 ;
    TSCR2_PR2 = iPower >> 2 ;


}

/// @brief Setting etc to percise mode 
/// @param iPrescaler the prescaler ex 20Mhz bus / *any* = 1Mhz => 1us per tick 
ETC_Init_PreciseMode(int iPrescaler)
{
    TSCR1 |= TSCR1_PRNT_MASK;
    PTPSR = iPrescaler - 1;
}

/// @brief Intialize ETC channel as an output
/// @param Channel choose channel to initialzie
/// @param iInterrupt enable interrupt or not
/// @param action choose action disconnect/toggle/clear/set
ETC_ChannelOutput(int Channel,int iInterrupt, ETC_OutputAction action)
{
    switch (Channel)
    {
        case 0:
            TIOS_IOS0 = 1;
            TIE_C0I = iInterrupt;
            TCTL2_OL0 = action && 0x01;
            TCTL2_OM0 = action >> 1;
            break;
        case 1:
            TIOS_IOS1 = 1;
            TIE_C1I = iInterrupt;
            TCTL2_OL1 = action && 0x01;
            TCTL2_OM1 = action >> 1;
            break;
        case 2:
            TIOS_IOS2 = 1;
            TIE_C2I = iInterrupt;
            TCTL2_OL2 = action && 0x01;
            TCTL2_OM2 = action >> 1;
            break;
        case 3:      
            TIOS_IOS3 = 1;
            TIE_C3I = iInterrupt;
            TCTL2_OL3 = action && 0x01;
            TCTL2_OM3 = action >> 1;  
            break;
        case 4:
            TIOS_IOS4 = 1;
            TIE_C4I = iInterrupt;
            TCTL1_OL4 = action && 0x01;
            TCTL1_OM4 = action >> 1;  
            break;
        case 5:
            TIOS_IOS5 = 1;
            TIE_C5I = iInterrupt;
            TCTL1_OL5 = action && 0x01;
            TCTL1_OM5 = action >> 1;  
            break;
        case 6:
            TIOS_IOS6 = 1;
            TIE_C6I = iInterrupt;
            TCTL1_OL6 = action && 0x01;
            TCTL1_OM6 = action >> 1;  
            break;
        case 7:
            TIOS_IOS7 = 1;
            TIE_C7I = iInterrupt;
            TCTL1_OL7 = action && 0x01;
            TCTL1_OM7 = action >> 1;  
            break;
    }
}

/// @brief Initialize ETC channel as an input
/// @param Channel choose channel to intialize
/// @param iInterrupt enable interrpt or not
/// @param action choose action disable,rising,falling,both
ETC_ChannelInput(int Channel,int iInterrupt, ETC_InputAction action)
{
    switch (Channel)
    {
        case 0:
            TIOS_IOS0 = 0;
            TIE_C0I = iInterrupt;
            TCTL4_EDG0A = action && 0x01;
            TCTL4_EDG0B = action >> 1;
            break;
        case 1:
            TIOS_IOS1 = 0;
            TIE_C1I = iInterrupt;
            TCTL4_EDG1A = action && 0x01;
            TCTL4_EDG1B = action >> 1;
            break;
        case 2:
            TIOS_IOS2 = 0;
            TIE_C2I = iInterrupt;
            TCTL4_EDG2A = action && 0x01;
            TCTL4_EDG2B = action >> 1;
            break;
        case 3:      
            TIOS_IOS3 = 0;
            TIE_C3I = iInterrupt;
            TCTL4_EDG3A = action && 0x01;
            TCTL4_EDG3B = action >> 1;  
            break;
        case 4:
            TIOS_IOS4 = 0;
            TIE_C4I = iInterrupt;
            TCTL3_EDG4A = action && 0x01;
            TCTL3_EDG4B = action >> 1;  
            break;
        case 5:
            TIOS_IOS5 = 0;
            TIE_C5I = iInterrupt;
            TCTL3_EDG5A = action && 0x01;
            TCTL3_EDG5B = action >> 1;  
            break;
        case 6:
            TIOS_IOS6 = 0;
            TIE_C6I = iInterrupt;
            TCTL3_EDG6A = action && 0x01;
            TCTL3_EDG6B = action >> 1;  
            break;
        case 7:
            TIOS_IOS7 = 0;
            TIE_C7I = iInterrupt;
            TCTL3_EDG7A = action && 0x01;
            TCTL3_EDG7B = action >> 1;  
            break;
    }
}

/// @brief Start ETC
ETC_Start()
{
    TSCR1 = TSCR1_TEN_MASK | TSCR1_TFFCA_MASK;
}