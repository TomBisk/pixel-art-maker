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
  	$('td').css({"background-color": "#fff"});
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
		$('td').css({'border': 'none'});
		$('.grid-style, .grid-color').attr('disabled', 'disabled');
		gridOfFlag = false;
	} else {
		$(this).css({'background-color': '' }).val('grid on');
		$('td').css({'border': ''});
		$('.grid-style, .grid-color').removeAttr('disabled');
		gridOfFlag = true;
	}
}

