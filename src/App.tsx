import React, { Suspense } from "react";
import styled from "styled-components";
import {
  extend,
  Canvas,
} from "react-three-fiber";

import Terrain from './components/Terrain';
import Loading from './components/3DActivityIndicator';
import Ship from "./components/Ship";
import Camera from './components/Camera';

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });

const MainContainer = styled.div`
  height: 100vh;
  width: 100vw;
`;

const CustomeCanvas = styled(Canvas)`
  display: block;
  background: black;
  background-size: cover;
`;

function App() {
  return (
    <MainContainer>
      <CustomeCanvas>
        <Camera />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={<Loading />}>
          <Ship />
        </Suspense>
        <Terrain />
      </CustomeCanvas>
    </MainContainer>
  );
}

export default App;
