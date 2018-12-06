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
      this.jump = false;
      this.onGround = true;
    }

    //-- Setup Local Vars. --
    {
      this.hspdX = 0;
      this.hspdZ = 0;
      this.vspd = 0;
      this.spd = 1;
      this.jumpPower = 1;
      this.grav = 0.5;
      this.currentMoveSpd = this.spd;

      this.horizontalX = 0;
      this.horizontalZ = 0;
      this.vertical = 0;

      this.box = new THREE.Box3().setFromObject(this.body);
    }
  }
  update() {
    //-- Movement --
    {
      //-- onGround Movement --
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

      }

      //-- Vertical Movement --
      // {
      //   if(this.jump && this.onGround) {
      //     this.jump = false;
      //     this.onGround = false;
      //     this.vspd += this.jumpPower;
      //   }
      // }

      //-- Gravity's Pull --
      {
        if(this.body.position.y > 0) {
          this.vspd += this.grav;
        } else {
          this.body.position.y = 0;
          this.onGround = true;
        }
      }

      //-- Apply Vertical Movement --
      this.body.translateX(this.hspdX);
      this.body.translateZ(this.hspdZ);
      this.body.translateY(this.vspd);
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
