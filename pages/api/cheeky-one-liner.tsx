import { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let completion = await openai.createCompletion({
      model: 'text-davinci-002',
      prompt: `Write a cheeky one liner for a dev. Keep it short and sweet. Try not to use quotes unless using an actual quote.`,
      temperature: 1,
      max_tokens: 100,
    })
    res.status(200).json({ response: completion.data.choices[0].text.trim() })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong' })
  }
}
