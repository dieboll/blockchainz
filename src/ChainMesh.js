var t = require('three');

var ChainMesh = function(data, drawTexture) {
    const geometry = new ChainGeometry(data);
};

var ChainGeometry = function(stages) {
    t.Geometry.call(this);
    this.type = 'ChainGeometry';
    this.parameters = { stages: stages };
    this.fromBufferGeometry( new ChainBufferGeometry(stages) );
    this.mergeVertices();
};
ChainGeometry.prototype = Object.create(t.Geometry.prototype);
ChainGeometry.prototype.constructor = ChainGeometry;

function ChainBufferGeometry( stages ) {
    t.BufferGeometry.call( this );
    this.type = 'ChainBufferGeometry';
    // buffers
    var vertices = new Float32Array( [
	-1.0, -1.0,  1.0,
	 1.0, -1.0,  1.0,
	 1.0,  1.0,  1.0,

	 1.0,  1.0,  1.0,
	-1.0,  1.0,  1.0,
	-1.0, -1.0,  1.0
    ] );
    
    this.addAttribute( 'position', new t.BufferAttribute( vertices, 3 ) );
}

ChainBufferGeometry.prototype = Object.create( t.BufferGeometry.prototype );
ChainBufferGeometry.prototype.constructor = ChainBufferGeometry;

module.exports = ChainGeometry;
