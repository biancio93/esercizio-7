/* =========================================================
IMPORT
========================================================= */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/* =========================================================
CANVAS
========================================================= */
const canvas = document.querySelector("canvas.webgl");

/* =========================================================
SCENE
========================================================= */
const scene = new THREE.Scene();

/* =========================================================
FOG
========================================================= */
const fog = new THREE.Fog('#000000', 1, 7);
scene.fog = fog;

/* =========================================================
LIGHTS
========================================================= */
const ambientLight = new THREE.AmbientLight( 0xffffff, 0.5 ); // soft white light

const pointLight = new THREE.PointLight( 0xff0000, 0.4, 100 );
pointLight.position.set( 0, 0, 0 );
const pointLightExternal = new THREE.PointLight( 0xffffff, 0.8, 100 );
pointLightExternal.position.set( 2, 2, 2 );
scene.add( ambientLight, pointLight, pointLightExternal );

// Luci Sole
// Luce_1
const sunSmallLight_1 = new THREE.PointLight( 0xFFB500, 10, 2 );
sunSmallLight_1.position.set( 0, 0, 1.5 );
// Luce_2
const sunSmallLight_2 = new THREE.PointLight( 0xFF0000, 6, 1 );
sunSmallLight_2.position.set( 0, 0, 1.5 );

scene.add(sunSmallLight_1, sunSmallLight_2);

/* =========================================================
TEXTURE
========================================================= */

const textureLoader = new THREE.TextureLoader();
// Terra
const planetColorTexture = textureLoader.load('/textures/terra/Rock_Moss_001_basecolor.jpg');
const planetAmbientOcclusionTexture = textureLoader.load('/textures/terra/Rock_Moss_001_ambientOcclusion.jpg');
const planetHeightTexture = textureLoader.load('/textures/terra/Rock_Moss_001_height.png');
const planetNormalTexture = textureLoader.load('/textures/terra/Rock_Moss_001_normal.jpg');
const planetRoughnessTexture = textureLoader.load('/textures/terra/Rock_Moss_001_roughness.jpg');
// Sole
const sunColorTexture = textureLoader.load('/textures/sole/Lava_006_basecolor.jpg');
const sunAmbientOcclusionTexture = textureLoader.load('/textures/sole/Lava_006_ambientOcclusion.jpg');
const sunHeightTexture = textureLoader.load('/textures/sole/Lava_006_height.png');
const sunNormalTexture = textureLoader.load('/textures/sole/Lava_006_normal.jpg');
const sunRoughnessTexture = textureLoader.load('/textures/sole/Lava_006_roughness.jpg');
const sunemissiveTexture = textureLoader.load('/textures/sole/Lava_006_emissive.jpg');

// Moon
const moonColorTexture = textureLoader.load('/textures/luna/Rock_041_basecolor.jpg');
const moonAmbientOcclusionTexture = textureLoader.load('/textures/luna/Rock_041_ambientOcclusion.jpg');
const moonHeightTexture = textureLoader.load('/textures/luna/Rock_041_height.png');
const moonNormalTexture = textureLoader.load('/textures/luna/Rock_041_normal.jpg');
const moonRoughnessTexture = textureLoader.load('/textures/luna/Rock_041_roughness.jpg');

// Stars
const particlesTexture = textureLoader.load("/textures/particles/4.png");

/* =========================================================
OBJECTS
========================================================= */
// Sun
const sunGeometry = new THREE.SphereGeometry(1, 32, 32);
// sun material
const sunMaterial = new THREE.MeshStandardMaterial();
sunMaterial.metalness = 0.8;
sunMaterial.map =sunColorTexture;
sunMaterial.aoMap = sunAmbientOcclusionTexture;
sunMaterial.displacementMap = sunHeightTexture;
sunMaterial.displacementScale = 0.08;
sunMaterial.normalMap = sunNormalTexture;
sunMaterial.roughnessMap = sunRoughnessTexture;
sunMaterial.emissiveMap = sunemissiveTexture;
sunMaterial.emissiveIntensity = 2;

sunColorTexture.repeat.set(3,3);
sunAmbientOcclusionTexture.repeat.set(3,3);
sunHeightTexture.repeat.set(3,3);
sunNormalTexture.repeat.set(3,3);
sunRoughnessTexture.repeat.set(3,3);
sunemissiveTexture.repeat.set(3,3);

