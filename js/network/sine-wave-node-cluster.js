import NodeCluster from './node-cluster.js'
import Tuna from 'tunajs'
import LogScale from 'log-scale'
var logScale = new LogScale(20,5000)

class SineWaveNodeCluster extends NodeCluster {

  constructor (opts) {
    super(opts)

    this.sourceNode = opts.audioCtx.createOscillator()
    this.sourceNode.type = 'sine'
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

    var freq = this.links[0].distance()
    var cutoff = this.links[1].distance()
    var resonance = this.links[2].distance()

    this.sourceNode.frequency.value = logScale.linearToLogarithmic(freq)  // 20 to 5000hz (logarithmic scale)
    this.moog.processor.cutoff = cutoff            // 0 to 1
    this.moog.processor.resonance = resonance * 4  // 0 to 4
  }

}

export default SineWaveNodeCluster
