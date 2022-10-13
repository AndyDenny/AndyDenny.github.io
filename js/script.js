
document.addEventListener("DOMContentLoaded",function () {

   let wwidth = window.innerWidth;
   let wheight = window.innerHeight;


   let canvas = document.querySelector("canvas");
   canvas.setAttribute("width",wwidth);
   canvas.setAttribute("height",wheight);

   let renderer = new THREE.WebGLRenderer({canvas:canvas});
   renderer.setClearColor(0x000000);


   let scene = new THREE.Scene();
   
   let camera = new THREE.PerspectiveCamera(45, wwidth/wheight, 0.1, 5000);
   camera.position.set(0,0,1000);

   let light = new THREE.AmbientLight(0xffffff);
   scene.add(light);

/*
   let geometry = new THREE.PlaneGeometry(300,300,12,12);
   let material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe:true})
   let mesh = new THREE.Mesh(geometry,material);

   scene.add(mesh);*/

   

   const loader = new GLTFLoader();
// Optional: Provide a DRACOLoader instance to decode compressed mesh data
   const dracoLoader = new DRACOLoader();   
   dracoLoader.setDecoderPath( '/libs/draco/' );

   loader.setDRACOLoader( dracoLoader );

   loader.load(
      // resource URL
      'models/frst.glb',
      // called when the resource is loaded
      function ( gltf ) {
   
         scene.add( gltf.scene );
   
         // gltf.animations; // Array<THREE.AnimationClip>
         // gltf.scene; // THREE.Group
         // gltf.scenes; // Array<THREE.Group>
         // gltf.cameras; // Array<THREE.Camera>
         // gltf.asset; // Object
   
      },
      // called while loading is progressing
      function ( xhr ) {
   
         console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
   
      },
      // called when loading has errors
      function ( error ) {
   
         console.log( 'An error happened' );
   
      }
   );

   renderer.render(scene,camera);


   console.log("page ready"); 
});