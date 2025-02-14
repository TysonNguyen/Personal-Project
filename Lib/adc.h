/*
  A to D Converter (ADC) Header File
  FILE: adc.h
  Created on: Nov 07 2024 by Tyson Nguyen
*/

typedef enum ADC_ChannelTyepedef_
{
    AN7 = 7,
    AN6 = 6,
    AN5 = 5,
    AN4 = 4,
    AN3 = 3,
    AN2 = 2,
    AN1 = 1,
    AN0 = 0
}ADC_Channel;

typedef enum ADC_FreezeModeTyepedef_
{              
    ContinueConversion,
    Reserved,
    FinishThenFreeze,
    FreezeImmediately
}ADC_FreezeMode;

typedef enum ADC_ResolutionTyepedef_
{
    bit10 = 0,
    bit8  = 1
}ADC_Resolution;

typedef enum ADC_DataJustifyTyepedef_
{
    JustifyRight,
    JustifyLeft
}ADC_DataJustify;



/// @brief To configure Control 2 (1 to enable, 0 to disable)
/// @param ADPU to power up
/// @param AFFC Fast flag clear
/// @param AWAI ATD Power down in await mode
/// @param ETRIGLE External Trigger Level and egde control
/// @param ETRIGP External trigger Polarity
/// @param ETRIGE
/// @param ASCIE interupt enabler
void ATD_CTL2(int ADPU, int AFFC, int AWAI, int ETRIGLE, int ETRIGP,int ETRIGE ,int ASCIE);

/// @brief sets the conversion sequence length and controls the ATD behavior in freeze mode
///@param iConversionTime number of time for conversion the higher more accurarte but take longer
///@param freezeMod what channel would do after finish the conversion
///@param enableFIFO should it enable first in first out ??? (1 to enable, 0 to disable)
void ATD_CTL3(int iConversionTime,ADC_FreezeMode freezeMode,int enableFIFO);

/// @brief set the conversion clock frequency length of the second phase of the sample time
/// @param iSampleTime Sample time select choose only 2 4 8 or 16
void ATD_CTL4(ADC_Resolution resolution,int iSampleTime,int iPrescaler);

/// @brief set up wrapping channel
/// @param iWrapChannel the end of wrap
void ATD_CTL0(ADC_Channel iWrapChannel);

/// @brief to start the conversion
/// @param ch channel to trigger conversion
/// @param dataJustify change data justify to left or right
/// @param signedData (1 to enable 0 to disable)
/// @param iContinous (1 to enable 0 to disable)
/// @param iMultipleChannel (1 to enable 0 to disable)
void ATD_CTL5(ADC_Channel ch,ADC_DataJustify dataJustify,int signedData,int iContinous,int iMultipleChannel);