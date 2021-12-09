// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/CST.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CST = void 0;
exports.CST = {
  SCENES: {
    LOAD: "LOAD",
    MENU: "MENU",
    PLAY: "PLAY",
    GAMEOVER: "GAMEOVER"
  },
  IMAGE: {
    LOGO: "logo.png",
    OPTIONS: "options.png",
    PLAY: "play.png",
    TITLE: "title_bg.jpg"
  },
  AUDIO: {
    SPLET: "splet.mp3"
  },
  SPRITE: {
    POOP_SELECT: "poop_select.png",
    MONKEY_HEAD: "monkey_head.png",
    POOP_PROJECTILE: "poop_projectile.png"
  }
};
},{}],"src/scenes/GameOverScene.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameOverScene = void 0;

var CST_1 = require("../CST");

var GameOverScene =
/** @class */
function (_super) {
  __extends(GameOverScene, _super);

  function GameOverScene() {
    return _super.call(this, {
      key: CST_1.CST.SCENES.GAMEOVER
    }) || this;
  }

  GameOverScene.prototype.create = function () {
    var _this = this;

    this.add.image(400, 300, 'gameover').setScale(10);
    this.input.once('pointerdown', function () {
      _this.scene.start(CST_1.CST.SCENES.MENU);
    }, this);
  };

  return GameOverScene;
}(Phaser.Scene);

exports.GameOverScene = GameOverScene;
},{"../CST":"src/CST.ts"}],"src/scenes/LoadScene.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadScene = void 0;

var CST_1 = require("../CST");

