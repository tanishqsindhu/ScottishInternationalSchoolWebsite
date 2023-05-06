var canvas = document.getElementById('canvas')
let string = document.getElementById('qr').value
QRCode.toCanvas(canvas, string, function (error) {
  if (error) console.error(error)
  console.log('success!');
})
