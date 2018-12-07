//-- Global Vars --
{
  var WIDTH;
  var HEIGHT;
  var renderer;
  var scene;
  var objCamera;
  var objectTree = new tree();
  var objectList = [];
  var prevTime = performance.now();
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
  var geo = new THREE.PlaneBufferGeometry(100, 100);
  var mat = new THREE.MeshBasicMaterial({ color: 0xD9C323, side: THREE.DoubleSide });
  var plane = new THREE.Mesh(geo, mat);

  plane.rotateX(90 * Math.PI / 180);
  plane.position.setY(-5);

  scene.add(plane);

  var cube1 = new solid(10, 20, 5, 20, 0, 20, -1, 0xFA7268, scene);
  var cube2 = new solid(30, 10, 10, -20, 0, -20, -1, 0xFA7268, scene);
  var cube3 = new solid(10, 10, 30, -20, 0,-30, -1, 0xFA7268, scene);
  objectList.push(cube1);
  objectList.push(cube2);
  objectList.push(cube3);
  //objectList.push(planeNode);

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

    var time = performance.now();
		var delta = ( time - prevTime ) / 1000;

    //-- Call updates --
    {
      // console.log(isCollision(objectTree,objPlayer));
      objPlayer.update(objectList, delta);
      objCamera.cameraFollow();


    }
    prevTime = time;
  	renderer.render(scene, objCamera.camera);
  }

  render(objPlayer);
}
