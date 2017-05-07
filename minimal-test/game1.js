(function() {
    new Phaser.Game(800, 400, Phaser.AUTO, "phaser", {
        init: init,
        preload: preload,
        create: create,
        update: update,
        render: render
    });

    function init() {
        this.game.enableDebug = false;
        // ADD STATS
        this.benchmark = new Stats();
        this.viewport = document.getElementById("phaser");
        this.viewport.appendChild(this.benchmark.domElement);        
    }
    function create() {
        this.game.disableVisibilityChange = true;
        for(var i = 0; i < 1; i++) { 
            var text = this.game.add.text(Math.random()*200, Math.random()*200, "TEXT" + i, { fontSize: 18, fill: "#FFFFFF" });
        }
        // stop updating the world to only do one tick
        this.update();
        this.game.update = function(){};
        
    }
    
    function preload() {
    }

    function update() {
        this.benchmark.begin();
    }

    function render() {
        this.benchmark.end();
    }


})();