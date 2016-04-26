import randomColor from 'randomcolor'
import NodeCluster from './node-cluster.js'
import range from 'lodash.range'

class Network {

  constructor (opts) {
    this.scene = opts.scene
    this.boundingBoxSize = opts.boundingBoxSize
    this.nodeClusterCount = opts.nodeClusterCount || 10
    this.nodeClusterSize = opts.nodeClusterSize || 3
    console.log(new Array(this.nodeClusterCount))
    this.nodeClusters = range(this.nodeClusterCount).map(() => {
      return new NodeCluster({
        size: this.nodeClusterSize,
        color: randomColor(),
        scene: this.scene,
        boundingBoxSize: this.boundingBoxSize
      })
    })
  }

}

export default Network
