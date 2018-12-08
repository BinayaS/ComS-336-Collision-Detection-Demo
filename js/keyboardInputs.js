document.addEventListener('keydown', function(event) {
  //-- Player Input --
  {
    if(event.keyCode == 65) {
        //alert('a was pressed');
        objPlayer.moveLeft = true;
    }
    if(event.keyCode == 68) {
        //alert('d was pressed');
        objPlayer.moveRight = true;
    }
    if(event.keyCode == 87) {
        //alert('w was pressed');
        objPlayer.moveForward = true;
    }
    if(event.keyCode == 83) {
        //alert('s was pressed');
        objPlayer.moveBackward = true;
    }
    if(event.keyCode == 32) {
        objPlayer.jump = true;
    }
  }

  //-- Camera Input --
  {
    if(event.keyCode == 81) {
      //Q
    }
    if(event.keyCode == 69) {
      //E
    }
  }

});

document.addEventListener('keyup', function(event) {
  //-- Player Input --
  {
    if(event.keyCode == 65) {
        //alert('a was released');
        objPlayer.moveLeft = false;
    }
    if(event.keyCode == 68) {
        //alert('d was released');
        objPlayer.moveRight = false;
    }
    if(event.keyCode == 87) {
        //alert('w was released');
        objPlayer.moveForward = false;
    }
    if(event.keyCode == 83) {
        //alert('s was released');
        objPlayer.moveBackward = false;
    }
  }

});
