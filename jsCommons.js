var console





/*New Math functions*/
Math.randomTo = function(from,to){
    return Math.floor(Math.random()*(to-from+1)+from);
};

Math.deg = function(a){
	return a * (180/Math.PI);
};

Math.rad = function(a){
	return a * (Math.PI / 180);
};

Math.angle = function(a, b, rad){
	var d = Math.atan2(b.y-a.y, b.x-a.x) * 180 / Math.PI;
	if(rad){
		return  Math.rad(d);
	}
	return  d;
};

Math.isOdd = function(x) {  return ( x & 1 ) ? true : false;};

Math.coordDist = function(a, b){
	//a & b should be arrays or JSON objs eg a = {x:20, y:20}...
	return  Math.floor(Math.sqrt( Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) ));
};

Math.diff = function(a,b){	return Math.abs(a - b) };

Math.biggest = function getBiggest(a,b){ if(a>=b){return a} return b };

Math.circleOverlap = function(c1, c2){ //Takes an array or json obj with an x, y, radius property
	var distance = Math.sqrt( Math.pow(c1.x - c2.x, 2) + Math.pow(c1.y - c2.y, 2) )
	if(distance < (c1.radius+ c2.radius)){
		return true;
    }

	return false;
};

Math.newScale = function (img, max){
	//Expects an array or JSON obj in the following format: {width: x, height: x}
	var x = (100/img.width)/(100/max.width);
	var y = (100/img.height)/(100/max.height);
	return  {x:x,y:y};
};

Math.getPercentage = function (a,b){ return (a/b)*100 };

Math.pointInPoly = function (poly, pt){
	//Takes an array, NOT a JSON object
    for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
        ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
        && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
        && (c = !c);
    return c;
}

Math.getTile = function (n, tileSize){ return (Math.ceil((n/tileSize))) };

Math.getPixel = function (n,tileSize){ return (Math.ceil(n)*tileSize) };






/*Drawing Functions*/
draw = {};

draw.circle = function (ctx, x, y, radius, custom){
	//draws a circle || Example Usage:
	var defaults = {
			fillType: 'fill',
			fillColor:  '#fff',
			strokeColor: '#000',
			strokeWidth: 1.01
		};
	if(!custom){
			custom = defaults;
	}
	ctx.beginPath();
		var fillType = custom.fillType || defaults.fillType;
		ctx.fillStyle = custom.fillColor || defaults.fillColor;
		ctx.strokeStyle = custom.strokeColor || defaults.strokeColor;
		ctx.lineWidth = custom.strokeWidth || defaults.strokeWidth;

		ctx.arc(x, y, radius, 0, Math.PI*2, true);
	ctx.closePath();


	if(ctx[fillType]){
		ctx[fillType](); //Valid is stroke and fill
	}
	else if(fillType == 'both'){
		ctx.fill();
		ctx.stroke();
	}
	else{
		ctx.fill();
	};

};

draw.line = function (ctx, x, y, x2, y2, custom){
	//draw a line
	var defaults = {
		strokeColor: '#000000',
		strokeWidth: 1.01
	};
	if(!custom){
		custom = defaults;
	};

	ctx.beginPath();
		ctx.lineWidth = custom.strokeWidth || defaults.strokeWidth;
		ctx.strokeStyle = custom.strokeColor || defaults.strokeColor;
		ctx.moveTo(x, y);
		ctx.lineTo(x2, y2);
		ctx.stroke();
	ctx.closePath();


};

draw.rect = function (ctx, x, y, w, h, custom){
	//draw a line
	var defaults = {
		fill: true,
		stroke: false,
		strokeColor: '#000000',
		fillColor: '#ff0000',
		lineWidth: 2.01
	};
	custom = (custom||defaults);

	ctx.beginPath();

		ctx.rect(x, y, w, h);
		ctx.lineWidth = custom.lineWidth || defaults.lineWidth;
		ctx.strokeStyle = custom.strokeStyle || defaults.strokeStyle;
		ctx.fillStyle = custom.fillStyle || defaults.fillStyle;

		if (custom.fillStyle||defaults.fillStyle) {
			ctx.fill();
		}

		if (custom.stroke||defaults.stroke) {
			ctx.stroke();
		}

	ctx.closePath();


};

draw.clear = function(ctx){
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

draw.text = function(ctx, str, x,y, custom){
	if(!custom){
		custom = {}
	}
	ctx.beginPath();
	ctx.font = custom.font || ctx.font || "10px arial";
	ctx.fillStyle = custom.fillStyle || "#ffffff";
	ctx.fillText(str, x, y);
	ctx.closePath();
}




/*Array Functions*/
array = {}
array.getJSONLength = function (json){
	var count = 0;
	for(i in json){
		count++;
	}
	return count;
};






/*CSS Functions*/
css = {};
css.getAttr = function(selector, attribute){
/*This fetches a given value from a given selector/rule || based almost verbatim on: http://www.dzone.com/snippets/reading-attribute-values.
 Aesthetic changes were made to fit my style, very little else was altered; all rights and credit go to @DZone*/
	selector = selector.toLowerCase();
	var stylesheet = document.styleSheets[0];
	var n = stylesheet.cssRules.length;
	for(var i=0; i<n; i++){
		var selectors = stylesheet.cssRules[i].selectorText.toLowerCase().split(",");
		var m = selectors.length;
		for(j=0; j<m; j++){
			if(selectors[j].trim() == selector){
				var value = stylesheet.cssRules[i].style.getPropertyValue(attribute);
				if(value!=""){
					return value;
				}
			}
		}
	}
	return null;
};






/*DOM Functions*/
dom = {};

dom.dataAttr = function(domElement, selector, data){
	if(data){
		domElement.setAttribute("data-"+selector, data);
	}
	var d = data||domElement.getAttribute("data-"+selector);
	return d;
};






/*Uber storage hack*/
function storage(key, data){
	var masterDB = window.localStorage;
	if(data){
		masterDB[key] = JSON.stringify(data)
		return data;
	}
	else if(data === false){
		masterDB.removeItem(key)
		return false;
	}

	if(masterDB[key]) try{return JSON.parse(masterDB[key]);}catch(e){ return false}
	return false
}






/*Uber cookie hack*/
function cookie(name, value, days, path){
	name = encodeURIComponent(name);
	if(value){
		value = encodeURIComponent(value);
			 var date = new Date();
			 date.setTime(date.getTime() + ((days||1) * 24 * 60 * 60 * 1000));
			 var expires = "; expires=" + date.toUTCString();
		 document.cookie = name + "=" + value + expires + "; path="+(path||'/');
		 return value
	}
	else if(value == false){
		cookie(name, 'deleted', -1)
		return false;
	}
	else{
		var a = document.cookie.replace(/\ /g,'').split(';');
		for(var i in a){
			var b = a[i].split('=');
			if(b[0] == name){
				return b[1];
			}
		}
	}
	return false;
}






/*Querystring to JSON*/
function querystring(d){
	var r = {};
	var a = d.split('&');
	for(var i in a){
		var v = a[i].split('=');
		r[v[0]] = v[1];
	}
	return r;
};






/*Time Functions*/
function getEpoch(){
	var d = new Date();
	return ((d.getTime()-d.getMilliseconds())/1000);
}








/*EOF*/
