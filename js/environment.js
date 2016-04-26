import THREE from 'three'
import ThreeOrbitControls from 'three-orbit-controls'
var OrbitControls = ThreeOrbitControls(THREE)
import WindowResize from 'three-window-resize'
import Network from './network/index.js'

class Environment {

  constructor () {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
    this.controls = new OrbitControls(this.camera)
    this.renderer = new THREE.WebGLRenderer({alpha: true, canvas: document.getElementById('environment')})

    this.boundingBoxSize = 100

    this._addBoundingBox()
    this._init()

    this.network = new Network({
      scene: this.scene,
      boxSize: this.boundingBoxSize,
      nodeClusterCount: 10,
      nodeClusterSize: 3
    })
  }

  start () {
    var self = this
    requestAnimationFrame(function render () {
      requestAnimationFrame(render)
      self.renderer.render(self.scene, self.camera)
    })
  }

  // 'private'

  _init () {
    var windowResize = new WindowResize(this.renderer, this.camera)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor(0x000000, 1)
    document.body.appendChild(this.renderer.domElement)
    this.camera.position.z = this.boundingBoxSize * 2
    this.camera.position.x = this.boundingBoxSize / 2
    this.camera.position.y = this.boundingBoxSize / 2
  }

  _addBoundingBox () {
    var boxGeom = new THREE.BoxGeometry(this.boundingBoxSize,this.boundingBoxSize,this.boundingBoxSize)
    var material = new THREE.MeshBasicMaterial({color: 0xffffff, opacity: 0.1, transparent: true})
    var box = new THREE.Mesh(boxGeom, material)
    var edges = new THREE.EdgesHelper(box, 0xffffff)
    this.scene.add(box)
    this.scene.add(edges)
    box.position.x = this.boundingBoxSize / 2
    box.position.y = this.boundingBoxSize / 2
    box.position.z = this.boundingBoxSize / 2
  }

}

export default new Environment
