import randomColor from 'randomcolor'
import NodeCluster from './node-cluster.js'
import range from 'lodash.range'

class Network {

  constructor (opts) {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)()

    this.audioOut = this.audioCtx.createGain()
    this.audioOut.gain.value = 0.01
    this.audioOut.connect(this.audioCtx.destination)

    this.scene = opts.scene
    this.boundingBoxSize = opts.boundingBoxSize
    this.nodeClusterCount = opts.nodeClusterCount || 10
    this.nodeClusterSize = opts.nodeClusterSize || 3
    this.nodeClusters = range(this.nodeClusterCount).map(() => {
      return new NodeCluster({
        size: this.nodeClusterSize,
        color: randomColor(),
        scene: this.scene,
        boundingBoxSize: this.boundingBoxSize,
        audioCtx: this.audioCtx,
        audioOut: this.audioOut
      })
    })
  }

  render () {
    this.nodeClusters.forEach(cluster => cluster.render())
  }

}

export default Network
