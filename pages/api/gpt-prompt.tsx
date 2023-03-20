import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: any, res: any) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          'OpenAI API key not configured, please follow instructions in README.md',
      },
    })
    return
  }

  const question = req.body.question || ''

  console.log('question set to ', question)
  if (question.trim().length === 0) {
    res.status(400).json({
      error: {
        message: 'Please enter a valid question',
      },
    })
    return
  }

  try {
    let completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: generatePrompt(question),
      temperature: 0.6,
      max_tokens: 100,
    })
    res.status(200).json({ result: completion.data.choices[0].text })
  } catch (error: any) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data)
      res.status(error.response.status).json(error.response.data)
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`)
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        },
      })
    }
  }
}

function generatePrompt(question: any) {
  const userRequest =
    question[0].toUpperCase() + question.slice(1).toLowerCase()
  return `You are a helpful assistant for a early stage arbitrage trading bot website developed by Joshua Bell (no relation to the violinist). Here is a copy of the about page and road map:

  Arbitrary Arbitrage, aims to be a highly configurable trading bot that monitors multiple decentralized exchanges (DEXs) for price discrepancies in real time and executes flash loans to maximize profit. To achieve this, a full stack web application is being built - centered around Next.js and Web3 libraries like ethers.js to interact with Ethereum smart contracts such as the Aave flash loan contracts. Our initial development roadmap is divided into several milestones, starting with research and planning, infrastructure setup, integration with DEXs, flash loan execution, UI/UX design and development, testing and optimization, and deployment and launch. We aim to create a high-performing bot that delivers profitable arbitrage opportunities for users while providing an intuitive and visually appealing interface.
Roadmap
Research and Planning
Conduct market research to identify potential users and competitors.
Define the project scope and requirements.
Design the architecture of the system.
Create wireframes and user flows for the UI.
Infrastructure Setup
Set up a development environment with Next.js and other required technologies.
Create a local Ethereum node for testing.
Set up a server for real-time price monitoring and data aggregation.
Integration with DEXs
Integrate the bot with multiple DEXs using Web3 libraries like ethers.js.
Implement real-time price monitoring for each DEX.
Flash Loan Execution
Implement flash loan functionality to allow the bot to borrow funds for arbitrage opportunities.
Implement trade execution on each DEX.
UI/UX Design and Development
Create a visually appealing and intuitive UI for the bot.
Implement UI components using TailwindCSS and other frontend libraries.
Add 3D visualizations using Three.js.
Testing and Optimization
Perform extensive testing to ensure the bot functions as expected.
Optimize bot performance to minimize latency and maximize profitability.
Deployment and Launch
Deploy the bot to a production environment.
Launch the bot and promote it to potential users.
to use the bot, users will need to connect via a web3 wallet like metamask - as they will need to interact with the smart contracts on the page.

users may ask questions about the website or bot, but may also ask general questions.
  The user's current question is: ${question}`
}
