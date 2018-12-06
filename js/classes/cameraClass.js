class camera {
  constructor(scene, object) {
    //-- Init camera --
    {
      this.camera = new THREE.PerspectiveCamera(70, WIDTH/HEIGHT);
      this.camera.rotation.y =  180 * Math.PI / 180;
      this.camera.rotation.x = 40 * Math.PI / 180;
      this.camera.position.y = 50;
      scene.add(this.camera);
    }

    //-- Init Vars --
    {
      this.object = object;
    }

  }
  update(scene) {

  }

  cameraFollow() {
    //-- Follow the object's positions --
    {
      this.camera.position.z = this.object.body.position.z - 50;
      this.camera.position.x = this.object.body.position.x;
    }
  }
}
