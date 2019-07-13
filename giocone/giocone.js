function start_giocone(){
var bootState2 = {
  create: function() {
    console.log('boot ok');
    game2.physics.startSystem(Phaser.Physics.ARCADE);
    game2.state.start('load-vs');
  }
};

var loadState2= {
  preload: function() {
    console.log('load ok');

      game2.stage.backgroundColor = '#85b5e1';

      game2.load.baseURL = './giocone/assets/';
      game2.load.crossOrigin = 'anonymous';

      game2.load.spritesheet('player', 'dorothyVS.png', 76, 136);
      game2.load.spritesheet('monkey', 'monkeysheet.png', 119.43, 100, 14);
      game2.load.spritesheet('bullet', 'bulletspritesheet.png', 20, 20, 8);
      game2.load.spritesheet('splash', 'splashspritesheet.png', 142, 90, 8);
      game2.load.spritesheet('puff', 'puff.png', 109.9, 111, 9);
      game2.load.spritesheet('witchmove', 'wickedwitchspritesheet.png', 142, 91, 12);
      game2.load.image('heart', 'Cuore.png');
      game2.load.image('brick', 'brick.png');
      game2.load.image('witchlifeback', 'lifebarback_1.png');
      game2.load.image('bar', 'rect.png');
      game2.load.image('tower', 'towerhigher_1.png');
      game2.load.image('dorothylife', 'concorrente1.png');
      game2.load.image('wwlife', 'concorrente2.png');
      game2.load.image('back', 'Sfondo.png');
      game2.load.image('start', 'tasto-play.png');
      game2.load.image('beginning', 'sfondo-play.png');
      game2.load.image('win', 'Winner.png');
      game2.load.image('fine', 'goAhead.png');

      game2.load.image('YouWin', 'TheWitchIsDead.png');
      game2.load.image('YouLost', 'YouLost.png');

  },
  create: function() {
    game2.state.start('menu-vs');
  },
};

var menuState2 = {
  create: function() {
    var begin=game2.add.sprite(0,0,'beginning');

    console.log('sono nel menu');
    var style1 = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
    var inizia2 = game2.add.button(0,0,'start',
      function() {
        console.log('inizio');
        game2.state.start('play-vs');
      }
  );
    inizia2.x=420;
    inizia2.y=595;
  },
};

var playState2 = {
monkeys:null,
//var lazers;
shoot:null,
player:null,
witch:null,
lives:null,
witchlife:null,
bricks:null,
bar:null,
tower:null,
back:null,
dorothylife:null,
wwlife:null,
cursors:null,
fireButton:null,
bulletTime:null,
bullet:null,
style1:null,

youwin:null,
youlost:null,



create:function () {
    bulletTime=0;

    game2.world.setBounds(0, 0, 1000, 610); //ANCHE SE dovrò cambiare quando aggiungo roba

    //Scenario all'interno del game world
    back = game2.add.sprite(0, 0, 'back');
    tower = game2.add.sprite(- 5, 4, 'tower');

    //Parte fuori dal game world
    bar = game2.add.sprite(0, 619, 'bar');
    var barunder = game2.add.graphics();
    barunder.beginFill(0xffffff, 0.8);
    barunder.drawRect(0, 619, 1000, 81);

    //Icone per far capire quale vita è di quale personaggio
    dorothylife = game2.add.sprite(0, 625, 'dorothylife');
    dorothylife.scale.setTo(0.8, 0.8);

    wwlife = game2.add.sprite(920, 600, 'wwlife');
    wwlife.scale.setTo(0.8, 0.8);

    // Cuori della vita di Dorothy
    lives = game2.add.group();
    lives.create(128,660, 'heart').anchor.set(0.5);
    lives.create(178,660, 'heart').anchor.set(0.5);
    lives.create(228,660, 'heart').anchor.set(0.5);

    lives.forEach (function(item) {
        item.scale.setTo(0.45, 0.45);
      });

    //Barra della vita della Strega dell'Ovest - con fondo marrone
    witchlifeback = game2.add.sprite(500, 645, 'witchlifeback');

    //Barra della vita verde
    /*witchlife = game.add.sprite(902.5, 645, 'witchlife');
    witchlife.enableBody = true;
    witchlife.scale.setTo(-0.5, 0.5);*/
    bricks = game2.add.group();
    bricks.enableBody = true;
    bricks.physicsBodyType = Phaser.Physics.ARCADE;

    var brick;
    for (var x=1; x < 26; x++)
      {brick = bricks.create(900-16*x, 645, 'brick')};

    //Dorothy
    player = game2.add.sprite(70, 350, 'player');
    player.frame = 1;
    game2.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;

    player.anchor.x = 0.5;
    player.scale.setTo(0.75, 0.75);

    //Colpi che Dorothy spara
    shoot = game2.add.group();
    shoot.enableBody = true;
    shoot.physicsBodyType = Phaser.Physics.ARCADE;
    shoot.createMultiple(3, 'bullet');
    shoot.setAll('anchor.x', -1);
    shoot.setAll('anchor.y', - 1);
    shoot.setAll('outOfBoundsKill', true);
    shoot.setAll('checkWorldBounds', true);

    shoot.forEach(function(item) {
    var bang = item.animations.add('bang');
    item.animations.play('bang', 20, true);
});

    //Scimmie volanti
    monkeys = game2.add.group();
    game2.physics.arcade.enable(monkeys);
    monkeys.enableBody = true;
    monkeys.physicsBodyType = Phaser.Physics.ARCADE;
    monkeys.setAll('outOfBoundsKill', true);

    monkeys.forEach(function(item) {


  });

    //Strega dell'Ovest
    witch = game2.add.sprite(800, game2.world.randomY, 'witchmove');
    var fly = witch.animations.add('fly');
    witch.animations.play('fly', 17, true);
    witch.scale.setTo(1.15, 1.15);

    game2.physics.arcade.enable(witch);
    witch.enableBody = true;
    //witch.body.immovable = true;
    witch.physicsBodyType = Phaser.Physics.ARCADE;
    witch.body.velocity.y = 70;
    witch.body.collideWorldBounds = true;
    witch.body.bounce.y = 1;

    //  witch.body.bounce.x = 1;
    //witch.body.velocity.x = 10;

    // CON IL PACCHETTO SEGUENTE LA STREGA SI MUOVE IN GIRO
    //PER IL GIOCO ANDANDO A SBATTERE CONTRO I WORLD BOUNDS
    //MA NON SI CONTROLLA LA VELOCITà, SOLO LA GRAVITY
      /*  witch.body.gravity.x = game.rnd.integerInRange(-50, 50);
        witch.body.gravity.y = 100 + Math.random() * 100;
        witch.body.bounce.setTo(0.9, 0.9);*/


    cursors = game2.input.keyboard.createCursorKeys();
    fireButton = game2.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);



    //Queste stringhe permettono alle scimmie volanti di comparire con regolarità
    game2.time.events.add(Phaser.Timer.SECOND*0, function () {
      for (var i = 0; i < 6; i++)
    {
        monkeys.create(800, game2.world.randomY - 50, 'monkey');
        //monkeys.body.velocity.x = 50;
        monkeys.forEach(function(item) {


        item.body.velocity.x = - Math.random()*100;
        item.scale.setTo(0.6,0.6);
        item.body.collideWorldBounds = false;

        var enemy = item.animations.add('enemy');
        item.animations.play('enemy', 30, true);



        /* if (monkeys.x < 150) {
          monkeys.kill();
        } */


    });
    }
    }, this);

    game2.time.events.loop(Phaser.Timer.SECOND * 7, function () {
      for (var i = 0; i < 6; i++)
    {
        monkeys.create(800, game2.world.randomY - 50, 'monkey');
        //monkeys.body.velocity.x = 50;
        monkeys.forEach(function(item) {

        /* puff = game.add.sprite(item.body.position.x - 30, item.body.position.y, 'puff');
          var puffy = puff.animations.add('puffy');
          puff.animations.play('puffy', 10, false);
          //puff.scale.setTo(1.5, 1.5); */

        item.body.velocity.x = - Math.random()*200;
        item.scale.setTo(0.6, 0.6);
        item.body.collideWorldBounds = false;

        var enemy = item.animations.add('enemy');
        item.animations.play('enemy', 30, true);


        /* if (monkeys.x < 150) {
          monkeys.kill();
        } */


    });
    }
    }, this);


},

/*addMonk: function () {
  for (var i = 0; i < 6; i++)
{
    monkeys.create(800, game.world.randomY - 50, 'monkey');
    //monkeys.body.velocity.x = 50;
    monkeys.forEach(function(item) {

    item.body.velocity.x = - Math.random()*100;
    item.scale.setTo(0.3, 0.3);
    item.body.collideWorldBounds = false;
});
}
},*/



update:function () {

  game2.physics.arcade.overlap(monkeys, player, function(player, monkeys) {
    lives.getTop().destroy();
    monkeys.kill();


   if(lives.length == 0){

      /*var*/ bar = game2.add.graphics();
      bar.beginFill(0x000000, 0.7);
      bar.drawRect(0, 0, 1000, 700);

      var youlost = game2.add.sprite(0,0, 'YouLost');
      youlost.x = game2.width/2-youlost.width/2;
      youlost.y = game2.height/2-youlost.height/2;

        game2.input.onTap.addOnce(function () {
        game2.paused = false;
        game2.state.restart();
        });
        game2.paused = true;
      }
  }, null, this);   //quando hai ancora vite

  game2.physics.arcade.overlap(player, monkeys, function(player, monkeys) {
    console.log("DorothyDies");
    player.kill();
  }, null, this);  //quando le vite finiscono

  game2.physics.arcade.overlap(shoot, monkeys, function(shoot, monkeys) {
    console.log("Ho colpito la scimmia!");
    monkeys.kill();
    shoot.kill();
  }, null, this); //uccidi le scimmie

  game2.physics.arcade.overlap(shoot, witch, function(witch, shoot) {
    splash = game2.add.sprite(witch.body.position.x, witch.body.position.y, 'splash');
    var splashy = splash.animations.add('splashy');
    splash.animations.play('splashy', 45, false);
    splash.scale.setTo(1.5, 1.5);

    if(bricks.length > 0) {
    bricks.getTop().destroy();
    shoot.kill();
  }


    else{

    game2.state.start('victory-vs');
    //game.add.tween(monkeys).to({alpha: 0}, 900, Phaser.Easing.Linear.None, true);
    //game.add.tween(witch).to({alpha: 0}, 900, Phaser.Easing.Linear.None, true);

    //game.paused = true;

    /*  bar = game.add.graphics();
      bar.beginFill(0x000000, 0.7);
      bar.drawRect(0, 0, 1000, 700);

      var youwin = game.add.sprite(0,0, 'YouWin');
      youwin.x = game.width/2-youwin.width/2;
      youwin.y = game.height/2-youwin.height/2;
      game.paused = true; */

    }
  }, null, this);
  //
  /*  if (cursors.left.isDown)
    {
        player.x -= 8;
        player.scale.x = -1;
    }
    else if (cursors.right.isDown)
    {
        player.x += 8;
        player.scale.x = 1;
    } */ //tolgo i comandi per Right e Left perchè tanto voglio che si muova solo sulla colonna


    if (cursors.up.isDown)
    {
        player.y -= 8;
        player.frame = 0;
    }
    else if (cursors.down.isDown)
    {
        player.y += 8;
        player.frame = 1;
    }

    if (fireButton.isDown)
    {
      player.frame = 2;
//adesso parte la funzione fireBullets
          //  To avoid them being allowed to fire too fast we set a time limit
          if (game2.time.now > bulletTime)
          {
              //  Grab the first bullet we can from the pool
              bullet = shoot.getFirstExists(false);

              if (bullet)
              {
                  //  And fire it
                  bullet.reset(player.x, player.y + 8);
                  bullet.body.velocity.x = 500;
                  bulletTime = game2.time.now + 100;
              }


      };
//fine della funzione fireBullets
        console.log("aloah");

    }

    //lazers.forEachAlive(updateBullets, this);

    //prevCamX = game.camera.x;

    if (witch.body.position.y < 3) {

witch.body.acceleration.y = 2*witch.body.velocity.y;
    //  witch.body.velocity.x = 50;
    //  witch.body.velocity.y = 100;
    }

},



    /*var style1 = { font: "bold 40px Brandon Grotesque", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
    text = game.add.text(0, 0, "THE WICKED WITCH IS DEAD!", style1);
    text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    text.setTextBounds(0, 0, 1000, 700);

    var style1 = { font: "bold 25px Brandon Grotesque", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
    subtext = game.add.text(0, 0, "Go ahead", style1);
    subtext.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    subtext.setTextBounds(0, 50, 1000, 700);*/

    /* game.input.onTap.addOnce(function () {
    game.paused = false;
    game.state.restart();
  }); */ //qua si mette il link alla pagina successiva!
    //game.paused = true;


render: function() {
   //weapon.debug();
},


};
var victoryState2= {
  create: function() {
 var haivinto=game2.add.sprite(0,0,'win');

 var fine2 = game2.add.button(0,0, 'fine',
function() {
  console.log("hai cliccato go ahead")
 game2.state.start("final-vs");
}
);
//fine2.x=610;
//fine2.y=410;
fine2.x=(game2.width/2)-(fine2.width/2);
fine2.y=70;
}
}

var finalState2= {
  create: function() {
  vaiSinistra();
  game2.state.start("menu-vs");
}
}
var game2 = new Phaser.Game(1000, 700, Phaser.AUTO, 'gioco2')
game2.state.add('boot-vs', bootState2);
game2.state.add('load-vs', loadState2);
game2.state.add('menu-vs', menuState2);
game2.state.add('play-vs', playState2);
game2.state.add('victory-vs', victoryState2);
game2.state.add('final-vs', finalState2);
game2.state.start('boot-vs');

}
start_giocone()
