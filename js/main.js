//-- Global Vars --
{
  var WIDTH;
  var HEIGHT;
  var renderer;
  var scene;
  var objCamera;
  var objectTree = new tree();
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
  var objCube = new THREE.Object3D();
  var objCube2 = new THREE.Object3D();
  objCube.add(cube);
  objCube2.add(cube2);
  var cubeNode = new node("cube", objCube);
  var cube2Node = new node("cube2", objCube2);
  objectTree.setRoot(cubeNode);
  cubeNode.setChildL(cube2Node);


  scene.add(objCube);
  scene.add(objCube2);
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
      isCollision(objectTree,objPlayer);
    }

  	renderer.render(scene, objCamera.camera);
  }

  render(objPlayer);
}
