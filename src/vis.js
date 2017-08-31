var t = require('three');
var ChainGeometry = require('./ChainGeometry');

class Vis {
    constructor(ctx, canvas, width, height) {
        let scene = new t.Scene();
        let camera = new t.PerspectiveCamera(45, this.width / this.height, 1, 1000);
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
        
        let vectors = [m0, m1, m2, m3];
        let geometry = new ChainGeometry([A, B, C], 50);
        //just some random numbers for now, eventually transaction data
        material = mapTexture(createCanvas(50, 50, 60, 2014), geometry);
        let prism1 = new t.Mesh(geometry, material);
        prism1.rotation.x = 1;
        prism1.rotation.y = 2;
        scene.add(prism1);
        //This is important
        texture.needsUpdate = true;

        this.scene = scene;
        this.camera = camera;
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.canvas = canvas;
        this.changeCanvas();        
    }
    animate() {
        requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera);
    }

    function mapTexture(canvas, geometry) {
      //defining vectors
      //first side
        var m3 = new THREE.Vector2(0, .333);
        var m2 = new THREE.Vector2(1, .333);
        var m1 = new THREE.Vector2(1, 0);
        var m0 = new THREE.Vector2(0, 0);
        //next side
        var m7 = new THREE.Vector2(0, .666);
        var m6 = new THREE.Vector2(1, .666);
        var m5 = new THREE.Vector2(1, .333);
        var m4 = new THREE.Vector2(0, .333);
        //last side
        var m11 = new THREE.Vector2(0, 1);
        var m10 = new THREE.Vector2(1, 1);
        var m9 = new THREE.Vector2(1, .666);
        var m8 = new THREE.Vector2(0, .666);
        //making an array for some reason
        var vectors = [m0, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11];
        //define texture
        texture = new THREE.Texture(canvas);
        var material = new THREE.MeshBasicMaterial({ map: texture });
        geometry.faceVertexUvs[0] = [];
        geometry.faceVertexUvs[0][2] = [ vectors[0], vectors[1], vectors[3] ];
    geometry.faceVertexUvs[0][3] = [ vectors[1], vectors[2], vectors[3] ];
    geometry.faceVertexUvs[0][4] = [ vectors[4], vectors[5], vectors[7] ];
    geometry.faceVertexUvs[0][5] = [ vectors[5], vectors[6], vectors[7] ];
      geometry.faceVertexUvs[0][6] = [ vectors[8], vectors[9], vectors[11] ];
    geometry.faceVertexUvs[0][7] = [ vectors[9], vectors[10], vectors[11] ];
    
    return material;
    }

    function createCanvas(height, btc, usd, utc){
    var canvas_name = 'canvas' + String(height);
    //I'm not sure if this will break things or not, but naming it anything other than 'canvas' doesn't work
    var canvas = document.createElement('canvas');
    canvas.height = height + canvas.width;
    ctx = canvas.getContext('2d');
    //BTC
    ctx.font = '12pt Arial';
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, canvas.width, canvas.height/3);
    ctx.fillStyle = 'white';
    ctx.fillRect(10, 10, canvas.width - 20, canvas.height /3 - 20);
    ctx.fillStyle = 'black';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(String(btc), canvas.width/2, canvas.height * .15);

    //USD
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, canvas.height/3, canvas.width, (canvas.height / 3));
    ctx.fillStyle = 'white';
    ctx.fillRect( 10, canvas.height/3 +10,  canvas.width - 20 , canvas.height /3 -20);
    ctx.fillStyle = 'black';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(String(usd), canvas.width /2 , canvas.height * 0.49995);

    //UTC

    ctx.fillStyle = 'yellow';
    ctx.fillRect(0, (canvas.height/3)*2, canvas.width, (canvas.height / 3));
    ctx.fillStyle = 'white';
    ctx.fillRect( 10, (canvas.height/3)*2 +10,  canvas.width - 20 , canvas.height /3 -20);
    ctx.fillStyle = 'black';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(String(utc), canvas.width /2 , canvas.height * 0.8327);

    return canvas;

    }

   
}

module.exports = Vis;
