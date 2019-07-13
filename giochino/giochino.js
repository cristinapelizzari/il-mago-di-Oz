function start_giochino() {
var bootState = {
  create: function() {
    console.log('boot ok');
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.state.start('load');
  }
};

var loadState= {
  preload: function() {
    console.log('load ok');

      game.stage.backgroundColor = '#85b5e1';

      game.load.baseURL = './giochino/assets/';
      game.load.crossOrigin = 'anonymous';

      game.load.spritesheet('player', 'dorothy-new2.png', 90, 136, 6);
      game.load.image('platform', 'mattone.png');
      game.load.image('sky', 'sfondo_stile uniformato.png');
      game.load.image('beginning', 'sfondo-play.png');
      game.load.image('win', 'sfondo-win.png');
      game.load.image('window', 'vetrina.png');
      game.load.image('heels', 'scarpe.png');
      game.load.image('price', 'prezzo.png');
      game.load.image('field', 'terra.png');
      game.load.image('restart', 'restart1.png');
      game.load.image('restart2', 'restart2.png');
      game.load.image('clock', 'orologio1.png');
      game.load.image('piggybank', 'porcello2.png');
      game.load.image('firstcoin', 'soldo1.png');
      game.load.image('start', 'tasto-play.png');
      game.load.image('barra', 'barra1.png');
        game.load.image('fine', 'goAhead.png');
      game.load.spritesheet('monkey', 'monkeysUP2.png',128,105,14);
      game.load.image('cerchietto', 'tratteggio.png');
      game.load.spritesheet('splash', 'explosion.png', 75, 75, 28 );
      game.load.spritesheet('coin', 'soldi.png', 50, 50);

  },
  create: function() {
    game.state.start('menu');
  },
};
var menuState = {
  create: function() {
    var begin=game.add.sprite(0,0,'beginning');

    console.log('sonon nel menu');
    var style1 = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
    var inizia = game.add.button(0,0,'start',
      function() {
        console.log('iniziooo');
        game.state.start('play');
      }
  );
    inizia.x=(game.width/2)-(inizia.width/2)+120;
    inizia.y=(game.height/2)-(inizia.height/2)-195;
  },
};
/**
* Generated from the Phaser Sandbox
*
* //phaser.io/sandbox/pZTyzwAJ
*
* This source requires Phaser 2.6.2
*/

//var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gioco2', { preload: preload, create: create, update: update, render: render });

var playState = {

  jumpButton: null,
  resetButton: null,
  player: null,
  platforms: null,
  coin: null,
  terra: null,
  time: null,
  cursors: null,
  monetaOffset: null,
  timeText: null,
  timer: null,
  text: null,
  subtext: null,
  currentCoins: null,
  coinsToWin: null,
  piggybank: null,
  isVictorius: null,
  monkey: null,
  possessedCoins: null,
  splash:null,
  jumpup:null,
  barra: null,


  create: function() {

    time = 90;
    score= 0;
    monetaOffset=38; //0
    currentCoins=0;
    coinsToWin=3;
    isVictorius=false;

    console.log("sono il play e sto andando")

    var sky=game.add.sprite(0,0,'sky');

    terra=game.add.sprite(0,game.height*4-162,'field');
    game.physics.arcade.enable(terra);
    terra.body.immovable = true;

    player = game.add.sprite((game.width/2), game.height*4-400, 'player');
    player.frame = 1;
    game.physics.arcade.enable(player);
    player.body.setSize(50, 136, 22, 0);

    player.body.collideWorldBounds = false;
    player.body.gravity.y = 500;

    game.world.setBounds(0,0, game.width, (game.height*4-81));

    coin = game.add.sprite(game.world.randomX, game.world.randomY-200, 'coin');
    game.physics.arcade.enable(coin);
    coin.body.bounce.y = 0.7 + Math.random() * 0.2;
    coin.body.collideWorldBounds = true;
    var flip = coin.animations.add('flip');
    coin.animations.play('flip', 15, true);

    platforms = game.add.physicsGroup();

    for (contatore = 1; contatore < 11; contatore = contatore + 1)
    { platforms.create(game.world.randomX, contatore*250, 'platform');}

    platforms.forEach(function(item) {

      item.body.velocity.x = Math.random()*100;
      item.body.velocity.y = 0;

    });
    platforms.setAll('body.immovable', true);
    platforms.setAll('body.collideWorldBounds', true);
    platforms.setAll('body.bounce.x', 1);

    monkey = game.add.sprite(game.world.randomX, game.height/2, 'monkey');
    game.physics.arcade.enable(monkey);
    var fly = monkey.animations.add('fly');
    monkey.animations.play('fly', 42, true);
    monkey.body.velocity.x = 350;
    monkey.body.velocity.y = 350;
    monkey.body.collideWorldBounds = true;
    monkey.body.bounce.x=1;
    monkey.body.bounce.y=1;
    //monkey.body.setSize(85, 105, 50, 0);

    barra=game.add.sprite(0, 619, 'barra');
    barra.fixedToCamera = true;

    var ricomincia=game.add.sprite(0, 0,'restart');
    ricomincia.x=barra.x+barra.width/2+350;
    ricomincia.y=barra.y+barra.height/2-ricomincia.height/2;
    ricomincia.fixedToCamera = true;

    var letteraR=game.add.sprite(0, 0,'restart2');
    letteraR.x=barra.x+barra.width/2+400;
    letteraR.y=barra.y+barra.height/2-letteraR.height/2;
    letteraR.fixedToCamera = true;

    var orologio=game.add.sprite(0, 0,'clock');
    orologio.x=barra.x+80;
    orologio.y=barra.y+barra.height/2-orologio.height/2;
    orologio.fixedToCamera = true;

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    resetButton=game.input.keyboard.addKey(Phaser.Keyboard.R);

    timeText = game.add.text(barra.x+140, 0, time, { fontSize: '32px', fill: '#414141' });
    timeText.y=barra.y+barra.height/2-timeText.height/2;
    timeText.fixedToCamera = true;

    timer = game.time.create(false);
    timer.loop(1000,
      function(){
        time--;
        timeText.text = time;
        if (time===0) {
          timer.stop()
          var bar = game.add.graphics();
          bar.beginFill(0x000000, 0.7);
          bar.drawRect(0, 0, game.width, game.height*4);
          text.visible = true;
          subtext.visible = true;
          game.input.onTap.addOnce(function () {
            game.paused = false;
            game.state.restart();
          });
          game.paused = true;
        }
      },
      this);
      timer.start();

      piggybank = game.add.sprite(barra.x+barra.width/2-120,barra.y+barra.height/2,'piggybank');
      piggybank.y-=piggybank.height/2;
      piggybank.fixedToCamera = true;

      var punteggioMonete;
      for (contatore = 0; contatore < coinsToWin; contatore++)
      {punteggioMonete = game.add.sprite(piggybank.x+100+contatore*monetaOffset, barra.y+barra.height/2,'cerchietto');
      punteggioMonete.y-=punteggioMonete.height/2;
      punteggioMonete.fixedToCamera = true;};


      possessedCoins = game.add.group();

      var style1 = { font: "bold 65px MUARA DEMO", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
      text = game.add.text(0, 0, "GAME OVER!", style1);
      text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
      text.setTextBounds(0, 0, game.width, game.height);
      text.fixedToCamera = true;
      text.visible = false;

      var style2 = { font: "bold 25px Roboto", fill: "#fff"};
      subtext = game.add.text(0, 10, "Click to restart", style2);
      subtext.x=(game.width/2)-(subtext.width/2);
      subtext.y=(game.height/2)+30;
      subtext.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
      subtext.setTextBounds(0, 0, game.width, game.height);
      subtext.fixedToCamera = true;
      subtext.visible = false;
    },


  update: function() {

    game.camera.focusOnXY(player.x+38, player.y+93-(barra.height/2));

    game.physics.arcade.collide(player, platforms);

    game.physics.arcade.collide(player, barra);

    game.physics.arcade.collide(monkey, platforms);

    game.physics.arcade.collide(monkey, terra);

    game.physics.arcade.collide(player, monkey,
      function() {
        monkey.body.velocity.x = -350;
        monkey.body.velocity.y = -350;

        splash = game.add.sprite(player.body.position.x, player.body.position.y, 'splash');
        var splashy = splash.animations.add('splashy');
        splash.animations.play('splashy', 45, false);
        splash.scale.setTo(1.5, 1.5);
        console.log("colpito");

        if(currentCoins>0) {
          currentCoins--;
          var lastCoin = possessedCoins.getChildAt(currentCoins);
          lastCoin.kill();
          possessedCoins.removeChild(lastCoin);
        }
      },
      null, this);

      game.physics.arcade.overlap(player, coin,
        function() { //collectCoin
          coin.x = game.world.randomX;
          coin.y = game.world.randomY;
          /*coin.x=game.rnd.integerInRange(0, game.width-coin.width);
          coin.y=game.rnd.integerInRange(0, game.heigth-100);*/
          console.log(coin.y);

          var lastCoin=game.add.sprite(0,0,'firstcoin');
          lastCoin.fixedToCamera=true;
          lastCoin.cameraOffset.setTo((piggybank.x+100+currentCoins*monetaOffset),646);
          possessedCoins.add(lastCoin);
          currentCoins++;

          if(currentCoins==coinsToWin) {
            platforms.kill();
            monkey.kill();
            coin.kill();
            timer.stop();
            isVictorius=true;//victory
          }}, //fine di collectCoin
          null, this);

          if(isVictorius && player.y>game.height*4-300)
          {
            game.state.start('victory');
          }
          game.physics.arcade.collide(player, terra);
          player.body.velocity.x = 0;
          player.frame = 1;

          if(player.body.position.x > 1000)
          {
            player.body.position.x = 1;
          }

          if(player.body.position.x < 0-76)
          {
            player.body.position.x = 999;
          }
          if (cursors.left.isDown)
          {
            player.frame = 0;
            player.body.velocity.x = -250;
          }
          else if (cursors.right.isDown)
          {
            player.frame = 2;
            player.body.velocity.x = 250;
          }
          if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down))
          {
            player.body.velocity.y = -550;
          }
          if(resetButton.isDown){
              game.state.start('play');
          }
          if (cursors.down.isDown)
          {
            player.body.velocity.y +=50;
          }
          if (jumpButton.isDown)
          {
            player.frame=4;

            player.animations.play('jumpup');
          }
          if (cursors.left.isDown&&jumpButton.isDown)
          {
            player.frame=3;
          }
          if (cursors.right.isDown&&jumpButton.isDown)
          {
            player.frame=5;
          }
        },


    render: function() {
    },
  };
