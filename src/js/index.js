
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import  Stats  from 'three/examples/jsm/libs/stats.module'

let camera, scene , renderer, selection, mesh, selected;
let listofParts;
let show;
let partsResults;

function init(){
    show = true;
    //let stats = new Stats()
    //document.body.appendChild( stats.domElement)
    mesh = new THREE.Object3D();

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
        'model1':'testModelA.gltf',
        'model2':'testModelB.gltf'
    };
    selected = {
        model: 'testModelA.gltf'
    }

    // function modelosLoad(){
    //     console.log("cambio");
    //     switch(listOfModels){
    //         case 'tester2.gltf':
    //     }    
    // }
  
    
// DATA GUI CONTENT
const settings = {
    modelos:{
        model: 'tester2.gltf'
    },
    visible: true
};
//data gui 
    const gui = new GUI();
    let modelos = gui.addFolder('3d Models');
    modelos.add(selected, 'model',listOfModels).onChange(loadModels)

    let elements = gui.addFolder(" Partes ");
    elements.add(settings, 'visible').onChange(showandhide)

    let pruebaElementos = gui.addFolder( "prueba partes");
    pruebaElementos.add(selected, 'model', partsResults)


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
        loader.load(selected.model, (gltf ) =>{
        gltf.scene.scale.set(0.4,0.4,0.4) 
        mesh = gltf.scene
        const parts = mesh.children
        partsResults = Object.assign({},parts);
        separateElements(partsResults);
        //console.log(partsResults);

       

        //for(let i = 0; i<parts.length; i++){
           // console.log(parts[i].name)
            //let cabeza = parts[i].getObjectByName("Cabeza_1")
           
        //}
        // listofParts =new Array(parts.length);
        // console.log(listofParts.length);

        scene.add( mesh)

    },function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'No valio ' +error );

    }); 
}
function showandhide(show){
console.log(show);
if(show === true){
    // cabeza.visible =true
    mesh.getObjectByName("Cabeza_1").visible = true
 }else{
    // cabeza.visible= false
    mesh.getObjectByName("Cabeza_1").visible = false
 }
}
///para separar
function separateElements(e){
   
    let resultado = e
    console.log(resultado)
    // for(let i = 0; i<e.length; i++){
    //        console.log(e)
    // }
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
///for tests

    render();

}