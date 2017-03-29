var StateMain = {
  preload: function() {
    // load images into library
    if (screen.width < 800) {
      game.scale.forceOrientation(true, false);
    }

    game.load.spritesheet('dragon', 'images/main/dragon.png', 120, 85, 4);
    game.load.image("background", "images/main/background.png");
  },

  create: function() {
    // set up objects, variables
    // sounds, text
    // good guys, explosions

    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.top = 0;
    this.bottom = game.height-100;

    // dragon
    this.dragon = game.add.sprite(0, 0, "dragon");
    this.dragon.animations.add('fly', [0,1,2,3], 12, true);
    this.dragon.animations.play('fly');

    // background
     this.background = game.add.tileSprite(0, game.height-480, game.width, 480, 'background');

    // IPAD fix
    if (screen.height > 764) {
      this.background.y = game.world.centerY - this.background.height/2;
      this.top = this.background.y;
    }

    this.dragon.bringToTop();
    this.dragon.position.y = this.top;
    game.physics.enable(this.dragon, Phaser.Physics.ARCADE);

    this.dragon.body.gravity.y = 500;

    this.background.autoScroll(-100,0);

    this.setListeners();
  },

  update: function() {
    // constant running loop
    if (this.dragon.y > this.bottom) {
      this.dragon.y = this.bottom;
      this.dragon.body.gravity.y = 0;
    } else {
      this.dragon.body.gravity.y = 500;
    }
  },

  setListeners: function() {
    if (screen.width < 800) {
      game.scale.enterIncorrectOrientation.add(this.wrongWay, this);
      game.scale.leaveIncorrectOrientation.add(this.rightWay, this);
    }
  },

  wrongWay: function() {
    document.getElementById("wrongWay").style.display = "block";
  },

  rightWay: function() {
    document.getElementById("wrongWay").style.display = "none";
  },

}
