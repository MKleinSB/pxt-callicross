/**
 *  MCP23017-Interfacefunktionen
 *  für die I2C CalliCrosserweiterung
 *  für Calliope mini und micro:bit
 * 
 *  CC by SA Michael Klein 11.10.2021
 */

const enum REG_MCP {
    Bitmuster_A = 0x12,
    Bitmuster_B = 0x13,
    EinOderAusgabe_A = 0x00, 
    EinOderAusgabe_B = 0x01,
    PullUp_Widerstaende_A = 0x0C,
    PullUp_Widerstaende_B = 0x0D
}

const enum ADDRESS {          // Adresse des MCP23017
    A20 = 0x20,               // Standardwert          
}
const enum BITS {              
    Alle = 0xff,               
    Keiner = 0x00,             
    Bit1 = 0x01              
}

const enum Ports {                // Nummern der Ports (1-16)
    GPA0 = 1,               
    GPA1 = 2,
    GPA2 = 3,
    GPA3 = 4,
    GPA4 = 5,
    GPA5 = 6,
    GPA6 = 7,
    GPA7 = 8,
    GPB0 = 9,
    GPB1 = 10,
    GPB2 = 11,
    GPB3 = 12,
    GPB4 = 13,
    GPB5 = 14,
    GPB6 = 15,
    GPB7 = 16    
}

// zum Speichern der Bitwerte aus RegisterA und RegisterB
let BitwertA = 0x00;
let BitwertB = 0x00;
let IOBitsA = 0x00;
let IOBitsB = 0x00;

const enum AutoAmpel {
    A1 = 0,
    A2 = 1
}

const enum FussAmpel {
    F1 = 0,
    F2 = 1
}

const enum Lampe {
    L1 = 0,
    L2 = 1
}

const enum Schalter {
    S1 = Ports.GPB4,
    S2 = Ports.GPB5
}

const enum Cars {
    C1 = Ports.GPA7,
    C2 = Ports.GPA6
}

//% weight=100 color=#0000bb icon="\uf142" blockId="CalliCross"

namespace CalliCross {

    const tasterEventID = 3100;


    //% blockId="tasterPressed"
    //% block="Button 🔘 %port pressed"
    //% block.loc.de="Knopf 🔘 %port gedrückt"
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=2
    export function tasterPressed(port: Schalter): boolean { 
        let name:number=port      
        return MCPButtonPressed(name);
    }
 
    //% blockId="carDetected"
    //% block="car 🚙 at %port"
    //% block.loc.de="Auto 🚙 an %port"
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=2
    export function carDetected(port: Cars): boolean { 
        let name:number=port      
        return MCPButtonPressed(name);
    }

    //% blockId=onTasterPressed block="on Button 🔘 %taster pressed"
    //% block.loc.de="wenn Knopf 🔘 %taster gedrückt"
    //% taster.fieldEditor="gridpicker" taster.fieldOptions.columns=2
    export function onTasterPressed(taster: Schalter, handler: () => void) {
        control.onEvent(tasterEventID + taster, 0, handler);
         control.runInParallel(() => {
            while (true) {
             if (taster==Schalter.S1) { 
               if (CalliCross.MCPButtonPressed(Ports.GPB4)) {
	           control.raiseEvent(tasterEventID + taster, Ports.GPB4);
                }
            } else
              if (taster==Schalter.S2) {
                if (CalliCross.MCPButtonPressed(Ports.GPB5)) {
	            control.raiseEvent(tasterEventID + taster, Ports.GPB5);
                }
            }                
                basic.pause(200);              
            }
        })
    }


    //% blockId=onCarDetected block="on Car 🚙 at %taster"
    //% block.loc.de="wenn Auto 🚙 an %taster"
    //% taster.fieldEditor="gridpicker" taster.fieldOptions.columns=2
    export function onCarDetected(taster: Cars, handler: () => void) {
        control.onEvent(tasterEventID + taster, 0, handler);
         control.runInParallel(() => {
            while (true) {
             if (taster==Cars.C1) { 
               if (CalliCross.MCPButtonPressed(Ports.GPA7)) {
	           control.raiseEvent(tasterEventID + taster, Ports.GPA7);
                }
            } else
              if (taster==Cars.C2) {
                if (CalliCross.MCPButtonPressed(Ports.GPA6)) {
	            control.raiseEvent(tasterEventID + taster, Ports.GPA6);
                }
            }                
                basic.pause(80);              
            }
        })
    }

    /**
    * Custom color picker red
    */
    //% blockId=colorpickerRed block="%value"
    //% blockHidden=true
    //% value.fieldEditor="colornumber" value.fieldOptions.decompileLiterals=true
    //% value.fieldOptions.colours='["#ff0000","#000000"]'
    //% value.fieldOptions.columns=2 value.fieldOptions.className='rgbColorPicker'  
    export function ColorpickerRed(value: number) {
        return value;
    }

