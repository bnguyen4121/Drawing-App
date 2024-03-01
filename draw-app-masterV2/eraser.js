// eraser tool
function Eraser() {
    this.name = "eraser";
    this.icon = "assets/eraser.png";

    // create an array for remembering everything
    const history = [];
    // create a variable to keep track of whether or not the erase stroke code should be running
    let eraseStrokeKeyDetection = 0, eraseColorKeyDetection = 0;
    // create a variable to hold the initial value of the slider. this will change in populate options when the slider is used
    let sliderValue = 1;

    this.draw = function() {
        if (eraseStrokeKeyDetection == 0 && eraseColorKeyDetection == 0 && mouseIsPressed) {
            strokeWeight(sliderValue);
            erase();
            line(pmouseX, pmouseY, mouseX, mouseY);
            noErase();
        } else if (eraseStrokeKeyDetection == 1 && mouseIsPressed){
            eraseStroke(mouseX, mouseY);
        } else if (eraseColorKeyDetection == 1 && mouseIsPressed){
            eraseColor(mouseX, mouseY);
        }
    }

    this.unselectTool = function() {
		//clear options
		select(".options").html("");

        // if this tool is unselected deactivate the erase stroke and erase color buttons
		eraseStrokeKeyDetection = 0;
        eraseColorKeyDetection = 0;
	};

    this.populateOptions = function() {
        // creates button option for erasing entire stroke and a slider for controlling eraser size
        select(".options").html("<div><button id='EraseStrokeOption'>Erase Stroke</button>" 
            + "<button id='EraseColorOption'>Erase Color</button></div>" 
            + "<div><input type='range' id='EraseStrokeSlider' min='1' max='20' value='1'></div>");

        // if the slider is used, update sliderValue with the new value
        select("#EraseStrokeSlider").input(function() {
            sliderValue = this.value();
        });

        // this line of code enables the slider position to be portrayed accurately
        select("#EraseStrokeSlider").value(sliderValue);

        // if the slider is selected or changed, the erase stroke and erase color code will be prevented from running
        select("#EraseStrokeSlider").changed(function() {
            eraseStrokeKeyDetection = 0;
            eraseColorKeyDetection = 0;
        });

        // if the erase stroke button is clicked, run the code
        select("#EraseStrokeOption").mouseClicked(function(){
            eraseStrokeKeyDetection = 1;
            eraseColorKeyDetection = 0;
        });

        // if the erase color button is clicked, run the code
        select("#EraseColorOption").mouseClicked(function(){
            eraseColorKeyDetection = 1;
            eraseStrokeKeyDetection = 0;
        });
	};


    let eraseStroke = function(x, y){
        loadPixels();
        const spAddress = getPixelAddress(x,y);  // spAddress is the address of the pixel where your mouse is
        const startColor = getColor(spAddress);  // start color is the color where your mouse is

 
        //const checked = [];
        const toFill = [];
        toFill.push(spAddress);
        const white = color(255,255,255);


        while(toFill.length){
            const p = toFill.pop();
            const pColor = getColor(p); //getColor(toFill.pop())
            const ns = getNeighbors(p);

            // if the pixel at your mouse location is 
            if(red(pColor) >= red(startColor) - 250 && red(pColor) <= red(startColor) + 250
                && green(pColor) >= green(startColor) - 250 && green(pColor) <= green(startColor) + 250
                && blue(pColor) >= blue(startColor) - 250 && blue(pColor) <= blue(startColor) + 250){

                // if the pixel at your mouse location is (255,255,255) then don't run any code because you're hovering over white
                if(red(pColor) === red(white) && green(pColor) === green(white) && blue(pColor) === blue(white)){
                    // do nothing
                    
                } else {
                
                    setColor(p,255,255,255);
                    
                    ns.forEach(n => {
                        if(n > 0 && n < pixels.length){
                            toFill.push(n);
                        }
                    });
                }
            }
        
        }
        updatePixels();
    }

    function eraseColor(x, y){
        loadPixels();
        const spAddress = getPixelAddress(x,y);  // spAddress is the address of the pixel where your mouse is
        const startColor = getColor(spAddress);  // start color is the color where your mouse is
 
        const toFill = [];
        toFill.push(spAddress);
        const white = color(255,255,255);

        while(toFill.length){
            const p = toFill.pop();
            const pColor = getColor(p); //getColor(toFill.pop())
                for (var j=0; j<pixels.length; j+=4){
                    const pixelColor = color(pixels[j], pixels[j+1], pixels[j+2]);
                    if(red(pColor) === red(pixelColor) && green(pColor) === green(pixelColor) && blue(pColor) === blue(pixelColor)){
                        setColor(j,255,255,255);
                    }
                }
        }
        updatePixels();
    }

    // gets x and y coordinate of the pixel
    function getPixelAddress(x,y){
        // all the y coordinate above the pixel multiplied by the width of the canvas, add the x coordinate of the pixel and multiplied by rgba(4)
        return (y*width+x)*4;
    }

    function getColor(pLocation){
        return color(pixels[pLocation],pixels[pLocation+1],pixels[pLocation+2]);
        // color(r,g,b)
    }

    function setColor(pLocation,r,g,b){
        pixels[pLocation] = r;
        pixels[pLocation+1] = g;
        pixels[pLocation+2] = b;
    }

    function getNeighbors(p){
        const ns = [] //ns = neighbors

        // west
        ns.push(p-4);
        // east
        ns.push(p+4);
        // north
        ns.push(p-(width*4));
        // south
        ns.push(p+(width*4));
        // northwest
        ns.push((p-(width*4)) - 4);
        // northeast
        ns.push((p-(width*4)) + 4);
        // southwest
        ns.push((p+(width*4)) - 4);
        // southeast
        ns.push((p+(width*4)) + 4);

        return ns;
    }

}
    
