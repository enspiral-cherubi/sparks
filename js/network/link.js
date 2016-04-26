import THREE from 'three'
import range from 'lodash.range'

class Link {

  constructor (nodes, opts) {
    var startVector = nodes[0].mesh.position
    var endVector = nodes[1].mesh.position

    this.geometry = new THREE.Geometry()
    this.geometry.vertices.push(startVector, endVector)
    this.geometry.computeLineDistances()

    this.material = new THREE.LineBasicMaterial({
      color: opts.color,
      opacity: 0.8,
      linewidth: 2
    })

    this.mesh = new THREE.Line(this.geometry, this.material)
  }

}

export default Link
