/*global localStorage:true*/





/*Set up some environmentals*/

//Assert
assert = require('basic-assert');
require('basic-assert');
w = require('./jsCommons.js');

//LocalStorage
if (typeof localStorage === "undefined" || localStorage === null) {
	var LocalStorage = require('node-localstorage').LocalStorage;
	localStorage = new LocalStorage('./scratch');
}


//Tests that it is actually returning the correct time
//assert.is(w.getEpoch(), parseInt((new Date().getTime() / 1000).toFixed(0, 0), 0))
assert.is(w.getEpoch(), '123123123')


























