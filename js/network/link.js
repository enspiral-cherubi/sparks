import THREE from 'three'
import range from 'lodash.range'
import scale from 'scale-number-range'

class Link {

  constructor (nodes, opts) {
    this.opts = opts
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

  distance () {
    var startVector = this.nodes[0].mesh.position
    var endVector = this.nodes[1].mesh.position

    var distance = startVector.distanceTo(endVector)

    // TODO: should depend on boundingBoxSize
    var maxDistance = 346

    return scale(distance, 0, 346, 0, 1)
  }

}

export default Link
