#include "segs.h"
#include <hidef.h>
#include "derivative.h"
#include <stdio.h>
#include "misc.h"
////////////////////////////////////////////////////////////////////////////////////////////
//local helper
////////////////////////////////////////////////////////////////////////////////////////////
#define Segs_WLATCH PORTA &= (~0x01); PORTA |= 0x01;
#define Segs_ML PORTA &= (~0x02);
#define Segs_MH PORTA |= 0x02;

void Segs_Init (void){
    PORTA |= 0x03;
    DDRA |= 0x03;
    DDRB |= 0xff;
    Segs_Clear();
}

void Segs_Normal (unsigned char address, unsigned char data, Segs_DPOption dp){
    address &= 0x07;

    address |= 0b01011000;

    if(dp)
    {
        data &= (~0x80);
    }
    else 
    {
        data |= 0x80;
    }

    PORTB = address;
    Segs_MH
    Segs_WLATCH

    PORTB = data;
    Segs_ML
    Segs_WLATCH

}

void Segs_Custom (unsigned char address, unsigned char data){
    address &= 0x07;

    address |= 0b01111000;

    PORTB = address;
    Segs_MH
    Segs_WLATCH

    PORTB = data;
    Segs_ML
    Segs_WLATCH
}

void Segs_ClearDigit(unsigned char address){

}

void Segs_Clear(void){
    int i;

    for(i = 0; i < 8; i++)
    {
        Segs_Custom(i,0b10000000);
    }
}

void Segs_ClearLine(Segs_LineOption line){
    if(!line)
    {
        Segs_Custom(0,0b10000000);
        Segs_Custom(1,0b10000000);
        Segs_Custom(2,0b10000000);
        Segs_Custom(3,0b10000000);
    }
    if(line)
    {
        Segs_Custom(4,0b10000000);
        Segs_Custom(5,0b10000000);
        Segs_Custom(6,0b10000000);
        Segs_Custom(7,0b10000000);
    }
}

void Segs_16H (unsigned int value, Segs_LineOption line){
    char char0;
    char char1;
    char char2;
    char char3;
    char0 = (value >> 12) & 0x000F; 
    char1 = (value >> 8) & 0x000F; 
    char2 = (value >> 4) & 0x000F; 
    char3 = value & 0x000F;

    if(!line)
    {
        Segs_Normal(0,char0,Segs_DP_OFF);       
        Segs_Normal(1,char1,Segs_DP_OFF);  
        Segs_Normal(2,char2,Segs_DP_OFF);
        Segs_Normal(3,char3,Segs_DP_OFF);
    }
    
    if(line)
    {
        Segs_Normal(4,char0,Segs_DP_OFF);       
        Segs_Normal(5,char1,Segs_DP_OFF);  
        Segs_Normal(6,char2,Segs_DP_OFF);
        Segs_Normal(7,char3,Segs_DP_OFF);
    }
}


void Segs_16D (unsigned int value, Segs_LineOption line){
    int remainder = 0;
    int i;
    int thousand;
    int hundred;
    int ten;
    int one;
    if(value < 9999)
    {
        
        thousand = value / 1000;
        remainder = value % (thousand * 1000);
        hundred = remainder / 100;
        remainder = remainder % (hundred * 100);
        ten = remainder / 10;
        remainder = remainder % (ten * 10);
        one = remainder;

        if(!line)
        {
            Segs_Normal(0,thousand,Segs_DP_OFF);       
            Segs_Normal(1,hundred,Segs_DP_OFF);  
            Segs_Normal(2,ten,Segs_DP_OFF);
            Segs_Normal(3,one,Segs_DP_OFF);
        }
    
        if(line)
        {


            Segs_Normal(4,thousand,Segs_DP_OFF);       
            Segs_Normal(5,hundred,Segs_DP_OFF);  
            Segs_Normal(6,ten,Segs_DP_OFF);
            Segs_Normal(7,one,Segs_DP_OFF);
        }
    }

    

}

void Segs_8H (unsigned char address, unsigned char value){
    if(address > 7)
    {
        return;
    }
    else {
    unsigned int char1 = value >> 4;
    unsigned int char2 = value & 0x0F;

    Segs_Normal(address,char1,Segs_DP_OFF);

    if(address + 1 == 8)
    {
        Segs_Normal(0,char2,Segs_DP_OFF);
    }
    else 
    {
        Segs_Normal(address + 1,char2,Segs_DP_OFF);

    }
    }

}

void Segs_SayErr (Segs_LineOption line){
 if(!line)
 {
    Segs_Custom(0,0b11001111);
    Segs_Custom(1,0b10001100);
    Segs_Custom(2,0b10001100);
    Segs_Custom(3,0b11110000);
 }
 if(line)
 {
    Segs_Custom(4,0b11001111);
    Segs_Custom(5,0b10001100);
    Segs_Custom(6,0b10001100);
    Segs_Custom(7,0b11110000);
     }
}