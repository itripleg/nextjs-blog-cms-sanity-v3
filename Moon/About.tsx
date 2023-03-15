import React from 'react'

const About = () => {
  return (
    <>
      <div className="p-4 text-lg">
        Arbitrary Arbitrage, aims to be a highly configurable trading bot that
        monitors multiple decentralized exchanges (DEXs) for price discrepancies
        in real time and executes flash loans to maximize profit. To achieve
        this, a full stack web application is being built - centered around
        Next.js and Web3 libraries like ethers.js to interact with Ethereum
        smart contracts such as the Aave flash loan contracts. Our initial
        development roadmap is divided into several milestones, starting with
        research and planning, infrastructure setup, integration with DEXs,
        flash loan execution, UI/UX design and development, testing and
        optimization, and deployment and launch. We aim to create a
        high-performing bot that delivers profitable arbitrage opportunities for
        users while providing an intuitive and visually appealing interface.
      </div>
      <div className="overflow-hidden bg-white/20 p-6 shadow sm:rounded-lg">
        <h2 className="mb-4 text-2xl font-bold">Roadmap</h2>
        <ol className="list-decimal pl-6">
          <h3 className="mb-2 text-lg font-bold">Research and Planning</h3>
          <ul className="list-disc pl-6">
            <li>
              Conduct market research to identify potential users and
              competitors.
            </li>
            <li>Define the project scope and requirements.</li>
            <li>Design the architecture of the system.</li>
            <li>Create wireframes and user flows for the UI.</li>
          </ul>

          <h3 className="mb-2 text-lg font-bold">Infrastructure Setup</h3>
          <ul className="list-disc pl-6">
            <li>
              Set up a development environment with Next.js and other required
              technologies.
            </li>
            <li>Create a local Ethereum node for testing.</li>
            <li>
              Set up a server for real-time price monitoring and data
              aggregation.
            </li>
          </ul>

          <h3 className="mb-2 text-lg font-bold">Integration with DEXs</h3>
          <ul className="list-disc pl-6">
            <li>
              Integrate the bot with multiple DEXs using Web3 libraries like
              ethers.js.
            </li>
            <li>Implement real-time price monitoring for each DEX.</li>
          </ul>

          <h3 className="mb-2 text-lg font-bold">Flash Loan Execution</h3>
          <ul className="list-disc pl-6">
            <li>
              Implement flash loan functionality to allow the bot to borrow
              funds for arbitrage opportunities.
            </li>
            <li>Implement trade execution on each DEX.</li>
          </ul>

          <h3 className="mb-2 text-lg font-bold">
            UI/UX Design and Development
          </h3>
          <ul className="list-disc pl-6">
            <li>Create a visually appealing and intuitive UI for the bot.</li>
            <li>
              Implement UI components using TailwindCSS and other frontend
              libraries.
            </li>
            <li>Add 3D visualizations using Three.js.</li>
          </ul>

          <h3 className="mb-2 text-lg font-bold">Testing and Optimization</h3>
          <ul className="list-disc pl-6">
            <li>
              Perform extensive testing to ensure the bot functions as expected.
            </li>
            <li>
              Optimize bot performance to minimize latency and maximize
              profitability.
            </li>
          </ul>

          <h3 className="mb-2 text-lg font-bold">Deployment and Launch</h3>
          <ul className="list-disc pl-6">
            <li>Deploy the bot to a production environment.</li>
            <li>Launch the bot and promote it to potential users.</li>
          </ul>
        </ol>
        <style jsx>{`
          li {
            list-style-type: disc;
            margin-left: 1.5rem;
          }
        `}</style>
      </div>
    </>
  )
}

export default About
