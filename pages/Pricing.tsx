import { motion, useAnimation, useAnimationControls } from 'framer-motion'
import Mage from 'mages/old.Mage'
import { useState } from 'react'

type Props = {}

const WebDesignPricing = () => {
  const [showDescription, setShowDescription] = useState(false)
  const controls = useAnimationControls()
  const webDesignPrices = [
    {
      tier: 'Landing Page',
      price: '$500 - $1,000',
      description:
        'Simple, single-page app. Great to get started with your own web presence.',
    },
    {
      tier: 'Portfolio',
      price: '$1,000 - $2,000',
      description:
        'Great for showcasing your work portfolio, includes an interactive gallery.',
    },
    {
      tier: 'E-commerce',
      price: '$2,000 - $5,000',
      description:
        'Need to setup an online shop? This is the tier for handling a multitude of customers, payment acceptance, shipping/delivery, and support.',
    },
  ]

  return (
    <div className="bg-gray-50 py-12">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base font-semibold uppercase tracking-wide text-indigo-600">
            Web Design Pricing
          </h2>
          <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            Tier Based
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {webDesignPrices.map((price) => (
              <motion.div
                animate={controls}
                onTap={() => {
                  setShowDescription(!showDescription)
                  controls.start({ rotateY: [180, 0] })
                }}
                key={price.tier}
                className="overflow-hidden rounded-lg shadow-lg"
              >
                <div className="border-b border-gray-200 bg-white px-6 py-8 sm:p-10 sm:pb-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {price.tier}
                  </h3>
                  <p className="mt-4 text-sm leading-5 text-gray-500">
                    {price.price}
                  </p>
                  {showDescription && <p>{price.description}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const ITPricing = () => {
  const [showDescription, setShowDescription] = useState(false)
  const controls = useAnimationControls()
  const itPrices = [
    {
      service: 'Home Networking',
      price: '$50/hour',
      description: 'Home router, new internet service, running cables,',
    },
    {
      service: 'Pentesting',
      price: '$50/hour',
      description: 'Vulenrablity assesment, Privalege escelation, phishing',
    },
    {
      service: 'Security Camera Installation',
      price: '$50/hour',
      description: 'running cabling, installation under eaves',
    },
  ]

  return (
    <div className="bg-gray-50 py-12">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base font-semibold uppercase tracking-wide text-indigo-600">
            IT Services Pricing
          </h2>
          <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            General Residential & Commercial
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {itPrices.map((price) => (
              <div
                key={price.service}
                className="overflow-hidden rounded-lg shadow-lg"
              >
                <motion.div
                  animate={controls}
                  className="border-b border-gray-200 bg-white px-6 py-8 sm:p-10 sm:pb-6"
                  onTap={() => {
                    setShowDescription(!showDescription)
                    controls.start({ rotateY: [180, 0] })
                  }}
                >
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {price.service}
                  </h3>
                  <p className="mt-4 text-sm leading-5 text-gray-500">
                    {price.price}
                  </p>
                  {showDescription && <p>{price.description}</p>}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const PEPricing = () => {
  const controls = useAnimationControls()
  const [showDescription, setShowDescription] = useState(false)
  const pePrices = [
    {
      service: 'Chatbot Development',
      price: '$150/hour',
      description:
        'Developing chatbots that can interact with customers, answer their queries, and provide them with relevant information.',
    },
    {
      service: 'Virtual Assistants',
      price: '$200/hour',
      description:
        'Developing virtual assistants that can help automate tasks, streamline workflows, and improve productivity.',
    },
    {
      service: 'Speech Recognition and Synthesis',
      price: '$250/hour',
      description:
        'Development of speech recognition and synthesis technologies that can enable users to interact with machines using their voice.',
    },
    {
      service: 'Natural Language Processing (NLP)',
      price: '$250/hour',
      description:
        'Developing NLP systems that can analyze and understand human language, allowing for more natural and intuitive interactions between users and machines.',
    },
    {
      service: 'Machine Learning',
      price: '$300/hour',
      description:
        'Machine learning is a key component of prompt technology, and a prompt engineer may offer services related to developing and implementing machine learning algorithms that can improve the accuracy and effectiveness of prompt systems.',
    },
  ]
  return (
    <div className="bg-gray-50 py-12">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base font-semibold uppercase tracking-wide text-indigo-600">
            Prompt Engineering
          </h2>
          <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            Advanced Services
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {pePrices.map((price) => (
              <motion.div
                animate={controls}
                onTap={() => {
                  setShowDescription(!showDescription)
                  controls.start({ rotateY: [180, 0] })
                }}
                key={price.service}
                className="overflow-hidden rounded-lg shadow-lg"
              >
                <div className="border-b border-gray-200 bg-white px-6 py-8 sm:p-10 sm:pb-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {price.service}
                  </h3>
                  <p className="mt-4 text-sm leading-5 text-gray-500">
                    {price.price}
                  </p>
                  {showDescription && <p>{price.description}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Pricing() {
  const controls = useAnimationControls()
  const variants = { flip: { rotateY: 360 } }
  return (
    <>
      <Mage controls={controls} />
      <div className="h-[1000px] w-full bg-white">
        <WebDesignPricing />
        <ITPricing />
        <PEPricing />
      </div>
    </>
  )
}
