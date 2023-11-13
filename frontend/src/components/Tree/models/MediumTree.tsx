/* eslint-disable react/no-unknown-property */

import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Tree2_1: THREE.Mesh
    Tree2_2: THREE.Mesh
  }
  materials: {
    Tree_wood: THREE.MeshStandardMaterial
    Tree_leaves: THREE.MeshStandardMaterial
  }
}

const MediumTreeModel = () => {
  const { nodes, materials } = useGLTF(
    '/models/tree/MediumTree.gltf',
  ) as GLTFResult
  return (
    <group>
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

export default MediumTreeModel
