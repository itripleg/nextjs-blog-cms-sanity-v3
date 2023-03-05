import { motion, useAnimationControls } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import Mage from '../mages/old.Mage'
import styles from './BlogHeader.module.css'

export default function BlogHeader({
  title,
  description,
  level,
}: {
  title: string
  description?: any[]
  level: 1 | 2
}) {
  const controls = useAnimationControls()

  const [response, setResponse] = useState('')

  const fetchResponse = () => {
    console.log('fetching one-liner')
    fetch('/api/cheeky-one-liner')
      .then((res) => res.json())
      .then((data) => setResponse(data.response))
  }
  useEffect(() => {
    fetchResponse()
  }, [])

  switch (level) {
    case 1:
      return (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <header className="mt-16 mb-10 flex flex-col items-center md:mb-12 md:flex-row md:justify-between">
              <motion.h4
                initial={{ y: -100 }}
                animate={{ y: 0, scale: 1.3, paddingBottom: 20 }}
                transition={{ duration: 2, type: 'spring', bounce: 0.1 }}
                className="  text-6xl font-bold leading-tight tracking-tighter md:pr-8 md:text-8xl"
              >
                {title}
              </motion.h4>
              <div className="md:hidden" onClick={fetchResponse}>
                <Mage controls={controls} />
              </div>
              {/* big mage */}
              <motion.div
                animate={{ x: 0, y: 10 }}
                transition={{ delay: 0, duration: 1 }}
                // className="hidden 2xl:block"
                className="hidden md:block"
              >
                <Mage controls={controls} />
              </motion.div>

              <motion.h4
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className={`mt-5 min-w-full text-center text-lg md:pl-8 md:text-left ${styles.portableText}`}
              >
                {response}
              </motion.h4>
            </header>
          </motion.div>
        </>
      )

    case 2:
      return (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <header>
            <h2 className="mt-8 mb-20 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
              <Link href="/" className="hover:underline">
                {title}
              </Link>
            </h2>
          </header>
        </motion.div>
      )

    default:
      throw new Error(
        `Invalid level: ${
          JSON.stringify(level) || typeof level
        }, only 1 or 2 are allowed`
      )
  }
}
