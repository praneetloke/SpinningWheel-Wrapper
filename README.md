The SpinningWheel script was created by Matteo Spinelli, http://cubiq.org/

![SpinningWheel](http://static.cubiq.org/uploads/2009/03/Spinning-Wheel-slot-machine-alike.jpeg)

The original script is already an awesome pure CSS3, javascript solution to show a native iOS style spinning wheel. 
Unforunately, the script provides a single global object called SpinningWheel which has to be managed properly between
showing pickers with different types of data since it is always the same spinningwheel that is reused multiple times. This is
where the scrollwheel wrapper comes in. It helps you simply create multiple instances of scrollwheel as you desire and it will
manage the SpinningWheel object for you without you having to worry about it. Just be sure to pass a destroy function (see scrollwheel.example.js).

An added bonus feature of my wrapper is that it provides a 'type' parameter which you can use to create pickers of types time, date and custom; a feature missing in the original SpinningWheel script. 
Time and date pickers will do all the work for you. Custom picker is where you want to use your own data to show.

Of course, I created this for my use in a Phonegap mobile app and so some things may not make sense to you. If you would like to improve something in this script, contribute, 
report bugs, write tests etc., do let me know.

## Usage

# Javascript
```
<script type="text/javascript" src="spinningwheel.js"></script>
<script type="text/javascript" src="scrollwheel.wrapper.js"></script>
```

# CSS
```
<link rel="stylesheet" type="text/css" href="assets/css/spinningwheel.css"/>
```

See http://cubiq.org/spinning-wheel-on-webkit-for-iphone-ipod-touch for more info.