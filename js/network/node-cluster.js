import THREE from 'three'
import range from 'lodash.range'
import Combinatorics from 'js-combinatorics'
import randomNumberInRange from 'random-number-in-range'
import Node from './node.js'
import Link from './link.js'
import LogScale from 'log-scale'
var logScale = new LogScale(20,5000)

class NodeCluster {

  constructor (opts) {
    this.opts = opts
    this.nodes = this._generateNodes()
    this.links = this._generateLinks()
    this._init()
  }

  render () {
    this.nodes.forEach(node => node.update())
    this.links.forEach(link => link.update())
  }

  remove () {
    this.nodes.forEach((node) => {
      this.opts.scene.remove(node.mesh)
      this.opts.scene.remove(node.edges)
    })
    this.links.forEach(link => this.opts.scene.remove(link.mesh))
    this.sourceNode.disconnect()
  }

  // 'private'

  _init () {
    this.nodes.forEach((node) => {
      this.opts.scene.add(node.mesh)
      this.opts.scene.add(node.edges)
    })
    this.links.forEach(link => this.opts.scene.add(link.mesh))
  }

  _generateNodes () {
    return range(this.opts.size).map(() => {
      return new Node({
        boundingBoxSize: this.opts.boundingBoxSize,
        color: this.opts.color
      })
    })
  }

  _generateLinks () {
    var pairs = Combinatorics.combination(this.nodes, 2)
    return pairs.map((pair) => {
      return new Link(pair, {
        color: this.opts.color,
        audioOut: this.opts.audioOut,
        audioCtx: this.opts.audioCtx
      })
    })
  }

}

export default NodeCluster
