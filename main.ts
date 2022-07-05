function gaLinks () {
    maqueen.MotorRun(maqueen.aMotors.M1, maqueen.Dir.CCW, 15)
    maqueen.MotorRun(maqueen.aMotors.M2, maqueen.Dir.CW, 255)
    Teller = 0
}
function gaVooruit () {
    maqueen.MotorRun(maqueen.aMotors.M1, maqueen.Dir.CW, 255)
    maqueen.MotorRun(maqueen.aMotors.M2, maqueen.Dir.CW, 255)
    Teller = 0
}
function gaRechts () {
    maqueen.MotorRun(maqueen.aMotors.M1, maqueen.Dir.CW, 255)
    maqueen.MotorRun(maqueen.aMotors.M2, maqueen.Dir.CCW, 15)
    Teller = 0
}
function gaAchteruit () {
    maqueen.MotorRun(maqueen.aMotors.M1, maqueen.Dir.CCW, 255)
    maqueen.MotorRun(maqueen.aMotors.M2, maqueen.Dir.CCW, 255)
    Teller = 0
}
let Afstand = 0
let Teller = 0
let NeoPixels = neopixel.create(DigitalPin.P15, 4, NeoPixelMode.RGB)
NeoPixels.setBrightness(64)
basic.forever(function () {
    if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        gaVooruit()
    }
    if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
        gaLinks()
    }
    if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        gaRechts()
    }
    // Noodstop
    if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
        Teller += 1
        if (Teller == 8) {
            gaAchteruit()
        }
    }
})
basic.forever(function () {
    Afstand = maqueen.sensor(PingUnit.Centimeters)
    if (Afstand < 8 && Afstand > 0) {
        maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
        maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
        music.playTone(220, music.beat(BeatFraction.Eighth))
        basic.pause(100)
        music.playTone(220, music.beat(BeatFraction.Half))
        maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
        maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
        basic.pause(500)
    }
})
basic.forever(function () {
    NeoPixels.showColor(neopixel.colors(NeoPixelColors.Red))
    basic.pause(2000)
    NeoPixels.showColor(neopixel.colors(NeoPixelColors.Green))
    basic.pause(2000)
    NeoPixels.showColor(neopixel.colors(NeoPixelColors.Blue))
    basic.pause(2000)
})
basic.forever(function () {
    for (let index = 0; index <= 3; index++) {
        led.toggle(index + 1, 0)
        basic.pause(200)
        led.toggle(index + 1, 0)
    }
    for (let index = 0; index <= 3; index++) {
        led.toggle(3 - index, 0)
        basic.pause(200)
        led.toggle(3 - index, 0)
    }
})
