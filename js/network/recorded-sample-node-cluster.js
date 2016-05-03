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

    this.sourceNode.connect(this.moog)
    this.moog.processor.cutoff = 1     // 0 to 1
    this.moog.processor.resonance = 4  // 0 to 4
    this.moog.connect(this.opts.audioOut)
  }

  render () {
    super.render()
  }

}

export default RecordedSampleNodeCluster
