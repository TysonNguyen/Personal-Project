#include "adc.h"
#include <hidef.h>
#include "derivative.h"

void ATD_CTL2(int ADPU, int AFFC, int AWAI, int ETRIGLE, int ETRIGP,int ETRIGE ,int ASCIE)
{   
    if(ADPU) //Power up
        ATD0CTL2 |= ATD0CTL2_ADPU_MASK; 
    if(AFFC) //Fast flag clear
        ATD0CTL2 |= ATD0CTL2_AFFC_MASK;
    if(AWAI) // Power Down in Wait Mode
        ATD0CTL2 |= ATD0CTL2_AWAI;
    if(ETRIGLE) //External Trigger Level/Edge Contro
        ATD0CTL2 |= ATD0CTL2_ETRIGLE_MASK;
    if(ETRIGP) //External trigger Polarity
        ATD0CTL2 |= ATD0CTL2_ETRIGP_MASK;
    if(ASCIE) // ATD Sequence Complete Interrupt Enable
        ATD0CTL2 |= ATD0CTL2_ASCIE_MASK;

}

void ATD_CTL3(int iConversionTime,ADC_FreezeMode freezeMode, int enableFIFO)
{
    if(iConversionTime > 8)
    {
        return;
    }
    //Setting the conversion time
    switch(iConversionTime){
        case 1:
            ATD0CTL3 = ATD0CTL3_S1C_MASK;
            break;
        case 2:
            ATD0CTL3 = ATD0CTL3_S2C_MASK;
            break;
        case 3:
            ATD0CTL3 = ATD0CTL3_S1C_MASK || ATD0CTL3_S2C_MASK;
            break;
        case 4:
            ATD0CTL3 = ATD0CTL3_S4C_MASK;
            break;
        case 5:
            ATD0CTL3 = ATD0CTL3_S4C_MASK || ATD0CTL3_S1C_MASK;
            break;
        case 6:
            ATD0CTL3 = ATD0CTL3_S4C_MASK || ATD0CTL3_S2C_MASK;
            break;
        case 7:
            ATD0CTL3 = ATD0CTL3_S4C_MASK || ATD0CTL3_S1C_MASK || ATD0CTL3_S2C_MASK;
            break;
        case 8: 
            ATD0CTL3 = 0;
            break;
        case 0:
            ATD0CTL3 = 0;
            break;
    }
    //Setting freeze mode
    switch (freezeMode)
    {
    case ContinueConversion:
        break;
    case Reserved:
        ATD0CTL3 |= ATD0CTL3_FRZ0_MASK;
        break;
    case FinishThenFreeze:
        ATD0CTL3 |= ATD0CTL3_FRZ1_MASK;
        break;
    case FreezeImmediately:
        ATD0CTL3 |= ATD0CTL3_FRZ1_MASK | ATD0CTL3_FRZ0_MASK;
        break;
    }   
    //enable first in fisrt out mode
    if(enableFIFO)
        ATD0CTL3 |= ATD0CTL3_FIFO_MASK;    


}

void ATD_CTL4(ADC_Resolution resolution,int iSampleTime,int iPrescaler)
{
    
    if((iSampleTime % 2) % 2 == 1) //Check if this sample time is odd 
    return;
    if(iSampleTime > 16) // Check if sample time is more than 16
    return;
    if(iPrescaler > 32 || iPrescaler - 1 < 0) // Check if prescaler is more than 32 
    return;
    ATD0CTL4  = iPrescaler - 1;
    switch(iSampleTime){
        case 2:
            ATD0CTL4 |= 0;
            break;
        case 4:
            ATD0CTL4 |= ATD0CTL4_SMP0_MASK;
            break;
        case 8:
            ATD0CTL4 |= ATD0CTL4_SMP1_MASK;
            break;
        case 16:
            ATD0CTL4 |= ATD0CTL4_SMP0_MASK || ATD0CTL4_SMP1_MASK;
            break;
    }
    ATD0CTL4 |= resolution; 
     
}

void ATD_CTL0(ADC_Channel iWrapChannel)
{
    ATD0CTL0 = iWrapChannel;
}

void ATD_CTL5(ADC_Channel ch,ADC_DataJustify dataJustify,int signedData,int iContinous,int iMultipleChannel)
{
    //Start at channel ch
    ATD0CTL5 = ch;       

    //Check if data is justify left or right  
    if(dataJustify == JustifyRight)
        ATD0CTL5_DJM = 1;
    //Signed Data Enabler    
    ATD0CTL5_DSGN = signedData;

    //Continous conversion enabler
    ATD0CTL5_SCAN = iContinous;

    //Multiple Channel enabler
    ATD0CTL5_MULT = iMultipleChannel;     
}