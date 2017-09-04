var t = require('three');

var ChainMesh = function(transactions) {

    const verticesPerTx = (2 + (3 * 2)) * 3 * 3;
    
    const vertices = new Float32Array(
        transactions.length * verticesPerTx
    );

    let height = 0;

    for (let entry of transactions.entries()) {
        const [i, tx] = entry;
        const vertexOffset = i * verticesPerTx;
        const stageVertices = txGeom(tx, height);
        height += tx.height;
        vertices.set(stageVertices, vertexOffset);
        
    }
        
    const geometry = new t.BufferGeometry();
    geometry.addAttribute( 'position', new t.BufferAttribute( vertices, 3 ));
    geometry.computeVertexNormals();
    const material = new t.MeshPhongMaterial({ color: 0x00b2fc, specular: 0x00ffff, shininess: 20 });
    
    return new t.Mesh( geometry, material );
};

function txGeom(tx, height) {

    const [A, B, C, D, E, F] = tx.lengths;
    const top = baseGeom(A, B, C, height + tx.height);
    const bot = baseGeom(D, E, F, height);
    const sides = sideGeom(top, bot);

    const [topA, topB, topC] = top;
    const [botD, botE, botF] = bot;

    return [
        ...topA, ...topB, ...topC,
        ...botD, ...botE, ...botF,
        ...sides
    ];
    
}

function sideGeom(top, bot) {

    const [ a, b, c ] = top;
    const [ d, e, f ] = bot;
    
    const sideA = [
        ...e, ...c, ...b,
        ...e, ...f, ...c
    ];
    const sideB = [
        ...f, ...a, ...c,
        ...f, ...d, ...a
    ];
    const sideC = [
        ...d, ...b, ...a,
        ...d, ...e, ...b
    ];

    return [ ...sideA, ...sideB, ...sideC ];
    
}

function baseGeom(A, B, C, H) {

    const X = (B**2 + C**2 - A**2) / (2 * C);
    const Y = Math.abs(Math.sqrt(B**2 - X**2));
    return [
        [ 0, 0, H ],
        [ C, 0, H ],
        [ X, Y, H ]
    ];
    
}

module.exports = ChainMesh;