var LoadScene =
/** @class */
function (_super) {
  __extends(LoadScene, _super);

  function LoadScene() {
    return _super.call(this, {
      key: CST_1.CST.SCENES.LOAD
    }) || this;
  }

  LoadScene.prototype.init = function () {};

  LoadScene.prototype.loadImages = function () {
    this.load.setPath("./assets/image");

    for (var prop in CST_1.CST.IMAGE) {
      //@ts-ignore
      this.load.image(CST_1.CST.IMAGE[prop], CST_1.CST.IMAGE[prop]);
    }
  };

  LoadScene.prototype.preload = function () {
    this.load.image("tiles", "./assets/maps/tile_sheet.png");
    this.load.tilemapTiledJSON('lvl1', "./assets/maps/lvl1.json");
    this.load.audio("splet", "./assets/sound/splet.mp3");
    this.load.audio("splet2", "./assets/sound/splet2.mp3");
    this.load.audio("woesh", "./assets/sound/woesh.mp3");
    this.load.image("logo", "./assets/logo.png");
    this.load.image("gameover", "./assets/gameover.png");
    this.load.image("play", "./assets/play.png");
    this.load.spritesheet("monkey_hand", "./assets/monkey_hand.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("monkey_head", "./assets/monkey_head.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.image("enemy", "./assets/enemy.png");
    this.load.image("options", "./assets/options.png");
    this.load.spritesheet("poop_projectile", "./assets/poop_projectile.png", {
      frameWidth: 232,
      frameHeight: 232
    });
    this.load.spritesheet("poop_load", "./assets/poop_load.png", {
      frameWidth: 512,
      frameHeight: 512
    });
    this.load.spritesheet("poop_select", "./assets/poop_select.png", {
      frameWidth: 512,
      frameHeight: 512
    });
    this.load.image("load1", "./assets/load/load1.png");
    this.load.image("load2", "./assets/load/load2.png");
    this.load.image("load3", "./assets/load/load3.png");
    this.load.image("load4", "./assets/load/load4.png");
    this.load.image("load5", "./assets/load/load5.png");
    this.load.image("load6", "./assets/load/load6.png");
    this.load.image("load7", "./assets/load/load7.png");
    this.load.image("load8", "./assets/load/load8.png");
    this.load.image("load9", "./assets/load/load9.png");
    this.load.image("load10", "./assets/load/load10.png");
  };

  LoadScene.prototype.create = function () {
    var _this = this;

    this.anims.create({
      key: "poop_load",
      frames: this.anims.generateFrameNumbers("poop_load", {}),
      frameRate: 15,
      repeat: 0
    });
    this.anims.create({
      key: "poop_projectile",
      frames: this.anims.generateFrameNumbers("poop_projectile", {
        frames: [0, 1, 2, 3, 4]
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "monkey_head",
      frames: this.anims.generateFrameNumbers("monkey_head", {
        start: 1,
        end: 12
      }),
      frameRate: 30,
      repeat: 0,
      hideOnComplete: false,
      showOnStart: true
    });
    this.anims.create({
      key: 'load',
      frames: [{
        key: 'load1'
      }, {
        key: 'load2'
      }, {
        key: 'load3'
      }, {
        key: 'load4'
      }, {
        key: 'load5'
      }, {
        key: 'load6'
      }, {
        key: 'load7'
      }, {
        key: 'load8'
      }, {
        key: 'load9'
      }, {
        key: 'load10',
        duration: 100
      }],
      frameRate: 2,
      repeat: 0
    });
    this.add.sprite(250, 600, 'poop_load').play('poop_load').setDepth(2);
    this.add.sprite(300, 600, 'poop_load').playAfterDelay('poop_load', 500).setDepth(2);
    this.add.sprite(350, 600, 'poop_load').playAfterDelay('poop_load', 1000).setDepth(2);
    this.add.sprite(400, 600, 'poop_load').playAfterDelay('poop_load', 1500).setDepth(2);
    this.add.sprite(450, 600, 'poop_load').playAfterDelay('poop_load', 2000).setDepth(2);
    this.add.sprite(500, 600, 'poop_load').playAfterDelay('poop_load', 2500).setDepth(2);
    this.add.sprite(550, 600, 'poop_load').playAfterDelay('poop_load', 3000).setDepth(2);
    this.add.sprite(600, 600, 'poop_load').playAfterDelay('poop_load', 3500).setDepth(2);
    this.add.sprite(650, 600, 'poop_load').playAfterDelay('poop_load', 4000).setDepth(2);
    this.add.sprite(400, 300, 'load1').play('load').setDepth(1);
    this.input.once('pointerdown', function () {
      _this.scene.start(CST_1.CST.SCENES.MENU);
    }, this);
    setTimeout(function () {
      return _this.scene.start(CST_1.CST.SCENES.MENU);
    }, 5500);
  };

  return LoadScene;
}(Phaser.Scene);

exports.LoadScene = LoadScene;
},{"../CST":"src/CST.ts"}],"src/scenes/MenuScene.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuScene = void 0;

var CST_1 = require("../CST");

var MenuScene =
/** @class */
function (_super) {
  __extends(MenuScene, _super);

  function MenuScene() {
    return _super.call(this, {
      key: CST_1.CST.SCENES.MENU
    }) || this;
  }

  MenuScene.prototype.create = function () {
    var _this = this;

    this.anims.create({
      key: "poop_select",
      frames: this.anims.generateFrameNumbers("poop_select", {}),
      frameRate: 20,
      repeat: 0
    });
    this.add.image(400, 150, "logo").setScale(2);
    var playButton = this.add.image(400, 300, 'play');
    var optionsButton = this.add.image(400, 400, 'options');
    this.input.on('pointerdown', function (pointer) {
      _this.add.sprite(pointer.x + 30, pointer.y + 240, 'poop_select').play('poop_select');

      _this.sound.play("splet");
    }, this);
    playButton.setInteractive();
    playButton.on("pointerup", function () {
      console.log("weeeee");
      setTimeout(function () {
        return _this.scene.start(CST_1.CST.SCENES.PLAY);
      }, 1500);
    }, optionsButton.setInteractive());
    optionsButton.on("pointerup", function () {
      console.log("woooo");
    });
  };

  return MenuScene;
}(Phaser.Scene);

exports.MenuScene = MenuScene;
},{"../CST":"src/CST.ts"}],"src/scenes/PlayScene.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayScene = void 0;

var CST_1 = require("../CST");

