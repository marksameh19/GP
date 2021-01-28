var width = 350;
var height = 0;
var streaming = false;
var video = document.querySelector("video");
var canvas = document.querySelector("canvas");
var photo = document.querySelector("img");
var startbutton = document.querySelector("button");

const startVideo = () => {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then(function (stream) {
      video.srcObject = stream;
      video.play();
    })
    .catch(function (err) {
      console.log("An error occurred: " + err);
    });
  video.addEventListener(
    "canplay",
    function (ev) {
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth / width);

        video.setAttribute("width", width);
        video.setAttribute("height", height);
        canvas.setAttribute("width", width);
        canvas.setAttribute("height", height);
        streaming = true;
      }
    },
    false
  );
};

Promise.all([
  faceapi.nets.ssdMobilenetv1.loadFromUri("./models"),
  faceapi.nets.tinyFaceDetector.loadFromUri("./models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("./models"),
  faceapi.nets.faceExpressionNet.loadFromUri("./models"),
]).then(startVideo);

async function updateResults(image) {
  // if (!isFaceDetectionModelLoaded()) {
  //   return;
  // }
  const detections = await faceapi.detectAllFaces(image);
  const faceImages = await faceapi.extractFaces(image, detections);
  console.log(faceImages);
  var data = faceImages[0].toDataURL();
  photo.setAttribute("src", data);
}

async function run(image) {
  // load face detection model
  //await changeFaceDetector(selectedFaceDetector);

  // start processing image
  updateResults(image);
}

startbutton.addEventListener(
  "click",
  function (ev) {
    takepicture();
    ev.preventDefault();
  },
  false
);

function takepicture() {
  var context = canvas.getContext("2d");
  if (width && height) {
    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);
    var imgData = context.getImageData(0, 0, width, height);
    json = JSON.stringify(imgData);

    var data = canvas.toDataURL();
    photo.setAttribute("src", data);
    run(photo);
    // let xhr = new XMLHttpRequest();

    // xhr.onreadystatechange = function () {
    //   if (xhr.readyState === 4 && xhr.status === 200) {
    //     // Print received data from server
    //     result.innerHTML = this.responseText;
    //   }
    // };
    // data = JSON.stringify({ data: data });
    // xhr.send(data);
  }
}
// function saveFile(strData, fileType, fileName = "name") {
//   // document.location.href = strData;
//   let saveLink = document.createElement("a");
//   // download file name
//   saveLink.download = fileName + "." + fileType;
//   // download file data
//   saveLink.href = strData;
//   // start download
//   saveLink.click();
// }
