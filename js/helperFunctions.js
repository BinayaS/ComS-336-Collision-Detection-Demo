function isCollision(tree, player,hspdX,hspdZ,vspd){
  var currentNode=tree.root;

  return collisionDirection(currentNode,player,hspdX,hspdZ,vspd);
}

function instersect(obj,playerCoords){
  var objCoords=obj.box3;
  var aMinX=objCoords.min.x;
  var aMaxX=objCoords.max.x;
  var aMinY=objCoords.min.y;
  var aMaxY=objCoords.max.y;
  var aMinZ=objCoords.min.z;
  var aMaxZ=objCoords.max.z;


  var bMinX=playerCoords.min.x;
  var bMaxX=playerCoords.max.x;
  var bMinY=playerCoords.min.y;
  var bMaxY=playerCoords.max.y;
  var bMinZ=playerCoords.min.z;
  var bMaxZ=playerCoords.max.z;

  return (aMinX <= bMaxX && aMaxX >= bMinX) &&
           (aMinY <= bMaxY && aMaxY >= bMinY) &&
           (aMinZ <= bMaxZ && aMaxZ >= bMinZ);
}

function collisionDirection(obj,player,hspdX,hspdZ,vspd){
  var playerCoords=player;

  playerCoords.max.x+=hspdX;
  playerCoords.min.x+=hspdX;
  playerCoords.max.z+=hspdZ;
  playerCoords.min.z+=hspdZ;
  playerCoords.max.y+=vspd;
  playerCoords.min.y+=vspd;
  if(instersect(obj,playerCoords)){
    return true;
  }
  else return false;
}

function placeMeeting(minx, maxx, minz, maxz, miny, maxy, object) {

  var objCoords=object.box3;
  var aMinX=objCoords.min.x;
  var aMaxX=objCoords.max.x;
  var aMinY=objCoords.min.y;
  var aMaxY=objCoords.max.y;
  var aMinZ=objCoords.min.z;
  var aMaxZ=objCoords.max.z;

  var bMinX=minx;
  var bMaxX=maxx;
  var bMinY=miny;
  var bMaxY=maxy;
  var bMinZ=minz;
  var bMaxZ=maxz;

  return (aMinX <= bMaxX && aMaxX >= bMinX) &&
           (aMinY <= bMaxY && aMaxY >= bMinY) &&
           (aMinZ <= bMaxZ && aMaxZ >= bMinZ);
}
