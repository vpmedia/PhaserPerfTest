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
    console.log(game);
    
    function init() {
        
        // SET THE NUMBER OF TEXT OBJECTS YOU WANT TO HAVE CREATED INITIALLY
        // YOU CAN CREATE 50 MORE BY CLICKS / TOUCHES
        this.number_of_text_objects = 100;
        
        // ADD STATS
        this.benchmark = new Stats();
        this.viewport = document.getElementById("phaser");
        this.viewport.appendChild(this.benchmark.domElement);
        
        // DISABLE ANTI ALIAS
        game.antialias = false;
        
        // SET BG COLOR (clear before render overrides it)
        // game.stage.backgroundColor = "#0000AA";
        
        // should the game loop force a logic update, regardless of the delta timer
        // phaser.io/docs/2.6.2/Phaser.Game.html#forceSingleUpdate
        game.forceSingleUpdate = false;
        
        // phaser.io/docs/2.6.2/Phaser.Input.html#maxPointers
        this.input.maxPointers = 1;
        
        // round coordinates to whole pixels
        // game.renderer.renderSession.roundPixels = true;
        
        // clear the canvas each frame before rendering the display list.
        // phaser.io/docs/2.6.2/Phaser.Game.html#clearBeforeRender
        game.clearBeforeRender = false;
        
        // ALLOW OR FORBID CANVAS RESIZING AND CENTERING
        // (should not make any difference concerning the performance)
        this.allow_rescale_and_centering = false;
        if (this.allow_rescale_and_centering) {
            // Keep aspect ratio on scale
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            // Center the viewport containing the canvas and the benchmark element
            this.scale.setResizeCallback(function() {
                var screen_height = document.documentElement.clientHeight;
                var canvas_height = parseInt(game.canvas.style.height.split("px")[0], 10);
                var offset_y = Math.floor((screen_height - canvas_height) / 2);
                this.viewport.style.paddingTop = (offset_y > 0 ? offset_y + "px" : "0");

                var screen_width = document.documentElement.clientWidth;
                var viewport_width = Math.min(screen_width, Math.floor(screen_height * 2));
                this.viewport.style.width = viewport_width + "px";

                var offset_x = Math.floor((screen_width - viewport_width) / 2);
                this.viewport.style.left = (offset_x > 0 ? offset_x + "px" : "0");

            }, this);            
        }
    }

    
    function preload() {}

    function create() {
        // The first text object which always exists
        this.textDebug1 = this.add.text(100, 0, "Phaser: " + Phaser.VERSION + " | Render: " + game.renderType + " | AntiAlias: " + game.antialias, { fontFamily: 'Arial', fontSize: 24, fill: "#FF0000" });
        this.textDebug2 = this.add.text(100, 30, "Text no.: " + Math.max(1, this.number_of_text_objects), { fontFamily: 'Arial', fontSize: 24, fill: "#FFFF00" });
        console.log(this.add.group());
        // Additional text objects
        for (var i = 1; i < this.number_of_text_objects; i++) {
            this.add.text(Math.random() * 400, 50 + (Math.random() * 300), "Text object #" + (i + 1), { fontFamily: 'Arial', fontSize: 18, fill: "#FFFFFF" });
        }
        // Create more text by click
        var scope = this;
        /* game.input.onDown.add(function() {                            
            console.log('addText');
            for (var i = 1; i < 50; i++) {
                scope.add.text(Math.random() * 400, 100 + (Math.random() * 300), "Text object #" + (scope.number_of_text_objects), {fontSize: 18, fill: "#FFFFFF"});
                scope.number_of_text_objects += 1;
            }
            scope.textDebug2.text = "Text no.: " + Math.max(1, this.number_of_text_objects);                            
        }, this);  */
    }

    function update() {
        this.benchmark.begin();
        this.benchmark.end();
    }

    function render() {
        this.benchmark.end();
    }

})();