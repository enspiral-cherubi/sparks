var THREE = require('three')
var OrbitControls = require('three-orbit-controls')(THREE)

module.exports = {
  scene: new THREE.Scene(),
  camera: new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000),
  renderer: new THREE.WebGLRenderer({alpha: true, canvas: document.getElementById('environment')}),
  fibers: [],
  init: function () {
    this.initRenderer()
    this.addAxes()
    this.initControls()
  },

  start: function () {
    var self = this
    this.addBoundingBox()
    requestAnimationFrame(function render () {
      requestAnimationFrame(render)
      self.renderer.render(self.scene, self.camera)
    })
  },

  // private

  addBoundingBox: function () {
    var boxGeom = new THREE.BoxGeometry(100,100,100)
    var material = new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true})
    var box = new THREE.Mesh(boxGeom, material)
    this.scene.add(box)
    box.position.x = 50
    box.position.y = 50
    box.position.z = 50
  },

  addAxes: function () {
    var axes = new THREE.AxisHelper(5)
    this.scene.add(axes)
  },

  initRenderer: function () {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor(0xffffff, 0)
    document.body.appendChild(this.renderer.domElement)
  },

  initControls: function () {
    this.camera.position.z = 200
    this.controls = new OrbitControls(this.camera)
  }

}
