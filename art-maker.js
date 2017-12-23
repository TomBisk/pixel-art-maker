// function to create pixel canvas
function makeGrid() {
	const gridWidth = $("#input-width").val();
	const gridHeight = $('#input-height').val();
	$('#pixel-canvas').children().remove();
	if (gridWidth + gridHeight > 1) {
		$('.grid-options input').removeAttr('disabled');
	} else {
		$('.grid-options input').attr('disabled', 'disabled');
	}
	for (let i = 0; i < gridHeight; i++) {
		$('#pixel-canvas').append('<tr></tr>');
		for ( let j = 0; j < gridWidth; j++) {
		  $('tr:last').append('<td></td>');
		}
  	$('td').css({"background-color": "#fff", "border-style": bdStyle, "border-color": bdColor});
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

$('table').on('click', 'td', paintGrid);
$('input.grid-on').on('click', gridOf);
//$('table').on('mousedown', 'td', paintGrid);


// flag to check on/off in gridOf function
let gridOfFlag = true;
//function gridOf, to on/of grid visibility
function gridOf() {
	if (gridOfFlag === true) {
		$(this).css({'background-color': '#4a4949'}).val('grid off');
		$('td').css({'border-style': 'none'});
		$('.grid-style, .grid-color').attr('disabled', 'disabled');
		gridOfFlag = false;
	} else {
		$(this).css({'background-color': '' }).val('grid on');
		$('td').css({'border-style': bdStyle});
		$('.grid-style, .grid-color').removeAttr('disabled');
		gridOfFlag = true;
	}
}
$('input.grid-style').on('click', gridStyle);
// variable to store default or setted gridStyle and to restore it when the grid is off and on again
let bdStyle = 'solid';
// function gridStyle(), to change canvas grid-lines style
function gridStyle() {
	const style = $('td').css('border-style');
	switch(style) {
		case "solid":
		$('td').css({'border-style': 'dashed'});
		bdStyle = 'dashed'
		break;
		case "dashed":
		$('td').css({'border-style': 'dotted'});
		bdStyle = 'dotted'
		break;
		case "dotted":
		$('td').css({'border-style': 'solid'});
		bdStyle = 'solid'
	}
}

$('input.grid-color').on('change', gridColor);
// variable to set default and store setted color of grid-lines
let bdColor = '#000';
// function gridColor to change color of canvas grid-lines
function gridColor() {
	bdColor = $('.grid-color').val();
	$('td').css({'border-color': bdColor});
}