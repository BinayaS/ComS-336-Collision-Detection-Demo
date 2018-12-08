class point {
  constructor(x, z, y) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

function satCollision(objectA, objectB, hspdX, hpsdZ, vspd, scene) {

  var objectAPoints = []
  var objectBPoints = [];

  objectAPoints[0] = new point(objectA.body.position.x + objectA.width/2, objectA.body.position.z + objectA.depth/2, objectA.body.position.y + objectA.height/2);
  objectAPoints[1] = new point(objectA.body.position.x + objectA.width/2, objectA.body.position.z + objectA.depth/2, objectA.body.position.y - objectA.height/2);
  objectAPoints[2] = new point(objectA.body.position.x + objectA.width/2, objectA.body.position.z - objectA.depth/2, objectA.body.position.y + objectA.height/2);
  objectAPoints[3] = new point(objectA.body.position.x + objectA.width/2, objectA.body.position.z - objectA.depth/2, objectA.body.position.y - objectA.height/2);
  objectAPoints[4] = new point(objectA.body.position.x - objectA.width/2, objectA.body.position.z + objectA.depth/2, objectA.body.position.y + objectA.height/2);
  objectAPoints[5] = new point(objectA.body.position.x - objectA.width/2, objectA.body.position.z + objectA.depth/2, objectA.body.position.y - objectA.height/2);
  objectAPoints[6] = new point(objectA.body.position.x - objectA.width/2, objectA.body.position.z - objectA.depth/2, objectA.body.position.y + objectA.height/2);
  objectAPoints[7] = new point(objectA.body.position.x - objectA.width/2, objectA.body.position.z - objectA.depth/2, objectA.body.position.y - objectA.height/2);

  objectBPoints[0] = new point(objectB.body.position.x + objectB.width/2, objectB.body.position.z + objectB.depth/2, objectB.body.position.y + objectB.height/2);
  objectBPoints[1] = new point(objectB.body.position.x + objectB.width/2, objectB.body.position.z + objectB.depth/2, objectB.body.position.y - objectB.height/2);
  objectBPoints[2] = new point(objectB.body.position.x + objectB.width/2, objectB.body.position.z - objectB.depth/2, objectB.body.position.y + objectB.height/2);
  objectBPoints[3] = new point(objectB.body.position.x + objectB.width/2, objectB.body.position.z - objectB.depth/2, objectB.body.position.y - objectB.height/2);
  objectBPoints[4] = new point(objectB.body.position.x - objectB.width/2, objectB.body.position.z + objectB.depth/2, objectB.body.position.y + objectB.height/2);
  objectBPoints[5] = new point(objectB.body.position.x - objectB.width/2, objectB.body.position.z + objectB.depth/2, objectB.body.position.y - objectB.height/2);
  objectBPoints[6] = new point(objectB.body.position.x - objectB.width/2, objectB.body.position.z - objectB.depth/2, objectB.body.position.y + objectB.height/2);
  objectBPoints[7] = new point(objectB.body.position.x - objectB.width/2, objectB.body.position.z - objectB.depth/2, objectB.body.position.y - objectB.height/2);

  

  //-- projection onto xy plane (z == 0) --
  //Find 4 points
  //-- project onto x (y == 0) --
  //-- project onto y (x == 0) --

  //-- projection onto xz plane (y == 0) --
  //Find 4 points
  //-- project onto x (z == 0) --
  //-- project onto z (x == 0) --

  //-- projection onto yz plane (x == 0) --
  //Find 4 points
  //-- project onto y (z == 0)
  //-- project onto z (y == 0)
  //-- Find the total distance
    //-- If ++ (max - min)
    //-- else If -- (|max| - |min|)
    //-- else +- (|max| + |min|)
    //-- If total distance < objectA's distance + objectB's distance Then collision

  //-- projection onto x (y == 0) --
  //Find xmin & xmax

  //-- projection onto y (x == 0) --
  //Find ymin & ymax

  //-- If there is collision in all 3 planes then we have a collision --

}
