import engine from './engine.js'
import RecordMic from 'recordmic'
import $ from 'jquery'

engine.bindEventListeners()
engine.start()

var audioCtx = new (window.AudioContext || window.webkitAudioContext)()
navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
  var microphone = audioCtx.createMediaStreamSource(stream)
  microphone.connect(audioCtx.destination)
})

var recordMic = new RecordMic({}, function () {
  console.log('ready to record!')
})

$('#start-recording').click(() => {
  recordMic.clear()
  recordMic.start()
})

$('#stop-recording').click(() => {
  recordMic.stop()
  var monoData = recordMic.getMonoData()
  console.log(monoData)
  var newSource = audioCtx.createBufferSource()
  var newBuffer = audioCtx.createBuffer(2, monoData.length, audioCtx.sampleRate)
  newBuffer.getChannelData(0).set(monoData)
  newBuffer.getChannelData(1).set(monoData)
  newSource.buffer = newBuffer

  newSource.connect(audioCtx.destination)
  newSource.loop = true
  newSource.start()
})

$('#replay-recording').click(() => {

})
