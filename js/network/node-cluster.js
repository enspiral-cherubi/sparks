import THREE from 'three'
import range from 'lodash.range'
import Combinatorics from 'js-combinatorics'
import Node from './node.js'
import Link from './link.js'

class NodeCluster {

  constructor (opts) {
    this.size = opts.size
    this.color = opts.color
    this.scene = opts.scene
    this.boundingBoxSize = opts.boundingBoxSize
    this.nodes = this._generateNodes()
    this.links = this._generateLinks()
  }

  render () {
    this.nodes.forEach((node) => {
      this.scene.add(node.mesh)
      this.scene.add(node.edges)
    })
    this.links.forEach(link => this.scene.add(link.mesh))
  }

  // 'private'

  _generateNodes () {
    return range(this.size).map(() => {
      return new Node({
        boundingBoxSize: this.boundingBoxSize,
        color: this.color
      })
    })
  }

  _generateLinks () {
    var pairs = Combinatorics.combination(this.nodes, 2)
    return pairs.map((pair) => {
      return new Link(pair, {color: this.color})
    })
  }

}

export default NodeCluster
