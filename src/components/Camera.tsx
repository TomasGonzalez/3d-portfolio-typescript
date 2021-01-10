import React from 'react'
import { useThree, useFrame } from 'react-three-fiber'

const CameraControls = ({ position }: any) => {
  const {
    camera,
    gl: { domElement }
  } = useThree()

  const controls = React.useRef()

  useFrame(() => {
    /*
      remember that oreder is important here,
      looktAt new position before moving to the new position.
    */
    camera.lookAt(position)

    //then move to new position.
    camera.position.set(position.x, position.y, position.z)
  })

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
  )
}

export default CameraControls
