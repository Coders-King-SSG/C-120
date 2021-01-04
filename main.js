function preload() {

}

function setup() {
    canvas = createCanvas(400, 300);
    canvas.parent("canvas_div");
    video = createCapture(VIDEO);
    video.hide();
    classifier = ml5.imageClassifier("MobileNet", modelLoaded);
}

function draw() {
    image(video, 0,0, 400, 300);
    classifier.classify(video, gotResults);
}

function modelLoaded() {
    console.log("ML5 " + ml5.version + " is initialized.");
}

function gotResults(error, results) {
    if (error) {
        console.info(error)
    } else {
        console.log(results);
        document.getElementById('accuracy').innerHTML = round(results[0].confidence);
        for (let i = 0; i < 100; i++) {
            str = results[0].label;
            chr = str.charAt(i);
            if (chr ==",") {
                document.getElementById('object_name').innerHTML = make_word(str, i);
                break;
            }
        }
    }
}

function make_word(string, end_letter) {
    return string.substring(0, end_letter);
}