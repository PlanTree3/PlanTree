/* eslint-disable react/no-unknown-property */

import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Log001: THREE.Mesh
    Log001_1: THREE.Mesh
  }
  materials: {
    Tree_wood: THREE.MeshStandardMaterial
    ['Tree_wood_inner.1']: THREE.MeshStandardMaterial
  }
}

const LogModel = () => {
  const { nodes, materials } = useGLTF('/models/tree/Log.gltf') as GLTFResult
  return (
    <group dispose={null}>
      <group
        position={[0, -12, 0]}
        rotation={[-Math.PI / 2, -1.6, 1.5]}
        scale={20}
      >
        <mesh geometry={nodes.Log001.geometry} material={materials.Tree_wood} />
        <mesh
          geometry={nodes.Log001_1.geometry}
          material={materials['Tree_wood_inner.1']}
        />
      </group>
    </group>
  )
}

export default LogModel
