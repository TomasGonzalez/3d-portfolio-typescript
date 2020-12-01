import React, { useState, useRef } from 'react';
import { useFrame, useLoader } from 'react-three-fiber';
import { Mesh } from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Ship() {
  interface Coordinate {
    x?: number;
    y?: number;
    z?: number;
  }

  interface Position {
    position: Coordinate;
    rotation: Coordinate;
  }


  const [shipPosition, setShipPosition] = useState<Position>();

  const scene: any = useLoader(GLTFLoader, "arwing.glb");
  const ship: any = useRef<Mesh>();

  useFrame(({ mouse }) => {
    setShipPosition({
      position: { x: mouse.x * 6, y: mouse.y * 2 },
      rotation: { z: -mouse.x * 0.5, x: -mouse.x * 0.5, y: -mouse.y * 0.2 }
    });
  });
  // Update the ships position from the updated state.
  useFrame(() => {
    if (ship.current && shipPosition?.rotation) {
      ship.current.rotation.z = shipPosition.rotation.z;
      ship.current.rotation.y = shipPosition.rotation.x;
      ship.current.rotation.x = shipPosition.rotation.y;
      ship.current.position.y = shipPosition.position.y;
      ship.current.position.x = shipPosition.position.x;
    }
  });

  return (
    <group>
      <mesh
        rotation={[0, Math.PI, 0]}
        ref={ship}
        visible
        geometry={scene.nodes.ship_Cube001.geometry}
      >
        <meshStandardMaterial
          attach="material"
          color="blue"
          roughness={0.3}
          metalness={0.3}
        />
      </mesh>
    </group>
  );
}