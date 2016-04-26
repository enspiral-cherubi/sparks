import THREE from 'three'
import randomNumberInRange from 'random-number-in-range'
import range from 'lodash.range'

class NodeCluster {

  constructor (opts) {
    this.size = opts.size
    this.color = opts.color
    this.scene = opts.scene
    this.boundingBoxSize = opts.boundingBoxSize

    this.nodes = this._generateNodes()
    this.nodes.forEach(node => this.scene.add(node))
  }

  // 'private'

  _generateNodes () {
    return range(this.size).map(() => {
      var geometry = new THREE.SphereGeometry(5, 10, 10)
      var material = new THREE.MeshBasicMaterial({color: this.color, wireframe: true})
      var node = new THREE.Mesh(geometry, material)
      node.position.x = randomNumberInRange(this.boundingBoxSize)
      node.position.y = randomNumberInRange(this.boundingBoxSize)
      node.position.z = randomNumberInRange(this.boundingBoxSize)
      return node
    })
  }

}

export default NodeCluster
