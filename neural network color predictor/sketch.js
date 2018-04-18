let r,g,b;

let which = "black";

function setup() {
    createCanvas(640, 360);
    noLoop();
    brain = new NeuralNetwork(3,3,2);
    pickColor();
}

function pickColor() {
    r = random(255);
    g = random(255);
    b = random(255);
    redraw();
}

function mousePressed() {
    
    let targets;
    if(mouseX > width / 2){
        targets = [0,1];
    } else{
        targets = [1,0];
    }
    let inputs = [r/255, g/255, b/255];
    brain.train(inputs, targets);
    pickColor();

}

function colorPredictor(r,g,b){
    // if(r+g+b > 300){
    //     return "black";
    // } else {
    //     return "white";
    // }

    let inputs = [r/255, g/255, b/255];
    let outputs = brain.predict(inputs);
    console.log(outputs);

    if (outputs[0] > outputs[1]) {
        return "black";
    } else {
        return "white";
    }
}

function draw() {
    background(r, g, b);
    strokeWeight(4);
    stroke(255);
    line(width/2 , 0 , width/2, height);    
    textSize(64);
    noStroke();
    fill(0);
    textAlign(CENTER, CENTER);
    text("black", 150, 100);
    fill(255);
    text("white", 450 , 100);

    let which = colorPredictor(r,g,b);
    if(which === "black"){
        fill(0);
        ellipse (150, 200 , 60);
    } else {
        fill(255);
        ellipse (450, 200 , 60);
    }
}