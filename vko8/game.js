const game = new Phaser.Game(800, 600, Phaser.WEBGL, "vko9-game", {
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {

    game.load.image("ground", "assets/ground.png");
    game.load.image("coin", "assets/coin 2.png");
    game.load.spritesheet("dudeSpritesheet", "assets/Old hero.png", 16, 16);

}

const dudeScale = 3;
const hightscoreAmount = 5;

//let platforms = [];
let player = null;
let moveSpeed = 5;
let ground = null;
let coins;
let spawnDelay = 3000;

let introGroup = null;
let username = "username";

let score = 0;
let lives = 2;
let scoreText;
let livesText;
let introText;
let leaderboardText;

function create() {

    game.add.plugin(PhaserInput.Plugin);

    // Setup world
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 300;
    game.cursors = game.input.keyboard.createCursorKeys();

    coins = game.add.group();

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

    scoreText = game.add.text(32, 550, 'score: ' + score, {
        font: "20px Arial",
        fill: "#ffffff",
        align: "left"
    });
    livesText = game.add.text(680, 550, 'lives: ' + lives, {
        font: "20px Arial",
        fill: "#ffffff",
        align: "left"
    });

    introGroup = game.add.group();
    introText = game.add.text(game.world.centerX, game.world.centerY, 'Jetpack Jim\n- collect coins -\nEnter name:', {
        font: "40px Arial",
        fill: "#ffffff",
        align: "center"
    });
    introText.anchor.setTo(0.5, 0.5);
    // setTimeout(() => {
    //     introText.visible = false;
    // }, 3000);

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
    nameInput.y += 100;
    nameInput.x = game.world.centerX;

    const startButton = game.add.button(0, 0, "ground", () => {
        introGroup.visible = false;
        nameInput.visible = false;
        startButton.visible = false;
        startButtonText.visible = false;
        spawnCoin();
        setTimeout(spawnCoin, spawnDelay);
        username = nameInput.value;
    });
    startButton.anchor.set(0.5, 0.5);
    startButton.width = 200;
    startButton.height = nameInput.height;
    startButton.x = game.world.centerX;
    startButton.y = nameInput.y + 50;

    const startButtonText = game.add.text(0, 0, "Start", {
        font: "20px Arial",
        fill: "#ffffff",
        align: "left"
    });
    startButtonText.anchor.set(0.5, 0.5);
    startButtonText.x = startButton.x;
    startButtonText.y = startButton.y;
    
    introGroup.add(introText);
    introGroup.add(nameInput);
    introGroup.add(startButton);
    introGroup.add(startButtonText);

    leaderboardText = game.add.text(20, 20, "", {
        font: "20px Arial",
        fill: "#ffffff",
        align: "left"
    });

    fetchScores();
}

function update() {
    handleInput();
    handlePhysics();
}

function render() {
    //game.debug.bodyInfo(player, 16, 24);
}

function handleInput() {
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
    } else if (keyPressed.right) {
        player.x += moveSpeed;
        player.scale.x = dudeScale;
        player.animations.play("walk", 5, true)
    }

    if (keyPressed.up) {
        player.body.velocity.y = -500;
        player.animations.play("jump", 5, true)
    }

    if (!keyPressed.left && !keyPressed.up && !keyPressed.right && !keyPressed.down) {
        player.animations.play("idle", 5, true);
    }
}

function handlePhysics() {
    //game.physics.arcade.collide(player, ground);
    game.physics.arcade.collide(player, coins, playerHitCoin, null, this);
}

function spawnCoin() {

    const bounds = 200;

    const x = bounds*0.5 + Math.random() * (game.world.width - bounds);
    const y = 30 // + Math.random() * (game.world.height - bounds);

    console.log("spawning coin at: " + x + ", " + y);

    const coin = coins.create(x, y, "coin");
    game.physics.arcade.enable(coin, Phaser.Physics.ARCADE);

    coin.scale.set(2, 2);

    coin.groundCheck = setInterval(() => {
        if (coin.y > game.world.height) coinHitGround(coin);
    }, 10);
}

function playerHitCoin(_player, _coin) {

    score += 10;
    scoreText.text = "score: " + score;

    _coin.kill();
    spawnDelay *= 0.99;
    setTimeout(spawnCoin, spawnDelay);
}

function coinHitGround(_coin) {
    clearInterval(_coin.groundCheck);
    _coin.kill();

    lives -= 1;

    if (lives <= 0) {
        introText.text = "Game over! Score: " + score + "\nRefresh to play again.";
        introGroup.visible = true;
        sendScore();
    }

    livesText.text = "lives: " + lives;
}

function sendScore() {
    const data = "username=" + username + "&score=" + score;

    const request = new XMLHttpRequest();
    request.open('POST', './dbAccess.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            // Success!
        } else {
            throw new Error("database error");
        }
    };
    request.send(data);
}

function setLeaderboardText(scores){
    let scoreString = "Hi-scores:\n";

    scores.forEach(function(s) {
        scoreString += s.username + " - " + s.score + "\n";
    }, this);

    leaderboardText.text = scoreString;
}

function fetchScores() {
    var data = "fetchScores=" + hightscoreAmount;

    var request = new XMLHttpRequest();
    request.open('POST', './dbAccess.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.onload = function (data) {
        if (request.status >= 200 && request.status < 400) {
            const response = JSON.parse(data.currentTarget.response);

            const scores = [];
            response.forEach(function(row) {
                scores.push({
                    username: row["username"],
                    score: row["score"]
                })
            }, this);

            setLeaderboardText(scores);
        } else {
            throw new Error("database error");
        }
    };
    request.send(data);
}