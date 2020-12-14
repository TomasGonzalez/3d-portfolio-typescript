import React, { useState, useRef } from 'react';
import { useFrame, useLoader } from 'react-three-fiber';
import { Mesh } from "three";

import { Position, Coordinate } from '../utils/types';

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Ship() {
  const [shipPosition, setShipPosition] = useState<Position>();

  const scene: any = useLoader(GLTFLoader, "arwing.glb");
  const ship = useRef<Mesh>();

  useFrame(({ mouse }) => {
    setShipPosition({
      position: { x: mouse.x * 6, y: mouse.y * 2 },
      rotation: { z: -mouse.x * 0.5, x: -mouse.x * 0.5, y: -mouse.y * 0.2 }
    });
  });
  // Update the ships position from the updated state.
  useFrame(() => {
    const { z: rz, x: rx, y: ry }: Coordinate = shipPosition?.rotation!;
    const { x: px, y: py }: Coordinate = shipPosition?.position!;

    /*
    if (ship.current && rz && rx && ry && px && py) {
      ship.current.rotation.y = ry;
      ship.current.rotation.x = rx;
      ship.current.rotation.z = rz;
      ship.current.position.x = px;
      ship.current.position.y = py;
    }
    */
  })

  return (
    <group>
      <mesh
        rotation={[0, 0, 0]}
        ref={ship}
        position={[0, 0, -50]}
        visible
      //geometry={scene.nodes.ship_Cube001.geometry}
      >
        <sphereBufferGeometry attach="geometry" args={[5, 32, 32]} />

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