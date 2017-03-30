var StateMain = {
  preload: function() {
    // load images into library
    if (screen.width < 800) {
      game.scale.forceOrientation(true, false);
    }

    game.load.image("background", "images/main/background.png");
    game.load.spritesheet('dragon', 'images/main/dragon.png', 120, 85, 4);
    game.load.spritesheet('candy', 'images/main/candy.png', 52, 50, 8);
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

    this.background.autoScroll(-100,0);

    // candies
    this.candies = game.add.group();
    this.candies.createMultiple(40, 'candy');
    this.candies.setAll('checkWorldBounds', true);
    this.candies.setAll('outOfBoundsKill', true);

    game.physics.enable([this.dragon, this.candies], Phaser.Physics.ARCADE);

    this.dragon.bringToTop();
    this.dragon.position.y = this.top;
    this.dragon.body.gravity.y = 500;
    this.dragon.body.immovable = true;

    this.setListeners();
  },

  update: function() {
    // constant running loop
    game.physics.arcade.collide(this.dragon, this.candies, null, this.onEat);
    if (game.input.activePointer.isDown) {
      this.flap();
    }
    if (this.dragon.y < this.top) {
      this.dragon.y = this.top;
      this.dragon.body.velocity.y = 0;
    }
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
    game.time.events.loop(Phaser.Timer.SECOND, this.fireCandy, this);
  },

  fireCandy: function() {
    var candy = this.candies.getFirstDead();
    var yy = game.rnd.integerInRange(0, game.height-60);
    var xx = game.width - 100;
    var type = game.rnd.integerInRange(0, 7);

    candy.frame = type;
    candy.reset(xx, yy);
    candy.enabled = true;
    candy.body.velocity.x = -200;
  },

  onEat: function(dragon, candy) {
    candy.kill();
  },

  wrongWay: function() {
    document.getElementById("wrongWay").style.display = "block";
  },

  rightWay: function() {
    document.getElementById("wrongWay").style.display = "none";
  },

  flap: function() {
    this.dragon.body.velocity.y = -350;
  }
}
