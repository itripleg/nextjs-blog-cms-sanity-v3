import * as d3 from 'd3'
import format from 'date-fns/format'
import * as React from 'react'

type Props = {
  data: any[]
  width: number
  height: number
}

function Chart({ data, width, height }: Props) {
  // domain is the min/max of input values
  // range min/max of output values
  let xScale = d3
    .scaleLinear()
    .domain(d3.extent(data.map((d) => d[0])))
    .range([0, width])

  let yScale = d3
    .scaleLinear()
    .domain(d3.extent(data.map((d) => d[1])))
    .range([height, 0]) //inverted since the values flip when this scale is applied

  // our line with scaled x,y values
  let line = d3
    .line()
    .x((d) => xScale(d[0]))
    .y((d) => yScale(d[1]))

  // the path data to feed into our svg
  // @ts-ignore
  let path = line(data)
  // console.log(path)

  return (
    <>
      <svg className="bg-gray-100" viewBox={`0 0 ${width} ${height}`}>
        <path d={path} stroke="currentColor" fill="none" />
      </svg>
    </>
  )
}

export default Chart
