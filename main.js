Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 100
});
camera = document.getElementById("Cam_view");
Webcam.attach(camera);

function capture_pic() {
    Webcam.snap(function (data_uri) {
        document.getElementById("photo").innerHTML = "<img id='result' src='" + data_uri + "'>"
    });
}
function identify_pic() {
    img = document.getElementById("result");
    classifier.classify(img, gotResult);
}

console.log("ml5 version", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/G8iFYQkEv/model.json", modelLoaded);

function modelLoaded() {
    console.log("Model is loaded");
}

function gotResult(debug, executed) {
    if (debug) {
        console.error(debug);
    }
    else {
        console.log(executed);
        document.getElementById("family_member").innerHTML = executed[0].label;
        document.getElementById("member_accuracy").innerHTML = executed[0].confidence.toFixed(3) * 100 + "%";
    }
}