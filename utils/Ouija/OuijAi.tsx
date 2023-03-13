// import { OuijaBoard } from "../components/OuijaBoard";
import { Environment, PresentationControls } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import { motion, useAnimation } from 'framer-motion'
import { useState } from 'react'

import { Flecha } from './Flecha'
import { OuijaBoard } from './OuijaBoard'

type Props = {}

function OuijAi({}: Props) {
  const [questionInput, setQuestionInput] = useState('')
  const [result, setResult] = useState()
  const animationControls = useAnimation()

  async function handleKeyPress(key: any) {
    // get the last key pressed and move ouija arrow
    // let lastKey = key[key.length - 1]
    // await animationControls.start(lastKey)
  }

  async function onSubmit(event: any) {
    event.preventDefault()
    setQuestionInput('')
    console.log('submitting...', questionInput)
    animationControls.start('default')
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: questionInput }),
    })
    const data = await response.json()
    if (response.status !== 200) {
      throw (
        data.error || new Error(`Request failed with status ${response.status}`)
      )
    }
    // console.log(data.result);
    const reply = String(data.result.substring('['))
    setResult(data.result)
    const regex = /[1-9][0-9]* [a-zA-Z]+ [a-zA-Z]+/
    const matchedResult = reply.match(regex)
    console.log('reply is ', reply)
    console.log('reply is ', matchedResult)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ duration: 1 }}
        className="hidden h-[520px] w-full max-w-4xl border border-black lg:h-[420px]"
      >
        <div className="hidden h-[50px]" />
        {/* @ts-ignore */}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <h1 className="text-center text-2xl uppercase tracking-[20px] text-white">
          <span className="text-red-800">Ask </span>
          Away
        </h1>
        <form onSubmit={onSubmit}>
          <div className="flex w-full justify-center px-6 py-6 lg:px-0">
            <input
              type="text"
              value={questionInput}
              className="w-full max-w-4xl p-2 text-black"
              onChange={(e) => {
                setQuestionInput(e.target.value)
                handleKeyPress(e.target.value.toLowerCase())
              }}
            />
          </div>
        </form>
      </motion.div>
      <div className="px-6 text-center italic">{result}</div>
      {/* <button className="bg-red-800 p-4 rounded-md"></button> */}
    </>
  )
}

export default OuijAi
