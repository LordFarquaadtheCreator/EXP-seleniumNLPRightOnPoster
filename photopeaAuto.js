function addText(){ 
    var userInput = prompt("Enter Title:", "");
    
    if (userInput !== null) {
        // Create a text layer
        var textLayer = newDoc.artLayers.add();
        textLayer.name = "Title";
        textLayer.kind = LayerKind.TEXT;
        textLayer.textItem.size = 73;
        textLayer.textItem.font = "JollyRoger";

        // Set the initial size of the text box
        var initialTextWidth = 750;
        var initialTextHeight = 400;
        textLayer.width = initialTextWidth;
        textLayer.height = initialTextHeight;
        
        // Position the text layer
        textLayer.textItem.position = [200, newDoc.height - 200]; // Bottom left corner

        // Set the text contents
        textLayer.textItem.contents = userInput;

        // Adjust the size of the text layer
        var newTextWidth = 750; // Width of the text field
        var newTextHeight = 300; // Height of the text field
        var textBounds = textLayer.bounds;
        var textWidth = textBounds[2] - textBounds[0];
        var textHeight = textBounds[1] - textBounds[3];

        // Calculate scaling factors for width and height
        var widthScaleFactor = newTextWidth / textWidth;
        var heightScaleFactor = newTextHeight / textHeight;

        textLayer.resize(widthScaleFactor * 100, heightScaleFactor * 100);

        // Adjust the position of the text layer to fit the new size
        textLayer.textItem.position = [200, newDoc.height - 200]; // Bottom left corner
    }else{alert("You gotta input something man"); addText();}
}

// Create a new document
// var newDoc = app.documents.add(1000, 1000, 100, "RightOn! Doc", NewDocumentMode.RGB);

// Load the "logo" image -- WORKS
var newDoc = app.open("https://i.imgur.com/3ES9YRD.png");

// Duplicate the logo image onto a new doc to paste back into main doc
// if (imageDoc) {
//     // Duplicate the image layer into the main document
//     var imageLayer = imageDoc.artLayers[0];
//     var duplicatedLayer = imageLayer.duplicate(newDoc, ElementPlacement.PLACEATBEGINNING);
//     imageLayer.name = "Logo";

//     // Close the opened image document without saving changes
//     imageDoc.close(SaveOptions.DONOTSAVECHANGES);
// } else {alert("Image from URL could not be opened");}


// Prompt the user for text input
addText();

// Create a rounded rectangle layer
var rectLayer = newDoc.artLayers.add();
rectLayer.kind = LayerKind.SHAPE;
var rectShape = rectLayer.pathItems.add();
var rectTopLeft = [200, newDoc.height - 200]; // Bottom left corner
var rectWidth = textLayer.bounds[2] - textLayer.bounds[0];
var rectHeight = textLayer.bounds[1] - textLayer.bounds[3];
rectShape.addRoundedRectangle([rectTopLeft, [rectTopLeft[0] + rectWidth, rectTopLeft[1]], [rectTopLeft[0] + rectWidth, rectTopLeft[1] - rectHeight], [rectTopLeft[0], rectTopLeft[1] - rectHeight]], 20);
rectLayer.blendMode = BlendMode.MULTIPLY;
textLayer.name = "text background";


// main photo 
// Create a new document to paste the clipboard contents
var tempDoc = app.documents.add(1000, 1000, 300, "RightOn! Pasted", NewDocumentMode.RGB);

// Paste the clipboard contents into the temporary document
app.activeDocument = tempDoc;
tempDoc.paste();

// Resize the pasted layer to fit the canvas
var pastedLayer = tempDoc.artLayers[0];
pastedLayer.resize(newDoc.width, newDoc.height);

// Create a new document for the mask
var maskDoc = app.documents.add(1000, 1000, 300, "RightOn! Mask", NewDocumentMode.RGB);

// Create the mask shape (centered square)
var maskShape = maskDoc.artLayers.add();
var maskSize = Math.min(newDoc.width, newDoc.height) - 300;
maskShape.bounds = [500 - maskSize / 2, 500 + maskSize / 2, 500 + maskSize / 2, 500 - maskSize / 2];

// Apply the mask to the pasted layer
pastedLayer = pastedLayer.duplicate(newDoc);
pastedLayer = pastedLayer.move(newDoc.artLayers[0], ElementPlacement.PLACEATEND);
pastedLayer.applyLayerMask();
pastedLayer.name = "main image";

// Close the mask document without saving
maskDoc.close(SaveOptions.DONOTSAVECHANGES);

// Create a brightness/contrast adjustment layer
var adjustmentLayer = newDoc.artLayers.add();
var brightnessContrast = adjustmentLayer.adjustmentLayers.add();
brightnessContrast.name = "Brightness/Contrast";
brightnessContrast.brightnessContrast.adjustment.brightness = -69;


// Duplicate the pasted layer as the fifth layer
var fifthLayer = pastedLayer.duplicate(newDoc, ElementPlacement.PLACEATEND);
fifthLayer.name = "background image";
fifthLayer.applyGaussianBlur(7.2);

// Close the temporary document without saving
// tempDoc.close(SaveOptions.DONOTSAVECHANGES);
