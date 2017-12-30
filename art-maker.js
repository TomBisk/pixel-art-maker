// TODO: tools > color options should be disabled when canvas is off.

// function to create pixel canvas
function makeGrid() {
	const gridWidth = $("#input-width").val();
	const gridHeight = $('#input-height').val();
	$('#pixel-canvas').children().remove();
	if (gridWidth + gridHeight > 1) {
		$('.grid-options input').removeAttr('disabled');
		gridOfFlag = true;
		$('input.grid-on').css({'font-weight': 'bolder' }).val('grid on');
	} else {
		$('.grid-options input').attr('disabled', 'disabled');
	}
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

$('#size-picker').submit(function(event) {
	makeGrid();
});
						
// function to fill the grid-cells by picked color
function paintGrid() {
  	const pickedColor = $('#color-picker').val();
  	const cellColor = $(this).css('background-color');
	// function to change the hex color value from picker to rgb() value
	function hexToRgb() {
		$('.hex-rgb').css({'background-color': pickedColor});
		const rgbValue = $('.hex-rgb').css('background-color');
		return rgbValue;
	}
  	if (cellColor === hexToRgb()) {
		$(this).css({'background-color': '#fff'});
	} 	else {
	  	$(this).css({'background-color': pickedColor});
	}
}

$('main table').on('click', 'td', paintGrid);
$('input.grid-on').on('click', gridOf);
//$('table').on('mousedown', 'td', paintGrid);


// flag to check on/off in gridOf function
let gridOfFlag = true;
//function gridOf, to on/of grid visibility
function gridOf() {
	if (gridOfFlag === true) {
		$(this).css({'font-weight': 'normal'}).val('grid off');
		$('main td').css({'border-style': 'none'});
		$('.grid-style, .grid-color').attr('disabled', 'disabled');
		gridOfFlag = false;
	} else {
		$(this).css({'font-weight': 'bolder' }).val('grid on');
		$('main td').css({'border-style': bdStyle});
		$('.grid-style, .grid-color').removeAttr('disabled');
		gridOfFlag = true;
	}
}
$('input.grid-style').on('click', gridStyle);
// variable to store default or setted gridStyle and to restore it when the grid is off and on again
let bdStyle = 'solid';
// function gridStyle(), to change canvas grid-lines style
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


$('input.grid-color').on('change', gridColor);
// variable to set default and store setted color of grid-lines
let bdColor = '#000';
// function gridColor to change color of canvas grid-lines
function gridColor() {
	bdColor = $('.grid-color').val();
	$('main td').css({'border-color': bdColor});
}

// paint color listener to calling lastUsed function
$('input#color-picker').on('change', lastUsed);

// color history array
const colHist = ['#000000',1,1,1,1];

// function to handling color history
function lastUsed() {
	$('#a').css({'background-color': colHist[0]});
	$('#b').css({'background-color': colHist[1]});
	$('#c').css({'background-color': colHist[2]});
	$('#d').css({'background-color': colHist[3]});
	$('#e').css({'background-color': colHist[4]});
	
	colHist.unshift($('input#color-picker').val());
	colHist.pop();
}

// color history listener
$('sidebar td').on('click', setColor);

// function to set paint color from color history
function setColor() {
	$('input#color-picker').val(rgbToHex(($(this).css('background-color'))));
}

// function to convert rgb color value to hex value
function rgbToHex(rgbValue) {
	let rgbArr = rgbValue.slice(4, -1).split(/,\s/);
	for (let i = 0; i < rgbArr.length; i++) {
		rgbArr[i] = parseInt(rgbArr[i]).toString(16);
		if (rgbArr[i].length < 2) {
			rgbArr[i] = '0' + rgbArr[i];
		}
	}
	const hexValue = '#' + rgbArr.join('');
	return hexValue;
}