    /**
    * Custom color picker yellow
    */
    //% blockId=colorpickerYellow block="%value"
    //% blockHidden=true
    //% value.fieldEditor="colornumber" value.fieldOptions.decompileLiterals=true
    //% value.fieldOptions.colours='["#ffff00","#000000"]'
    //% value.fieldOptions.columns=2 value.fieldOptions.className='rgbColorPicker'  
    export function ColorpickerYellow(value: number) {
        return value;
    }

    /**
    * Custom color picker green
    */
    //% blockId=colorpickerGreen block="%value"
    //% blockHidden=true
    //% value.fieldEditor="colornumber" value.fieldOptions.decompileLiterals=true
    //% value.fieldOptions.colours='["#00ff00","#000000"]'
    //% value.fieldOptions.columns=2 value.fieldOptions.className='rgbColorPicker'  
    export function ColorpickerGreen(value: number) {
        return value;
    }

    /**
    * Custom color picker white
    */
    //% blockId=colorpickerWhite block="%value"
    //% blockHidden=true
    //% value.fieldEditor="colornumber" value.fieldOptions.decompileLiterals=true
    //% value.fieldOptions.colours='["#ffffff","#000000"]'
    //% value.fieldOptions.columns=2 value.fieldOptions.className='rgbColorPicker'  
    export function ColorpickerWhite(value: number) {
        return value;
    }

    //% block="traffic light 🚦 %amp $color1 $color2 $color3"
    //% block.loc.de="Ampel 🚦 %amp $color1 $color2 $color3"    
    //% color1.shadow="colorpickerRed" color1.defl=0xff0000
    //% color2.shadow="colorpickerYellow" color2.defl=0xFFFF00
    //% color3.shadow="colorpickerGreen" color3.defl=0x00FF00
    //% inlineInputMode=external
    //% weight=90
    //% amp.fieldEditor="gridpicker" amp.fieldOptions.columns=2
    export function A1(amp: AutoAmpel, color1: number, color2: number, color3: number) {
     if (amp==AutoAmpel.A1) {
        CalliCross.setLed(Ports.GPA2, (color1>0)) 
        CalliCross.setLed(Ports.GPA1, (color2>0))
        CalliCross.setLed(Ports.GPA0, (color3>0))
     } else {
        CalliCross.setLed(Ports.GPA5, (color1>0)) 
        CalliCross.setLed(Ports.GPA4, (color2>0))
        CalliCross.setLed(Ports.GPA3, (color3>0))
     }
    }

    //% block="traffic light 🚦 %amp $color1 $color2"    
    //% block.loc.de="Ampel 🚦 %amp $color1 $color2"   
    //% color1.shadow="colorpickerRed" color1.defl=0xff0000
    //% color2.shadow="colorpickerGreen" color2.defl=0x00FF00
    //% inlineInputMode=external
    //% weight=80
    //% amp.fieldEditor="gridpicker" amp.fieldOptions.columns=2
    export function F1(amp: FussAmpel, color1: number, color2: number) {
     if (amp==FussAmpel.F1) {
      CalliCross.setLed(Ports.GPB2, (color1>0))
      CalliCross.setLed(Ports.GPB0, (color2>0))
     } else {
        CalliCross.setLed(Ports.GPB3, (color1>0)) 
        CalliCross.setLed(Ports.GPB1, (color2>0))
     }
    }
    

    //% block="street lamp 💡 %amp $color1"
    //% block.loc.de="Beleuchtung 💡 %amp $color1"   
    //% color1.shadow="colorpickerWhite" color1.defl=0x000000
    //% inlineInputMode=inline
    //% weight=70
    //% amp.fieldEditor="gridpicker" amp.fieldOptions.columns=2
    export function L1(amp: Lampe, color1: number) {
     if (amp==Lampe.L1) {
        CalliCross.setLed(Ports.GPB6, (color1>0)) 
     } else {
        CalliCross.setLed(Ports.GPB7, (color1>0)) 
     }
    }

    
    /**
    * There is no need to define a port as output. They are predefined.
    **/
    //% blockId="initMCP23017LED"
    //% block="set %port as output"    
    //% block.loc.de="setze %port als Ausgang" 
    //% jsdoc.loc.de="Ausgänge müssen eigentlich garnicht definiert werden sondern sind voreingestellt!"
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=4
    //% weight=80
    //% group="Beim Start"
    //% blockHidden=true
    export function initMCP23017LED(port: Ports): void {
        let name:number=port;
         if (name > 0 && name < 9) { // Register A Bit des Ports auf 0 setzen
            IOBitsA = (IOBitsA & (BITS.Alle-(BITS.Bit1 << name - 1)))
            CalliCross.writeRegister(ADDRESS.A20, REG_MCP.EinOderAusgabe_A, IOBitsA)
        } else { // Register B
            name = name - 8
            IOBitsB = (IOBitsB & (BITS.Alle-(BITS.Bit1 << name - 1)))
            CalliCross.writeRegister(ADDRESS.A20, REG_MCP.EinOderAusgabe_B, IOBitsB)
        }        
    }

