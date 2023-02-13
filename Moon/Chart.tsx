import * as d3 from 'd3'
import format from 'date-fns/format'
import { motion } from 'framer-motion'
import * as React from 'react'

type Props = {
  data: any[]
  width: number
  height: number
}

const margin = { top: 20, right: 0, bottom: 0, left: 40 }

function Chart({ data, width, height }: Props) {
  // domain is the min/max of input values
  // range min/max of output values
  let xScale = d3
    .scaleLinear()
    .domain(d3.extent(data.map((d) => d[0])))
    .range([margin.left, width - margin.right])

  let yScale = d3
    .scaleLinear()
    .domain(d3.extent(data.map((d) => d[1])))
    .range([height - margin.bottom, margin.top]) //inverted since the values flip when this scale is applied

  let moonScale = d3
    .scaleLinear()
    .domain(d3.extent(data.map((d) => d[0])))
    .range([margin.left, width - margin.right])

  // our line with scaled x,y values
  let line = d3
    .line()
    .x((d) => xScale(d[0]))
    .y((d) => yScale(d[1]))

  // the path data to feed into our svg
  // @ts-ignore
  let path = line(data)
  // console.log(path)

  console.log(yScale.ticks())

  return (
    <>
      <svg className="bg-gray-100" viewBox={`0 0 ${width} ${height}`}>
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2 }}
          d={path}
          stroke="currentColor"
          fill="none"
          strokeWidth="1.5"
        />
        <line x2={10} y2={10} />
        {yScale.ticks(5).map((max) => (
          <text
            y={yScale(max)}
            key={max}
            className="current-color  p-20 text-xs"
            // alignmentBaseline="middle"
          >
            {max}
          </text>
        ))}
        {xScale.ticks(5).map((max) => (
          <motion.text
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            x={xScale(max)}
            key={max}
            fill="current-color"
            className="current-color  p-20 text-xs"
          >
            {/* {max} */}
            🌕
          </motion.text>
        ))}

        {data.map((d, i) => (
          <motion.circle
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 1, type: 'spring', bounce: 0.3 }}
            key={i}
            r="2"
            cx={xScale(d[0])}
            cy={yScale(d[1])}
            fill="currentColor"
            stroke="gray"
            strokeWidth={2}
          />
        ))}
      </svg>
    </>
  )
}

export default Chart
