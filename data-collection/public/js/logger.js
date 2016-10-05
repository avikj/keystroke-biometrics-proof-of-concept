$(function() {
	var timeDiffs = [];
	var prevTime;
	$('#input-field').on('keydown', function(event) {
		var text = $(this).val()
        var key = event.which || event.keyCode || event.charCode;
        if(key == 8 || key == 46 || key == 13) {
        	if(key == 13 && text == 'avikjain') {
        		$.post('/data', { data: timeDiffs })
        	}
        	timeDiffs = [];
        	prevTime = null;
        	$('#input-field').val('');
        } else if(!prevTime) {
        	prevTime = Date.now();
        } else {
        	currTime = Date.now();
        	timeDiffs.push(currTime - prevTime);
        	prevTime = currTime;
        }
    });
});