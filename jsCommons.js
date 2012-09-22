
/*New Math functions*/
Math.randomTo = function(from,to){
    return Math.floor(Math.random()*(to-from+1)+from);
}

Math.deg = function(a){
	return a * (Math.PI / 180)
}

Math.rad = function(a){
	return a / (Math.PI / 180)
}

Math.angle = function(x1, y1, x2, y2){
    return Math.rad(Math.deg(Math.atan2(y2-y1, x2-x1))%360)
}

Math.isOdd = function(x) {  return ( x & 1 ) ? true : false;}

Math.coordDist = function(a, b){
	//a & b should be arrays or JSON objs eg a = {x:20, y:20}...
	return  Math.floor(Math.sqrt( Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) ))
}

Math.diff = function(a,b){	return Math.abs(a - b) }

Math.biggest = function getBiggest(a,b){ if(a>=b){return a} return b }

Math.circleOverlap = function(c1, c2){
	var distance = Math.sqrt( Math.pow(c1.x - c2.x, 2) + Math.pow(c1.y - c2.y, 2) )
	if(distance < (c1.radius+ c2.radius)){ 
		return true
    }

	return false
}

Math.newScale = function (img, max){
	//Expects an array or JSON obj in the following format: {width: x, height: x}
	var x = (100/img.width)/(100/max.width)
	var y = (100/img.height)/(100/max.height)
	return  {x:x,y:y}
}

Math.getPercentage = function (a,b){ return (a/val.big)*100 }

Math.pointInPoly = function (poly, pt){
    for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
        ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
        && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
        && (c = !c);
    return c;
}








/*Drawing Functions*/
function circle(ctx, x, y, radius, custom){
	//draws a circle || Example Usage: circle(100, 100, 15, 'both', {stroke:'#000000', fill:'#AAAAAA'})
	if(!custom){
		custom = {
			fillType: 'fill',
			fillColor:  '#ffffff',
			strokeColor: '#000000',
			strokeWidth: 1.01,
		}
	}
	ctx.beginPath();
		var fillType = custom.fillType
		ctx.fillStyle = custom.fillColor
		ctx.strokeStyle = custom.strokeColor
		ctx.lineWidth = custom.strokeWidth
		
	//draw the circle [ORIGIN IS CENTRE]
		ctx.arc(x-radius, y-radius, radius, 0, Math.PI*2, true); 
	ctx.closePath()	

	
	if(ctx[fillType]){
		ctx[fillType](); //Valid is stroke and fill
	}
	else if(fillType == 'both'){
		ctx.fill()
		ctx.stroke()
	}
	else{
		ctx.fill()
	}
}

function line(ctx, x, y, x2, y2, custom){
	//draw a line
	if(!custom){
		custom = {
			strokeColor: '#000000',
			strokeWidth: 1.01,
		}
	}
	ctx.beginPath();
	ctx.lineWidth = custom.strokeWidth
	ctx.strokeStyle = custom.strokeColor
	ctx.moveTo(x, y);
	ctx.lineTo(x2, x2);
	ctx.stroke();
	ctx.closePath();
}






//testing

/*Array Functions*/
function getJSONLength(json){
	var count = 0
	for(i in json){
		count++
	}
	return count
}


