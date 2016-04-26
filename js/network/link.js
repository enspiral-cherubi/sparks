import THREE from 'three'
import range from 'lodash.range'

class Link {

  constructor (nodes, opts) {
    var startVector = nodes[0].mesh.position
    var endVector = nodes[1].mesh.position

    this.nodes = nodes

    this.geometry = new THREE.Geometry()
    this.geometry.vertices.push(startVector, endVector)
    this.geometry.computeLineDistances()

    this.material = new THREE.LineBasicMaterial({
      color: opts.color,
      opacity: 0.6,
      transparent: true,
      linewidth: 2
    })

    this.mesh = new THREE.Line(this.geometry, this.material)
  }

  update () {
    this.mesh.geometry.vertices = []
    var startVector = this.nodes[0].mesh.position
    var endVector = this.nodes[1].mesh.position
    this.mesh.geometry.vertices.push(startVector, endVector)
    this.geometry.verticesNeedUpdate = true
  }

}

export default Link
