/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Suspense } from 'react'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Tree1_1: THREE.Mesh
    Tree1_2: THREE.Mesh
    Tree2_1: THREE.Mesh
    Tree2_2: THREE.Mesh
    Tree3_1: THREE.Mesh
    Tree3_2: THREE.Mesh
    Cube_0: THREE.Mesh
    Cube001_0: THREE.Mesh
    Plane_0: THREE.Mesh
    Plane001_0: THREE.Mesh
    Plane002_0: THREE.Mesh
  }
  materials: {
    Tree_wood: THREE.MeshStandardMaterial
    Tree_leaves: THREE.MeshStandardMaterial
    Material: THREE.MeshStandardMaterial
    ['Material.001']: THREE.MeshStandardMaterial
    ['Material.003']: THREE.MeshStandardMaterial
    ['Material.004']: THREE.MeshStandardMaterial
  }
}

export const SmallTreeModel = () => {
  const { nodes, materials } = useGLTF(
    '/models/tree/SmallTree.gltf',
  ) as GLTFResult
  return (
    <group dispose={null}>
      <group
        position={[0, -25.5, 0]}
        rotation={[-Math.PI / 2, 0, 0.9]}
        scale={10}
      >
        <mesh
          geometry={nodes.Tree1_1.geometry}
          material={materials.Tree_wood}
        />
        <mesh
          geometry={nodes.Tree1_2.geometry}
          material={materials.Tree_leaves}
        />
      </group>
    </group>
  )
}

export const MideumTreeModel = (props: JSX.IntrinsicElements['group']) => {
  const { nodes, materials } = useGLTF(
    '/models/tree/MideumTree.gltf',
  ) as GLTFResult
  return (
    <group {...props} dispose={null}>
      <group
        position={[0, -33.5, 0]}
        rotation={[-Math.PI / 2, 0, 1.3]}
        scale={10}
      >
        <mesh
          geometry={nodes.Tree2_1.geometry}
          material={materials.Tree_wood}
        />
        <mesh
          geometry={nodes.Tree2_2.geometry}
          material={materials.Tree_leaves}
        />
      </group>
    </group>
  )
}

export const FruitModel = () => {
  const { nodes, materials } = useGLTF('/models/fruit/scene.gltf') as GLTFResult
  return (
    <group dispose={null}>
      <group position={[12, 11, 3]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          geometry={nodes.Cube_0.geometry}
          material={materials.Material}
          position={[0.37, 0, -0.26]}
          scale={2.503}
        />
        <mesh
          geometry={nodes.Cube001_0.geometry}
          material={materials['Material.001']}
          position={[0.361, -0.073, 2.003]}
          rotation={[0, 0.114, 0]}
          scale={0.213}
        />
        <mesh
          geometry={nodes.Plane_0.geometry}
          material={materials['Material.003']}
          position={[-1.198, -0.326, 2.934]}
        />
        <mesh
          geometry={nodes.Plane001_0.geometry}
          material={materials['Material.004']}
          position={[2.198, 0.349, 2.774]}
          rotation={[-0.049, 0.195, -3.012]}
        />
        <mesh
          geometry={nodes.Plane002_0.geometry}
          material={materials['Material.004']}
          position={[-0.289, 0.927, 3.21]}
          rotation={[0.425, -0.346, -1.313]}
          scale={0.858}
        />
      </group>
      <group position={[14, 6, -6]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          geometry={nodes.Cube_0.geometry}
          material={materials.Material}
          position={[0.37, 0, -0.26]}
          scale={2.203}
        />
        <mesh
          geometry={nodes.Cube001_0.geometry}
          material={materials['Material.001']}
          position={[0.361, -0.073, 2.003]}
          rotation={[0, 0.114, 0]}
          scale={0.213}
        />
        <mesh
          geometry={nodes.Plane_0.geometry}
          material={materials['Material.003']}
          position={[-1.198, -0.326, 2.934]}
        />
        <mesh
          geometry={nodes.Plane001_0.geometry}
          material={materials['Material.004']}
          position={[2.198, 0.349, 2.774]}
          rotation={[-0.049, 0.195, -3.012]}
        />
        <mesh
          geometry={nodes.Plane002_0.geometry}
          material={materials['Material.004']}
          position={[-0.289, 0.927, 3.21]}
          rotation={[0.425, -0.346, -1.313]}
          scale={0.858}
        />
      </group>
      <group
        onClick={() => {
          console.log('과일')
        }}
        position={[11, 1, 5]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <mesh
          geometry={nodes.Cube_0.geometry}
          material={materials.Material}
          position={[0.37, 0, -0.26]}
          scale={2.503}
        />
        <mesh
          geometry={nodes.Cube001_0.geometry}
          material={materials['Material.001']}
          position={[0.361, -0.073, 2.003]}
          rotation={[0, 0.114, 0]}
          scale={0.213}
        />
        <mesh
          geometry={nodes.Plane_0.geometry}
          material={materials['Material.003']}
          position={[-1.198, -0.326, 2.934]}
        />
        <mesh
          geometry={nodes.Plane001_0.geometry}
          material={materials['Material.004']}
          position={[2.198, 0.349, 2.774]}
          rotation={[-0.049, 0.195, -3.012]}
        />
        <mesh
          geometry={nodes.Plane002_0.geometry}
          material={materials['Material.004']}
          position={[-0.289, 0.927, 3.21]}
          rotation={[0.425, -0.346, -1.313]}
          scale={0.858}
        />
      </group>
    </group>
  )
}
// type GLTFResult = GLTF & {
//   nodes: {
//     Icosphere_Material001_0: THREE.Mesh
//   }
//   materials: {
//     ['Material.001']: THREE.MeshStandardMaterial
//   }
// }

// export const Model = (props: JSX.IntrinsicElements['group']) => {
//   const { nodes, materials } = useGLTF('/models/tree/scene.gltf') as GLTFResult
//   return (
//     <group {...props} dispose={null}>
//       <mesh
//         geometry={nodes.Icosphere_Material001_0.geometry}
//         material={materials['Material.001']}
//         position={[0, 8, 7]}
//         rotation={[-Math.PI / 2, 0, 89.56]}
//         scale={[10, 10, 7.458]}
//       />
//     </group>
//   )
// }

const Tree = () => {
  return (
    <Canvas
      camera={{
        fov: 75,
        position: [50, 0, 0],
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
        {/* <SmallTreeModel /> */}
        <MideumTreeModel />
        <FruitModel />
        <OrbitControls
          enablePan
          enableZoom
          enableRotate
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Suspense>
    </Canvas>
  )
}

export default Tree
