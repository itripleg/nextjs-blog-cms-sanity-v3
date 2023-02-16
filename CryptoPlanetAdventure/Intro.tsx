//Intro.tsx
import { OrbitControls, Stars } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

import Planet from './Planet'
import Rocket from './Rocket'

const Intro = () => {
  const [target, setTarget] = useState<THREE.Vector3 | null>(null)
  const [planets, setPlanets] = useState([])
  const [camera, setCamera] = useState<THREE.PerspectiveCamera>()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const newCamera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      )

      window.addEventListener('resize', () => {
        newCamera.aspect = window.innerWidth / window.innerHeight
        newCamera.updateProjectionMatrix()
      })

      setCamera(newCamera)
    }

    const randomPosition = (min, max) => {
      const range = max - min
      return min + Math.random() * range
    }

    const randomSize = (min, max) => {
      const range = max - min
      return min + Math.random() * range
    }

    const randomColor = () => {
      return '#' + Math.floor(Math.random() * 16777215).toString(16)
    }

    const scale = 1

    const generateRandomPlanets = (numPlanets, minDistance) => {
      const planets = []
      const planetPositions = []
      let attempts = 0

      while (planets.length < numPlanets && attempts < 100) {
        attempts++

        const planet = {
          position: [
            randomPosition(0, 30),
            randomPosition(-30, 30),
            randomPosition(-30, 30),
          ],
          size: randomSize(1, 5) * scale,
          color: randomColor(),
          ringSize: 0.2 * scale,
          ringColor: randomColor(),
          ringNoise: 0.3 * scale,
        }

        // Check if planet is too close to any existing planet
        const tooClose = planetPositions.some((position) => {
          return (
            position.distanceTo(new THREE.Vector3(...planet.position)) <
            minDistance
          )
        })

        if (!tooClose) {
          planetPositions.push(new THREE.Vector3(...planet.position))
          planets.push(planet)
        }
      }

      return planets
    }

    setPlanets(generateRandomPlanets(5, 35))
  }, [])

  const handlePlanetClick = (position) => {
    console.log('Planet clicked!', position)
    setTarget(new THREE.Vector3(...position))
  }

  return (
    <div className="bg-primary py-16 px-8 text-center md:px-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-accent mb-6 text-3xl font-extrabold md:text-4xl">
          Crypto Planet Adventure
        </h1>
        <p className="text-bg mb-10 text-lg font-medium md:text-xl">
          Explore new worlds and collect rare cryptocurrencies in this thrilling
          adventure game.
        </p>
        <div className="mb-10 h-[400px]">
          <Canvas>
            <ambientLight />
            <Stars />
            <OrbitControls />
            {planets.map((planet, index) => (
              <Planet
                key={index}
                position={planet.position}
                size={planet.size}
                color={planet.color}
                ringSize={planet.ringSize}
                ringColor={planet.ringColor}
                ringNoise={planet.ringNoise}
                onPlanetClick={handlePlanetClick}
              />
            ))}
            {target && <Rocket camera={camera} target={target} />}
            {/* {target && <Camera target={target} />} */}
          </Canvas>
        </div>
        <Link href="/play">
          <button className="btn btn-primary mr-4 md:mr-8">Play Now</button>
        </Link>
        <Link href="/about">
          <button className="btn btn-secondary">Learn More</button>
        </Link>
      </div>
    </div>
  )
}

export default Intro
