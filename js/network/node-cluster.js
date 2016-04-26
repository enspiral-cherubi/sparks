import THREE from 'three'
import randomNumberInRange from 'random-number-in-range'
import range from 'lodash.range'
import Combinatorics from 'js-combinatorics'

class NodeCluster {

  constructor (opts) {
    this.size = opts.size
    this.color = opts.color
    this.scene = opts.scene
    this.boundingBoxSize = opts.boundingBoxSize

    this.nodes = this._generateNodes()
    this.nodes.forEach(node => this.scene.add(node))

    this.links = this._generateLinks()
    this.links.forEach(link => this.scene.add(link))
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

  _generateLinks () {
    var pairs = Combinatorics.combination(this.nodes, 2)
    return pairs.map((pair) => {
      var startVector = pair[0].position
      var endVector = pair[1].position

      var lineGeometry = new THREE.Geometry()
      lineGeometry.vertices.push(startVector, endVector)
      lineGeometry.computeLineDistances()
      var lineMaterial = new THREE.LineBasicMaterial({ color: this.color, linewidth: 2 })
      var line = new THREE.Line(lineGeometry, lineMaterial)

      return line
    })
  }

}

export default NodeCluster
