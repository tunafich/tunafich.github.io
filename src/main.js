import * as THREE from 'three';
import './style.css'

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'; 
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; 


const canvas = document.querySelector("#experience-canvas");
const sizes ={
	width: window.innerWidth,
	height: window.innerHeight
}

//Loaders
const textureLoader = new THREE.TextureLoader();

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/draco/' );

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

const texture = "/textures/texture.png";


loader.load("/models/model.glb", (glb) =>{
const newMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
glb.scene.traverse((child) => {
	if(child.isMesh) {
		child.material = newMaterial;
	}
	
});
scene.add(glb.scene);
});


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, sizes.width / sizes.height, 0.1, 1000 );
camera.position.z = 5;


const renderer = new THREE.WebGLRenderer({ canvas:canvas, antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );



const controls = new OrbitControls( camera, renderer.domElement );

controls.enableDamping = true;
controls.dampingFactor = 0.05;

//controls.update() must be called after any manual changes to the camera's transform
controls.update();



//Event listeners

window.addEventListener("resize", ()=> {
sizes.width = window.innerWidth;
sizes.height = window.innerHeight;

	//Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();
	//Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});


function animate() {
}

const render = () => {
  controls.update();
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render( scene, camera );
  window.requestAnimationFrame(render);
};


render ();
