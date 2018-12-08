//-- Global Vars --
{
  var WIDTH;
  var HEIGHT;
  var renderer;
  var scene;
  var objCamera;
}

//-- Init the ThreeJs Scene --
{
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(WIDTH, HEIGHT);
  renderer.setClearColor(0xDDDDDD, 1);
  document.body.appendChild(renderer.domElement);

  scene = new THREE.Scene();


}

//-- Temp. Objects --
{
  var boxGeometry = new THREE.BoxGeometry(20, 10, 10);
  var basicMaterial = new THREE.MeshBasicMaterial({color: 0x009111});
  var cube = new THREE.Mesh(this.boxGeometry, basicMaterial);
  var cube2 = new THREE.Mesh(this.boxGeometry, basicMaterial);
  cube2.translateZ(20);
  cube2.translateX(30);
  var body = new THREE.Object3D();
  body.add(cube);
  body.add(cube2);
  scene.add(body);
}

//-- Vars --
{
  var objPlayer = new player(scene);
  objCamera = new camera(scene, objPlayer);
}

//-- Call Functions
{
  function render() {
  	requestAnimationFrame(render);

    //-- Call updates --
    {
      objPlayer.update();
      objCamera.cameraFollow();
    }

  	renderer.render(scene, objCamera.camera);
  }

  render(objPlayer);
}
