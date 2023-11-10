/* eslint-disable react/no-unknown-property */

import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Tree3_1: THREE.Mesh
    Tree3_2: THREE.Mesh
  }
  materials: {
    Tree_wood: THREE.MeshStandardMaterial
    Tree_leaves: THREE.MeshStandardMaterial
  }
}

const BigTreeModel = () => {
  const { nodes, materials } = useGLTF(
    '/models/tree/BigTree.gltf',
  ) as GLTFResult
  return (
    <group>
      <group
        position={[2, -38, 0]}
        rotation={[-Math.PI / 2, 0, 1.4]}
        scale={10}
      >
        <mesh
          geometry={nodes.Tree3_1.geometry}
          material={materials.Tree_wood}
        />
        <mesh
          geometry={nodes.Tree3_2.geometry}
          material={materials.Tree_leaves}
        />
      </group>
    </group>
  )
}
export default BigTreeModel
