
// http://delphic.me.uk/webgltext.html
function getPowerOfTwo (value) 
{
	var pow = 1;
	while (pow < value) 
	{
		pow *= 2;
	}
	return pow;
}

// http://delphic.me.uk/webgltext.html
function createMultilineText(ctx, textToWrite, maxWidth, text) 
{
	textToWrite = textToWrite.replace("\n"," ");
	var currentText = textToWrite;
	var futureText;
	var subWidth = 0;
	var maxLineWidth = 0;
	
	var wordArray = textToWrite.split(" ");
	var wordsInCurrent, wordArrayLength;
	wordsInCurrent = wordArrayLength = wordArray.length;
	
	// Reduce currentText until it is less than maxWidth or is a single word
	// futureText var keeps track of text not yet written to a text line
	while (measureText(ctx, currentText) > maxWidth && wordsInCurrent > 1) {
		wordsInCurrent--;
		var linebreak = false;
		
		currentText = futureText = "";
		for(var i = 0; i < wordArrayLength; i++) {
			if (i < wordsInCurrent) {
				currentText += wordArray[i];
				if (i+1 < wordsInCurrent) { currentText += " "; }
			}
			else {
				futureText += wordArray[i];
				if(i+1 < wordArrayLength) { futureText += " "; }
			}
		}
	}
	text.push(currentText); // Write this line of text to the array
	maxLineWidth = measureText(ctx, currentText);
	
	// If there is any text left to be written call the function again
	if(futureText) {
		subWidth = createMultilineText(ctx, futureText, maxWidth, text);
		if (subWidth > maxLineWidth) { 
			maxLineWidth = subWidth;
		}
	}
	
	// Return the maximum line width
	return maxLineWidth;
}

// http://delphic.me.uk/webgltext.html
function drawText ()
{
	var text = "Coucou";
	var textSize = 12;

	this.canvas = document.getElementById('canvas');
	this.context = this.canvas.getContext('2d');
	this.context.font = textSize + "px monospace";

	this.canvas.width = getPowerOfTwo(this.context.measureText(text).width);
	this.canvas.height = getPowerOfTwo(2 * textSize);

	this.context.fillStyle = "#333333";
	this.context.textAlign = "center";
	this.context.textBaseline = "middle";
	this.context.font = textSize + "px monospace";
	this.context.fillText(text, this.canvas.width / 2, this.canvas.height / 2);	
}