sunColorTexture.wrapS = THREE.RepeatWrapping;
sunAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
sunHeightTexture.wrapS = THREE.RepeatWrapping;
sunNormalTexture.wrapS = THREE.RepeatWrapping;
sunRoughnessTexture.wrapS = THREE.RepeatWrapping;
sunemissiveTexture.wrapS = THREE.RepeatWrapping;

sunColorTexture.wrapT = THREE.RepeatWrapping;
sunAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
sunHeightTexture.wrapT = THREE.RepeatWrapping;
sunNormalTexture.wrapT = THREE.RepeatWrapping;
sunRoughnessTexture.wrapT = THREE.RepeatWrapping;
sunemissiveTexture.wrapS = THREE.RepeatWrapping;

const sun = new THREE.Mesh(sunGeometry, sunMaterial);

sun.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(sun.geometry.attributes.uv.array, 2)
)

sun.rotation.z = Math.PI * 0.15;

scene.add(sun)

// Planet
const planetGeometry = new THREE.SphereGeometry(0.2, 32, 32);
// planet material
const planetMaterial = new THREE.MeshStandardMaterial();
planetMaterial.metalness = 0.8;
planetMaterial.map = planetColorTexture;
planetMaterial.aoMap = planetAmbientOcclusionTexture;
planetMaterial.displacementMap = planetHeightTexture;
planetMaterial.displacementScale = 0.02;
planetMaterial.normalMap = planetNormalTexture;
planetMaterial.roughnessMap = planetRoughnessTexture;
const planet = new THREE.Mesh(planetGeometry, planetMaterial)
planet.position.set(1.3, 0, 0)

planet.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(planet.geometry.attributes.uv.array, 2)
)
console.log(planet.geometry)

scene.add(planet)

// Planet Orbit Path
const planetOrbitGeometry = new THREE.CircleGeometry(1.7, 64);
const planetOrbitMaterial = new THREE.PointsMaterial({size: 0.01, sizeAttenuation: true});
const planetOrbitParticles = new THREE.Points(planetOrbitGeometry, planetOrbitMaterial)

scene.add(planetOrbitParticles)
planetOrbitParticles.rotation.x = Math.PI * - 0.5;

// Planet_2
const planetGeometry_2 = new THREE.SphereGeometry(0.3, 32, 32);
const planet_2 = new THREE.Mesh(planetGeometry_2, planetMaterial)
scene.add(planet_2)

// Planet_2 Orbit Path
const planetOrbitGeometry_2 = new THREE.CircleGeometry(2.6, 64);
const planetOrbitMaterial_2 = new THREE.PointsMaterial({size: 0.01, sizeAttenuation: true});
const planetOrbitParticles_2 = new THREE.Points(planetOrbitGeometry_2, planetOrbitMaterial_2)

scene.add(planetOrbitParticles_2)
planetOrbitParticles_2.rotation.x = Math.PI * - 0.5;

// Planet_3
const planetGeometry_3 = new THREE.SphereGeometry(0.1, 32, 32);
const planet_3 = new THREE.Mesh(planetGeometry_3, planetMaterial)
scene.add(planet_3)

// Planet_3 Orbit Path
const planetOrbitGeometry_3 = new THREE.CircleGeometry(3.4, 64);
const planetOrbitMaterial_3 = new THREE.PointsMaterial({size: 0.01, sizeAttenuation: true});
const planetOrbitParticles_3 = new THREE.Points(planetOrbitGeometry_3, planetOrbitMaterial_3)

scene.add(planetOrbitParticles_3)
planetOrbitParticles_3.rotation.x = Math.PI * - 0.5;

// Moon Orbit Path
const moonOrbitGeometry = new THREE.CircleGeometry(0.4, 32);
const moonOrbitMaterial = new THREE.PointsMaterial({size: 0.01, sizeAttenuation: true});
const moonOrbitParticles = new THREE.Points(moonOrbitGeometry, moonOrbitMaterial)

scene.add(moonOrbitParticles)
moonOrbitParticles.rotation.x = Math.PI * - 0.5;

// Moon
const moonGeometry = new THREE.SphereGeometry(0.05, 32, 32);
const moonMaterial = new THREE.MeshStandardMaterial();
// moon material
planetMaterial.metalness = 0.8;
moonMaterial.map =moonColorTexture;
moonMaterial.aoMap = moonAmbientOcclusionTexture;
moonMaterial.displacementMap = moonHeightTexture;
moonMaterial.displacementScale = 0.02;
moonMaterial.normalMap = moonNormalTexture;
moonMaterial.roughnessMap = moonRoughnessTexture;

