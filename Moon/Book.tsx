import { useGLTF } from '@react-three/drei'

type Props = {}

function Model() {
  const gltf = useGLTF('/models/book_of_the_moon_blue-silver.glb')
  return <primitive object={gltf.scene} />
}

function Book({}: Props) {
  return <Model />
}

export default Book
