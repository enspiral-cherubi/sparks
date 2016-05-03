import THREE from 'three'
import range from 'lodash.range'
import Combinatorics from 'js-combinatorics'
import randomNumberInRange from 'random-number-in-range'
import Node from './node.js'
import Link from './link.js'
import Tuna from 'tunajs'
import LogScale from 'log-scale'
var logScale = new LogScale(20,5000)

class NodeCluster {

  constructor (opts) {
    this.opts = opts
    this.nodes = this._generateNodes()
    this.links = this._generateLinks()
    this._init()

    this.sourceNode = opts.audioCtx.createOscillator()
    this.sourceNode.type = 'sine'
    this.sourceNode.start()

    var tuna = new Tuna(opts.audioCtx)

    this.moog = new tuna.MoogFilter({
      bufferSize: 4096  //256 to 16384
    })

    this.sourceNode.connect(this.moog)
    this.moog.connect(this.opts.audioOut)
  }

  render () {
    this.nodes.forEach(node => node.update())
    this.links.forEach(link => link.update())

    var freq = this.links[0].distance()
    var cutoff = this.links[1].distance()
    var resonance = this.links[2].distance()

    this.sourceNode.frequency.value = logScale.linearToLogarithmic(freq)  // 20 to 5000hz (logarithmic scale)
    this.moog.processor.cutoff = cutoff            // 0 to 1
    this.moog.processor.resonance = resonance * 4  // 0 to 4
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