var PlayScene =
/** @class */
function (_super) {
  __extends(PlayScene, _super);

  function PlayScene() {
    var _this = _super.call(this, {
      key: CST_1.CST.SCENES.PLAY
    }) || this;

    _this.poopgroup, _this.poop;
    _this.Epoop;
    _this.Epoopgroup;
    _this.enemy;
    return _this;
  }

  PlayScene.prototype.preload = function () {
    this.cursors = this.input.keyboard.createCursorKeys();
  };

  PlayScene.prototype.create = function () {
    var _this = this; //tilemap


    var map = this.make.tilemap({
      key: 'lvl1'
    });
    var tileset = map.addTilesetImage('poop_sheet', 'tiles');
    map.createLayer('background', tileset);
    this.blockslayer = map.createLayer('blocked', tileset);
    this.blockslayer.setCollisionBetween(1, 7, true);
    this.physics.world.bounds.width = 800;
    this.physics.world.bounds.height = 800; //player

    this.player = this.physics.add.sprite(400, 300, 'monkey_head').setCircle(10).setOffset(6);
    this.player.setDepth(2);
    this.physics.add.existing(this.player, true);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.blockslayer);
    this.cameras.main.startFollow(this.player, false);
    this.cameras.main.zoom = 2;
    this.cameras.main.setBounds(0, 0, 800, 800);
    this.input.on('pointermove', function (pointer) {
      _this.player.rotation = Phaser.Math.Angle.Between(_this.player.x, _this.player.y, pointer.worldX, pointer.worldY);
    }, this); //enemys

    var enemy = this.physics.add.group({
      classType: enemys,
      createCallback: function createCallback(go) {
        var enmGo = go;
        enmGo.body.onCollide = true;
      }
    });
    this.enemy = enemy.get(200, 250, 'enemy').setCircle(10).setOffset(6);
    this.physics.add.collider(enemy, this.blockslayer);
    this.physics.add.collider(enemy, this.player, this.handlePlayerEnemyCollision, undefined, this);
    this.enemy.setCollideWorldBounds(true); //scan

    this.scan = this.physics.add.sprite(this.enemy.x - 110, this.enemy.y - 110, 'enemy').setVisible(false).setCircle(120).setOffset(6); //projectile

    this.poopgroup = new poopgroup(this);
    this.input.on('pointerdown', function (pointer) {
      _this.poopgroup.poopthrow(_this.player.x, _this.player.y, _this.player.rotation, _this.blockslayer);
    });
    this.Epoopgroup = new Epoopgroup(this); //keybinds

    this.cursors = this.input.keyboard.createCursorKeys();
    this.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    });
  };

  PlayScene.prototype.handlePlayerEnemyCollision = function (obj1, obj2) {};

  PlayScene.prototype.update = function () {
    var _this = this; //fireanim


    this.input.once('pointerdown', function () {
      _this.player.play("monkey_head");
    }, this); //scan

    this.physics.moveTo(this.scan, this.enemy.x - 110, this.enemy.y - 110, 200);
    if (this.physics.overlap(this.scan, this.player)) this.enemy.rotation = Phaser.Math.Angle.Between(this.enemy.x, this.enemy.y, this.player.x, this.player.y); //move

    var speed = 150;
    var playerVelocity = new Phaser.Math.Vector2();

    if (this.inputKeys.up.isDown) {
      playerVelocity.y = -1;
    } else if (this.inputKeys.down.isDown) {
      playerVelocity.y = 1;
    }

    if (this.inputKeys.left.isDown) {
      playerVelocity.x = -1;
    } else if (this.inputKeys.right.isDown) {
      playerVelocity.x = 1;
    }

    playerVelocity.normalize();
    playerVelocity.scale(speed);
    this.player.setVelocity(playerVelocity.x, playerVelocity.y);
  };

  return PlayScene;
}(Phaser.Scene);

exports.PlayScene = PlayScene; //classes

