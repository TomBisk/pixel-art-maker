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
  	//$('td').css({"background-color": "#fff"});
	}
  	event.preventDefault();
  	return;
}

$('#size-picker').submit(function(event) {
	makeGrid();
});
						
// function to paint the grid cells with selected color


function paintGrid() {
  	const painColor = $('#color-picker').val();
	
  	let cellColor = $(this).css('background-color');
	
	function colTransform() {
		$('.canvas h3').css({'background-color': painColor});
		let paintColor = $('.canvas h3').css('background-color');
		$('.canvas h3').text(paintColor);
		return paintColor;
	}
  	if (cellColor === 'rgb(255, 255, 255)') {
	  $(this).css({'background-color': painColor});
	} else if (cellColor === colTransform()) {
	  $(this).css({'background-color': '#fff'});
	} else {
	  $(this).css({'background-color': painColor});
	}
}
$('table').on('click', 'td', paintGrid);