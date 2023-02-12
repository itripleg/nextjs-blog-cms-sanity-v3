import * as d3 from 'd3'
import format from 'date-fns/format'
import * as React from 'react'

type Props = {
  data: any[]
  width: number
  height: number
}

function Chart({ data, width, height }: Props) {
  const xMax = d3.max(data, (d) => d[0])
  const yMax = d3.max(data, (d) => d[1])

  const xScale = d3
    .scaleTime()
    .domain([d3.min(data, (d) => d[0]), d3.max(data, (d) => d[0])!])
    .range([0, width])

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => +d[1])!])
    .range([height, 0])

  const line = d3
    .line()
    .x((d) => xScale(d[0]))
    .y((d) => yScale(d[1]))

  const result = line(data.map((d) => [d[0], yScale(d[1])]))

  const xAxis = d3
    .axisBottom(xScale)
    .ticks(data.length / 2)
    // @ts-ignore
    .tickFormat((d) => '🌘')
  // .tickFormat((d) => format(d, 'MMM'))

  const yAxis = d3.axisLeft(yScale).ticks(10)

  return (
    <div className="chart-container" style={{ paddingBottom: '30px' }}>
      <svg className=" bg-black/20 text-blue-500" width={width} height={height}>
        <path d={result} fill="none" stroke="black" />
        <g ref={(node) => d3.select(node).call(xAxis)} />
        <g ref={(node) => d3.select(node).call(yAxis)} />
      </svg>
    </div>
  )
}

export default Chart
