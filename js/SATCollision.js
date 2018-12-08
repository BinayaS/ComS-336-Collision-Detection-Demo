function satCollision(objectA, objectB, hspdX, hpsdZ, vspd) {



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
