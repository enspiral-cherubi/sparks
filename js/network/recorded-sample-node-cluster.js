import NodeCluster from './node-cluster.js'
import Tuna from 'tunajs'

class RecordedSampleNodeCluster extends NodeCluster {

  constructor (monoData, opts) {
    super(opts)

    this.sourceNode = opts.audioCtx.createBufferSource()
    var newBuffer = opts.audioCtx.createBuffer(2, monoData.length, opts.audioCtx.sampleRate)
    newBuffer.getChannelData(0).set(monoData)
    newBuffer.getChannelData(1).set(monoData)
    this.sourceNode.buffer = newBuffer
    this.sourceNode.loop = true
    this.sourceNode.start()

    var tuna = new Tuna(opts.audioCtx)

    this.moog = new tuna.MoogFilter({
      bufferSize: 4096  //256 to 16384
    })

    this.moog.processor.resonance = 4

    // this.chorus = new tuna.Chorus({
    //   rate: 0.01,         //0.01 to 8+
    //   feedback: 0.8,     //0 to 1+
    //   delay: 1,     //0 to 1
    //   bypass: 0          //the value 1 starts the effect as bypassed, 0 or 1
    // })

    this.pingPongDelay = new tuna.PingPongDelay({
      wetLevel: 0.5, //0 to 1
      feedback: 0.5, //0 to 1
      delayTimeLeft: 150, //1 to 10000 (milliseconds)
      delayTimeRight: 200 //1 to 10000 (milliseconds)
    })

    this.sourceNode.connect(this.moog)
    this.moog.connect(this.pingPongDelay)
    this.pingPongDelay.connect(this.opts.audioOut)
  }

  render () {
    super.render()

    var cutoff = this.links[0].distance()
    var resonance = this.links[1].distance() * 4
    var delayWetLevel = this.links[2].distance()
    var delayFeedback = this.links[3].distance()
    var delayTimeRight = this.links[4].distance() * 10000
    var delayTimeLeft = this.links[5].distance() * 10000

    // console.log(`cutoff: ${cutoff.toFixed(2)} | resonance: ${resonance.toFixed(2)} | delayWetLevel: ${delayWetLevel.toFixed(2)} | delayFeedback: ${delayFeedback.toFixed(2)} | delayTimeRight: ${delayTimeRight.toFixed(2)} | delayTimeLeft: ${delayTimeLeft.toFixed(2)}`)

    this.moog.processor.cutoff = cutoff            // 0 to 1
    this.moog.processor.resonance = resonance
    this.pingPongDelay.wetLevel.gain.value = delayWetLevel.toFixed(2)
    this.pingPongDelay.feedbackLevel.gain.value = delayFeedback
    this.pingPongDelay._delayTimeRight = delayTimeRight
    this.pingPongDelay._delayTimeLeft = delayTimeLeft

  }

}

export default RecordedSampleNodeCluster
