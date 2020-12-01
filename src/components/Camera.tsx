import React from 'react';
import { useThree, useFrame } from 'react-three-fiber';

const CameraControls = () => {
  const {
    camera,
    gl: { domElement }
  } = useThree();

  const controls: any = React.useRef();
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
}

export default CameraControls;