#include "portj.h";
#include <hidef.h>
#include "derivative.h"


void PORTJ_Init(PORTJ_Channel portj,PORTJ_TriggerEdge trigger ,PORTJ_DataDirection direction,PORTJ_Interrupt ie)
{
    //SETTING PORTJ0 
    if(portj == PORTJ0)
    {
        //SETTING RISING OR FALLING EDGE
        if(trigger){
            PPSJ |= PPSJ_PPSJ0_MASK;
        }
        else{
            PPSJ &= ~PPSJ_PPSJ0_MASK;
        }

        //SETTING DIRECTION OF DATA TO BE INPUT OR OUTPUT
        if(direction){
            DDRJ |= DDRJ_DDRJ0_MASK;
        }
        else{
            DDRJ &= ~DDRJ_DDRJ0_MASK;
        }

        //SETTING ENABLE OR DISABLE INTERRUPT
        if(ie){
            PIEJ |= PIEJ_PIEJ0_MASK;
        }
        else{
            PIEJ &= ~PIEJ_PIEJ0_MASK;
        }
        
    }


    //SETTING PORTJ1
    if(portj == PORTJ1)
    {
        //SETTING RISING OR FALLING EDGE
        if(trigger){
            PPSJ |= PPSJ_PPSJ1_MASK;
        }
        else{
            PPSJ &= ~PPSJ_PPSJ1_MASK;
        }

        //SETTING DIRECTION OF DATA TO BE INPUT OR OUTPUT
        if(direction){
            DDRJ |= DDRJ_DDRJ1_MASK;
        }
        else{
            DDRJ &= ~DDRJ_DDRJ1_MASK;
        }

        //SETTING ENABLE OR DISABLE INTERRUPT
        if(ie)
        {
            PIEJ |= PIEJ_PIEJ1_MASK;
        }else{
            PIEJ &= ~PIEJ_PIEJ1_MASK;
        }
    }
}

int PORTJ_Pushed(PORTJ_Channel portj)
{   
    if(portj == PORTJ0)
    {
        return PIFJ_PIFJ0;
    }

    if(portj == PORTJ1)
    {
        return PIFJ_PIFJ1;
    }
}

int PORTJ_Holded(PORTJ_Channel portj)
{
    if(portj == PORTJ0)
    {
        return PTJ && PTJ_PTJ0_MASK;
    }

    if(portj == PORTJ1)
    {
        return PTJ && PTJ_PTJ1_MASK;
    }

}