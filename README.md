
> Diese Seite bei [https://mkleinsb.github.io/pxt-callicross/](https://mkleinsb.github.io/pxt-callicross/) öffnen

## Callicross I2C MCP23017 traffic lights for Calliope mini and micro:bit

| ![Callicross](https://github.com/MKleinSB/pxt-callicross/blob/master/callicross1.jpg "CalliCross & Calliope") | ![Blocks](https://github.com/MKleinSB/pxt-callicross/blob/master/callicross2.jpg "Blocks") |
| :----------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------: |
|                                            _Callicross I2C Hardware_                                            |                                   _Callicross Makecode Blocks_                                   |

## CalliCross
Mehr zu CalliCross auf hackster! https://www.hackster.io/MKlein/callicross-37aea4

## Blöcke 
Alle Funktionen von Callicross werden über einen I2C Portexpander, dem MCP23017 gesteuert

### Ampel (Auto)

Schaltet eines der beiden Autoampelpaare

```sig
CalliCross.A1(
AutoAmpel.A1,
CalliCross.ColorpickerRed(0xff0000),
CalliCross.ColorpickerYellow(0xFFFF00),
CalliCross.ColorpickerGreen(0x00FF00)
)
```
### Ampel (Fußgänger)

Schaltet eines der beiden Fußgängerampelpaare

```sig
CalliCross.F1(
FussAmpel.F1,
CalliCross.ColorpickerRed(0xff0000),
CalliCross.ColorpickerGreen(0x00FF00)
)
```
### Beleuchtung

Schaltet eine der beiden Straßenlampen an oder aus.

```sig
CalliCross.L1(Lampe.L1, CalliCross.ColorpickerWhite(0x000000))
```
### wenn Taster gedrückt
Eventhandler der Code ausführt wenn eine der beiden Tasten an den Fußgängerampeln gedrückt ist

```sig
CalliCross.onTasterPressed(Schalter.S1, function () {
})
```

gibt es auch als boolsche Funktion
```sig
CalliCross.tasterPressed(Schalter.S1)
```

### wenn Auto ...

Eventhandler der Code ausführt wenn der Magnet eines Autos erkannt wurde

```sig
CalliCross.onCarDetected(Cars.C1, function () {
})
```

gibt es auch als boolsche Funktion
```sig
CalliCross.carDetected(Cars.C1)
```

## Fortgeschrittenenblöcke 
Blöcke zur direkten Steuerung des I2C Portexpanders MCP23017

### Schalte...

Schaltet eine LED an

```sig
CalliCross.setLed(Ports.GPA0, false)
```
### Eingang geschlossen

Boolsche Funktion ob ein Eingang des MCP23017 geschlossen ist

```sig
CalliCross.MCPInputClosed(Ports.GPA0)
```


#### Metadaten  (verwendet für Suche, Rendering)

* for PXT/calliopemini
* for PXT/microbit
* for PXT/maker
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
