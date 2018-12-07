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
      this.body.translateZ(10);
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
      this.currentMoveSpd = this.spd;
      this.box = new THREE.Box3().setFromObject(this.body);
    }
  }
  update(objectTree) {

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


      //-- Apply Vertical Movement --
      if(!placeMeeting( this.box.min.x + this.hspdX, this.box.max.x + this.hspdX,
                        this.box.min.z, this.box.max.z,
                        this.box.min.y, this.box.max.y, objectTree.root)) {
        this.body.translateX(this.hspdX);
      }

      if(!placeMeeting( this.box.min.x, this.box.max.x,
                        this.box.min.z + this.hspdZ, this.box.max.z + this.hspdZ,
                        this.box.min.y, this.box.max.y, objectTree.root)) {
        this.body.translateZ(this.hspdZ);
      }

      if(!placeMeeting( this.box.min.x, this.box.max.x,
                        this.box.min.z, this.box.max.z,
                        this.box.min.y + this.vspd, this.box.max.y + this.vspd, objectTree.root)) {
        this.body.translateY(this.vspd);
      }


    }

    //-- Debug Code --
    {
      //console.log(this.body.position.z);
      //console.log(this.box.min);
    }

  }
}
