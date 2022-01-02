Prediction_1 = "";

Webcam.set({
width: 350,
height: 300,
image_format: 'png',
png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function Snapshot()
{
    Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML = '<img id="capture_image" src="'+data_uri+'"/>';
    });
}

console.log("ml5 version", ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/i_r8q9Mrq/model.json', modelLoaded);

function modelLoaded()
{
    console.log("Model Loaded");
}

function Speak()
{
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + Prediction_1;
    
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function Check()
{
   img = document.getElementById("capture_image");
   classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
   if (error) {
       console.error(error);
   }
   else  {
       console.log(results);
       document.getElementById("result_emotion_name").innerHTML = results[0].label;
       
       Prediction_1 = results[0].label;
       
       Speak();

       if (results[0].label == "Amazing") {
         document.getElementById("update_emoji").innerHTML = "&#128076;";
       }
       if (results[0].label == "Best") {
        document.getElementById("update_emoji").innerHTML = "&#128077;";
      }
       if (results[0].label == "Victory") {
        document.getElementById("update_emoji").innerHTML = "&#9996;";
      }
   }
}