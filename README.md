# LOGO Sphero
Use LOGO commands to control a [Sphero](http://www.gosphero.com/).

To run the little bloke, edit the robot txt file with your commands and run:

```
node logo_sphere.js robot-square.txt
```

# LOGO Language

We currently support the following commands:

 - SPEED [speed int]
 - RT [turn right `int` degrees]
 - LT [turn left `int` degrees]
 - FD [go forward `int` distance]

e.g. To make Sphero move in a square:

```
SPEED 80
FD 2
RT 90
FD 2
RT 90
FD 2
RT 90
FD 2
```

Where `distance` is a pre-defined unit of distance.
