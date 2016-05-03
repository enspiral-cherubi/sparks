import randomColor from 'randomcolor'
import NodeCluster from './node-cluster.js'
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
    times(opts.nodeClusterCount || 10, this.addCluster.bind(this))
  }

  render () {
    this.nodeClusters.forEach(cluster => cluster.render())
  }

  addCluster () {
    var cluster = new NodeCluster({
      size: this.opts.nodeClusterSize || 3,
      color: randomColor({luminosity: 'random'}),
      scene: this.opts.scene,
      boundingBoxSize: this.opts.boundingBoxSize,
      audioCtx: this.audioCtx,
      audioOut: this.audioOut
    })
    this.nodeClusters.push(cluster)
  }

}

export default Network
