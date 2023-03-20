import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  // Get the path to the `pages/api` directory
  const apiDirectory = path.join(process.cwd(), 'pages', 'api')

  // Read the files in the `pages/api` directory
  const fileNames = fs.readdirSync(apiDirectory)

  // Filter out any non-API files and extract the endpoint names
  const endpoints = fileNames
    .filter(
      (fileName) =>
        (fileName.endsWith('.tsx') || fileName.endsWith('.ts')) &&
        fileName !== 'index.tsx'
    )
    .map((fileName) => fileName.replace(/\.tsx?$/, ''))

  // Add a welcome message to the JSON object
  const data = {
    message: 'Welcome to the Buncombe.tech blog API!',
    endpoints,
  }

  // Return the updated JSON object
  res.status(200).json(data)
}
