var mainState = {

    preload: function () {

        this.game.load.image('O-block', 'assets/O-block.png');
        this.game.load.image('I-block', 'assets/I-block.png');
        this.game.load.image('L-block', 'assets/L-block.png');
        this.game.load.image('J-block', 'assets/J-block.png');
        this.game.load.image('Z-block', 'assets/Z-block.png');
        this.game.load.image('S-block', 'assets/S-block.png');
        this.game.load.image('T-block', 'assets/T-block.png');
        this.game.load.image('wallH', 'assets/wallHorizontal.png');
        this.game.load.image('wallV', 'assets/wallVertical.png');
        this.game.load.image('background', 'assets/background.png');


        //	Load our physics data exported from PhysicsEditor
        game.load.physics('physicsData', 'assets/sprite_physics.json');
    },

    create: function () {

        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.gravity.y = 1000;

        this.createWorld();


        this.actual = this.game.add.sprite(215, 20, 'T-block');

        this.game.physics.p2.enable([this.actual], false);

        // Get rid of current bounding box
        this.actual.body.clearShapes();
        this.actual.body.mass = 4;
        this.actual.body.data.motionState=4;

        // Add our PhysicsEditor bounding shape
        this.actual.body.loadPolygon('physicsData', 'T-block');


        //this.actual.anchor.setTo(0.5, 0.5);
        //game.physics.p2.enable(actual, true);
        /*
        contra = game.add.sprite(100, 200, 'contra2');
        bunny = game.add.sprite(500, 250, 'bunny');
        tetris1 = game.add.sprite(100, 400, 'tetrisblock1');
        tetris2 = game.add.sprite(300, 450, 'tetrisblock2');
        tetris3 = game.add.sprite(600, 450, 'tetrisblock3');

        //	Enable the physics bodies on all the sprites and turn on the visual debugger
        game.physics.p2.enable([contra, bunny, tetris1, tetris2, tetris3], true);

        //	Clear the shapes and load the 'contra2' polygon from the physicsData JSON file in the cache
        contra.body.clearShapes();
        contra.body.loadPolygon('physicsData', 'contra2');

        bunny.body.clearShapes();
        bunny.body.loadPolygon('physicsData', 'bunny');

        tetris1.body.clearShapes();
        tetris1.body.loadPolygon('physicsData', 'tetrisblock1');

        tetris2.body.clearShapes();
        tetris2.body.loadPolygon('physicsData', 'tetrisblock2');

        tetris3.body.clearShapes();
        tetris3.body.loadPolygon('physicsData', 'tetrisblock3');

        //	Just starts it rotating
        game.input.onDown.add(boom, this);
        */
    },
    /*
        function boom() {

            if (game.input.activePointer.x > tetris1.x) {
                tetris1.body.rotateLeft(200);
            } else {
                tetris1.body.rotateRight(200);
            }

            if (game.input.activePointer.y < tetris1.y) {
                tetris1.body.moveForward(400);
            } else {
                tetris1.body.moveBackward(400);
            }

        }
        */
    update: function () {
        //game.physics.arcade.collide(this.actual, this.walls);
    },
    createWorld: function () {
        this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');

        this.walls = this.game.add.group();
        this.walls.enableBody=true;
        this.walls.physicsBodyType = Phaser.Physics.P2JS;

        this.game.add.sprite(20, 20, 'wallV', 0, this.walls); // Left
        this.game.add.sprite(380, 20, 'wallV', 0, this.walls); // Right
        this.game.add.sprite(20, 560, 'wallH', 0, this.walls); // Bottom

        this.game.physics.p2.enable(this.walls);

        this.walls.setAll('body.static', true);
        this.walls.setAll('anchor.x', 0);
        this.walls.setAll('anchor.y', 0);
    }

}

// We initialising Phaser
var game = new Phaser.Game(600, 600, Phaser.AUTO, 'gameDiv');
// And finally we tell Phaser to add and start our 'main' state

game.state.add('main', mainState);
game.state.start('main');
