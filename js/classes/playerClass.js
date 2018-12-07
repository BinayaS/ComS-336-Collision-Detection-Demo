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
      if(!isCollision(objectTree,this.box,this.hspdX,this.hspdZ,this.vspd)){
        console.log(!isCollision(objectTree,this.box,this.hspdX,this.hspdZ,this.vspd))
        this.body.translateX(this.hspdX);
        this.body.translateZ(this.hspdZ);
        this.body.translateY(this.vspd);
      }

    }

    //-- Debug Code --
    {
      //console.log(this.body.position.z);
      //console.log(this.box.min);
    }

    //-- Update Min, Max, Cords. --
    {
      this.box.setFromObject(this.body);
    }

  }
}
