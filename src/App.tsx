import React, { Suspense, useState, useRef } from "react";
import styled from "styled-components";

import {
  extend,
  Canvas,
  useLoader,
  useFrame,
  useThree,
  MeshProps
} from "react-three-fiber";
import { Mesh  } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

extend({ OrbitControls });

const GROUND_HEIGHT = -50;

const MainContainer = styled.div`
  height: 100vh;
  width: 100vw;
`;

const CustomeCanvas = styled(Canvas)`
  display: block;
  background: black;
  background-size: cover;
`;

function Ship() {
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
  const ship:any = useRef<Mesh>();

  useFrame(({ mouse }) => {
      setShipPosition({
    position: { x: mouse.x * 6, y: mouse.y * 2 } ,
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

const CameraControls = () => {
  const {
    camera,
    gl: { domElement }
  } = useThree();

  const controls: any = useRef();
  useFrame(() => controls.current.update());

  return (
    // @ts-ignore
    <orbitControls
      enableZoom={false}
      maxAzimuthAngle={Math.PI / 4}
      maxPolarAngle={Math.PI}
      minAzimuthAngle={-Math.PI / 4}
      minPolarAngle={0}
      ref={controls}
      args={[camera, domElement]}
    />
  );
};

function Cube(props: MeshProps) {
  // This reference will give us direct access to the mesh
  const mesh = useRef<Mesh>();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    if (mesh.current) mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={_event => setActive(!active)}
      onPointerOver={event => setHover(true)}
      onPointerOut={event => setHover(false)}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

function Terrain() {
  const terrain = useRef<Mesh>();
  useFrame(() => {
    if (terrain.current) terrain.current.position.z += 0.4;
  });

  return (
    <mesh
      visible
      position={[0, GROUND_HEIGHT, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      ref={terrain}
    >
      <planeBufferGeometry attach="geometry" args={[5000, 5000, 128, 128]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        roughness={1}
        metalness={0}
        wireframe
      />
    </mesh>
  );
}

function App() {
  return (
    <MainContainer>
      <CustomeCanvas>
        <CameraControls />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={<Cube />}>
          <Ship />
        </Suspense>
        <Terrain />
      </CustomeCanvas>
    </MainContainer>
  );
}

export default App;
