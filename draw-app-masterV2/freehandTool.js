function FreehandTool(){
	//set an icon and a name for the object
	this.icon = "assets/freehand.jpg";
	this.name = "freehand";

	//to smoothly draw we'll draw a line from the previous mouse location
	//to the current mouse location. The following values store
	//the locations from the last frame. They are -1 to start with because
	//we haven't started drawing yet.
	var previousMouseX = -1;
	var previousMouseY = -1;

	let sliderValue = 1;
	const history = [];
	this.draw = function(){
		noSmooth();
		//if the mouse is pressed
		if(mouseIsPressed){
			history.push(pixels);
			//check if they previousX and Y are -1. set them to the current
			//mouse X and Y if they are.
			if (previousMouseX == -1){
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
			//if we already have values for previousX and Y we can draw a line from 
			//there to the current mouse location
			else{
				line(previousMouseX, previousMouseY, mouseX, mouseY);
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}

			// remember stroke weight
			strokeWeight(sliderValue);
		}
		//if the user has released the mouse we want to set the previousMouse values 
		//back to -1.
		//try and comment out these lines and see what happens!
		else{
			previousMouseX = -1;
			previousMouseY = -1;
		}
	};

	this.unselectTool = function() {
		//clear options
		select(".options").html("");
	};

	this.populateOptions = function() {
        // creates a slider for controlling stroke weight
        select(".options").html("<input type='range' id='FreeHandStrokeSlider' min='1' max='20' value='1'>");

        // if the slider is used, update sliderValue with the new value
        select("#FreeHandStrokeSlider").input(function() {
            sliderValue = this.value();
        });

        // this line of code enables the slider position to be portrayed accurately
        select("#FreeHandStrokeSlider").value(sliderValue);
	};
		
}