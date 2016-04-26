import THREE from 'three'
import ThreeOrbitControls from 'three-orbit-controls'
var OrbitControls = ThreeOrbitControls(THREE)
import WindowResize from 'three-window-resize'
import Network from './network/index.js'

class Environment {

  constructor () {
    this.boundingBoxSize = 200

    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
    this.camera.position.set(this.boundingBoxSize * 1.2, this.boundingBoxSize * 1.2, this.boundingBoxSize * 1.2)
    this.controls = new OrbitControls(this.camera)

    this.renderer = new THREE.WebGLRenderer({alpha: true, canvas: document.getElementById('environment')})
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor(0x000000, 1)
    document.body.appendChild(this.renderer.domElement)

    var windowResize = new WindowResize(this.renderer, this.camera)

    this.network = new Network({
      scene: this.scene,
      boundingBoxSize: this.boundingBoxSize,
      nodeClusterCount: 10,
      nodeClusterSize: 5
    })
  }

  start () {
    var self = this

    requestAnimationFrame(function render () {
      requestAnimationFrame(render)
      self.network.render()
      self.renderer.render(self.scene, self.camera)
    })
  }

}

export default new Environment
