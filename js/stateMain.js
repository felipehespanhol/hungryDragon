var StateMain = {
  preload: function() {
    // load images into library
    if (screen.width < 800) {
      game.scale.forceOrientation(true, false);
    }
  },

  create: function() {
    // set up objects, variables
    // sounds, text
    // good guys, explosions
  },

  update: function() {
    // constant running loop
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