var victoryState = {
  create: function() {
    var win=game.add.sprite(0,0,'win');
    console.log('hai vinto');

    var prezzo = game.add.sprite(0, 0,'price');
    prezzo.x=game.width/2+80;
    prezzo.y=game.height/2+22;
    prezzo.fixedToCamera = false;
    game.physics.arcade.enable(prezzo);
    prezzo.alpha = 1;

    var vetrina = game.add.sprite(0, 0,'window');
    vetrina.position.x=(game.width/2)-(vetrina.width/2)-2.5;
    vetrina.position.y=(game.height/2)-(vetrina.height/2)+31.5;
    vetrina.fixedToCamera = false;
    game.physics.arcade.enable(vetrina);
    //vetrina.alpha = 1;

    var style3 = { font: "bold 40px Arial", fill: "#fff"};//, boundsAlignH: "center", boundsAlignV: "middle" };
    var testoV = game.add.text((game.width/2+60), (game.height/2), "You did it!", style3);
    //text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    testoV.setTextBounds(0, 0, game.width, game.height);
    testoV.x=(game.width/2)-(testoV.width/2);
    testoV.y=(game.height/2)-(testoV.height/2)+vetrina.height/2-20;
    testoV.alpha = 0;
    game.add.tween(testoV).to( { alpha: 1 }, 1200, "Linear", true);

    console.log("muovi vetrina"); //vetrinaOut
    game.physics.arcade.enable(vetrina);
    vetrina.outOfBoundsKill = true;
    vetrina.body.acceleration.x = -1000;
    vetrina.body.velocity.x = 0;
    console.log("mosso vetrina");
    game.add.tween(vetrina).to( { alpha: 0 }, 900, "Linear", true);

    console.log("muovi prezzo"); //prezzoOut
    game.physics.arcade.enable(prezzo);
    vetrina.outOfBoundsKill = true;
    console.log("mosso prezzo");
    prezzo.body.acceleration.x = 1000;
    prezzo.body.velocity.x = 0;
    game.add.tween(prezzo).to( { alpha: 0 }, 900, "Linear", true);

   var fine = game.add.button(0,0, "fine",
 function() {
   game.state.start("final");
 }
);
fine.x=(game.width/2)-(fine.width/2);
fine.y=37;


  }



}
var finalState= {
  create: function() {
  vaiSinistra();
  game.state.start("menu");
}
}
var game = new Phaser.Game(1000, 700, Phaser.AUTO, 'gioco1')
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('victory', victoryState);
game.state.add('final', finalState);
game.state.start('boot');
}

start_giochino()
