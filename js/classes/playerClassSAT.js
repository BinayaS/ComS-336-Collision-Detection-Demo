class player {
  constructor(scene) {
    //-- Setup the body --
    {
      this.height = 10;
      this.width = 10;
      this.depth = 10;
      this.boxGeometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
      this.basicMaterial = new THREE.MeshPhongMaterial({color: 0x1195DD});
      this.cube = new THREE.Mesh(this.boxGeometry, this.basicMaterial);
      this.body = new THREE.Object3D();
      this.body.add(this.cube);
      this.body.translateY(20);
      this.body.translateZ(-5);
      scene.add(this.body);


    }

    //-- Setup Keyboard Vars. --
    {
      this.moveForward = false;
      this.moveBackward = false;
      this.moveLeft = false;
      this.moveRight = false;
      this.jump = false;
      this.onGround = false;
    }

    //-- Setup Local Vars. --
    {
      this.hspd = 0;
      this.hspdX = 0;
      this.hspdZ = 0;
      this.vspd = 0;
      this.spd = 1;
      this.gravity=-.5;
      this.jumpSpd=5.5;
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
      //-- onGround Movement Calculation --
      {
        this.horizontalZ = this.moveForward - this.moveBackward;
        this.horizontalX = this.moveLeft - this.moveRight;
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

        if(this.onGround&&this.jump){
          this.vspd+=this.jumpSpd;
          this.onGround=false;
          this.jump=false;
        }

        this.vspd+=this.gravity;
        // console.log(this.vspd);

      }
        //-- Do we have objects to collide with? --
        {
          if(objectList.length > 0) {

            //-- Itterate Through the list --
            {
              for(var i = 0; i < objectList.length; i++) {

                //-- Check for collision in the x axis --
                {
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
                }

                //-- Check for collision in the z axis --
                {
                  if(placeMeeting( this.box.min.x, this.box.max.x,
                                    this.box.min.z + this.hspdZ, this.box.max.z + this.hspdZ,
                                    this.box.min.y, this.box.max.y, objectList[i])) {

                    if(placeMeeting( this.box.min.x, this.box.max.x,
                                      this.box.min.z + sign(this.hspdZ), this.box.max.z + sign(this.hspdZ),
                                      this.box.min.y, this.box.max.y, objectList[i])) {
                                      this.collisionZSign = true;
                    }
                                    this.collisionZ = true;
                                    this.collisionZObject = objectList[i];
                  }
                }

                //-- Check for collision in the y axis --
                {
                  if(placeMeeting( this.box.min.x, this.box.max.x,
                                    this.box.min.z, this.box.max.z,
                                    this.box.min.y + this.vspd, this.box.max.y + this.vspd, objectList[i])) {

                    if(placeMeeting( this.box.min.x, this.box.max.x,
                                      this.box.min.z, this.box.max.z,
                                      this.box.min.y+sign(this.vspd), this.box.max.y+sign(this.vspd), objectList[i])) {
                                      this.collisionYSign = true;
                    }
                                    this.collisionY = true;
                                    this.vspd=0;
                                    this.onGround=true;
                                    this.collisionYObject = objectList[i];
                  }
                }
              }
            }
            } else {
              this.body.translateX(this.hspdX );
              this.body.translateZ(this.hspdZ );
              this.body.translateY(this.vspd );
            }
          }

        //-- Can we move? --
        {
          if(!this.collisionX && !this.collisionXSign) {
            this.body.translateX(this.hspdX);
          }
          if(!this.collisionY && !this.collisionYSign) {
            this.body.translateY(this.vspd );
          }
          // if(this.collisionY) {
          //   this.on;
          // }
          if(!this.collisionZ && !this.collisionZSign) {
            this.body.translateZ(this.hspdZ );
          }
        }

        //-- Check if there still is a collision in the x axis --
        {
          if(this.collisionXObject != null) {
            if(placeMeeting(this.box.min.x + this.hspdX, this.box.max.x + this.hspdX,
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
        }

        //-- Check if there still is a collision in the x axis --
        {
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
        }

        //-- Check if there still is a collision in the x axis --
        {
          if(this.collisionYObject != null) {
            if(this.vspd==0){
              this.collisionY=false;
              this.collisionYSign = false;
              this.collisionYObject = null;
            }
            else if(placeMeeting( this.box.min.x, this.box.max.x,
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
      }


    //-- Debug Code --
    {
      //console.log(this.body.position.z);
      //console.log(this.box.min);
      //console.log(this.collisionXSign);
    }

  }
}