var Epoop =
/** @class */
function (_super) {
  __extends(Epoop, _super);

  function Epoop(scene, x, y, rotation, blockslayer) {
    return _super.call(this, scene, x, y, 'poop_projectile') || this;
  }

  Epoop.prototype.preUpdate = function (time, delta) {
    if (this.scene.physics.collide(this, this.scene.player)) {
      this.setVisible(false), this.setActive(false), this.scene.sound.play("splet2"), this.scene.scene.start(CST_1.CST.SCENES.GAMEOVER);
    }

    if (this.scene.physics.collide(this, this.scene.blockslayer)) {
      this.setVisible(false), this.setActive(false), this.scene.sound.play("splet2");
    }
  };

  Epoop.prototype.Ethrow = function (x, y, rotation, pointer) {
    this.body.reset(x, y);
    this.setActive(true);
    this.setVisible(true);
    this.setScale(0.1);
    this.play('poop_projectile');
    this.scene.physics.moveTo(this, this.scene.player.x, this.scene.player.y, 250);
    this.rotation = Phaser.Math.Angle.Between(this.scene.enemy.x, this.scene.enemy.y, this.scene.player.x, this.scene.player.y);
    this.setBodySize(20, 20);
    this.scene.sound.play("woesh");
    this.setCollideWorldBounds(true);
  };

  return Epoop;
}(Phaser.Physics.Arcade.Sprite);

var poop =
/** @class */
function (_super) {
  __extends(poop, _super);

  function poop(scene, x, y, rotation, blockslayer) {
    return _super.call(this, scene, x, y, 'poop_projectile') || this;
  }

  poop.prototype.preUpdate = function (time, delta) {
    _super.prototype.preUpdate.call(this, time, delta);

    if (this.scene.physics.collide(this, this.scene.enemy)) {
      this.setVisible(false), this.setActive(false), this.scene.sound.play("splet2"), this.scene.enemy.destroy();
    }

    if (this.scene.physics.collide(this, this.scene.blockslayer)) {
      this.setVisible(false), this.setActive(false), this.scene.sound.play("splet2");
    }
  };

  poop.prototype.fling = function (x, y, rotation, pointer) {
    this.body.reset(x, y);
    this.setActive(true);
    this.setVisible(true);
    this.setScale(0.1);
    this.play('poop_projectile');
    this.scene.physics.moveTo(this, this.scene.input.mousePointer.worldX, this.scene.input.mousePointer.worldY, 250);
    this.setRotation(rotation);
    this.setBodySize(20, 20);
    this.scene.sound.play("woesh");
    this.setCollideWorldBounds(true);
  };

  return poop;
}(Phaser.Physics.Arcade.Sprite);

var poopgroup =
/** @class */
function (_super) {
  __extends(poopgroup, _super);

  function poopgroup(scene) {
    var _this = _super.call(this, scene.physics.world, scene) || this;

    _this.createMultiple({
      frameQuantity: 50,
      classType: poop,
      active: false,
      visible: false,
      key: "poop_projectile"
    });

    return _this;
  }

  poopgroup.prototype.poopthrow = function (x, y, rotation, blockslayer) {
    var poop = this.getFirstDead(false);

    if (poop) {
      poop.fling(x, y, rotation, blockslayer);
      poop.preUpdate(x, y, rotation);
    }
  };

  return poopgroup;
}(Phaser.Physics.Arcade.Group);

var Epoopgroup =
/** @class */
function (_super) {
  __extends(Epoopgroup, _super);

  function Epoopgroup(scene) {
    var _this = _super.call(this, scene.physics.world, scene) || this;

    _this.createMultiple({
      frameQuantity: 50,
      classType: Epoop,
      active: false,
      visible: false,
      key: "poop_projectile"
    });

    return _this;
  }

  Epoopgroup.prototype.poopthrow = function (x, y, rotation, blockslayer) {
    var poop = this.getFirstDead(false);

    if (poop) {
      poop.fling(x, y, rotation, blockslayer);
      poop.preUpdate(x, y, rotation);
    }
  };

  Epoopgroup.prototype.poopEthrow = function (x, y, rotation, blockslayer) {
    var Epoop = this.getFirstDead(false);

    if (Epoop) {
      Epoop.Ethrow(x, y, rotation, blockslayer), Epoop.preUpdate(x, y, rotation);
    }
  };

  return Epoopgroup;
}(Phaser.Physics.Arcade.Group);

var Direction;

(function (Direction) {
  Direction[Direction["UP"] = 0] = "UP";
  Direction[Direction["DOWN"] = 1] = "DOWN";
  Direction[Direction["LEFT"] = 2] = "LEFT";
  Direction[Direction["LEFTDOWN"] = 3] = "LEFTDOWN";
  Direction[Direction["LEFTUP"] = 4] = "LEFTUP";
  Direction[Direction["RIGHT"] = 5] = "RIGHT";
  Direction[Direction["RIGHTDOWN"] = 6] = "RIGHTDOWN";
  Direction[Direction["RIGHTUP"] = 7] = "RIGHTUP";
  Direction[Direction["STOP"] = 8] = "STOP";
})(Direction || (Direction = {}));

