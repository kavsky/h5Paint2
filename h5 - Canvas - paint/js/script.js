

$(function()
{
	// canvas path
	var cnv = $('#canvasPaint')[0].getContext('2d');

	var cnvObj = $('#canvasPaint');		// for jquery reference

	// start draw flag
	var startDraw = false,
		col = "#777",
		rad = 10;

	//var canvas = $('#canvasPaint')[0] ;		// for javascript dom element - canvas
	//var cnv = $('#canvasPaint')[0].getContext('2d');
	//var c = document.getElementById('canvasPaint');
	//var cnv = c.getContext('2d');
	//cnv.fillStyle = "#aaa";
	//cnv.fillText("Hi there", 0,0);
	//cnv.lineWidth = 20;
	//cnv.translate(0.5,0.5)
	//cnv.beginPath();

	// line
	// cnv.moveTo(0,0);
	// cnv.lineTo(300,300);
	// cnv.strokeStyle = "#d0d0d0"
	// cnv.lineCap = "round"
	// cnv.stroke();

	// circle
	// cnv.beginPath();	// is used to start a new drawing, after the last one. 
	// cnv.arc(300,300,100, 0, 2*Math.PI);
	// cnv.strokeStyle = "#ccc";
	// cnv.lineWidth = 40;
	// //cnv.lineJoin = 'round';
	// cnv.stroke();

	// arcto
	// cnv.lineWidth = 10;
	// cnv.strokeStyle = "#000";
	// cnv.beginPath();
	// cnv.moveTo(100,100);
	// //cnv.lineTo(100,100);
	// cnv.arcTo(300,100,300,200,200);
	// //cnv.lineTo(300,300);
	// cnv.stroke();

	// bezier curve
	// cnv.beginPath();
	// cnv.moveTo(100,100);
	// cnv.bezierCurveTo(200,140,180,200,150,240);
	// cnv.strokeStyle="#222";
	// cnv.stroke();

	// gradient curve
	// cnv.beginPath();
	// var grad = cnv.createLinearGradient(0,0,400,0);
	// grad.addColorStop(0,'black');
	// grad.addColorStop(1,'white');
	// cnv.fillStyle = grad;
	// cnv.rect(0,0,400,400);
	// cnv.fill();

	// mouse is held down
	cnvObj.mousedown(
	function(event)
	{
		startDraw = true;
		draw(event);
	})

	// mouse is held up
	cnvObj.mouseup(
	function()
	{
		startDraw = false;
		cnv.beginPath();
	});

	// mouse draw is happening
	cnvObj.mousemove(
	function(event)
	{
		if( startDraw )
		{
			draw(event);
		}
		
	});




	function draw(e)
	{
		// offset positions
		var offsetFix = $('#canvasPaint').offset();
		var offsetFixLeft = offsetFix.left;
		var offsetFixTop = offsetFix.top;
		var leftPoint = e.pageX - offsetFixLeft ;
		var rightPoint = e.pageY - offsetFixTop ;


		// canvas draw
		
		cnv.lineWidth = rad * 2 ;
		cnv.strokeStyle = col ;
		cnv.fillStyle = col ;

		cnv.lineTo(leftPoint,rightPoint);
		cnv.stroke();

		cnv.beginPath();
		cnv.arc( leftPoint,rightPoint,rad,0,2 * Math.PI );
		cnv.fill();
		cnv.beginPath();
		cnv.moveTo(leftPoint,rightPoint);

	}

	sizeSet(3);
	colSet('black');
	BGcolSet('grey');


	function BGcolSet(setCol)
	{
		cnv.rect(0,0,600,600);
		cnv.fillStyle = setCol ;
		cnv.fill();
		cnv.beginPath();
	}


	function colSet(setCol)
	{
		col = setCol ;
	}

	function sizeSet(setVal)
	{
		rad = setVal ;
	}

	$('.clearBtn').click(
	function()
	{
		cnv.clearRect(0,0,600,600);		// clears out the entire canvas
	});

	$('.saveImg').click(
	function()
	{
		var saveFile = $('#canvasPaint')[0].toDataURL();
		//console.log(saveFile);
		window.open(saveFile);
	})

	$('.saveBtn').click(
	function()
	{
		cnv.save();
		alert('save');
	})

	$('.undoBtn').click(
	function()
	{
		cnv.restore();
		alert('undo');
	})


})


	
// #BUG - when the mouse gets out of the canvas window, the mouseup event is not triggered because it is referenced only to the canvas element, not outside that. So, anything happening outside the canvas element will completely go unnoticed by the functions.

// #BUG - undo last step or a series of steps / save and restore

// #BUG - eraser - idea is to paint the canvas with the same color as the canvas background.