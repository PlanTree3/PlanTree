/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Suspense } from 'react'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Icosphere_Material001_0: THREE.Mesh
  }
  materials: {
    ['Material.001']: THREE.MeshStandardMaterial
  }
}

export const Model = (props: JSX.IntrinsicElements['group']) => {
  const { nodes, materials } = useGLTF('/models/tree/scene.gltf') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Icosphere_Material001_0.geometry}
        material={materials['Material.001']}
        position={[0, 8, 7]}
        rotation={[-Math.PI / 2, 0, 89.56]}
        scale={[10, 10, 7.458]}
      />
    </group>
  )
}

const Tree = () => {
  return (
    <Canvas
      camera={{
        fov: 75,
        position: [37, 0, 0],
      }}
    >
      <Suspense fallback={null}>
        <ambientLight />
        <directionalLight />
        <spotLight
          intensity={2}
          angle={2}
          penumbra={1}
          position={[0, 0, 0]}
          castShadow
        />
        <Model />
        <OrbitControls
          enablePan
          enableZoom={false}
          enableRotate
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Suspense>
    </Canvas>
  )
}

export default Tree
