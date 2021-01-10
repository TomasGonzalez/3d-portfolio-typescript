import React, { Suspense, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { extend, Canvas, useFrame } from 'react-three-fiber'

import Terrain from './components/Terrain'
import Loading from './components/3DActivityIndicator'
import Ship from './components/Ship'
import Camera from './components/Camera'

import { Curves } from 'three/examples/jsm/curves/CurveExtras'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Coordinate } from './utils/types'

extend({ OrbitControls })

const MainContainer = styled.div`
  height: 100vh;
  width: 100vw;
`

const CustomeCanvas = styled(Canvas)`
  display: block;
  background: black;
  background-size: cover;
`

const DummyObject = ({ position }: any) => {
  return (
    <mesh scale={[2, 2, 2]} position={[position.x, position.y, position.z]}>
      <sphereBufferGeometry />
      <meshBasicMaterial color={'red'} />
    </mesh>
  )
}

function Knot ({ setCurrentObjectPosition, onTrackInit, track }: any) {
  const tubeGemotry: any = useRef()

  React.useEffect(() => {
    onTrackInit(tubeGemotry.current)
  }, [tubeGemotry, onTrackInit])

  useFrame(() => {
    const time = Date.now()
    const looptime = 20 * 1000
    const t = (time % looptime) / looptime

    if (tubeGemotry.current)
      setCurrentObjectPosition(
        tubeGemotry.current.parameters.path.getPointAt(t)
      )
  })

  onTrackInit(new Curves.GrannyKnot(), 100, 2, 3, true)

  return (
    <mesh scale={[1, 1, 1]} position={[0, 0, 0]}>
      <meshBasicMaterial color='green' wireframe />
      <tubeBufferGeometry
        ref={tubeGemotry}
        args={[new Curves.GrannyKnot(), 100, 2, 3, true]}
      />
    </mesh>
  )
}

function App () {
  const [currentObjectPosition, setCurrentObjectPosition] = useState({
    x: 0,
    y: 0,
    z: 0
  })
  const track = React.useRef(null)

  return (
    <MainContainer>
      <CustomeCanvas>
        <directionalLight intensity={1} />
        <ambientLight intensity={0.1} />
        <Knot
          setCurrentObjectPosition={setCurrentObjectPosition}
          onTrackInit={(arg: any) => (track.current = arg)}
          track={track}
        />
        {track.current && <Camera position={currentObjectPosition} />}
        {currentObjectPosition && (
          <DummyObject position={currentObjectPosition} />
        )}
        <Suspense fallback={<Loading />}>{/* <Ship /> */}</Suspense>
        {/* <Terrain /> */}
      </CustomeCanvas>
    </MainContainer>
  )
}

export default App