    //% blockId="initMCP23017Button"
    //% block="set %port as input"
    //% block.loc.de="setze %port als Eingang"  
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=4
    //% weight=80
    //% group="Beim Start"
    //% blockHidden=true
    export function initMCP23017Button(port: Ports): void {
       let name:number=port;
         if (name > 0 && name < 9) { // Register A Bit des Ports auf 1 setzen
            IOBitsA = (IOBitsA | (BITS.Bit1 << name - 1))
            CalliCross.writeRegister(ADDRESS.A20, REG_MCP.EinOderAusgabe_A, IOBitsA)
            CalliCross.writeRegister(ADDRESS.A20, REG_MCP.PullUp_Widerstaende_A, IOBitsA)
        } else { // Register B
            name = name - 8
            IOBitsB = (IOBitsB | (BITS.Bit1 << name - 1))
            CalliCross.writeRegister(ADDRESS.A20, REG_MCP.EinOderAusgabe_B, IOBitsB)
            CalliCross.writeRegister(ADDRESS.A20, REG_MCP.PullUp_Widerstaende_B, IOBitsB)
        }
    }

    /**
     * Returns ´true´ when the port is connected to ground.
     * The port of the MCP23017 must be set as input.
     */
    //% blockId="MCPButtonPressed"
    //% block="input %port closed"
    //% block.loc.de="Eingang %port geschlossen"
    //% jsdoc.loc.de="Gibt ´wahr´ zurück wenn der Eingang mit GND verbunden wurde, der Port des MCP23017 muss als Eingang festgelegt sein."
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=4
    //% weight=87
    //% group="IO"
    export function MCPButtonPressed(port: Ports): boolean {
        let name:number=port;
        let ergebnis:boolean=false;
        if (name > 0 && name < 9) { // Register A
            if (CalliCross.ReadNotAnd(ADDRESS.A20, REG_MCP.Bitmuster_A, (BITS.Bit1 << name - 1))) {
                ergebnis=true;
                } 
        } else { // Register B
                name = name - 8
                if (CalliCross.ReadNotAnd(ADDRESS.A20, REG_MCP.Bitmuster_B, (BITS.Bit1 << name - 1))) {
                ergebnis=true;
                } 
        }
        return ergebnis;
    }

    //% blockId="setLed"
    //% block="switch %port | %zustand"
    //% block.loc.de="schalte %port | %zustand"
    //% zustand.shadow="toggleOnOff"
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=4
    //% weight=88
    //% group="IO"

    export function setLed(port: Ports, zustand: boolean): void {
        let name:number=port
        if (zustand) {//LEDs an
            if (name > 0 && name < 9) { // Register A
                // Bitweises oder
                BitwertA = BitwertA | (BITS.Bit1 << name - 1)
                CalliCross.writeRegister(ADDRESS.A20, REG_MCP.Bitmuster_A, BitwertA);
            } else { // Register B
                name = name - 8
                BitwertB = BitwertB | (BITS.Bit1 << name - 1)
                CalliCross.writeRegister(ADDRESS.A20, REG_MCP.Bitmuster_B, BitwertB);
            }
        } else { //LEDs aus
            if (name > 0 && name < 9) { // Register A
                // Ist das betreffende Bit gesetzt? Dann löschen
                if ((BitwertA & (BITS.Bit1 << name - 1)) == (BITS.Bit1 << name - 1)) {
                    // Bitweises XOR ^
                    BitwertA = BitwertA ^ (BITS.Bit1 << name - 1)
                    CalliCross.writeRegister(ADDRESS.A20, REG_MCP.Bitmuster_A, BitwertA);
                }
            } else { // Register B
                name = name - 8
                if ((BitwertB & (BITS.Bit1 << name - 1)) == (BITS.Bit1 << name - 1)) {
                    BitwertB = BitwertB ^ (BITS.Bit1 << name - 1)
                    CalliCross.writeRegister(ADDRESS.A20, REG_MCP.Bitmuster_B, BitwertB);
                }
            }
        }
    }

    export function writeRegister(addr: ADDRESS, reg: REG_MCP, value: number) {
        pins.i2cWriteNumber(addr, reg * 256 + value, NumberFormat.UInt16BE)
    }

    export function ReadNotAnd(addr: ADDRESS, reg: REG_MCP, value: number): boolean {
        return (!(CalliCross.readRegister(addr, reg) & value))
    }

    export function readRegister(addr: ADDRESS, reg: REG_MCP): number {
        pins.i2cWriteNumber(addr, reg, NumberFormat.Int8LE);
        return pins.i2cReadNumber(addr, NumberFormat.Int8LE)
    }

    CalliCross.initMCP23017Button(Ports.GPB4) //S1
    CalliCross.initMCP23017Button(Ports.GPB5) //S2
    CalliCross.initMCP23017Button(Ports.GPA7) //C1
    CalliCross.initMCP23017Button(Ports.GPA6) //C2
}
