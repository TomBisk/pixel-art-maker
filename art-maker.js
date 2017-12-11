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
						
