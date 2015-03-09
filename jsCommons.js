var module;



(function (w, m, d) {
	'use strict';

	/*jslint maxlen:250*/
	/*global document, window, localStorage, navigator*/
	/*jslint nomen: true*/


/*New Math functions*/
	m.randomTo = function (from, to) {
		return m.floor(m.random() * (to - from + 1) + from);
	};

	/*Radians to degrees*/
		m.deg = function (a) {
			return a * (180 / m.PI);
		};

	/*Degrees to radians*/
		m.rad = function (a) {
			return a * (m.PI / 180);
		};

	/*Gets angle from a to be, in either degrees (default) or radians if specified.*/
		m.angle = function (a, b, rad) {
			var d = m.atan2(b.y - a.y, b.x - a.x) * 180 / m.PI;
			if (rad) {
				return m.rad(d);
			}
			return d;
		};

	/*Is this number odd?*/
		m.odd = function (x) {
			return (x % 2 === 0) ? false : true;
		};

	/*Is this number even?*/
		m.even = function (x) {
			return !m.odd(x);
		};

	/*Get distance between two x/y co-ords*/
		m.coordDist = function (a, b) {
			var t = m.pow(a.x - b.x, 2) + m.pow(a.y - b.y, 2);
			return m.floor(m.sqrt(t));
		};

		m.diff = function (a, b) {
			return m.abs(a - b);
		};

	/*Returns the biggest of the two numbers*/
		m.biggest = function (a, b) {
			if (a >= b) {
				return a;
			}
			return b;
		};

	/*Do two circles overlap?*/
		m.circleOverlap = function (c1, c2) {
			//Takes an array or json obj with an x, y, radius property
			return (m.coordDist(c1, c2) < (c1.radius + c2.radius));
		};

	/*returns a scale based on the input values*/
		m.scale = function (img, max) {
			//Expects object in the following format: {width: x, height: x}
			//Does not respect aspect ratio currently...
			return {width: (100 / img.width) / (100 / max.width), height: (100 / img.height) / (100 / max.height)};
		};

	/*Percentage of one number to the other*/
		m.percent = function (a, b) {
			return (a / b) * 100;
		};

	/*Is a co-ord in a polygon?*/
		m.pointInPoly = function (vs, point) {
	        // ray-casting algorithm based on
	        // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
	        var xi,
				xj,
				i,
				intersect,
	            x = point[0],
	            y = point[1],
				j,
				yi,
				yj,
	            inside = false;
	        for (i = 0, j = vs.length - 1; i < vs.length; j = i++) {
				xi = vs[i][0];
				yi = vs[i][1];
				xj = vs[j][0];
				yj = vs[j][1];
				intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
				if (intersect) {
					inside = !inside;
				}
			}
			return inside;
		};

	/*Returns a "tile" number based on a pixel value*/
		m.asTile = function (n, tileSize) {
			return (m.ceil((n / tileSize)));
		};

	/*Returns a pixel number based on a "tile" value*/
		m.asPixels = function (n, tileSize) {
			return (m.ceil(n) * tileSize);
		};






/*Drawing Functions*/
	d.def = {
		fillType: 'fill',
		fillColor:  '#fff',
		strokeColor: '#000',
		strokeWidth: 1.01
	};

	d.circle = function (ctx, x, y, radius, cus) {
		cus = cus || d.def;
		var ft;


		ctx.beginPath();
		ft = cus.fillType || d.def.fillType;
		ctx.fillStyle = cus.fillColor || d.def.fillColor;
		ctx.strokeStyle = cus.strokeColor || d.def.strokeColor;
		ctx.lineWidth = cus.strokeWidth || d.def.strokeWidth;
		ctx.arc(x, y, radius, 0, m.PI * 2, true);
		ctx.closePath();


		if (ctx[ft]) {
			ctx[ft](); //Valid is stroke and fill
		} else if (ft === 'both') {
			ctx.fill();
			ctx.stroke();
		} else {
			ctx.fill();
		}

	};

	d.line = function (ctx, x, y, x2, y2, cus) {
		//draws a line
		cus = cus || d.def;

		ctx.beginPath();
		ctx.lineWidth = cus.strokeWidth || d.def.strokeWidth;
		ctx.strokeStyle = cus.strokeColor || d.def.strokeColor;
		ctx.moveTo(x, y);
		ctx.lineTo(x2, y2);
		ctx.stroke();
		ctx.closePath();


	};

	d.rect = function (ctx, x, y, w, h, cus) {
		//draw a line
		cus = (cus || d.def);

		ctx.beginPath();

		ctx.rect(x, y, w, h);
		ctx.lineWidth = cus.lineWidth || d.def.lineWidth;
		ctx.strokeStyle = cus.strokeStyle || d.def.strokeStyle;
		ctx.fillStyle = cus.fillStyle || d.def.fillStyle;

		if (cus.fillStyle || d.def.fillStyle) {
			ctx.fill();
		}

		if (cus.stroke || d.def.stroke) {
			ctx.stroke();
		}

		ctx.closePath();


	};

	d.clear = function (ctx) {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	};

	d.text = function (ctx, str, x, y, cus) {
		cus = cus || d.def;
		ctx.beginPath();
		ctx.font = cus.font || ctx.font || "10px arial";
		ctx.fillStyle = cus.fillStyle || "#ffffff";
		ctx.fillText(str, x, y);
		ctx.closePath();
	};






/*Array Functions*/
	w.array = {};

	w.array.getJSONLength = function (json) {
		var count = 0,
			i;
		for (i in json) {
			count = count + 1;
		}
		return count;
	};






/*CSS Functions*/
	w.css = {};
	w.css.getAttr = function (selector, attribute) {
		/*
			This fetches a given value from a given selector/rule based almost verbatim on: http://www.dzone.com/snippets/reading-attribute-values.
			Aesthetic changes were made to fit my style, very little else was altered; all rights and credit go to @DZone
		*/

		/*global document*/

		selector = selector.toLowerCase();
		var stylesheet = document.styleSheets[0],
			n = stylesheet.cssRules.length,
			selectors,
			value,
			m,
			j,
			i;

		for (i = 0; i < n; (i = i + 1)) {
			selectors = stylesheet.cssRules[i].selectorText.toLowerCase().split(",");
			m = selectors.length;
			for (j = 0; j < m; j) {
				if (selectors[j].trim() === selector) {
					value = stylesheet.cssRules[i].style.getPropertyValue(attribute);
					if (value !== "") {
						return value;
					}
				}
			}
		}
		return null;
	};






/*DOM Functions*/
	w.dom = {};

	w.dom.dataAttr = function (domElement, selector, data) {
		if (data) {
			domElement.setAttribute("data-" + selector, data);
		}
		var d = data || domElement.getAttribute("data-" + selector);
		return d;
	};






/*Uber storage hack*/
	w.storage = function (key, data) {
		var masterDB = localStorage,
			ret;
		if (data) {
			masterDB[key] = JSON.stringify(data);
			ret = data;
		} else if (data === false) {
			masterDB.removeItem(key);
			ret = false;
		}

		if (masterDB[key]) {
			try {
				return JSON.parse(masterDB[key]);
			} catch (e) {
				ret = false;
			}
		}
		return ret;
	};






/*Uber cookie hack*/
	w.cookie = (function () {
		var C = function (key, value, options) {
			return arguments.length === 1 ?	C.get(key) : C.set(key, value, options);
		};

		// Allows for setter injection in unit tests
		C._d = document;
		C._n = navigator;

		C.defaults = {
			path: '/'
		};

		C.get = function (key) {
			if (C._cachedDocumentCookie !== C._d.cookie) {
				C._renewCache();
			}

			return C._cache[key];
		};

		C.set = function (key, value, options) {
			options = C._getExtendedOptions(options);
			options.expires = C._getExpiresDate(value === undefined ? -1 : options.expires);

			C._d.cookie = C._generateCookieString(key, value, options);

			return C;
		};

		C.expire = function (key, options) {
			return C.set(key, undefined, options);
		};

		C._getExtendedOptions = function (options) {
			return {
				path: (options && options.path) || C.defaults.path,
				domain: (options && options.domain) || C.defaults.domain,
				expires: (options && options.expires) || C.defaults.expires,
				secure: (options && options.secure !== undefined) ?  options.secure : C.defaults.secure
			};
		};

		C._isValidDate = function (date) {
			return Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime());
		};

		C._getExpiresDate = function (expires, now) {
			now = now || new Date();
			switch (typeof expires) {
			case 'number':
				expires = new Date(now.getTime() + expires * 1000);
				break;
			case 'string':
				expires = new Date(expires);
				break;
			}

			if (expires && !C._isValidDate(expires)) {
				throw new Error('`expires` parameter cannot be converted to a valid Date instance');
			}

			return expires;
		};

		C._generateCookieString = function (key, value, options) {
			key = key.replace(/[^#$&+\^`|]/g, encodeURIComponent);
			key = key.replace(/\(/g, '%28').replace(/\)/g, '%29');
			value = (value + String('')).replace(/[^!#$&-+\--:<-\[\]-~]/g, encodeURIComponent);
			options = options || {};

			var cookieString = key + '=' + value;
			cookieString += options.path ? ';path=' + options.path : '';
			cookieString += options.domain ? ';domain=' + options.domain : '';
			cookieString += options.expires ? ';expires=' + options.expires.toUTCString() : '';
			cookieString += options.secure ? ';secure' : '';

			return cookieString;
		};

		C._getCookieObjectFromString = function (documentCookie) {
			var cookieObject = {},
				cookiesArray = documentCookie ? documentCookie.split('; ') : [],
				cookieKvp,
				i;
			for (i = 0; i < cookiesArray.length; i++) {
				cookieKvp = C._getKeyValuePairFromCookieString(cookiesArray[i]);

				if (cookieObject[cookieKvp.key] === undefined) {
					cookieObject[cookieKvp.key] = cookieKvp.value;
				}
			}

			return cookieObject;
		};

		C._getKeyValuePairFromCookieString = function (cookieString) {
			// "=" is a valid character in a cookie value according to RFC6265, so cannot `split('=')`
			var separatorIndex = cookieString.indexOf('=');

			// IE omits the "=" when the cookie value is an empty string
			separatorIndex = separatorIndex < 0 ? cookieString.length : separatorIndex;

			return {
				key: decodeURIComponent(cookieString.substr(0, separatorIndex)),
				value: decodeURIComponent(cookieString.substr(separatorIndex + 1))
			};
		};

		C._renewCache = function () {
			C._cache = C._getCookieObjectFromString(C._d.cookie);
			C._cachedDocumentCookie = C._d.cookie;
		};

		C._areEnabled = function () {
			var testKey = 'cookies.js',
				areEnabled = C.set(testKey, 1).get(testKey) === '1';
			C.expire(testKey);
			return areEnabled;
		};

		C.enabled = C._areEnabled();
		return C;
	}());






/*Querystring to JSON*/
	w.querystring = function (d) {
		var r = {},
			a = d.split('&'),
			i,
			v;

		for (i in a) {
			v = a[i].split('=');
			r[v[0]] = v[1];
		}

		return r;
	};







/*XHR Functions*/
request = new XMLHttpRequest();
request.open('GET', '/my/url', true);

request.onreadystatechange = function() {
  if (this.readyState === 4){
    if (this.status >= 200 && this.status < 400){
      // Success!
      resp = this.responseText;
    } else {
      // Error :(
    }
  }
};

request.send();
request = null;






/*Time Functions*/
	w.getEpoch = function () {
		return parseInt((new Date().getTime() / 1000).toFixed(0, 0), 0);
	};





/*AMD/node exports*/
	if (module) {
		module.exports = w;
	}
	return w;





}(window, Math, (window.draw = {})));


