import $ from 'jquery'
import THREE from 'three'
import ThreeOrbitControls from 'three-orbit-controls'
var OrbitControls = ThreeOrbitControls(THREE)
import WindowResize from 'three-window-resize'
import Network from './network/index.js'
import loop from 'raf-loop'
import RecordMic from 'recordmic'
var recordMic = new RecordMic({}, () => {})

class Engine {

  constructor () {
    this.boundingBoxSize = 200

    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.01, 1000)
    this.camera.position.set(this.boundingBoxSize * 1.2, this.boundingBoxSize * 1.2, this.boundingBoxSize * 1.2)
    this.controls = new OrbitControls(this.camera)

    this.renderer = new THREE.WebGLRenderer({alpha: true, canvas: document.getElementById('environment')})
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor(0xffffff, 1)
    document.body.appendChild(this.renderer.domElement)

    var windowResize = new WindowResize(this.renderer, this.camera)

    this.network = new Network({
      scene: this.scene,
      boundingBoxSize: this.boundingBoxSize,
      nodeClusterCount: 30,
      nodeClusterSize: 4
    })
  }

  bindEventListeners () {
    var self = this
    $('#clear-btn').click(() => { self.network.clear() })
    $('#add-sine-wave-node-cluster-btn').click(() => { self.network.addCluster() })
    $('#start-recording').click(() => {
      $('#start-recording').hide()
      $('#stop-recording').show()
      self.network.mute()
      recordMic.clear()
      recordMic.start()
    })

    $('#stop-recording').click(() => {
      $('#start-recording').show()
      $('#stop-recording').hide()
      self.network.unmute()
      recordMic.stop()
      var monoData = recordMic.getMonoData()
      self.network.addCluster(monoData)
    })
  }

  start () {
    this.renderLoop = loop(() => {
      this.network.render()
      this.renderer.render(this.scene, this.camera)
    }).start()
  }

}

export default new Engine
