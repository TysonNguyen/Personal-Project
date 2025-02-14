#include <hidef.h>
#include "derivative.h"
#include "rti.h"

extern volatile unsigned long rtiMasterCount; 
void dummy(void) {};
void (*rtiCallback)(void) = dummy;

void RTI_InitCallback(void(*function)(void))
{
    RTI_Init();
    rtiCallback = function;
}
void RTI_Init(void)
{
    RTICTL = 0;
    CRGFLG = CRGFLG_RTIF_MASK;
    CRGINT |= CRGINT_RTIE_MASK;
    RTICTL = 0b10001111;
}

void RTI_Delay_ms(unsigned int ms)
{
    rtiMasterCount = 0;
    RTICTL = 0;
    RTICTL = 0b10001111;
    if (CRGFLG_RTIF) // RTI period over?
    {
            CRGFLG = CRGFLG_RTIF_MASK;
    }  
    while(rtiMasterCount < ms)
    {
        if (CRGFLG_RTIF) // RTI period over?
        {
            CRGFLG = CRGFLG_RTIF_MASK;
            rtiMasterCount++;
            rtiCallback();
        }   
    }
    RTICTL = 0;
}


// void RTI_InitCallback_ms(void(*function)(void), unsigned int ms)
// {  
// }

