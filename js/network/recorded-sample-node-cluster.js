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

    this.chorus = new tuna.Chorus({
      rate: 0.01,         //0.01 to 8+
      feedback: 0.8,     //0 to 1+
      delay: 1,     //0 to 1
      bypass: 0          //the value 1 starts the effect as bypassed, 0 or 1
    })

    this.bitcrusher = new tuna.Bitcrusher({
      bits: 8,          //1 to 16
      normfreq: 1,    //0 to 1
      bufferSize: 4096  //256 to 16384
    })

    this.sourceNode.connect(this.moog)
    this.moog.connect(this.chorus)
    this.chorus.connect(this.bitcrusher)
    this.bitcrusher.connect(this.opts.audioOut)
  }

  render () {
    super.render()

    var cutoff = this.links[0].distance()
    var resonance = this.links[1].distance() * 4

    // var detune = this.links[2].distance() * 1200 - 1200
    var bitcrusherNormfreq = this.links[2].distance()

    var chorusRate = this.links[3].distance() * 8
    var chorusFeedback = this.links[4].distance()
    var chorusDelay = this.links[5].distance()

    // console.log(`cutoff: ${cutoff.toFixed(2)} | resonance: ${resonance.toFixed(2)} | bitcrusherNormfreq: ${bitcrusherNormfreq.toFixed(2)} | chorusRate: ${chorusRate.toFixed(2)} | chorusFeedback: ${chorusFeedback.toFixed(2)} | chorusDelay: ${chorusDelay.toFixed(2)} | `)

    this.moog.processor.cutoff = cutoff            // 0 to 1
    this.moog.processor.resonance = resonance

    // this.sourceNode.detune.value = detune // -1200 to 1200
    this.bitcrusher.processor.normFreq = bitcrusherNormfreq // 0 to 1

    this.chorus._rate = chorusRate
    this.chorus._feedback = chorusFeedback
    this.chorus._delay = chorusDelay
  }

}

export default RecordedSampleNodeCluster
