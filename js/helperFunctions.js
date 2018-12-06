function isCollision(tree, player){
  var currentNode=tree.root;
  if(collistionDirection(currentNode,player.box)){
    console.log("Collision Detected");
  }
}

function instersect(obj,playerCoords){
  var objCoords=obj.box3;
  var aMinX=objCoords.min.x;
  var aMaxX=objCoords.max.x;
  var aMinY=objCoords.min.y;
  var aMaxY=objCoords.max.y;
  var aMinZ=objCoords.min.z;
  var aMaxZ=objCoords.max.z;

  // var playerCoords=player.box;

  var bMinX=playerCoords.min.x;
  var bMaxX=playerCoords.max.x;
  var bMinY=playerCoords.min.y;
  var bMaxY=playerCoords.max.y;
  var bMinZ=playerCoords.min.z;
  var bMaxZ=playerCoords.max.z;

  // console.log(objCoords);
  return (aMinX <= bMaxX && aMaxX >= bMinX) &&
           (aMinY <= bMaxY && aMaxY >= bMinY) &&
           (aMinZ <= bMaxZ && aMaxZ >= bMinZ);
}

function collistionDirection(obj,playerCoords){
  if(player.moveBackward){
    playerCoords.max.z+=player.spd;
    playerCoords.min.z+=player.spd;
  }
  else if(player.moveForward){
    playerCoords.max.z-=player.spd;
    playerCoords.min.z-=player.spd;
  }
  if(player.moveRight){
    playerCoords.max.x+=player.spd;
    playerCoords.min.x+=player.spd;
  }
  else if(player.moveLeft){
    playerCoords.max.x-=player.spd;
    playerCoords.min.x-=player.spd;
  }
  return instersect(obj,playerCoords);
}
