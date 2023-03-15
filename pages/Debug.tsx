<<<<<<< Updated upstream
import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Header from 'components/Header'
import HauntedHouse from 'models/HauntedHouse'
import House from 'models/House'
import Book from 'Moon/Book'
import Chart from 'Moon/Chart'
import Moon from 'Moon/Moon'
import Retrograde from 'Moon/Retrograde'
import dynamic from 'next/dynamic'
import React from 'react'
=======
import Chart from 'ChartWidget/Chart'
import TradeData from 'ChartWidget/TradeData'
import Contract from 'Moon/Contract'
import { useEffect, useState } from 'react'
>>>>>>> Stashed changes

const Clock = dynamic(() => import('components/Clock'), { ssr: false })
type Props = {}

export default function Debug({}: Props) {
  // const house = useGLTF('/models/haunted_house.glb')

  return (
<<<<<<< Updated upstream
    <div className="mx-auto grid h-screen max-h-screen w-full max-w-[100vh] grid-cols-2 place-items-center">
      {/* <Header /> */}
      {/* <Clock /> */}
      <Chart />
      <div className="px- col-span-2 w-full bg-gray-200">
        <Canvas>
          <ambientLight />
          <Book />
          <OrbitControls />
          <HauntedHouse />
          {/* <House /> */}
        </Canvas>
      </div>
      <Moon />
      <Retrograde />
    </div>
=======
    <>
      <Contract />
    </>
>>>>>>> Stashed changes
  )
}
