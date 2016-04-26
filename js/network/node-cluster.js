import THREE from 'three'
import randomNumberInRange from 'random-number-in-range'
import range from 'lodash.range'

class NodeCluster {

  constructor (opts) {

    this.size = opts.size
    this.color = opts.color
    this.scene = opts.scene
    this.boundingBoxSize = opts.boundingBoxSize


    this.nodes = range(this.size).map(() => {
      var geometry = new THREE.SphereGeometry(5, 10, 10)
      var material = new THREE.MeshBasicMaterial({color: this.color, wireframe: true});
      return new THREE.Mesh(geometry, material)
    })

    this.nodes.forEach((node) => {
      this.scene.add(node)
      node.position.x = randomNumberInRange(this.boundingBoxSize)
      node.position.y = randomNumberInRange(this.boundingBoxSize)
      node.position.z = randomNumberInRange(this.boundingBoxSize)
    })
  }

}

export default NodeCluster
