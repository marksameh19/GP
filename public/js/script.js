var imageCapture,
  video = document.querySelector("video"),
  canvas = document.querySelector("canvas"),
  photo = document.querySelector("img");
var width = 320; // We will scale the photo width to this
var height = 0; // This will be computed based on the input stream
var streaming = false;

navigator.mediaDevices.getUserMedia({ video: true }).then((mediaStream) => {
  video.srcObject = mediaStream;
  console.log(mediaStream.getVideoTracks()[0].getCapabilities());
  video.play();
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
  setInterval(() => {
    takePicture();
  }, 200);
  // const track = mediaStream.getVideoTracks()[0];
  // imageCapture = new ImageCapture(track);

  // return imageCapture;
});
// .then((image) => {
//   console.log(image);
//   // var img = document.createElement("img");
//   // img.src = image;
//   // document.body.appendChild(img);
// });
var takePicture = () => {
  var context = canvas.getContext("2d");
  if (width && height) {
    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);
    var data = canvas.toDataURL("image/png");
    photo.setAttribute("src", data);
  } else {
    clearphoto();
  }
};
function clearphoto() {
  var context = canvas.getContext("2d");
  context.fillStyle = "#AAA";
  context.fillRect(0, 0, canvas.width, canvas.height);

  var data = canvas.toDataURL("image/png");
  photo.setAttribute("src", data);
}
