(function() {

				new Phaser.Game(800, 400, Phaser.AUTO, "phaser", {
					init: init,
					preload: preload,
					create: create,
					update: update,
					render: render
				});

				function init() {

					// SET THE NUMBER OF TEXT OBJECTS YOU WANT TO HAVE CREATED
					this.number_of_text_objects = 10;

					// ALLOW OR FORBID CANVAS RESIZING AND CENTERING
					// (should not make any difference concerning the performance)
					this.allow_rescale_and_centering = true;

					this.benchmark = new Stats();
					this.viewport = document.getElementById("phaser");
					this.viewport.appendChild(this.benchmark.domElement);

					this.game.stage.backgroundColor = "#0000AA";

					if (this.allow_rescale_and_centering) {

						// Keep aspect ratio on scale
						this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

						// Center the viewport containing the canvas and the benchmark element
						this.scale.setResizeCallback(function() {

							var screen_height = document.documentElement.clientHeight;
							var canvas_height = parseInt(this.game.canvas.style.height.split("px")[0], 10);
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
					this.game.add.text(
						100, 0,
						"Phaser version: " + Phaser.VERSION + " / Text objects: "
							+ Math.max(1, this.number_of_text_objects),
						{ fill: "#FF0000" });

					// Additional text objects
					for (var i = 1; i < this.number_of_text_objects; i++) {

						this.game.add.text(100, i * 25, "Text object #" + (i + 1), {
							fill: "#FFFFFF"
						});

					}

				}

				function update() {

					this.benchmark.begin();

				}

				function render() {

					this.benchmark.end();

				}

			})();