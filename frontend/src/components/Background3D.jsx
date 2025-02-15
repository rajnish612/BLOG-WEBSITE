import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

function AnimatedSphere() {
  const sphereRef = useRef();

  useFrame(() => {
    sphereRef.current.rotation.x += 0.001;
    sphereRef.current.rotation.y += 0.001;
  });

  return (
    <mesh ref={sphereRef} position={[0, 0, -5]}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial
        color="#4a90e2"
        metalness={0.7}
        roughness={0.2}
        wireframe
      />
    </mesh>
  );
}
import { Sky } from '@react-three/drei';

const Background3D = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
    }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Sky
          distance={1000} // The distance of the skybox
          sunPosition={[100, 100, 100]} // Position of the sun (affects sky color)
        />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
 
      </Canvas>
    </div>
  );
};

// const Background3D = () => {
//   return (
//     <div style={{
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       zIndex: -1,
//       background: 'linear-gradient(to bottom, #1a1a1a, #2d3436)'
//     }}>
//       <Canvas>
//         <ambientLight intensity={0.5} />
//         <pointLight position={[10, 10, 10]} />
//         <Stars
//           radius={100}
//           depth={50}
//           count={5000}
//           factor={4}
//           saturation={0}
//           fade
//           speed={1}
//         />
//         <AnimatedSphere />
//       </Canvas>
//     </div>
//   );
// };

export default Background3D;
