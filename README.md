jsCommons<img src="http://creativecommons.org/wp-content/themes/creativecommons.org/images/fc_approved_tiny.png" />
=========

[![wercker status](https://app.wercker.com/status/b3c5d21f164708cd3d10305c14bf02ec/m "wercker status")](https://app.wercker.com/project/bykey/b3c5d21f164708cd3d10305c14bf02ec)

Common functions that I've needed over the years.

<br>
<br>
###Math.randomTo(from, to)
* _Creates a psudorandom number within the bounds given._
* _Please note that this is INCLUSIVE_
* __EXAMPLE:__```Math.randomTo(0, 10)```
* __OUTPUT:__ ```3```

###Math.deg(a)
* _Converts from radians to degrees _
* __EXAMPLE:__ ```Math.deg(10)```
* __OUTPUT:__ ```572.957795```

###Math.deg(a)
* _Converts from radians to degrees _
* __EXAMPLE:__ ```Math.rad(572.957795)```
* __OUTPUT:__ ```10```

###Math.angle(a, b, rad)
* _Returns the angle from Coordinate a to b_
* _a and b are expected to be arrays of JSON objects as such "a = {x:10, y: 100}"_
* _Defaults to degrees, unless rad is truthy (non-null)_
* __EXAMPLE:__ ```Math.angle({x:0,y:0}, {x:100, y:100})```
* __OUTPUT:__ ```45```
* __EXAMPLE 2:__ ```Math.angle({x:0,y:0}, {x:100, y:100},true)```
* __OUTPUT 2:__ ```0.785398163....```
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<center><a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/deed.en_GB"><img alt="Creative Commons Licence" style="border-width:0" src="http://i.creativecommons.org/l/by-sa/3.0/88x31.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">jsCommons</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="https://github.com/schme16" property="cc:attributionName" rel="cc:attributionURL">Shane Gadsby</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/deed.en_GB">Creative Commons Attribution-ShareAlike 3.0 Unported License</a>.<br />Based on a work at <a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/schme16/jsCommons" rel="dct:source">https://github.com/schme16/jsCommons</a>.</center>