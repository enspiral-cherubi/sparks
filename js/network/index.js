import randomColor from 'randomcolor'
import SineWaveNodeCluster from './sine-wave-node-cluster.js'
import RecordedSampleNodeCluster from './recorded-sample-node-cluster.js'
import range from 'lodash.range'
import times from 'times-loop'

class Network {

  constructor (opts = {}) {
    this.opts = opts
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    this.audioOut = this.audioCtx.createGain()
    this.audioOut.gain.value = 0.3
    this.audioOut.connect(this.audioCtx.destination)

    this.nodeClusters = []
    times(opts.nodeClusterCount || 10, () => {
      this.addCluster()
    })
  }

  render () {
    this.nodeClusters.forEach(cluster => cluster.render())
  }

  addCluster (type = 'sine') {
    var params = {
      size: this.opts.nodeClusterSize || 3,
      color: randomColor({luminosity: 'random'}),
      scene: this.opts.scene,
      boundingBoxSize: this.opts.boundingBoxSize,
      audioCtx: this.audioCtx,
      audioOut: this.audioOut
    }

    if (type === 'sine') {
      var cluster = new SineWaveNodeCluster(params)
    } else {
      var cluster = new RecordedSampleNodeCluster(params)
    }

    this.nodeClusters.push(cluster)
  }

  clear () {
    this.nodeClusters.forEach(nodeCluster => nodeCluster.remove())
    this.nodeClusters = []
  }

}

export default Network
