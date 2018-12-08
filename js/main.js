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
  //var c1 = new solid(10, 30, 100, 50, 0, 10, -1, 0x00ADB5, scene);
  // var c2 = new solid(100, 30, 10, -16, 0, 10, -1, 0x00ADB5, scene);
  // var c3 = new solid(125, 30, 10, -16, 0, 55, -1, 0x00ADB5, scene);
  // var c4 = new solid(10, 30, 100, -82, 0, 10, -1, 0x00ADB5, scene);
  // var c5 = new solid(10, 50, 10, 0, 0, -50, -1, 0xFFF4E0, scene);
  // var c6 = new solid(10, 50, 10, -30, 0, -50, -1, 0xFFF4E0, scene);
  // var c7 = new solid(30, 10, 10, -10, 15, -50, -1, 0xFFF4E0, scene);
  var plane = new solid(200, 1, 200, 0, -10, 0, -1, 0xD9C323, scene)
  // objectList.push(c1);
  // objectList.push(c2);
  // objectList.push(c3);
  // objectList.push(c4);
  // objectList.push(c5);
  // objectList.push(c6);
  // objectList.push(c7);
  objectList.push(plane);

  var objectA = new solid(30, 15, 30, 10, 20, 30, -1, 0xFFF4E0, scene);
  var objectB = new solid(20, 20, 20, 50, 30, 30, -1, 0xf47d42, scene);
  //objectB.body.rotation.y += (30 * Math.PI/180);
  // objectB.body.rotation.x += (50 * Math.PI/180);
  // objectA.body.rotation.y += (30 * Math.PI/180);
  // objectA.body.rotation.x += (50 * Math.PI/180);
  objectList.push(objectA);
  objectList.push(objectB);

  var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
  scene.add( light );
  var light = new THREE.PointLight( 0xff0000, 20, 100 );
  light.position.set( 0, 0, 0 );
  scene.add( light );
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

      objectB.body.position.x -= 0.05;
      console.log(satCollision(objectA, objectB, 0, 0, 0, scene));

    }
    prevTime = time;
  	renderer.render(scene, objCamera.camera);
  }

  render(objPlayer);
}
