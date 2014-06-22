var window = window || {}, document = document || {}, navigator = navigator || {}, module;



(function (w) {
	'use strict';

	/*jslint maxlen:250*/
	/*global document, window, localStorage, navigator*/
	/*jslint nomen: true*/

	/*New Math functions*/
	Math.randomTo = function (from, to) {
		return Math.floor(Math.random() * (to - from + 1) + from);
	};

	Math.deg = function (a) {
		return a * (180 / Math.PI);
	};

	Math.rad = function (a) {
		return a * (Math.PI / 180);
	};

	Math.angle = function (a, b, rad) {
		var d = Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
		if (rad) {
			return Math.rad(d);
		}
		return d;
	};

	Math.isOdd = function (x) { return (x % 2 === 0) ? true : false; };

	Math.coordDist = function (a, b) {
		//a & b should be arrays or JSON objs eg a = {x:20, y:20}...
		var t = Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2);
		return Math.floor(Math.sqrt(t));
	};

	Math.diff = function (a, b) { return Math.abs(a - b); };

	Math.biggest = function getBiggest(a, b) {
		if (a >= b) {
			return a;
		}
		return b;
	};

	Math.circleOverlap = function (c1, c2) {
		//Takes an array or json obj with an x, y, radius property
		var a = Math.pow(c1.x - c2.x, 2) + Math.pow(c1.y - c2.y, 2),
			distance = Math.sqrt(a);
		if (distance < (c1.radius + c2.radius)) {
			return true;
		}

		return false;
	};

	Math.newScale = function (img, max) {
		//Expects an array or JSON obj in the following
		//format: {width: x, height: x}

		var x = (100 / img.width) / (100 / max.width),
			y = (100 / img.height) / (100 / max.height);
		return {x: x, y: y};
	};

	Math.getPercentage = function (a, b) {
		return (a / b) * 100;
	};

	Math.pointInPoly = function (vs, point) {
		//ray-casting algorithm based on
		//http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

		var x = point[0],
			y = point[1],
			inside = false,
			intersect,
			j,
			i,
			yi,
			xi,
			yj,
			xj;

		for (i = 0, j = vs.length - 1; i < vs.length; j = (i = i + 1)) {
			xi = vs[i][0];
			yi = vs[i][1];
			xj = vs[j][0];
			yj = vs[j][1];

			intersect = ((yi > y) !== (yj > y))
				&& (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
			if (intersect) {
				inside = !inside;
			}
		}

		return inside;
	};

	Math.getTile = function (n, tileSize) {
		return (Math.ceil((n / tileSize)));
	};

	Math.getPixel = function (n, tileSize) {
		return (Math.ceil(n) * tileSize);
	};






	/*Drawing Functions*/
	w.draw = {};

	w.draw.circle = function (ctx, x, y, radius, custom) {
		//draws a circle || Example Usage:
		var defaults = {
			fillType: 'fill',
			fillColor:  '#fff',
			strokeColor: '#000',
			strokeWidth: 1.01
		},
			fillType;

		if (!custom) {
			custom = defaults;
		}

		ctx.beginPath();
		fillType = custom.fillType || defaults.fillType;
		ctx.fillStyle = custom.fillColor || defaults.fillColor;
		ctx.strokeStyle = custom.strokeColor || defaults.strokeColor;
		ctx.lineWidth = custom.strokeWidth || defaults.strokeWidth;

		ctx.arc(x, y, radius, 0, Math.PI * 2, true);
		ctx.closePath();


		if (ctx[fillType]) {
			ctx[fillType](); //Valid is stroke and fill
		} else if (fillType === 'both') {
			ctx.fill();
			ctx.stroke();
		} else {
			ctx.fill();
		}

	};

	w.draw.line = function (ctx, x, y, x2, y2, custom) {
		//draw a line
		var defaults = {
			strokeColor: '#000000',
			strokeWidth: 1.01
		};

		if (!custom) {
			custom = defaults;
		}

		ctx.beginPath();
		ctx.lineWidth = custom.strokeWidth || defaults.strokeWidth;
		ctx.strokeStyle = custom.strokeColor || defaults.strokeColor;
		ctx.moveTo(x, y);
		ctx.lineTo(x2, y2);
		ctx.stroke();
		ctx.closePath();


	};

	w.draw.rect = function (ctx, x, y, w, h, custom) {
		//draw a line
		var defaults = {
			fill: true,
			stroke: false,
			strokeColor: '#000000',
			fillColor: '#ff0000',
			lineWidth: 2.01
		};

		custom = (custom || defaults);

		ctx.beginPath();

		ctx.rect(x, y, w, h);
		ctx.lineWidth = custom.lineWidth || defaults.lineWidth;
		ctx.strokeStyle = custom.strokeStyle || defaults.strokeStyle;
		ctx.fillStyle = custom.fillStyle || defaults.fillStyle;

		if (custom.fillStyle || defaults.fillStyle) {
			ctx.fill();
		}

		if (custom.stroke || defaults.stroke) {
			ctx.stroke();
		}

		ctx.closePath();


	};

	w.draw.clear = function (ctx) {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	};

	w.draw.text = function (ctx, str, x, y, custom) {
		custom = custom || {};
		ctx.beginPath();
		ctx.font = custom.font || ctx.font || "10px arial";
		ctx.fillStyle = custom.fillStyle || "#ffffff";
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
		var Cookies = function (key, value, options) {
			return arguments.length === 1 ?	Cookies.get(key) : Cookies.set(key, value, options);
		};

		// Allows for setter injection in unit tests
		Cookies._document = document;
		Cookies._navigator = navigator;

		Cookies.defaults = {
			path: '/'
		};

		Cookies.get = function (key) {
			if (Cookies._cachedDocumentCookie !== Cookies._document.cookie) {
				Cookies._renewCache();
			}

			return Cookies._cache[key];
		};

		Cookies.set = function (key, value, options) {
			options = Cookies._getExtendedOptions(options);
			options.expires = Cookies._getExpiresDate(value === undefined ? -1 : options.expires);

			Cookies._document.cookie = Cookies._generateCookieString(key, value, options);

			return Cookies;
		};

		Cookies.expire = function (key, options) {
			return Cookies.set(key, undefined, options);
		};

		Cookies._getExtendedOptions = function (options) {
			return {
				path: (options && options.path) || Cookies.defaults.path,
				domain: (options && options.domain) || Cookies.defaults.domain,
				expires: (options && options.expires) || Cookies.defaults.expires,
				secure: (options && options.secure !== undefined) ?  options.secure : Cookies.defaults.secure
			};
		};

		Cookies._isValidDate = function (date) {
			return Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime());
		};

		Cookies._getExpiresDate = function (expires, now) {
			now = now || new Date();
			switch (typeof expires) {
			case 'number':
				expires = new Date(now.getTime() + expires * 1000);
				break;
			case 'string':
				expires = new Date(expires);
				break;
			}

			if (expires && !Cookies._isValidDate(expires)) {
				throw new Error('`expires` parameter cannot be converted to a valid Date instance');
			}

			return expires;
		};

		Cookies._generateCookieString = function (key, value, options) {
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

		Cookies._getCookieObjectFromString = function (documentCookie) {
			var cookieObject = {},
				cookiesArray = documentCookie ? documentCookie.split('; ') : [],
				cookieKvp,
				i;
			for (i = 0; i < cookiesArray.length; i++) {
				cookieKvp = Cookies._getKeyValuePairFromCookieString(cookiesArray[i]);

				if (cookieObject[cookieKvp.key] === undefined) {
					cookieObject[cookieKvp.key] = cookieKvp.value;
				}
			}

			return cookieObject;
		};

		Cookies._getKeyValuePairFromCookieString = function (cookieString) {
			// "=" is a valid character in a cookie value according to RFC6265, so cannot `split('=')`
			var separatorIndex = cookieString.indexOf('=');

			// IE omits the "=" when the cookie value is an empty string
			separatorIndex = separatorIndex < 0 ? cookieString.length : separatorIndex;

			return {
				key: decodeURIComponent(cookieString.substr(0, separatorIndex)),
				value: decodeURIComponent(cookieString.substr(separatorIndex + 1))
			};
		};

		Cookies._renewCache = function () {
			Cookies._cache = Cookies._getCookieObjectFromString(Cookies._document.cookie);
			Cookies._cachedDocumentCookie = Cookies._document.cookie;
		};

		Cookies._areEnabled = function () {
			var testKey = 'cookies.js',
				areEnabled = Cookies.set(testKey, 1).get(testKey) === '1';
			Cookies.expire(testKey);
			return areEnabled;
		};

		Cookies.enabled = Cookies._areEnabled();
		return Cookies;
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






	/*Time Functions*/
	w.getEpoch = function () {
		return parseInt((new Date().getTime() / 1000).toFixed(0, 0), 0);
	};

	if (module) {
		module.exports = w;
	}
	return w;
}(window));


