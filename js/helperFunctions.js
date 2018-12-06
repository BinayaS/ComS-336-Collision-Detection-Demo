function isCollision(tree, player){
  var currentNode=tree.root;
  if(instersect(currentNode,player)){
    console.log("Collision Detected");
  }
}

function instersect(obj,player){
  var objCoords=obj.box3;
  var aMinX=objCoords.min.x;
  var aMaxX=objCoords.max.x;
  var aMinY=objCoords.min.y;
  var aMaxY=objCoords.max.y;
  var aMinZ=objCoords.min.z;
  var aMaxZ=objCoords.max.z;

  var playerCoords=player.box;
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
