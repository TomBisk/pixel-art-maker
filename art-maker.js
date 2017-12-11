// function to create pixel navas
function makeGrid() {
	let gridWidth = $("#input-width").val();
	let gridHeight = $('#input-height').val();
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
						
// function to paint the grid cells with selected color
$('table').on('click', 'td', function() {
  	let paintColor = $('#color-picker').val();
  	let cellColor = $(this).css('background-color');
  	if (cellColor === 'rgb(255, 255, 255)') {
	  $(this).css({'background-color': paintColor});
	} else if (cellColor !== paintColor) {
	  $(this).css({'background-color': '#fff'});
	} else {
	  $(this).css({'background-color': paintColor});
	}
});
