/* eslint-disable react/no-unknown-property */
import { Suspense } from 'react'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { BigTree, Fruit, Log, MediumTree, SmallTree } from './models'

interface TreeProps {
  degree: number
  complete: number
}

const Tree = ({ degree, complete }: TreeProps) => {
  return (
    <Canvas
      camera={{
        position: [30, 50, 0],
      }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={1} />
        <directionalLight intensity={5} position={[3, 2, 1]} />
        <spotLight
          intensity={2}
          angle={2}
          penumbra={1}
          position={[0, 0, 0]}
          castShadow
        />
        {degree <= 20 && <Log />}
        {degree > 20 && degree <= 50 && <SmallTree />}
        {degree > 50 && degree < 100 && <MediumTree />}
        {degree === 100 && <BigTree />}
        <Fruit degree={complete} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          minAzimuthAngle={Math.PI / 2.7}
          maxAzimuthAngle={Math.PI / 1.7}
        />
      </Suspense>
    </Canvas>
  )
}

export default Tree
