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
  const transformedData = data.map((trade) => [
    new Date(trade.time).getTime(),
    parseFloat(trade.price),
  ])

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(transformedData.map((d) => d[0])))
    .range([margin.left, width - margin.right])

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(transformedData.map((d) => d[1])))
    .range([height - margin.bottom, margin.top]) //inverted since the values flip when this scale is applied

  const line = d3
    .line()
    .x((d) => xScale(d[0]))
    .y((d) => yScale(d[1]))
  // @ts-ignore
  const path = line(transformedData)

  const timeFormat = d3.timeFormat('%b %d, %Y')
  const startTime = xScale.domain()[0]
  const endTime = xScale.domain()[1]

  return (
    <>
      <svg className="bg-gray-100" viewBox={`0 0 ${width} ${height}`}>
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 2, duration: 2 }}
          d={path}
          stroke="currentColor"
          fill="none"
          strokeWidth="1.5"
        />
        {yScale.ticks(5).map((max) => (
          <text
            y={yScale(max)}
            key={max}
            className="current-color p-20 text-xs"
          >
            {max}
          </text>
        ))}
        {xScale.ticks(5).map((max, i) => (
          <motion.text
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 * i }}
            x={xScale(max)}
            key={i}
            fill="current-color"
            className="current-color p-20 text-xs"
          >
            {format(max, 'MMM d')}
          </motion.text>
        ))}
        <text
          x={width - margin.right}
          y={height - margin.bottom / 2}
          textAnchor="end"
          className="current-color p-20 text-xs"
        >
          {`${timeFormat(startTime)} - ${timeFormat(endTime)}`}
        </text>
        {yScale.ticks(5).map((max) => (
          <line
            key={max}
            x1={margin.left}
            x2={width - margin.right}
            y1={yScale(max)}
            y2={yScale(max)}
            stroke="currentColor"
            strokeOpacity="0.1"
          />
        ))}
      </svg>
    </>
  )
}

export default Chart
