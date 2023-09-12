import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Marking from './models/Marking';

export default function () {
  const renderer = new THREE.WebGLRenderer({
    // alpha: true,
    antialias: true, //pixel 다듬기?

  });

  const container = document.querySelector('#app');

  container.appendChild(renderer.domElement);

  const canvasSize = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75, //75가 널리 쓰임
    canvasSize.width / canvasSize.height,
    0.1,
    100
  );
  camera.position.set(0, 0, 6);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;
  controls.mouseButtons = {
    LEFT: THREE.MOUSE.PAN,
    MIDDLE: THREE.MOUSE.DOLLY,
    RIGHT: THREE.MOUSE.ROTATE
  } // 좌클릭 => 이동, 우클릭 => 회전


  const marksCount = THREE.MathUtils.randFloat(10, 30);
  const mapSize = {
    x : 8,
    y: 8
  }

  const textureLoader = new THREE.TextureLoader();
  const createMap = () => {
    const material = new THREE.MeshBasicMaterial({ 
      map: textureLoader.load('./map.png'),
     });
    const geometry = new THREE.PlaneGeometry(mapSize.x, mapSize.y);
    const mesh = new THREE.Mesh(geometry, material);
    return mesh
  };

  const createMarkings = () => {
    const range =  {
      x: mapSize.x, 
      y: mapSize.y,
      z: 0.2
    }
    const marks = new Marking({ count: marksCount, range: range, texture: textureLoader.load('./marker.png')});
    return marks.points
  }

  const create = () => {
    const map = createMap();
    const markings = createMarkings(); // 20개 렌덤위치
    scene.add(map, markings);
  }

  const resize = () => {
    canvasSize.width = window.innerWidth;
    canvasSize.height = window.innerHeight;

    camera.aspect = canvasSize.width / canvasSize.height;
    camera.updateProjectionMatrix();

    renderer.setSize(canvasSize.width, canvasSize.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  const addEvent = () => {
    window.addEventListener('resize', resize);
  };

  const draw = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(() => {
      draw();
    });
  };

  const initialize = () => {
    create();
    addEvent();
    resize();
    draw();
  };

  initialize();
}
