var t = require('three');
var ChainMesh = require('./ChainMesh');

class Vis {
    constructor(renderer) {
        this.renderer = renderer;
        let { width, height } = renderer.getSize();

        let userPosition = t.Vector3(0, 0, 500);
        
        let scene = new t.Scene();
        let camera = new t.PerspectiveCamera(45, width / height, 1, 1000);
        
        camera.position.set(userPosition);
        
        scene.add(new t.AmbientLight(0xffffff));
        
        let light = new t.PointLight(0xffffff);
        light.position.copy(userPosition);
        scene.add(light);

        let A = new t.Vector2(0, 0);
        let B = new t.Vector2(0, 50);
        let C = new t.Vector2(60, 0);
        
        let data = [A, B, C];
        let draw = function(canvasContext, face) {};
        let chain = new ChainMesh(data, draw);
        chain.rotation.x = 1;
        chain.rotation.y = 2;
        scene.add(chain);

        this.scene = scene;
        this.camera = camera;
    }

    animate() {
        const r = this.renderer;
        const s = this.scene;
        const c = this.camera;

        const draw = () => {
            requestAnimationFrame(draw);
            r.render(s, c);
        };
        draw();
    }

    createCanvas(height, btc, usd, utc){
        var canvas_name = 'canvas' + String(height);
        //I'm not sure if this will break things or not, but naming it anything other than 'canvas' doesn't work
        var canvas = document.createElement('canvas');
        canvas.height = height + canvas.width;
        let ctx = canvas.getContext('2d');
        

        return canvas;

    }
}

// drawTexture will be called for each face and provided with a
//   - representation of the face geometry (undetermined)
//   - representation of the transaction data (undetermined)
// within drawTexture, this is set to a CanvasRenderingContext2D
// The canvas can be assumed to have dimensions of 100x100 css pixels
const drawTexture = function(face, data) {
    const width = 100;
    const height = 100;
    const { btc, usd, utc } = data;
        
    //BTC
    this.font = '12pt Arial';
    this.fillStyle = 'red';
    this.fillRect(0, 0, width, height/3);
    this.fillStyle = 'white';
    this.fillRect(10, 10, width - 20, height /3 - 20);
    this.fillStyle = 'black';
    this.textAlign = "center";
    this.textBaseline = "middle";
    this.fillText(String(btc), width/2, height * .15);

    //USD
    this.fillStyle = 'blue';
    this.fillRect(0, height/3, width, (height / 3));
    this.fillStyle = 'white';
    this.fillRect( 10, height/3 +10,  width - 20 , height /3 -20);
    this.fillStyle = 'black';
    this.textAlign = "center";
    this.textBaseline = "middle";
    this.fillText(String(usd), width /2 , height * 0.49995);

    //UTC

    this.fillStyle = 'yellow';
    this.fillRect(0, (height/3)*2, width, (height / 3));
    this.fillStyle = 'white';
    this.fillRect( 10, (height/3)*2 +10,  width - 20 , height /3 -20);
    this.fillStyle = 'black';
    this.textAlign = "center";
    this.textBaseline = "middle";
    this.fillText(String(utc), width /2 , height * 0.8327);
};

module.exports = Vis;
