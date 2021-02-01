
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

let camera, scene , renderer;

function init(){
    const container = document.createElement('div');
    document.body.appendChild( container );
    camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight, 0.25,20)
    camera.position.set (0, 2 ,50);
    scene= new THREE.Scene();

    //Lights
    let  shadowlight = new THREE.DirectionalLight( 0xffffff, 1.8 );
	shadowlight.position.set( 0, 350, 0 );
	shadowlight.castShadow = true;
	shadowlight.shadowDarkness = 0.1;
    scene.add(shadowlight);
    let light = new THREE.DirectionalLight( 0xffffff, 1.8 );
	light.position.set( 60, 100, 20 );
	scene.add(light);
  
    let backLight = new THREE.DirectionalLight( 0xffffff, 1 );
	backLight.position.set( -40, 100, 20 );
	scene.add(backLight);
    //endLights
    //ADD floor
    // const ground = new THREE.PlaneGeometry( 500, 500, 1, 1 );
	// const materials = new THREE.MeshBasicMaterial( { color: 0xF9F8ED } );
    // let floor = new THREE.Mesh( ground, materials );
    
	// floor.material.side = THREE.DoubleSide;
	// floor.position.y =-5;
	// floor.position.z =-4;
	// floor.rotation.x = 90*Math.PI/180;
	// floor.rotation.y = 0;
	// floor.rotation.z = 0;
	// floor.doubleSided = true;
    // floor.receiveShadow = true;
	// scene.add(floor);

    //load model

    const loader = new GLTFLoader();
    loader.load('models/tester2.gltf', ( gltf ) => {
        gltf.scene.scale.set(0.4,0.4,0.4) 
        scene.add( gltf.scene )
    },function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

    }); 
    
// DATA GUI CONTENT
const options = {
    velx:0,
    vely:0,
    camera: {
        speed:0.001
    },
    stop:function() {
        this.velx = 0;
        this.vely = 0;
    }
};
//data gui 
    const gui = new GUI();
 let cam = gui.addFolder('Camara Settings');
 cam.add(options.camera, 'speed',0,0.0010).listen();




//tester element
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00,shading: THREE.FlatShading } );
    const cube = new THREE.Mesh( geometry, material );
    cube.castShadow = true;
    //scene.add( cube );
//end tester element

    renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
                renderer.setSize( window.innerWidth, window.innerHeight );
                renderer.setClearColor(0xF9F8ED,1);
                renderer.shadowMapEnabled = true;
                renderer.shadowMapType = THREE.PCFSoftShadowMap;
				renderer.outputEncoding = THREE.sRGBEncoding;
				container.appendChild( renderer.domElement );

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.addEventListener( 'change', render ); // use if there is no animation loop
				controls.minDistance = 2;
				controls.maxDistance = 10;
				controls.target.set( 0, 0, 0 );
				controls.update();

				window.addEventListener( 'resize', onWindowResize );

}
function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

				render();

            }

function render() {
                requestAnimationFrame(render);
				renderer.render( scene, camera );

			}



window.onload = ()=> {
   console.clear();
    console.log("hello.... FRIEND threejs:"+THREE.REVISION);
    init();
    render();
}