
/**
* checks values of width and height inputs and activates
* 'create' button if canvas width and height are setted
*/
function isSize() {
	if ($('#canvas-height').val() > 0 && $('#canvas-width').val() > 0) {
		$('#canvas-create').removeAttr('disabled');
	} 
}

// event listeners to checks changes of canvas size values
$('#canvas-height').on('keyup mouseup', isSize );
$('#canvas-width').on('keyup mouseup', isSize );

/**
* creates pixel canvas
*/
function makeGrid() {
	const gridWidth = $("#canvas-width").val(); //assign width value
	const gridHeight = $('#canvas-height').val(); //assign height value
	$('#pixel-canvas').children().remove(); // remove exist canvas
	// checks if both size-inputs have a value
	if (gridWidth > 0 && gridHeight > 0) {
		$('input').removeAttr('disabled'); //activate unactive options
		$('div > h2').css({'color': '#fafafa'});
		$('sidebar td').css({'border-color': '#d4d4d4', 'opacity': ''});
		$('sidebar td').on('click', setColor);
		gridOnFlag = true;
		$('input.grid-on').css({'font-weight': 'bolder' }).val('grid on');
	} else {
		$('.grid-options input').attr('disabled', 'disabled');
		$('#color-picker').attr('disabled', 'disabled');
		$('div > h2').css({'color': '#6f78a9'});
		$('sidebar td').off('click', setColor);
		$('sidebar td').css({'border-color': '#6f78a9', 'opacity': '0.4'});
		$('input[type=submit]').attr('disabled', 'disabled');
	}
	// creates canvas with declared size
	for (let i = 0; i < gridHeight; i++) {
		$('#pixel-canvas').append('<tr></tr>');
		for ( let j = 0; j < gridWidth; j++) {
		  $('main tr:last').append('<td></td>');
		}
  	$('main td').css({"background-color": "#fff", "border-style": bdStyle, "border-color": bdColor});
	}
  	event.preventDefault();
  	return;
}


// 
$('#size-form').submit(function(event) {
	makeGrid();
});
						

/**
* fills the canvas cells by setted paint color
* or clear if clicked again the same color
*/
function paintCanvas() {
  	const pickedColor = $('#color-picker').val();
  	const cellColor = $(this).css('background-color');
  	if (cellColor === hexToRgb(pickedColor)) {
		$(this).css({'background-color': '#fff'});
	} 	else {
	  	$(this).css({'background-color': pickedColor});
	}
}
/////////////


// event listener to paint canvas
$('main table').on('mousedown', 'td', paintCanvas);

// event listener to on/off canvas grid
$('input.grid-on').on('click', gridOn);

// flag to check on/off in gridOn function
let gridOnFlag = true;

/**
* function gridOn, to on/off grid visibility
*/
function gridOn() {
	if (gridOnFlag === true) {
		$(this).css({'font-weight': 'normal'}).val('grid off');
		$('main td').css({'border-style': 'none'});
		$('.grid-style, .grid-color').attr('disabled', 'disabled');
		gridOnFlag = false;
	} else {
		$(this).css({'font-weight': 'bolder' }).val('grid on');
		$('main td').css({'border-style': bdStyle});
		$('.grid-style, .grid-color').removeAttr('disabled');
		gridOnFlag = true;
	}
}

// event listener on grid style button
$('input.grid-style').on('click', gridStyle);

// variable to store default or setted gridStyle and to restore it when the grid is off and on again
let bdStyle = 'solid';

/** 
*function gridStyle(), to change canvas grid-lines style
*/
function gridStyle() {
	const style = $('main td').css('border-style');
	switch(style) {
		case "solid":
		$('main td').css({'border-style': 'dashed'});
		$('.grid-style').attr('src', './img/icon-grid-dashed.png')
		bdStyle = 'dashed'
		break;
		case "dashed":
		$('main td').css({'border-style': 'dotted'});
		$('.grid-style').attr('src', './img/icon-grid-dotted.png')
		bdStyle = 'dotted'
		break;
		case "dotted":
		$('main td').css({'border-style': 'solid'});
		$('.grid-style').attr('src', './img/icon-grid-solid.png')
		bdStyle = 'solid'
	}
}


//
$('input.grid-color').on('change', gridColor);

// variable to set default and store setted color of grid-lines
let bdColor = '#000';

// function gridColor to change color of canvas grid-lines
function gridColor() {
	bdColor = $('.grid-color').val();
	$('main td').css({'border-color': bdColor});
}

///////
// paint color listener to calling lastUsed function
$('#color-picker').on('change', lastUsed);

// Last used colors history array
const colHist = ['#000000','','','',''];

/**
* Handling color history. Sets stored in colHist array colors
* to history cells. Adds and removes used colors to colHist arrray
*/
function lastUsed() {
	// rules to fills history cells by stored in colHist color values
	$('#col-hist-1').css({'background-color': colHist[0]});
	$('#col-hist-2').css({'background-color': colHist[1]});
	$('#col-hist-3').css({'background-color': colHist[2]});
	$('#col-hist-4').css({'background-color': colHist[3]});
	$('#col-hist-5').css({'background-color': colHist[4]});
	// adds last used color to history if it does not exist yet and 
	// removes oldest color if history is full
	if (!(colHist.includes($('#color-picker').val()))) { 
			colHist.unshift($('#color-picker').val());
			colHist.pop();
	}
}

/**
* Sets paint color to color clicked in 'last used' history 
* (if color exist) and do nothing if clicked history cell 
* is empty (background-color value in rgba format). Selected
* color, before is setted, must be converted from rgb to hex value
* by rgbToHex function.
*/
function setColor() {
	if (!($(this).css('background-color')).includes('rgba')) {
	$('#color-picker').val(rgbToHex(($(this).css('background-color'))));	
	} 
}

/**
*  Converts rgb color value to hex color value
*@param {string} rgbValue - rgb color value
*@returns {string} hex color value
*/
function rgbToHex(rgbValue) {
	// creates array with strings of each rgb color value
	const rgbArray = rgbValue.slice(4, -1).split(/,\s/);
	// converts strings in array to decimal and next to hex value 
	for (let i = 0; i < rgbArray.length; i++) {
		rgbArray[i] = parseInt(rgbArray[i]).toString(16);
		// checks for correct 'two digits per color' value format 
		if (rgbArray[i].length < 2) {
			rgbArray[i] = '0' + rgbArray[i];
		}
	}
	// creates correct hex color value
	const hexValue = '#' + rgbArray.join('');
	return hexValue;
}

/**
* Converts hex color value to rgb color value
*@param {string} hexValue - hex color value
*@returns {string} rgb color value
*/
function hexToRgb(hexValue) {
	const hexArray = hexValue.slice(1).match(/.{1,2}/g);
	for (let i = 0; i <hexArray.length; i++) {
	  hexArray[i] = parseInt(hexArray[i],16).toString(10);
	}
	const rgbValue = 'rgb(' + hexArray[0] + ', ' + hexArray[1] + ', ' + hexArray[2] + ')'
	return rgbValue;
}