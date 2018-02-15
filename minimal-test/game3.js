(function() {
     var config = {
        type: Phaser.AUTO,
        parent: 'phaser',
        width: 800,
        height: 400,
        scene: {
            init: init,
            preload: preload,
            create: create,
            update: update,
            render: render
        }
    };
    var game = new Phaser.Game(config);
    console.log('game', game);

    function init() {
        // this.game.enableDebug = false;
        // ADD STATS
        this.benchmark = new Stats();
        this.viewport = document.getElementById("phaser");
        this.viewport.appendChild(this.benchmark.domElement);        
    }
    function create() {
        // this.game.disableVisibilityChange = true;
        for(var i = 0; i < 1; i++) { 
            var text = this.add.text(0, 0, "TEXT" + i, { fontSize: 18, fill: "#FFFFFF" });
            console.log('text', text);
            text.setOrigin(0, 0);
        }
        this.benchmark.begin();
        this.benchmark.end();
        
    }
    
    function preload() {
    }

    function update() {
    }

    function render() {
    }


})();