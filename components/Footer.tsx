import { motion } from 'framer-motion'
import Link from 'next/link'

const drinks = ['🍾', '☕', '🍺', '🍻', '🍻', '😅']

const Footer = () => {
  return (
    <div>
      {/* <div transition={{ delay: 10, duration: 3 }} animate={{ y: 80 }}> */}
      <motion.div
        className="sticky bottom-0 flex justify-center bg-black p-2 text-center md:p-6"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 0.75, y: 0 }}
        transition={{ duration: 1, delay: 5 }}
      >
        <Link href="https://www.buymeacoffee.com/joshibell">
          <div className="flex">
            <p className="pr-4 text-white">Buy me a Yerba Mate?</p>
            {drinks.map((drink, i) => {
              return (
                <motion.p
                  key={i}
                  className=""
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 8 * i }}
                >
                  {drink}
                </motion.p>
              )
            })}
          </div>
        </Link>
      </motion.div>
    </div>
  )
}

export default Footer
