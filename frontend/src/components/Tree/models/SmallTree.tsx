/* eslint-disable react/no-unknown-property */

import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Tree1_1: THREE.Mesh
    Tree1_2: THREE.Mesh
  }
  materials: {
    Tree_wood: THREE.MeshStandardMaterial
    Tree_leaves: THREE.MeshStandardMaterial
  }
}

const SmallTreeModel = () => {
  const { nodes, materials } = useGLTF(
    '/models/tree/SmallTree.gltf',
  ) as GLTFResult
  return (
    <group>
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

export default SmallTreeModel
