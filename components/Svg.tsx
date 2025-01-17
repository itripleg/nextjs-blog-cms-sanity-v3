import { motion } from 'framer-motion'
import React from 'react'

type Props = {}

function Svg({}: Props) {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="400"
        height="400"
        version="1.1"
        viewBox="0 0 1080 1080"
        xmlSpace="preserve"
      >
        <rect width="100%" height="100%" x="0" y="0" fill="transparent"></rect>
        <rect
          width="1080"
          height="1080"
          x="0"
          y="0"
          fill="#fff"
          fillRule="nonzero"
          stroke="none"
          strokeDasharray="none"
          strokeDashoffset="0"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeWidth="1"
          rx="0"
          ry="0"
          vectorEffect="non-scaling-stroke"
        ></rect>
        <g>
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4 }}
            // style={{ InkscapeStroke: 'none' }}
            fill="#000"
            d="M321.611 19.398l-4.66 3.497L833.05 653.998h-56.303v258.725h58.229v-256.37l157.754 192.909 4.66-3.496L321.61 19.398zM177.336 81.24v553.18h58.228V81.24h-58.228zm163.889 72.756v414.887h58.23V153.996h-58.23zm509.691 20.55v477.747h58.229V174.547h-58.229zM532.215 376.442v302.397h58.23V376.44h-58.23zm-100.15 24.881v410.916h58.23V401.322h-58.23zm-173.59 12.971v340.113h58.23V414.293h-58.23zm357.72 144.346v350.7h58.229v-350.7h-58.229zM86.031 671.869l-3.494 7.377L837.73 1060.59l3.496-7.377L86.03 671.869zm607.694 158.727v143.588h58.23V830.596h-58.23z"
            color="#000"
            vectorEffect="non-scaling-stroke"
          ></motion.path>
        </g>
      </svg>
    </>
  )
}

export default Svg
