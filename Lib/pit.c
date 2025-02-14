#include "pit.h";
#include <hidef.h>
#include "derivative.h"

void PIT_InitChannel(PIT_Channel ch, PIT_MicroTimer mt, PIT_Interrupt ie){

    //using mirco timer 1 or 0
    if(mt)
        PITMUX |= mt; //setting micro timer up 1
    else PITMUX &= mt; // setting mirco timer 0
    
    if(ie)
        PITINTE |= ch; //Enable interupt at non 0 channel 
    else PITINTE &= ~ch;//Enable interupt at channel 0

    PITCE |= ch; //assign channel
}

void PIT_Set1msDelay(PIT_Channel ch){
    
}

void PIT_Sleep(PIT_Channel ch, unsigned int ms){

}

void PIT_Start(void){
    //Enable Timer Global
    PITCFLMT |= PITCFLMT_PITE_MASK;
}

void PIT_Delay_us(PIT_Channel ch, unsigned int us){
    
    switch (ch)
    {
        case PIT_CH1:
            PITLD1 = 20 * us - 1;
            break;
        case PIT_CH2:
            PITLD2 = 20 * us - 1;
            break;
        case PIT_CH3:
            PITLD3 = 20 * us - 1;
            break;
        case PIT_CH0:
            PITLD0 = 20 * us - 1;
            break;
    }

    PITFLT |= ch; //Force load counter
    PITTF = ch;   //clear flag, in case already active;
    while(!(PITTF & ch));
}