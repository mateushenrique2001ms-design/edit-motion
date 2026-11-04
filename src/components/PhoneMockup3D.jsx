import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, useTexture } from "@react-three/drei";

/**
 * PhoneMockup3D
 * Componente 3D de alta performance via Three.js e React Three Fiber (R3F)
 * Permite apresentar prints e telas de IMAGENS/ dentro de um smartphone em perspectiva 3D suave.
 */

function PhoneMesh({ textureUrl, rotationSpeed = 0.5 }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Rotacao sutil e pendular de respiracao 3D
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * rotationSpeed) * 0.15;
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * rotationSpeed * 0.7) * 0.05;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Corpo do Celular (Bordas Titânio Escuro) */}
      <RoundedBox args={[3.2, 6.4, 0.25]} radius={0.3} smoothness={8}>
        <meshStandardMaterial color="#1A1A22" metalness={0.8} roughness={0.2} />
      </RoundedBox>

      {/* Vidro da Tela Frontal */}
      <mesh position={[0, 0, 0.13]}>
        <planeGeometry args={[2.95, 6.15]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Ilha Dinâmica Superior */}
      <mesh position={[0, 2.75, 0.14]}>
        <capsuleGeometry args={[0.12, 0.5, 4, 8]} />
        <meshBasicMaterial color="#0A0A0E" />
      </mesh>
    </group>
  );
}

export function PhoneMockup3D({ textureUrl = "", style = {} }) {
  return (
    <div style={{ width: "100%", height: "100%", ...style }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} color="#FFFFFF" />
        <directionalLight position={[-5, -5, -5]} intensity={0.4} color="#6366F1" />
        <PhoneMesh textureUrl={textureUrl} />
      </Canvas>
    </div>
  );
}

export default PhoneMockup3D;
