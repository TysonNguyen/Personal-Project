#include <hidef.h>
#include "derivative.h"
#include "misc.h"
#include <stdlib.h>
#include "sci.h"
#include "clock.h"
#include <string.h>
#include <stdio.h>




int GetRandom(int iMax)
{
    return rand() % iMax;
}

int isVowel(char c)
{
    if (c == 'a' || c == 'A')
    {
        return 1;
    }
    else if (c == 'o' || c == 'O')
    {
        return 1;
    }
    else if (c == 'U' || c == 'U')
    {
        return 1;
    }
    else if (c == 'I' || c == 'i')
    {
        return 1;
    }
    else if (c == 'e' || c == 'E')
    {
        return 1;
    }
    else
        return 0;
}

char GetRandomVowelLower(){
    int rnd = GetRandom(5);
    switch (rnd)
    {
    case 1:
        return 'a';
        break;
    case 2:
        return 'e';
        break;
    case 3:
        return 'i';
        break;
    case 4:
        return 'o';
        break;
    default:
        return 'u';
        break;
    }
}

char GetRandomVowelUpper(){
    int rnd = GetRandom(5);
    switch (rnd)
    {
    case 1:
        return 'A';
        break;
    case 2:
        return 'E';
        break;
    case 3:
        return 'I';
        break;
    case 4:
        return 'O';
        break;
    default:
        return 'U';
        break;
    }
}

int ToDigitVal (char digit){
    int i = 0 ;
    char lowerChar[] = {'0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'};
    char upperChar[] = {'0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'};

    for(i = 0; i < sizeof(lowerChar); i++){
        if(digit == lowerChar[i])
        {
            return (unsigned int)i;
        }
    }

    for(i = 0; i < sizeof(upperChar); i++){
        if(digit == upperChar[i])
        {
            return (unsigned int) i;
        }
    }

    return 0;
}

unsigned long HexArrayToUInt16 (char * pArray){
    int i;
    int j;
    unsigned long pow16 = 0;
    unsigned long returnVal = 0;
    for(i=0; i < strlen(pArray); i++){
        
        pow16 = 1;
        for(j = strlen(pArray) - 1; j > i; j--){
            pow16 *= 16;
        }
        returnVal += ToDigitVal(pArray[i])*pow16;
    }
    return returnVal;
}

int foo(char const *pStr){
    int iStrLen = 0;
    while(*(pStr++))
    {
        ++iStrLen;
    }
    return iStrLen;
}


// void GenStr(char *pStr){
//  int i;
//  for(i =0; i < strlen(*pStr); i++)
//  {
//     pStr[i] = GetRandom(26) + 'A';
//  }
// }
