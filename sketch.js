var Ballon,ballonimg;
var bg, bgimg;
var dataBase;
var position;

function preload(){
    ballonimg = loadImage("Hot Air Ballon-02.png");
    bgimg = loadImage("Hot Air Ballon-01.png")
}

function setup(){
    dataBase=firebase.database()
    createCanvas(800,650);
    ballon = createSprite(250,250,10,10);
    ballon.addImage (ballonimg);
    ballon.scale=0.7
    var ballonposition=dataBase.ref("ball/position");
    ballonposition.on("value",readPosition,showError)
}

function draw(){
    background(bgimg);
    textSize(25);
    text("NOTE: Press up and down key",350,125)
    if(position!==undefined){
        if(keyDown(LEFT_ARROW)){
            writePosition(-1,0);          
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-1);
            ballon.scale = 0.4;
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+1);
            ballon.scale = 0.8;
        }
        drawSprites();
    }
}

function writePosition(x,y){
    dataBase.ref("ball/position").set({
        x:position.x+x,
        y:position.y+y
    })
}
function readPosition(data){
    position=data.val()
    ballon.x=position.x;
    ballon.y=position.y;
}
function showError(){
    console.log("Error");
}
