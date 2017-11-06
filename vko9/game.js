const game = new Phaser.Game(800, 600, Phaser.WEBGL, "vko9-game", { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image("ground", "assets/ground.png");
    game.load.image("coin", "assets/coin 2.png");
    game.load.spritesheet("dudeSpritesheet", "assets/Old hero.png", 16, 16);

}

const dudeScale = 3;

//let platforms = [];
let player = null;
let moveSpeed = 5;
let ground = null;
let coins;
let spawnDelay = 3000;

let score = 0;
let lives = 2;
let scoreText;
let livesText;
let introText;

function create() {

    game.add.plugin(PhaserInput.Plugin);

    // Setup world
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 300;
    game.cursors = game.input.keyboard.createCursorKeys();

    const nameInput = game.add.inputField(game.world.centerX, game.world.centerY, {
        fill: '#212121',
        fontWeight: 'bold',
        width: 150,
        padding: 8,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 6,
        placeHolder: 'Username',
    });
    nameInput.pivot.x = nameInput.width * 0.5;
    nameInput.pivot.y = nameInput.height * 0.5;
    nameInput.y += 70;

    coins = game.add.group();
    spawnCoin();
    
    // Create player
    player = game.add.sprite(game.world.centerX, game.world.centerY, "dudeSpritesheet");
    player.animations.add("walk", [6, 7, 8, 9, 10, 11]);
    player.animations.add("idle", [0, 1, 2, 3]);
    player.animations.add("jump", [4]);
    player.anchor.setTo(0.5, 1);
    player.scale.set(dudeScale);

    // Set player physics
    game.physics.arcade.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 1000;
    player.body.maxVelocity.y = 500;
    player.body.setSize(12, 15, 3, 1);
    
    player.animations.play("idle", 5, true);

    scoreText = game.add.text(32, 550, 'score: ' + score, { font: "20px Arial", fill: "#ffffff", align: "left" });
    livesText = game.add.text(680, 550, 'lives: ' + lives, { font: "20px Arial", fill: "#ffffff", align: "left" });
    introText = game.add.text(game.world.centerX, game.world.centerY, 'Jetpack Jim\n- collect coins -', { font: "40px Arial", fill: "#ffffff", align: "center" });
    introText.anchor.setTo(0.5, 0.5);
    setTimeout(() => {
        introText.visible = false;
    }, 3000);

    setTimeout(spawnCoin, spawnDelay);
}

function update(){
    handleInput();
    handlePhysics();
}

function render(){
    //game.debug.bodyInfo(player, 16, 24);
}

function handleInput(){
    const keyPressed = {
        left: game.cursors.left.isDown,
        up: game.cursors.up.isDown,
        right: game.cursors.right.isDown,
        down: game.cursors.down.isDown
    }

    if (keyPressed.left) {
        player.x -= moveSpeed;
        player.scale.x = -dudeScale;
        player.animations.play("walk", 5, true)
    }else if (keyPressed.right) {
        player.x += moveSpeed;
        player.scale.x = dudeScale;
        player.animations.play("walk", 5, true)
    }

    if (keyPressed.up)
    {
        player.body.velocity.y = -500;
        player.animations.play("jump", 5, true)
    }

    if(!keyPressed.left && !keyPressed.up && !keyPressed.right && !keyPressed.down){
        player.animations.play("idle", 5, true);
    }
}

function handlePhysics(){
    //game.physics.arcade.collide(player, ground);
    game.physics.arcade.collide(player, coins, playerHitCoin, null, this);
}

function spawnCoin(){

    const bounds = 30;

    const x = bounds + Math.random() * (game.world.width - bounds);
    const y = bounds// + Math.random() * (game.world.height - bounds);

    console.log("spawning coin at: " + x + ", " + y);

    const coin = coins.create(x, y, "coin");
    game.physics.arcade.enable(coin, Phaser.Physics.ARCADE);

    coin.groundCheck = setInterval(() => {
        if(coin.y > game.world.height) coinHitGround(coin);
    }, 10);
}

function playerHitCoin(_player, _coin){

    score += 10;
    scoreText.text = "score: " + score;

    _coin.kill();
    spawnDelay *= 0.99;
    setTimeout(spawnCoin, spawnDelay);
}

function coinHitGround(_coin){
    console.log("asdasd");
    clearInterval(_coin.groundCheck);
    _coin.kill();

    lives -= 1;

    if(lives <= 0){
        introText.text = "You lost!\nRefresh to play again.";
        introText.visible = true;
        sendScore();
    }

    livesText.text = "lives: " + lives;
}

function sendScore(){
    const username = "Pertti";
    var data="username="+username+"&score="+score;

    var request = new XMLHttpRequest();
    request.open('POST', './sendScore.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.onload = function() {
        if (request.status >= 200 && request.status < 400){
        // Success!
        // here you could go to the leaderboard or restart your game.
        } else {
        // We reached our target server, but it returned an error

        }
    };  
    request.send(data);
}