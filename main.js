song1="";
song2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;
song1status="";
song2status="";

function preload() {
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}

function setup() {
    canvas=createCanvas(600, 500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide()

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);

    song1status=song1.isPlaying();
    song2status=song2.isPlaying();

    fill("#FF0000");
    stroke("#FF0000");

    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        if (song1status==false) {
            song1.play();
            document.getElementById("song").innerHTML="playing harry potter song";
        }
     }

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        if (song2status==false) {
            song2.play();
            document.getElementById("song").innerHTML="playing peter pan song";
        }
     }
}

function modelLoaded() {
    console.log("Posenet is initialized");
}

function gotPoses(results) {
    if (results.length>0) {
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log("score right wrist = " + scoreRightWrist);
        console.log("score left wrist = " + scoreLeftWrist);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX + " Left Wrist Y = " + leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightWristX + " Right Wrist Y = " + rightWristY);
    }
    }

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}