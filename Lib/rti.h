//RTI Module Library
//File: rti.h (header file)
//Processor: MC9S12XDP512
//Crystal: 16 MHz
//by Carlos Estay
//September 2023
//Last edit, September 13th, 2023



/// @brief Enables RTI Moule
/// @param  
void RTI_Init(void);

/// @brief Blocking delay to be used  once the RTI MOdule is enabled
/// @param timeout 
void RTI_Delay_ms(unsigned int timeout);

/// @brief Enables RTI Module with callback to be used in main
/// @param function 
void RTI_InitCallback(void(*function)(void));

/// @brief Enables RTI Module with callback to be used in main and called
///        every "x" milliseconds
/// @param function 
/// @param interval in [ms] 
void RTI_InitCallback_ms(void(*function)(void), unsigned int);

void dummy(void);
void RTI_ISR_Call(void);