var randomDirection = function randomDirection(exclude) {
  var newDirection = Phaser.Math.Between(0, 7);

  while (newDirection === exclude) {
    newDirection = Phaser.Math.Between(0, 7);
  }

  return newDirection;
};

var enemys =
/** @class */
function (_super) {
  __extends(enemys, _super);

  function enemys(scene, x, y, texture) {
    var _this = _super.call(this, scene, x, y, texture) || this;

    _this.direction = Direction.RIGHT;
    scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, _this.handleTileCollision, _this);
    _this.moveEvent = scene.time.addEvent({
      delay: 2000,
      callback: function callback() {
        _this.direction = randomDirection(_this.direction);
      },
      loop: true
    });
    _this.enemythrow = scene.time.addEvent({
      delay: 500,
      callback: function callback() {
        _this.scene.Epoopgroup.poopEthrow(_this.scene.enemy.x, _this.scene.enemy.y, _this.scene.enemy.rotation, _this.scene.blockslayer);

        _this.enemythrow.paused = true;
      },
      loop: true,
      paused: true
    });
    return _this;
  }

  enemys.prototype.destroy = function (fromScene) {
    this.moveEvent.destroy(), this.enemythrow.destroy(), _super.prototype.destroy.call(this, fromScene);
  };

  enemys.prototype.handleTileCollision = function (go, tile) {
    if (go !== this) {
      return;
    }

    this.direction = randomDirection(this.direction);
  };

  enemys.prototype.preUpdate = function (t, dt) {
    _super.prototype.preUpdate.call(this, t, dt);

    var speed = 100;

    if (this.scene.physics.overlap(this.scene.scan, this.scene.player)) {
      //speed = 0,
      this.enemythrow.paused = false;
    }

    switch (this.direction) {
      case Direction.UP:
        this.setVelocity(0, -speed);
        this.setAngle(-90);
        break;

      case Direction.DOWN:
        this.setVelocity(0, speed);
        this.setAngle(90);
        break;

      case Direction.LEFT:
        this.setVelocity(-speed, 0);
        this.setAngle(180);
        break;

      case Direction.LEFTDOWN:
        this.setVelocity(-speed, speed);
        this.setAngle(135);
        break;

      case Direction.LEFTUP:
        this.setVelocity(-speed, -speed);
        this.setAngle(-135);
        break;

      case Direction.RIGHT:
        this.setVelocity(speed, 0);
        this.setAngle(0);
        break;

      case Direction.RIGHTDOWN:
        this.setVelocity(speed, speed);
        this.setAngle(45);
        break;

      case Direction.RIGHTUP:
        this.setVelocity(speed, -speed);
        this.setAngle(-45);
        break;
    }
  };

  return enemys;
}(Phaser.Physics.Arcade.Sprite);
},{"../CST":"src/CST.ts"}],"src/main.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/** @type {import("../typings/phaser")} */

var GameOverScene_1 = require("./scenes/GameOverScene");

var LoadScene_1 = require("./scenes/LoadScene");

var MenuScene_1 = require("./scenes/MenuScene");

var PlayScene_1 = require("./scenes/PlayScene");

var game = new Phaser.Game({
  width: 800,
  height: 600,
  backgroundColor: '#73AA58',
  scene: [LoadScene_1.LoadScene, MenuScene_1.MenuScene, PlayScene_1.PlayScene, GameOverScene_1.GameOverScene],
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      fixedStep: false
    }
  },
  render: {
    pixelArt: true
  },
  scale: {
    zoom: 1.5
  }
});
},{"./scenes/GameOverScene":"src/scenes/GameOverScene.ts","./scenes/LoadScene":"src/scenes/LoadScene.ts","./scenes/MenuScene":"src/scenes/MenuScene.ts","./scenes/PlayScene":"src/scenes/PlayScene.ts"}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50604" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/main.ts"], null)
//# sourceMappingURL=/main.b0a109ad.js.map