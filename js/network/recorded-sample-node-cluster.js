import NodeCluster from './node-cluster.js'
import Tuna from 'tunajs'

class RecordedSampleNodeCluster extends NodeCluster {

  constructor (opts) {
    super(opts)

    // pass in an audio node
    this.sourceNode = opts.recordedSampleNode
    this.sourceNode.start()

    var tuna = new Tuna(opts.audioCtx)

    this.moog = new tuna.MoogFilter({
      bufferSize: 4096  //256 to 16384
    })

    this.sourceNode.connect(this.moog)
    this.moog.connect(this.opts.audioOut)
  }

  render () {
    super.render()
  }

}

export default RecordedSampleNodeCluster
