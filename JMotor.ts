enum Motor {
    //% block="A"
    A = 0x1,
    //% block="B"
    B = 0x2,
}

enum Dir {
    //% block="Forward"
    forward = 0x1,
    //% block="Backward"
    backward = 0x2,
}
let EN = DigitalPin.P14;
let PWMA = AnalogPin.P1;
let AIN1 = DigitalPin.P12;
let AIN2 = DigitalPin.P13;
let PWMB = AnalogPin.P2;
let BIN1 = DigitalPin.P15;
let BIN2 = DigitalPin.P16;
let S0_PIN = AnalogPin.P0;
let S1_PIN = AnalogPin.P1;
let S2_PIN = AnalogPin.P2;

//% color=204
//% icon="\uf63b"
//% block="jBit Car"
namespace JMotor {
    /**
	 * Motor Run
	 * @param speed [0-16] speed of Motor; eg: 10, 0, 16
	*/
    //% blockId="MotorRun" block="Motor %m|index %index|speed %speed"
    //% weight=100
    //% speed.min=0 speed.max=100
    export function MotorRun(m: Motor, index: Dir, speed: number): void {
	pins.digitalWritePin(EN, 1)
        speed = speed * 10; // map 0 to 1023
	
        if (m == Motor.A) {
            pins.analogWritePin(PWMA, speed)
            if (index == Dir.forward) {
                pins.digitalWritePin(AIN1, 0)
                pins.digitalWritePin(AIN2, 1)
            } else {
                pins.digitalWritePin(AIN1, 1)
                pins.digitalWritePin(AIN2, 0)
            }
        } else {
            pins.analogWritePin(PWMB, speed)
            if (index == Dir.forward) {
                pins.digitalWritePin(BIN1, 0)
                pins.digitalWritePin(BIN2, 1)
            } else {
                pins.digitalWritePin(BIN1, 1)
                pins.digitalWritePin(BIN2, 0)
            }
        }
    }

    //% blockId="MotorStop"
    //% block="Motor %Motor| Stop"
    //% weight=90
    export function MotorStop(m: Motor): void {
        if (m == Motor.A)
            pins.analogWritePin(PWMA, 0)
        else
            pins.analogWritePin(PWMB, 0)
    }

}
