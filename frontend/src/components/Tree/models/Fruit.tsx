/* eslint-disable react/no-unknown-property */

import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Cube_0: THREE.Mesh
    Cube001_0: THREE.Mesh
    Plane_0: THREE.Mesh
    Plane001_0: THREE.Mesh
    Plane002_0: THREE.Mesh
  }
  materials: {
    Material: THREE.MeshStandardMaterial
    ['Material.001']: THREE.MeshStandardMaterial
    ['Material.003']: THREE.MeshStandardMaterial
    ['Material.004']: THREE.MeshStandardMaterial
  }
}

interface FruitProps {
  degree: number
}

const FruitModel = ({ degree }: FruitProps) => {
  const { nodes, materials } = useGLTF('/models/fruit/scene.gltf') as GLTFResult

  console.log(degree)

  return (
    <>
      {(degree <= 50 || degree === 100) && (
        <group>
          <group position={[12, 13, 1]} rotation={[-Math.PI / 2, 0, 0]}>
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
          <group position={[12, 6, -7]} rotation={[-Math.PI / 2, 0, 0]}>
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
          <group position={[11, 3, 4]} rotation={[-Math.PI / 2, 0, 0]}>
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
      )}
      {degree > 50 && (
        <>
          <group position={[2, 8, 3]}>
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
            <group position={[12, 6, -6]} rotation={[-Math.PI / 2, 0, 0]}>
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
            <group position={[11, 1, 5]} rotation={[-Math.PI / 2, 0, 0]}>
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
          <group position={[1, 0, -16]}>
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
            <group position={[11, 6, -6]} rotation={[-Math.PI / 2, 0, 0]}>
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
            <group position={[9, 1, 5]} rotation={[-Math.PI / 2, 0, 0]}>
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
          <group position={[2, -7, 17]}>
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
            <group position={[12, 6, -6]} rotation={[-Math.PI / 2, 0, 0]}>
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
            <group position={[11, 1, 5]} rotation={[-Math.PI / 2, 0, 0]}>
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
        </>
      )}
      {degree === 100 && (
        <>
          <group position={[18, 7, 8]}>
            <group position={[11, 11, 3]} rotation={[-Math.PI / 2, 0, 0]}>
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
            <group position={[12, 6, -6]} rotation={[-Math.PI / 2, 0, 0]}>
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
            <group position={[9, 1, 5]} rotation={[-Math.PI / 2, 0, 0]}>
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
            <group position={[-3, -5, 20]} rotation={[-Math.PI / 2, 0, 0]}>
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
          <group position={[19, 1, -13]}>
            <group position={[11, 9, 3]} rotation={[-Math.PI / 2, 0, 0]}>
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
            <group position={[12, 3, -3]} rotation={[-Math.PI / 2, 0, 0]}>
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
            <group position={[11, 2, 5]} rotation={[-Math.PI / 2, 0, 0]}>
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
          <group position={[15, 9, -19]}>
            <group position={[14, 11, 4]} rotation={[-Math.PI / 2, 0, 0]}>
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
            <group position={[12, 6, -6]} rotation={[-Math.PI / 2, 0, 0]}>
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
          </group>
          <group position={[7, -3, -32]}>
            <group position={[14, 11, 5]} rotation={[-Math.PI / 2, 0, 0]}>
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
            <group position={[12, 5, -6]} rotation={[-Math.PI / 2, 0, 0]}>
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
            <group position={[11, 1, 5]} rotation={[-Math.PI / 2, 0, 0]}>
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
        </>
      )}
    </>
  )
}

export default FruitModel