const moon = new THREE.Mesh(moonGeometry, moonMaterial)
moon.position.set(2, 0, 0)
scene.add(moon)

// Stars
const particlesGeometry = new THREE.BufferGeometry();
const count = 800;

const position = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  position[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(position, 3)
  );
  
  //material
  const particlesMaterial = new THREE.PointsMaterial({
    //color: 0xff0000,
    size: 0.1,
    sizeAttenuation: true,
    map: particlesTexture,
    transparent: true,
    alphaMap: particlesTexture,
    // alphaTest : 0.001
    //depthTest: false,
  });
  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);


/* =========================================================
SIZE
========================================================= */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/* =========================================================
CAMERA
========================================================= */
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 4;
camera.position.x = 0;
camera.position.y = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.minDistance = 2;
controls.maxDistance = 6;

/* =========================================================
RENDERER
========================================================= */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.setClearColor('#000000');

  // Shadow
  pointLight.castShadow = true
  moon.castShadow = true
  moon.receiveShadow = true
  planet.castShadow = true
  planet.receiveShadow = true
  planet_2.castShadow = true
  planet_2.receiveShadow = true
  planet_3.receiveShadow = true


  /* =========================================================
ANIMATE
========================================================= */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Sun Rotation
  sun.rotation.y = elapsedTime * - 0.1;

  // Planet Orbit
  const orbitAngle = elapsedTime * 0.1
  planet.position.x = (Math.cos(orbitAngle)) * 1.7;
  planet.position.z = (Math.sin(orbitAngle)) * 1.7;
  planet.rotation.y = elapsedTime * 0.2;

  // Planet_2 Orbit
  const orbitAngle_2 = elapsedTime * 0.2
  planet_2.position.x = (Math.cos(orbitAngle_2)) * 2.6;
  planet_2.position.z = (Math.sin(orbitAngle_2)) * 2.6;
  planet_2.rotation.y = elapsedTime * 0.3;

  // Planet_2 Orbit
  const orbitAngle_3 = elapsedTime * 0.15
  planet_3.position.x = (Math.cos(orbitAngle_3)) * 3.4;
  planet_3.position.z = (Math.sin(orbitAngle_3)) * 3.4;
  planet_3.rotation.y = elapsedTime * 0.1;

  // Moon Orbit
  const moonOrbitAngle = elapsedTime * 0.4
  moon.position.x = planet.position.x + 0.4 * (Math.cos(moonOrbitAngle));
  moon.position.z = planet.position.z + 0.4 * (Math.sin(moonOrbitAngle));

  moon.rotation.y = elapsedTime * - 0.5;

  // Planet Orbit Path
  planetOrbitParticles.rotation.z = elapsedTime * 0.05;

  // Planet_2 Orbit Path
  planetOrbitParticles_2.rotation.z = elapsedTime * 0.05;

  // Planet_3 Orbit Path
  planetOrbitParticles_3.rotation.z = elapsedTime * 0.05;

  // Moon Orbit Path
  moonOrbitParticles.position.x = planet.position.x;
  moonOrbitParticles.position.z = planet.position.z;
  moonOrbitParticles.rotation.z = elapsedTime * 0.2;

  // Sun Morphing
  sunMaterial.displacementScale = 0.08 * Math.cos(elapsedTime) * 3;

  // Light Rotation
  // Light_1
  let sunOrbitAngle_1 = elapsedTime * 0.4;
  sunSmallLight_1.position.x = sun.position.x + 1.5 * (Math.cos(sunOrbitAngle_1));
  sunSmallLight_1.position.z = sun.position.z + 1.5 * (Math.sin(sunOrbitAngle_1));
  sunSmallLight_1.position.y = sun.position.y + 1.5 * (Math.sin(sunOrbitAngle_1));
  // Light_2
  let sunOrbitAngle_2 = elapsedTime * - 0.6;
  sunSmallLight_2.position.x = sun.position.x + 1.2 * (Math.cos(sunOrbitAngle_2));
  sunSmallLight_2.position.z = sun.position.z + 1.2 * (Math.sin(sunOrbitAngle_2));
  sunSmallLight_2.position.y = sun.position.y + 1.2 * (Math.sin(sunOrbitAngle_2));

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
