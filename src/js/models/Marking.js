import * as THREE from 'three';

export default class Marking {
  constructor({count, range, texture}) {

    const positions = new Float32Array(count * 3);
    for(let i = 0; i < count; i++){
      positions[i * 3] =  THREE.MathUtils.randFloatSpread(range.x);//Math.random() - 0.5;// x
      positions[i * 3 + 1] = THREE.MathUtils.randFloatSpread(range.y); //Math.random() - 0.5;// y
      positions[i * 3 + 2] = range.z; //Math.random() - 0.5;// z
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.7,
      color: 0xffffff,
      transparent: true,
      alphaTest: 0.3,
      alphaToCoverage: true,
      // alphaMap: texture, //png의 투명한 부분도 설정
      map: texture,
      // depthWrite: true, //깊이 조절 않아고 렌더링 하겠다
      clipIntersection: true
    });

    this.points = new THREE.Points(particleGeometry, particleMaterial);
    
  }
}
 
