/**
* checks values of width and height inputs and activates
* create/clear button if canvas width and height are setted
*/
function isSize() {
	if ($('#canvas-width').val() > 0 && $('#canvas-height').val() > 0) {
		$('#canvas-create').removeAttr('disabled');
	} 
}

// event listeners to checks changes of canvas size values
$('#canvas-width').on('keyup mouseup', isSize);
$('#canvas-height').on('keyup mouseup', isSize);

/**
* creates canvas with declared dimensions and activates other options
* or deactivates options if at least one dimension is not setted an create button is clicked
*/
function makeCanvas() {
	const gridWidth = $("#canvas-width").val(); //assign width value
	const gridHeight = $('#canvas-height').val(); //assign height value
	$('#canvas').children().remove(); // remove exist canvas
	// checks if both size-inputs have a value
	if (gridWidth > 0 && gridHeight > 0) {
		$('input').removeAttr('disabled'); //activates unactive options
		$('div > h2').css({'color': '#fafafa'});
		$('#color-history td').on('click', setColor); //sets event listener to color history
		$('#color-history td').css({'border-color': '#d4d4d4', 'opacity': ''});
		gridOnFlag = true;
		$('#grid-on').val('grid on');
	} else {
		$('#grid-options input').attr('disabled', 'disabled'); //unactivates active options
		$('div > h2').css({'color': '#6f78a9'});
		$('#color-picker').attr('disabled', 'disabled');
		$('#color-history td').off('click', setColor); //removes event listener to color history
		$('#color-history td').css({'border-color': '#6f78a9', 'opacity': '0.4'});
		$('#canvas-create').attr('disabled', 'disabled'); //unactivates create/clear button
		$('#canvas').children().remove(); //removes canvas
	}
	// creates canvas with declared size
	for (let i = 0; i < gridHeight; i++) {
		$('#canvas').append('<tr></tr>');
		for ( let j = 0; j < gridWidth; j++) {
		  $('#canvas tr:last').append('<td></td>');
		}
  	$('#canvas td').css({"background-color": "#fff", "border-style": borderStyle, "border-color": borderColor});
	}
  	event.preventDefault();
  	return;
}

// event listener to create, clear or remove canvas
$('#size-form').submit(function(event) {
	makeCanvas();
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

// event listener to paint canvas
$('#canvas').on('mousedown', 'td', paintCanvas);

/**
* Converts hex color value to rgb color value
*@param {string} hexValue - hex color value
*@returns {string} rgb color value
*/
function hexToRgb(hexValue) {
	// creates array with strings of each hex color value
	const hexArray = hexValue.slice(1).match(/.{1,2}/g);
	// converts strings in array to hex number an next to decimal value 
	for (let i = 0; i <hexArray.length; i++) {
	  hexArray[i] = parseInt(hexArray[i],16).toString(10);
	}
	//creates correct rgb color value
	const rgbValue = 'rgb(' + hexArray[0] + ', ' + hexArray[1] + ', ' + hexArray[2] + ')'
	return rgbValue;
}

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

// event listener - if paint color is changed then calling lastUsed function
$('#color-picker').on('change', lastUsed);

/**
* Sets paint color to color clicked in 'last used' history 
* (if color exist) and do nothing if clicked history cell 
* is empty (taken background-color value is in rgba format). Selected
* color, before is setted, must be converted from rgb to hex value
* by rgbToHex function.
*/
function setColor() {
	if (!($(this).css('background-color')).includes('rgba')) {
	$('#color-picker').val(rgbToHex(($(this).css('background-color'))))	
	} 
}

/**
* Converts rgb color value to hex color value
*@param {string} rgbValue - rgb color value
*@returns {string} hex color value
*/
function rgbToHex(rgbValue) {
	// creates array with strings of each rgb color value
	const rgbArray = rgbValue.slice(4, -1).split(/,\s/);
	// converts strings in array to decimal number and next to hex value 
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

// flag to check on/off status in gridOn function
let gridOnFlag = true;

/**
* To on/off grid visibility
*/
function gridOn() {
	if (gridOnFlag === true) {
		$(this).css({'font-weight': 'normal'}).val('grid off');
		$('#canvas td').css({'border-style': 'none'});
		$('#grid-style, #grid-color').attr('disabled', 'disabled');
		gridOnFlag = false;
	} else {
		$(this).val('grid on');
		$('#canvas td').css({'border-style': borderStyle});
		$('#grid-style, #grid-color').removeAttr('disabled');
		gridOnFlag = true;
	}
}

// event listener to on/off canvas grid
$('#grid-on').on('click', gridOn);

// variable to set default or store setted gridStyle and to restore it when the grid is off and on again
let borderStyle = 'solid';

/** 
* To change canvas grid-lines style
*/
function gridStyle() {
	const style = $('#canvas td').css('border-style');
	switch(style) {
		case "solid":
		$('#canvas td').css({'border-style': 'dashed'});
		$('#grid-style').attr('src', './img/icon-grid-dashed.png')
		borderStyle = 'dashed'
		break;
		case "dashed":
		$('#canvas td').css({'border-style': 'dotted'});
		$('#grid-style').attr('src', './img/icon-grid-dotted.png')
		borderStyle = 'dotted'
		break;
		case "dotted":
		$('#canvas td').css({'border-style': 'solid'});
		$('#grid-style').attr('src', './img/icon-grid-solid.png')
		borderStyle = 'solid'
	}
}

// event listener to grid style button
$('#grid-style').on('click', gridStyle);

// variable to set default and store setted color of grid-lines
let borderColor = '#000';

// function gridColor to change color of canvas grid-lines
function gridColor() {
	borderColor = $('#grid-color').val();
	$('#canvas td').css({'border-color': borderColor});
}

// event listener to grid color button
$('#grid-color').on('change', gridColor);


