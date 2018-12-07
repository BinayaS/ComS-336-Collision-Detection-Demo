class player {
  constructor(scene) {
    //-- Setup the body --
    {
      this.boxGeometry = new THREE.BoxGeometry(10, 10, 10);
      this.basicMaterial = new THREE.MeshBasicMaterial({color: 0x1195DD});
      this.cube = new THREE.Mesh(this.boxGeometry, this.basicMaterial);
      this.body = new THREE.Object3D();
      this.body.add(this.cube);
      scene.add(this.body);
      //this.body.translateZ(10);
      //this.body.translateY(20);
    }

    //-- Setup Keyboard Vars. --
    {
      this.moveForward = false;
      this.moveBackward = false;
      this.moveLeft = false;
      this.moveRight = false;
    }

    //-- Setup Local Vars. --
    {
      this.hspd = 0;
      this.hspdX = 0;
      this.hspdZ = 0;
      this.vspd = 0;
      this.spd = 1;
      this.collisionX = false;
      this.collisionXSign = false;
      this.collisionZ = false;
      this.collisionZSign = false;
      this.collisionY = false;
      this.collisionYSign = false;
      this.collisionXObject = null;
      this.collisionZObject = null;
      this.collisionYObject = null;
      this.currentMoveSpd = this.spd;
      this.box = new THREE.Box3().setFromObject(this.body);
    }
  }
  update(objectList,delta) {

    //-- Update Min, Max, Cords. --
    {
      this.box.setFromObject(this.body);
    }

    //-- Movement --
    {
      //-- onGround Movement --
      {
        this.horizontalZ = this.moveForward - this.moveBackward;
        this.horizontalX = this.moveLeft - this.moveRight;
        // console.log(this.horizontalZ);
        if(this.horizontalX != 0 && this.horizontalZ != 0) {
          this.currentMoveSpd = this.spd/Math.sqrt(2);
        } else {
          this.currentMoveSpd = this.spd;
        }

        //-- horizontalX --
        if(this.horizontalX == 0) {
        	this.hspdX = 0;
        } else if(this.horizontalX > 0) {
        	this.hspdX = this.currentMoveSpd;
        } else {
        	this.hspdX = -this.currentMoveSpd;
        }

        //-- horizontalZ --
        if(this.horizontalZ == 0) {
        	this.hspdZ = 0;
        } else if(this.horizontalZ > 0) {
        	this.hspdZ = this.currentMoveSpd;
        } else {
        	this.hspdZ = -this.currentMoveSpd;
        }

      }

      //-- Apply Movement --
      if(objectList.length > 0) {
        for(var i = 0; i < objectList.length; i++) {
          if(placeMeeting( this.box.min.x + this.hspdX, this.box.max.x + this.hspdX,
                            this.box.min.z, this.box.max.z,
                            this.box.min.y, this.box.max.y, objectList[i])) {

            if(placeMeeting( this.box.min.x + sign(this.hspdX), this.box.max.x + sign(this.hspdX),
                              this.box.min.z, this.box.max.z,
                              this.box.min.y, this.box.max.y, objectList[i])) {
                              this.collisionXSign = true;
            }

                            this.collisionX = true;
                            this.collisionXObject = objectList[i];
          }

          if(placeMeeting( this.box.min.x, this.box.max.x,
                            this.box.min.z + this.hspdZ, this.box.max.z + this.hspdZ,
                            this.box.min.y, this.box.max.y, objectList[i])) {

            if(placeMeeting( this.box.min.x, this.box.max.x,
                              this.box.min.z + sign(this.hspdZ), this.box.max.z + sign(this.hspdZ),
                              this.box.min.y, this.box.max.y, objectList[i])) {
                              this.collisionYSign = true;
            }
                            this.collisionZ = true;
                            this.collisionZObject = objectList[i];
          }

          if(placeMeeting( this.box.min.x, this.box.max.x,
                            this.box.min.z, this.box.max.z,
                            this.box.min.y + this.vspd, this.box.max.y + this.vspd, objectList[i])) {

            if(placeMeeting( this.box.min.x, this.box.max.x,
                              this.box.min.z + sign(this.hspdZ), this.box.max.z + sign(this.hspdZ),
                              this.box.min.y, this.box.max.y, objectList[i])) {
                              this.collisionYSign = true;
            }
                            this.collisionY = true;
                            this.collisionYObject = objectList[i];
          }
        }
      } else {
        this.body.translateX(this.hspdX * 60 * delta);
        this.body.translateZ(this.hspdZ * 60 * delta);
        this.body.translateY(this.vspd * 60 * delta);
      }

      if(!this.collisionX) {
        this.body.translateX(this.hspdX * 60 * delta);
      }
      if(!this.collisionY) {
        this.body.translateY(this.vspd * 60 * delta);
      }
      if(!this.collisionZ) {
        this.body.translateZ(this.hspdZ * 60 * delta);
      }

      if(this.collisionXObject != null) {
        if(!placeMeeting(this.box.min.x + this.hspdX, this.box.max.x + this.hspdX,
                        this.box.min.z, this.box.max.z,
                        this.box.min.y, this.box.max.y, this.collisionXObject)) {
                        this.collisionX = false;
                        //this.collisionXObject = null;
        } else if(!placeMeeting(this.box.min.x + sign(this.hspdX), this.box.max.x + sign(this.hspdX),
                        this.box.min.z, this.box.max.z,
                        this.box.min.y, this.box.max.y, this.collisionXObject)) {
                        this.collisionXSign = false;
                        this.collisionXObject = null;
        }
      }

      if(this.collisionZObject != null) {
        if(placeMeeting( this.box.min.x, this.box.max.x,
                        this.box.min.z + this.hspdZ, this.box.max.z + this.hspdZ,
                        this.box.min.y, this.box.max.y, this.collisionZObject)) {
                        this.collisionZ = false;
                        //this.collisionZObject = null;
        } else if(!placeMeeting(this.box.min.x, this.box.max.x,
                        this.box.min.z + sign(this.hspdZ), this.box.max.z + sign(this.hspdZ),
                        this.box.min.y, this.box.max.y, this.collisionZObject)) {
                        this.collisionZSign = false;
                        this.collisionZObject = null;
        }
      }

      if(this.collisionYObject != null) {
        if(placeMeeting( this.box.min.x, this.box.max.x,
                        this.box.min.z, this.box.max.z,
                        this.box.min.y + this.vspd, this.box.max.y + this.vspd, this.collisionYObject)) {
                        this.collisionY = false;
                        //this.collisionYObject = null;
        } else if(!placeMeeting(this.box.min.x, this.box.max.x,
                        this.box.min.z, this.box.max.z,
                        this.box.min.y + sign(this.vspd), this.box.max.y + sign(this.vspd), this.collisionYObject)) {
                        this.collisionYSign = false;
                        this.collisionYObject = null;
        }
      }


    }

    //-- Debug Code --
    {
      //console.log(this.body.position.z);
      //console.log(this.box.min);
    }

  }
}
