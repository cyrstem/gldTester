
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

let camera, scene , renderer, selection, mesh, selected;

function init(){
    const container = document.createElement('div');
    document.body.appendChild( container );
    camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight, 0.25,20)
    camera.position.set (0, 2 ,50);
    scene= new THREE.Scene();

    //Lights
    let  shadowlight = new THREE.DirectionalLight( 0xffffff, 1.8 );
	shadowlight.position.set( 0, 300, 0 );
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


    //choose model
    let listOfModels ={
        'model1':'tester2.gltf',
        'model2':'tester3.gltf',
        'model3':'tester3.gltf',
        'model4':'tester4.gltf'
    };
    selection = {
        modelo: ['tester2.gltf','tester3.gltf']
    };

    selected = {
        model: 'tester2.gltf'
    }

    function modelosLoad(){
        console.log("cambio");
        switch(listOfModels){
            case 'tester2.gltf':
        }    
    }
 
    
// DATA GUI CONTENT
const settings = {
    modelos:{
        model: 'tester2.gltf'
    } 
};
//data gui 
    const gui = new GUI();
    let modelos = gui.addFolder('3d Models');
    //modelos.add(settings, 'modelos',['modelo 1','modelo 2']).onChange(modelosLoad);
    modelos.add(selected, 'model',listOfModels).onChange(loadModels)



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
                controls.autoRotate = true;
				controls.update();

				window.addEventListener( 'resize', onWindowResize );

}

function loadModels (){

    if(mesh !== undefined){
        scene.remove(mesh);
    };

  const loader = new GLTFLoader().setPath('models/');
    //loader.load(selection.modelo[1], ( gltf ) => {
        loader.load(selected.model, (gltf ) =>{
        gltf.scene.scale.set(0.4,0.4,0.4) 
        mesh = gltf.scene
        const elements = gltf.scenes
    
        console.log(elements)
       
        scene.add( mesh)
    },function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'No valio ' +error );

    }); 
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
    loadModels();
    render();
}