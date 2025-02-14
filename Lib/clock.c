#include <hidef.h>
#include "derivative.h"
#include "clock.h"

unsigned long BusSpeed = DEF_BUS_CLOCK;

void Clock_Set8MHZ(void)
{
    CLKSEL_PLLSEL = 0; 
    BusSpeed = DEF_BUS_CLOCK;
} 

void Clock_Set20MHZ(void)
{
    SYNR = 4;
    REFDV = 3;
    CLKSEL_PSTP = 1; 
    PLLCTL = 0b11111111;
    while (!CRGFLG_LOCK){}
    CLKSEL_PLLSEL = 1; 
    BusSpeed = 20000000;
}
void Clock_Set24MHZ(void)
{
    SYNR = 2;
    REFDV = 1;
    CLKSEL_PSTP = 1; 
    PLLCTL = 0b11111111;
    while (!CRGFLG_LOCK){}
    CLKSEL_PLLSEL = 1; 
    BusSpeed = 24000000;

}
void Clock_Set40MHZ(void )
{
    SYNR = 4;
    REFDV = 1;
    CLKSEL_PSTP = 1; 
    PLLCTL = 0b11111111;
    while (!CRGFLG_LOCK){}
    CLKSEL_PLLSEL = 1; 
    BusSpeed = 40000000;
}
unsigned long Clock_GetBusSpeed(void)
{
    return BusSpeed;
}

