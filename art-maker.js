// function to create pixel canvas
function makeGrid() {
	const gridWidth = $("#input-width").val();
	const gridHeight = $('#input-height').val();
	$('#pixel-canvas').children().remove();
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
		$('.canvas h3').css({'background-color': pickedColor});
		const rgbValue = $('.canvas h3').css('background-color');
		return rgbValue;
	}
  	if (cellColor === hexToRgb()) {
		$(this).css({'background-color': '#fff'});
	} 	else {
	  	$(this).css({'background-color': pickedColor});
	}
}
$('table').on('click', 'td', paintGrid);
//$('table').on('mousedown', 'td', paintGrid);
