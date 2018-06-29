// Create our 'main' state that will contain the game

var fireButton;
var fireButton1;
var rot=0;
var rot1=0;

var mainState = {
    preload: function() { 
 game.load.image('player', 'assets/player.png');
game.load.image('wall', 'assets/wall.png');
game.load.image('coin', 'assets/coin.png');
game.load.image('enemy', 'assets/enemy.png');
game.load.image('player1', 'assets/player1.png');
game.load.image('bullet', 'assets/bullet.png');
        game.load.audio('jump', 'assets/gun_sound.wav');
        
        game.load.audio('explode', 'assets/explode.wav');
        
    },

    create: function() { 
   game.stage.backgroundColor = '#000000';
this.jumpSound = game.add.audio('jump');
this.jumpSound1 = game.add.audio('explode');

        // Start the Arcade physics system (for movements and collisions)
game.physics.startSystem(Phaser.Physics.ARCADE);

// Add the physics engine to all game objects
game.world.enableBody = true;
// Variable to store the arrow key pressed
this.cursor = game.input.keyboard.createCursorKeys();

// Create the player in the middle of the game
this.player = game.add.sprite(70, 100, 'player');
this.player1 = game.add.sprite(627, 108, 'player1');
        
keyu = game.input.keyboard.addKey(Phaser.Keyboard.W);
keyd = game.input.keyboard.addKey(Phaser.Keyboard.S);
keyl = game.input.keyboard.addKey(Phaser.Keyboard.A);
keyr = game.input.keyboard.addKey(Phaser.Keyboard.D);
        //car.body.allowRotation = true;
// Add gravity to make it fall
//this.player.body.gravity.y = 600;
// Create 3 groups that will contain our objects
this.walls = game.add.group();
this.coins = game.add.group();
this.enemies = game.add.group();
//this.bullet=game.add.group();
this.wepon = game.add.weapon(100, 'bullet');
this.wepon1 = game.add.weapon(100, 'bullet');

    //  The 'rgblaser.png' is a Sprite Sheet with 80 frames in it (each 4x4 px in size)
    //  The 3rd argument tells the Weapon Plugin to advance to the next frame each time
    //  a bullet is fired, when it hits 80 it'll wrap to zero again.
    //  You can also set this via this.weapon.bulletFrameCycle = true
    
        this.wepon1.setBulletFrames(0, 100, true);
this.wepon1.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
    this.wepon1.bulletLifespan=1000;
   this.wepon1.bulletSpeed = 20;
this.wepon1.fireRate = 50;
this.player1.anchor.set(0.5);

        
        
        
        
        game.physics.arcade.enable(this.player1);

    this.player1.body.drag.set(70);
    this.player1.body.maxVelocity.set(200);

    //  Tell the Weapon to track the 'player' Sprite
    //  With no offsets from the position
    //  But the 'true' argument tells the weapon to track sprite rotation
    this.wepon1.trackSprite(this.player1, 0, 0, true);

    //cursors = this.input.keyboard.createCursorKeys();

    fireButton1 = this.input.keyboard.addKey(Phaser.KeyCode.Q);

	this.wepon.setBulletFrames(0, 100, true);
   
    this.wepon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
    this.wepon.bulletLifespan=6000;
    //  The speed at which the bullet is fired
    
    this.wepon.bulletSpeed = 220;

    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 50ms
    this.wepon.fireRate = 50;
    
    //  Wrap bullets around the world bounds to the opposite side
    // weapon.bulletWorldWrap = true;

    //sprite = this.add.sprite(400, 300, 'player');

    this.player.anchor.set(0.5);
    
    game.physics.arcade.enable(this.player);

    this.player.body.drag.set(70);
    this.player.body.maxVelocity.set(200);

    //  Tell the Weapon to track the 'player' Sprite
    //  With no offsets from the position
    //  But the 'true' argument tells the weapon to track sprite rotation
    this.wepon.trackSprite(this.player, 0, 0, true);

    //cursors = this.input.keyboard.createCursorKeys();

    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    
// Design the level. x = wall, o = coin, ! = lava.
var level = [
    '***********************************************',
    '*                                             *',
    '*                                             *',
    '*            *',
    '*      *****     ***** ',
    '*      ******                      *****',
    '*  *                                   ',
    '*  *                                   *',
    '*  *                                    ',
    '*  *************                          ',
    '*  **************************************',
    '*  ',
    '*                                             *',
    '*                                             *',
    '*  ',
    '*   *',
    '*                     *',
    '*         *',
    '*          *',
    '*  **********        *',
    '*          *',
    '*          *',
    '*         ***************************** *',
    '*          *',
    '*                                             *',
    '*                                             *',
    '***********************************************',
    ];



//And to actually have the level displayed, add this just below the previous code.

// Create the level by going through the array
for (var i = 0; i < level.length; i++) {
    for (var j = 0; j < level[i].length; j++) {

        // Create a wall and add it to the 'walls' group
        if (level[i][j] == '*') {
            var wall = game.add.sprite(30+20*j, 30+20*i, 'wall');
            this.walls.add(wall);
            wall.body.immovable = true; 
        }

        // Create a coin and add it to the 'coins' group
        else if (level[i][j] == 'o') {
            var coin = game.add.sprite(30+20*j, 30+20*i, 'coin');
            this.coins.add(coin);
        }

        // Create a enemy and add it to the 'enemies' group
        else if (level[i][j] == '!') {
            var enemy = game.add.sprite(30+20*j, 30+20*i, 'enemy');
            this.enemies.add(enemy);
        }
    }
}
    },

    update: function() {
        
        if (fireButton1.isDown && this.player1.alive) {
            this.wepon1.fire();
            this.jumpSound.play(); 
        }
        if (fireButton.isDown && this.player.alive) {
            this.wepon.fire();
            this.jumpSound.play(); 
        }
		this.player1.body.velocity.x=0;
		this.player1.body.velocity.y=0;
		this.player.body.velocity.x=0;
        this.player.body.velocity.x=0;
        this.player.body.angularVelocity=0;    
        
        if (keyl.isDown) {
			this.player1.body.angularVelocity=-200;


        }
        else if (keyr.isDown) {            
            this.player1.body.angularVelocity=200;



        }
        
        else this.player1.body.angularVelocity = 0;
        if (keyu.isDown) {
        
		 game.physics.arcade.velocityFromAngle(this.player1.angle, 150, this.player1.body.velocity);
        }
		else
			game.physics.arcade.velocityFromAngle(this.player1.angle, 0, this.player1.body.velocity);
        if (this.cursor.left.isDown)
            {
         
				this.player.body.angularVelocity=-200;

            }
        else if (this.cursor.right.isDown) 
        {            
         	this.player.body.angularVelocity=200;

        }

        else 
            this.player.body.angularVelocity = 0;

  
        if (this.cursor.up.isDown)
        {
			game.physics.arcade.velocityFromAngle(this.player.angle, 150, this.player.body.velocity);
        }
		else
			game.physics.arcade.velocityFromAngle(this.player.angle, 0, this.player.body.velocity);
	    game.physics.arcade.collide(this.player, this.walls);
        game.physics.arcade.collide(this.player1, this.walls);
        game.physics.arcade.collide(this.player1, this.player);
        game.physics.arcade.collide(this.wepon.bullets, this.walls);
        game.physics.arcade.collide(this.wepon1.bullets, this.walls);


        
        game.physics.arcade.overlap(this.player1, this.wepon.bullets, this.takeCoin, null, this);
        game.physics.arcade.overlap(this.player, this.wepon1.bullets, this.takeCoin1, null, this);

        
    },


// Function to kill a coin
takeCoin: function(player1) {
    this.player1.kill();
    this.jumpSound1.play(); 
    
},
takeCoin1: function(player) {
    this.player.kill();
    this.jumpSound1.play(); 
    
},

// Function to restart the game
restart: function() {
    game.state.start('main');
},
    render: function()
    {
    this.wepon.debug();
		game.debug.spriteInfo(this.player1, 32, 32);
    game.debug.text('angularVelocity: ' + this.player1.body.angularVelocity, 32, 200);
    game.debug.text('angularAcceleration: ' + this.player1.body.angularAcceleration, 32, 232);
    game.debug.text('angularDrag: ' + this.player1.body.angularDrag, 32, 264);
    game.debug.text('deltaZ: ' + this.player1.body.deltaZ(), 32, 296);
			game.debug.spriteInfo(this.player, 32, 32);
    game.debug.text('angularVelocity: ' + this.player.body.angularVelocity, 32, 200);
    game.debug.text('angularAcceleration: ' + this.player.body.angularAcceleration, 32, 232);
    game.debug.text('angularDrag: ' + this.player.body.angularDrag, 32, 264);
    game.debug.text('deltaZ: ' + this.player.body.deltaZ(), 32, 296);


        
},
};


// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(1000, 600);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState); 

// Start the state to actually start the game
game.state.start('main');
