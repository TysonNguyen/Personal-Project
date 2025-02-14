#include <hidef.h>
#include "derivative.h"
#include "sci.h"
#include "clock.h"
#include <stdio.h>
#include "stdlib.h"
#include "misc.h"

char strPosition[20];
char strBinary[20];
unsigned long sci0_Init(unsigned long ulBaudRate, int iRDRF_Interrupt)
{
    SCI0BD =  (unsigned int)(Clock_GetBusSpeed() / (15 * ulBaudRate));
    SCI0CR2 = 0b00001100;
    SCI0CR2_RIE = iRDRF_Interrupt;
    return SCI0BD;
}

unsigned char sci0_rxByte(unsigned char *pData)
{
    if (SCI0SR1 & SCI0SR1_RDRF_MASK) // Check if transmit data register is empty
    {
        *pData = SCI0DRL;
        return 1;
    }
    else
        return 0;
}

void sci0_txByte(unsigned char data)
{
    while (!(SCI0SR1 & SCI0SR1_TDRE_MASK))
        ; // Wait till transmit data register is empty
    SCI0DRL = data;
}

void sci0_txStr(char const *straddr)
{
    for (; *straddr; ++straddr)
        sci0_txByte(*straddr);
}

int sci0_Peek(void){
    if(1>0){
    return 1;
    }
    else return 0;
}

void sci0_GotoXY(int iCol, int iRow){
    sprintf(strPosition,"\x1b[%d;%dH",iCol,iRow);
    sci0_txStr(strPosition);
}

void sci0_txStrXY(int iCol, int iRow, char const *straddr){
    sprintf(strPosition,"\x1b[%d;%dH",iCol,iRow);
    sci0_txStr(strPosition);
    for (; *straddr; ++straddr)
        sci0_txByte(*straddr);
}

void sci0_ClearScreen (void){
    sci0_txStr("\x1b[2J");
}

void sci0_ShowBin16 (unsigned int iVal){
    char caInputArray[16] = "00000000000000";
    char caReturnBinaryArray[16];
    int i = 0;
    int j = 0;
    while (iVal > 0) {
        caInputArray[i] = iVal % 2;
        iVal = iVal / 2;
        i++;
    }

    for( j = 0;j < sizeof(caReturnBinaryArray);j++){
        caReturnBinaryArray[j] = caInputArray[15-j];
    }

    sci0_txStr(caReturnBinaryArray);
    
}


