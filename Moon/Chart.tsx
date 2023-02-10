import * as d3 from 'd3'
type Props = {}

// @ts-ignore
function Chart({ data, width, height }: Props) {
  let dummyData: any = [
    [2, 11],
    [10, 50],
    [20, 77],
    [30, 26],
    [40, 42],
    [50, 18],
  ]

  let line = d3.line()
  // let line = d3.line().y((d) => height)
  let result = line(dummyData)
  // console.log(line)
  // console.log(d3)

  return (
    <div className="h-screen w-full">
      {/* <h1> Chart</h1> */}
      <svg className="h-screen w-full bg-black/20 text-blue-500">
        <path d={result} fill="none" stroke="black" />
      </svg>
    </div>
  )
}

export default Chart
