class point {
  constructor(x, z, y) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

function findDistance(max, min) {
  //++
  if(max > 0 && min > 0) {
    return Math.abs(max - min);

    //--
  } else if (max < 0 && min < 0) {
    return Math.abs(Math.abs(max) - Math.abs(min));

    //-+ or +-
  } else {
    return Math.abs(max) + Math.abs(min);
  }

}

function findTotalDistance(maxA, minA, maxB, minB) {
  if(maxA > maxB) {
    if(minA < minB) {
      return findDistance(maxA, minA);
    } else {
      return findDistance(maxA, minB);
    }
  } else {
    if(minA < minB) {
      return findDistance(maxB, minA);
    } else {
      return findDistance(maxB, minB);
    }
  }
}

function collisionCheck(totalDistance, distanceA, distanceB) {
  if(totalDistance <= distanceA + distanceB) {
    return true;
  } else {
    return false;
  }
}

function satCollision(objectA, objectB, hspdX, hpsdZ, vspd, scene) {

  var objectAPoints = [];
  var objectBPoints = [];

  var xMax;
  var xMin;
  var yMax;
  var yMin;

  collisionx = false;
  collisiony = false;
  collisionz = false;

  //-- find the 8 points for each rectObject
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

  xMaxA = Math.max(objectAPoints[0].x, objectAPoints[1].x, objectAPoints[2].x, objectAPoints[3].x, objectAPoints[4].x, objectAPoints[5].x,objectAPoints[6].x,objectAPoints[7].x);
  xMinA = Math.min(objectAPoints[0].x, objectAPoints[1].x, objectAPoints[2].x, objectAPoints[3].x, objectAPoints[4].x, objectAPoints[5].x,objectAPoints[6].x,objectAPoints[7].x);
  yMaxA = Math.max(objectAPoints[0].y, objectAPoints[1].y, objectAPoints[2].y, objectAPoints[3].y, objectAPoints[4].y, objectAPoints[5].y,objectAPoints[6].y,objectAPoints[7].y);
  yMinA = Math.min(objectAPoints[0].y, objectAPoints[1].y, objectAPoints[2].y, objectAPoints[3].y, objectAPoints[4].y, objectAPoints[5].y,objectAPoints[6].y,objectAPoints[7].y);
  zMaxA = Math.max(objectAPoints[0].z, objectAPoints[1].z, objectAPoints[2].z, objectAPoints[3].z, objectAPoints[4].z, objectAPoints[5].z,objectAPoints[6].z,objectAPoints[7].z);
  zMinA = Math.min(objectAPoints[0].z, objectAPoints[1].z, objectAPoints[2].z, objectAPoints[3].z, objectAPoints[4].z, objectAPoints[5].z,objectAPoints[6].z,objectAPoints[7].z);

  xMaxB = Math.max(objectBPoints[0].x, objectBPoints[1].x, objectBPoints[2].x, objectBPoints[3].x, objectBPoints[4].x, objectBPoints[5].x,objectBPoints[6].x,objectBPoints[7].x);
  xMinB = Math.min(objectBPoints[0].x, objectBPoints[1].x, objectBPoints[2].x, objectBPoints[3].x, objectBPoints[4].x, objectBPoints[5].x,objectBPoints[6].x,objectBPoints[7].x);
  yMaxB = Math.max(objectBPoints[0].y, objectBPoints[1].y, objectBPoints[2].y, objectBPoints[3].y, objectBPoints[4].y, objectBPoints[5].y,objectBPoints[6].y,objectBPoints[7].y);
  yMinB = Math.min(objectBPoints[0].y, objectBPoints[1].y, objectBPoints[2].y, objectBPoints[3].y, objectBPoints[4].y, objectBPoints[5].y,objectBPoints[6].y,objectBPoints[7].y);
  zMaxB = Math.max(objectBPoints[0].z, objectBPoints[1].z, objectBPoints[2].z, objectBPoints[3].z, objectBPoints[4].z, objectBPoints[5].z,objectBPoints[6].z,objectBPoints[7].z);
  zMinB = Math.min(objectBPoints[0].z, objectBPoints[1].z, objectBPoints[2].z, objectBPoints[3].z, objectBPoints[4].z, objectBPoints[5].z,objectBPoints[6].z,objectBPoints[7].z);

  var xDistanceA = findDistance(xMaxA, xMinA);
  var xDistanceB = findDistance(xMaxB, xMinB);

  var yDistanceA = findDistance(yMaxA, yMinA);
  var yDistanceB = findDistance(yMaxB, yMinB);

  var zDistanceA = findDistance(zMaxA, zMinA);
  var zDistanceB = findDistance(zMaxB, zMinB);

  var xtotalDistance = findTotalDistance(xMaxA, xMinA, xMaxB, xMinB);
  var ytotalDistance = findTotalDistance(yMaxA, yMinA, yMaxB, yMinB);
  var ztotalDistance = findTotalDistance(zMaxA, zMinA, zMaxB, zMinB);

  if(collisionCheck(xtotalDistance, xDistanceA, xDistanceB)) {
    collisionx = true;
  } else {
    //return false;
  }
  if(collisionCheck(ytotalDistance, yDistanceA, yDistanceB)) {
    collisiony = true;
  } else {
    //return false;
  }
  if(collisionCheck(ztotalDistance, zDistanceA, zDistanceB)) {
    collisionz = true;
  } else {
    //return false;
  }

  if(collisionx && collisiony && collisionz) {
    return true;
  } else {
    return false;
  }
}
