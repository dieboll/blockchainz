var container;
var camera, scene, renderer, controls;
init();
animate();
function init() {
  var info = document.createElement( 'div' );
  info.style.position = 'absolute';
  info.style.top = '10px';
  info.style.width = '200px';
  info.style.height = '200px';
  info.style.textAlign = 'center';
  info.style.color = '#fff';
  info.style.link = '#f80';
  info.innerHTML = '<a href="http://threejs.org" target="_blank" rel="noopener">three.js</a> webgl - geometry extrude shapes';
  document.body.appendChild( info );
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor( 0x222222 );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( 200, 200 );
  document.body.appendChild( renderer.domElement );
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.set( 0, 0, 500 );
  controls = new THREE.TrackballControls( camera, renderer.domElement );
  controls.minDistance = 200;
  controls.maxDistance = 500;
  scene.add( new THREE.AmbientLight( 0xffffff ) );
  var light = new THREE.PointLight( 0xffffff );
  light.position.copy( camera.position );
  scene.add( light );
  //Some Triangle dimensions
  var dimensions = [15, 13, 12];

  var extrudeSettings = {
    steps			: 100,
    bevelEnabled	: false,

  };
  var pts = [], count = 3;
  for ( var i = 0; i < count; i ++ ) {
    var l = dimensions[i];
    var a = 2 * i / count * Math.PI;
    pts.push( new THREE.Vector2 ( Math.cos( a ) * l, Math.sin( a ) * l ) );
  }
  var shape = new THREE.Shape( pts );
  var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
  var material = new THREE.MeshLambertMaterial( { color: 0xb00000, wireframe: false } );
  var mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );
  var geo = new THREE.EdgesGeometry( geometry ); // or WireframeGeometry( geometry )
  var mat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
  var wireframe = new THREE.LineSegments( geo, mat );

  scene.add( wireframe );
}

function createMaterials(){
  var materials = [
    new THREE.MeshBasicMaterial( { color: 0xff0000 } ),
    new THREE.MeshBasicMaterial( { color: 0xffff00 } ),
    new THREE.MeshBasicMaterial( { color: 0x00ff00 } ),
    new THREE.MeshBasicMaterial( { color: 0x00ffff } ),
    new THREE.MeshBasicMaterial( { color: 0x0000ff } ),
    new THREE.MeshBasicMaterial( { color: 0xff00ff } )
  ];
  return materials;
}


function animate() {
  requestAnimationFrame( animate );
  controls.update();
  renderer.render( scene, camera );
}
