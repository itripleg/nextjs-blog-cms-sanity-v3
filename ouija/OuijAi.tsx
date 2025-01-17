import { Environment, PresentationControls } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import { motion, useAnimation } from 'framer-motion'
import React, { useState } from 'react'

// import CrystalBall from "../components/CrystalBall";
import { Flecha } from './Flecha'
import { OuijaBoard } from './OuijaBoard'

type Props = {}

function OuijAi({}: Props) {
  const [questionInput, setQuestionInput] = useState('')
  const [result, setResult] = useState()
  const animationControls = useAnimation()

  async function handleKeyPress(key: any) {
    // get the last key pressed and move ouija arrow
    let lastKey = key[key.length - 1]
    if (lastKey) {
      await animationControls.start(lastKey)
    }
  }

  function getFirstSentence(paragraph: string) {
    const firstSentence = paragraph.match(/^[^\.\?!]*/)[0]
    return firstSentence + '.'
  }
  const [mode, setMode] = useState('ouija')

  async function onSubmit(event: any) {
    event.preventDefault()
    setQuestionInput('')
    animationControls.start('default')
    console.log('submitting...', questionInput)
    if (questionInput.toLowerCase().includes('goodbye')) {
      setMode('ai')
      return
    }
    let response
    if (mode == 'ouija') {
      response = await fetch('/api/ouija-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: questionInput }),
      })
    }
    if (mode == 'ai') {
      response = await fetch('/api/gpt-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: questionInput }),
      })
    }
    const data = await response.json()
    console.log(data)
    if (response.status !== 200) {
      throw (
        data.error || new Error(`Request failed with status ${response.status}`)
      )
    }
    // console.log(data.result);
    // const reply = String(data.result.substring('['))
    const reply = data ? getFirstSentence(data.result) : null
    // @ts-ignore
    setResult(reply)
    console.log('reply is ', reply)
    // TODO extract array from string
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="mx-auto flex h-[400px] max-w-4xl justify-center lg:h-[1000px]"
      >
        <Canvas camera={{ zoom: 1, position: [0, 0, 6] }}>
          <PresentationControls
            // cameraPosition={[0, 0, 10]}
            // defaultCameraPosition={[0, 0, 10]}
            enabled={true} // the controls can be disabled by setting this to false
            global={true} // Spin globally or by dragging the model
            cursor={false} // Whether to toggle cursor style on drag
            snap={true} // Snap-back to center (can also be a spring config)
            speed={1} // Speed factor
            zoom={1} // Zoom factor when half the polar-max is reached
            rotation={[0, 0, 0]} // Default rotation
            polar={[-1, Math.PI / 2]} // Vertical limits
            azimuth={[-0.5, 0.5]} // Horizontal limits
            config={{ zoom: 5, mass: 3, tension: 170, friction: 26 }} // Spring config
          >
            <Flecha
              // @ts-ignore
              position={[-10, 0, 0]}
              animationControls={animationControls}
            />
            <OuijaBoard />
          </PresentationControls>

          {/* <Environment preset="sunset" /> */}
          <ambientLight intensity={0.5} />
        </Canvas>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute left-0 mx-auto flex w-full max-w-[200px]  flex-col justify-center"
      >
        <h1 className="text-center text-2xl uppercase tracking-[20px] ">
          <span className="text-red-800">Ask </span>
          Away
        </h1>
        <form onSubmit={onSubmit}>
          <div className="flex w-full justify-center bg-black/20 px-6 py-6 lg:px-0">
            <motion.input
              animate={{ opacity: 0.8 }}
              type="text"
              value={questionInput}
              className="w-full max-w-4xl rounded-md border bg-black/20 p-2 text-black"
              onChange={(e) => {
                setQuestionInput(e.target.value)
                handleKeyPress(e.target.value.toLowerCase())
              }}
            />
          </div>
        </form>
        <div className="p-8 text-center italic">{result}</div>
      </motion.div>
    </>
  )
}

export default OuijAi
