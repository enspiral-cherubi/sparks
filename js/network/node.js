import THREE from 'three'
import randomNumberInRange from 'random-number-in-range'
import range from 'lodash.range'

class Node {

  constructor (opts) {
    this.geometry = new THREE.TetrahedronGeometry(3)

    this.material = new THREE.MeshBasicMaterial({ color: opts.color })

    this.mesh = new THREE.Mesh(this.geometry, this.material)
    var coords = range(3).map(() => {
      return randomNumberInRange(opts.boundingBoxSize)
    })
    this.mesh.position.set(...coords)

    this.edges = new THREE.EdgesHelper(this.mesh, 0xffffff)
  }

}

export default Node
