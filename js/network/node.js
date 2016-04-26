import THREE from 'three'
import randomNumberInRange from 'random-number-in-range'
import range from 'lodash.range'

class Node {

  constructor (opts) {
    this.opts = opts

    this.geometry = new THREE.TetrahedronGeometry(3)

    this.material = new THREE.MeshBasicMaterial({ color: opts.color })

    this.mesh = new THREE.Mesh(this.geometry, this.material)
    var coords = range(3).map(() => {
      return randomNumberInRange(0, opts.boundingBoxSize)
    })
    this.mesh.position.set(...coords)

    this.edges = new THREE.EdgesHelper(this.mesh, 0xffffff)

    this.vector = new THREE.Vector3(
      randomNumberInRange(-10, 10) / 100,
      randomNumberInRange(-10, 10) / 100,
      randomNumberInRange(-10, 10) / 100
    )
  }

  update () {
    if (this.mesh.position.x > this.opts.boundingBoxSize || this.mesh.position.x < 0) {
      this.vector.x = this.vector.x * -1
    }
    if (this.mesh.position.y > this.opts.boundingBoxSize || this.mesh.position.y < 0) {
      this.vector.y = this.vector.y * -1
    }
    if (this.mesh.position.z > this.opts.boundingBoxSize || this.mesh.position.z < 0) {
      this.vector.z = this.vector.z * -1
    }

    this.mesh.position.set(
      this.mesh.position.x + this.vector.x,
      this.mesh.position.y + this.vector.y,
      this.mesh.position.z + this.vector.z
    )
  }

}

export default Node
