var t = require('three');
var ChainGeometry = require('./ChainGeometry');

class Vis {
    constructor(ctx, canvas, width, height, renderer) {
        this.renderer = renderer;
        let scene = new t.Scene();
        let camera = new t.PerspectiveCamera(45, width / height, 1, 1000);
        camera.position.set(0, 0, 500);
        scene.add(new t.AmbientLight(0xffffff));
        let light = new t.PointLight(0xffffff);
        light.position.copy(camera.position);
        scene.add(light);

        //CLASS I NEED TO MODIFY
        let PrismGeometry = function(vertices, height) {
            var Shape = new t.Shape();
            (function f(ctx) {
                ctx.moveTo(vertices[0].x, vertices[0].y);
                for (var i = 1; i < vertices.length; i++) {
                    ctx.lineTo(vertices[i].x, vertices[i].y);
                }
                ctx.lineTo(vertices[0].x, vertices[0].y);
            })(Shape);
            var settings = {};
            settings.amount = height;
            settings.bevelEnabled = false;
            t.ExtrudeGeometry.call(this, Shape, settings);
        };
        PrismGeometry.prototype = Object.create(t.ExtrudeGeometry.prototype);
        //CLASS
        
        let A = new t.Vector2(0, 0);
        let B = new t.Vector2(0, 50);
        let C = new t.Vector2(60, 0);
        //Mapping Vectors
        let m3 = new t.Vector2(0, .333);
        let m2 = new t.Vector2(1, .333);
        let m1 = new t.Vector2(1, 0);
        let m0 = new t.Vector2(0, 0);	
    
        let vectors = [m0, m1, m2, m3];
        //let geometry = new ChainGeometry([A, B, C], 50);
        let geometry = new t.BoxGeometry( 200, 200, 200 );
        let texture = new t.Texture(canvas);
        let material = new t.MeshBasicMaterial({ map: texture });
        //geometry.faceVertexUvs[0] = [];
        //geometry.faceVertexUvs[0][2] = [ vectors[0], vectors[1], vectors[3] ];
	//geometry.faceVertexUvs[0][3] = [ vectors[1], vectors[2], vectors[3] ];
    	
        let prism1 = new t.Mesh(geometry, material);
        prism1.rotation.x = 1;
        prism1.rotation.y = 2;
        scene.add(prism1);

        //texture.needsUpdate = true;

        this.scene = scene;
        this.camera = camera;
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.canvas = canvas;
        //this.changeCanvas();        
    }
    animate() {
        let r = this.renderer;
        let s = this.scene;
        let c = this.camera;
        console.log(r);
        console.log(s);
        console.log(c);
        let cb = () => {
            requestAnimationFrame(cb);
            r.render(s, c);
        };
        cb();
    }
    changeCanvas() {
        //BTC
       this.ctx.font = '12pt Arial';
       this.ctx.fillStyle = 'red';
       this.ctx.fillRect(0, 0, this.width, this.height/3);
       this.ctx.fillStyle = 'white';
       this.ctx.fillRect(10, 10, this.width - 20, this.height /3 - 20);
       this.ctx.fillStyle = 'black';
       this.ctx.textAlign = "center";
       this.ctx.textBaseline = "middle";
       this.ctx.fillText("placeholder mBTC", this.width/2, this.height * .15);
       //USD
       this.ctx.fillStyle = 'blue';
       this.ctx.fillRect(0, this.height/3, this.width, (this.height / 3));
       this.ctx.fillStyle = 'white';
       this.ctx.fillRect( 10, this.height/3 +10,  this.width - 20 , this.height /3 -20);
       this.ctx.fillStyle = 'black';
       this.ctx.textAlign = "center";
       this.ctx.textBaseline = "middle";
       this.ctx.fillText("placeholder USD", this.width /2 , this.height * 0.49995);
       //UTC
       this.ctx.fillStyle = 'yellow';
       this.ctx.fillRect(0, (this.height/3)*2, this.width, (this.height / 3));
       this.ctx.fillStyle = 'white';
       this.ctx.fillRect( 10, (this.height/3)*2 +10,  this.width - 20 , this.height /3 -20);
       this.ctx.fillStyle = 'black';
       this.ctx.textAlign = "center";
       this.ctx.textBaseline = "middle";
       this.ctx.fillText("placeholder UTC", this.width /2 , this.height * 0.8327);
    }
}

module.exports = Vis;
