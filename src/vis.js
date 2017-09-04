var t = require('three');
var ChainMesh = require('./ChainMesh');
var OrbitControls = require('./OrbitControls');

class Vis {
    constructor(renderer) {
        this.renderer = renderer;
        let { width, height } = renderer.getSize();

        let userPosition = new t.Vector3(0, 0, 20);
        
        let scene = new t.Scene();
        let camera = new t.PerspectiveCamera(45, width / height, 0.1, 100);
        
        camera.position.copy(userPosition);
        
        //scene.add(new t.AmbientLight(0xffffff));
        
        let light = new t.PointLight(0xffffff, 1, 1000);
        light.position.set(0, 0, 15);
        scene.add(light);

        const data = [
            {
                lengths: [ 3, 4, 5, 5, 3, 4 ],
                height: 2
            },
            {
                lengths: [ 4, 5, 5, 3, 4, 3 ],
                height: 3
            },
            {
                lengths: [ 5, 3, 4, 3, 4, 5 ],
                height: 1
            }
        ];

        let chain = ChainMesh(data);
        scene.add(chain);

        this.scene = scene;
        this.camera = camera;
        this.controls = new OrbitControls(camera, renderer.domElement);
    }

    animate() {
        const r = this.renderer;
        const s = this.scene;
        const c = this.camera;
        const u = this.controls;

        const draw = () => {
            requestAnimationFrame(draw);
            u.update();
            r.render(s, c);
        };
        draw();
    }
}

function createCanvas(height, btc, usd, utc){
    var canvas_name = 'canvas' + String(height);
    //I'm not sure if this will break things or not, but naming it anything other than 'canvas' doesn't work
    var canvas = document.createElement('canvas');
    canvas.height = height + canvas.width;
    let ctx = canvas.getContext('2d');
        
    return canvas;

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
