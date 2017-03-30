var StateTitle = {
  preload: function() {
    // load images into library
    game.load.spritesheet('buttons', 'images/ui/buttons.png', 265, 75);
    game.load.spritesheet('dragon', 'images/main/dragon.png', 120, 85, 4);
  },

  create: function() {
    // set up objects, variables
    // sounds, text
    // good guys, explosions
    this.buttonStart = game.add.button(game.world.centerX, game.world.centerY+100, "buttons", this.startGame, this, 6, 7, 6);
    this.buttonStart.anchor.set(0.5, 0.5);

    // dragon
    this.dragon = game.add.sprite(game.world.centerX, game.world.centerY, "dragon");
    this.dragon.anchor.set(0.5, 0.5);
    this.dragon.animations.add('fly', [0,1,2,3], 12, true);
    this.dragon.animations.play('fly');

    game.stage.backgroundColor = "#26C9FF";

    this.titleText = game.add.text(game.world.centerX, 60, "Hungry Dragon", { font: "50px Lobster", fill: "#00D900", stroke: "#222222", strokeThickness: 4, align: "center" });
    this.titleText.anchor.set(0.5, 0.5);
  },

  startGame: function() {
    game.state.start("StateMain");
  },

  update: function() {
    // constant running loop
  }
};
