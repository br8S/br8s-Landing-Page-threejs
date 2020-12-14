var scene, camera, renderer;

         scene = new THREE.Scene();
         scene.background = new THREE.Color(0x000000);

         camera = new THREE.PerspectiveCamera(50,window.innerWidth/window.innerHeight);
         camera.position.set(0, 0, 100);

         renderer = new THREE.WebGLRenderer();
         renderer.setSize(window.innerWidth, window.innerHeight);
         document.body.appendChild(renderer.domElement);

         window.addEventListener('resize', () => {
         renderer.setSize(window.innerWidth, window.innerHeight);
         camera.aspect = window.innerWidth/window.innerHeight;
 
            camera.updateProjectionMatrix();
        }) 

         var control = new THREE.OrbitControls(camera,renderer.domElement);
         control.update();

         control.enableZoom = false;
/*
         var loader = new THREE.GLTFLoader();
         loader.load('/old_television/scene.gltf', function(gltf){
            tv = gltf.scene;
            scene.add(tv);
         })
*/

         var loader2 = new THREE.GLTFLoader();
         loader2.load('br8s-logo.glb', function(gltf){
            br8s = gltf.scene;
            scene.add(br8s);
         })

         var light2 = new THREE.AmbientLight(0xFFFFFF, 5); // soft white light
         scene.add(light2);

         var light3 = new THREE.PointLight(0x0000FF, 5, 120);
         light3.position.set(0,0,50);
         scene.add(light3);
/*
         var spotLight = new THREE.SpotLight(0x0000FF, 50);
         spotLight.position.set(50,50,100);
         scene.add(spotLight);
*/
         var flag = false;
         var xaxis = 1;
         var last = 0;

         var render = function(){
            requestAnimationFrame(render);
            control.update();
            br8s.rotation.y -= 0.1;
        

            if(last < xaxis){ 
                //light is moving right
                if(xaxis < 320){
                    //keep moving right
                    light3.position.set(Math.round(xaxis/4),0,50);
                    last = xaxis;
                    xaxis++;
                }
                else{
                    //start moving left
                    light3.position.set(Math.round(xaxis/4),0,50);
                    last = xaxis;
                    xaxis--;
                }
            }

            else if(last > xaxis){
                if(xaxis > -320){
                    //keep moving left
                    light3.position.set(Math.round(xaxis/4),0,50);
                    last = xaxis;
                    xaxis--;
                }
                else{
                    //start moving left
                    light3.position.set(Math.round(xaxis/4),0,50);
                    last = xaxis;
                    xaxis++;
                }
            }

            renderer.render(scene,camera);
        }

        var light = new THREE.PointLight(0xFF0000, 5, 120);
        light.position.set(0,0,50);
        scene.add(light);
       
        render();