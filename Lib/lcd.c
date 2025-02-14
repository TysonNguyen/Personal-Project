#include <hidef.h>
#include "derivative.h"
#include "lcd.h"
#include "rti.h"
//for input Read/Write up
#define lcd_RWUp DDRH = 0; PORTK |= 2;

//for output Read/Write high
#define lcd_RWDown PORTK &= (~2); DDRH = 0xFF; 

#define lcd_EUp PORTK |= 1;
#define lcd_EDown PORTK &= (~1);
#define lcd_RSUp PORTK |= 4;
#define lcd_RSDown PORTK &= (~4);

void lcd_Busy (void){
 unsigned char inVal = 0;
 lcd_RSDown;
 lcd_RWUp;
 do
 {
    lcd_EUp;
    lcd_MicroDelay;

    inVal = PTH;
    lcd_EDown;
 }
 while(inVal & 0x80);
}

void lcd_Ins (unsigned char val){
   lcd_Busy();

   lcd_RWDown;
   lcd_RSDown;

   PTH = val;

   lcd_EUp;
   lcd_EDown;
}

void lcd_Init(void){
   //lcd_Busy();

   PTH = 0b00000000;
   lcd_EDown;
   lcd_RWDown;
   lcd_RSDown;
   DDRK |= 0b00000111;
    lcd_MicroDelay;
   PTH = 0x38;
   lcd_EUp;
   lcd_EDown;
    lcd_MicroDelay;
   lcd_EUp;
   lcd_EDown;
    lcd_MicroDelay;
   lcd_Ins(0x38);
   lcd_Ins(0x0C);
   lcd_Ins(0x01);
   lcd_Ins(0x06);
}

void lcd_Data(unsigned char val)
{
   lcd_Busy();
   lcd_RWDown;
   lcd_RSUp;
   PTH = val;
   lcd_EUp;
   lcd_EDown;
}

void lcd_String(char const * straddr){
   for (; *straddr; ++straddr)
        lcd_Data(*straddr);
}

void lcd_Home(void){
   lcd_Ins(0x02);
}

void lcd_Clear(void){
   lcd_Ins(0x01);
}


void lcd_AddrXY (unsigned int ix, unsigned int iy)
{
   int i;
   lcd_Busy();
   lcd_Home();

   switch (iy)
   {
      case 0:
         lcd_Ins(LCD_ROW0);      
         break;
      
      case 1:
         //lcd_Ins(LCD_ROW1);
         for(i = 0; i < 40; i++)
         {
            lcd_Ins(0b00010100);
         }
         break;
      
      case 2:
         //lcd_Ins(LCD_ROW2);
         for(i = 0; i < 20; i++)
         {
            lcd_Ins(0b00010100);
         }
         break;
         
      case 3:
         // lcd_Ins(LCD_ROW3);
         for(i = 0; i < 60; i++)
         {
            lcd_Ins(0b00010100);
         }
         break;  
   }

      for(i = 0; i < ix; i++)
   {
      lcd_Ins(0b00010100);
   }
}

void lcd_StringXY (unsigned int ix, unsigned int iy, char const * const straddr)
{
   int i;
   lcd_AddrXY(ix,iy);
   lcd_String(straddr);
}

