/*global localStorage:true*/





/*Set up some environmentals*/

//Assert
assert = require('basic-assert');
require('basic-assert');
w = require('./jsCommons.min.js');

//LocalStorage
if (typeof localStorage === "undefined" || localStorage === null) {
	var LocalStorage = require('node-localstorage').LocalStorage;
	localStorage = new LocalStorage('./scratch');
}


//Tests that it is actually returning the correct time
assert.is(w.getEpoch(), parseInt((new Date().getTime() / 1000).toFixed(0, 0), 0))







/*MATH TESTS*/

//Get random number between two numbers inclusively
assert.is((function () {var t = Math.randomTo(1, 5); return t > 0 && t < 6; }()), true);

//Radians to Degrees
assert.is(Math.deg(1), 57.29577951308232);

//Get angle between two coordinates
assert.is(Math.angle({x:10, y:0}, {x:20, y:1}), 5.710593137499642);

//Is this number odd?
assert.is(Math.odd(1), true);

//Distance between two coordinate points
assert.is(Math.coordDist({x:10, y:0}, {x:20, y:0}), 10);

//(Positive) Difference from two numbers
assert.is(Math.diff(10, 20), 10);

//Returns the biggest between two numbers
assert.is(Math.biggest(10, 5), 10);

//Detects if two circles overlap
assert.is(Math.circleOverlap({x:10, y:20, radius: 10}, {x:35, y:10, radius: 10}), false);

//Determine relative scale (as percentage) based on max width and height
assert.eq(Math.scale({width: 200, height:200}, {width: 180, height:80}), {width: 0.8999999999999999, height: 0.4});

//What percentage of `b` is `a`
assert.is(Math.percent(10,100), 10);

//Is a given point inside a polygon
assert.is(Math.pointInPoly([[0, 0],	[1, 0],	[2, 0],	[3, 0],	[3, 1],	[3, 2],	[3, 3],	[2, 3],	[1, 3],	[0, 3]], [2, 2]), true);

//Gives the number of times the second value fits in the first and rounds up to biggest int. (ie 33.333 => 33)
assert.is(Math.asTile(72, 32), 3);

//Gives the first number times the second; (mostly here ofr standardization)
assert.is(Math.asPixels(3, 32), 96);






















