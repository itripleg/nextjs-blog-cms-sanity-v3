import { useState } from 'react'

const ChatGPT = () => {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/noir', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: inputText }),
      })
      const data = await res.json()
      console.log(data)
      setOutputText(data.result)
      setInputText('')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="p-4">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-4 text-2xl font-bold">Chat with GPT</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <label htmlFor="inputText" className="mb-2 block font-medium">
            Input Text
          </label>
          <input
            type="text"
            id="inputText"
            className="w-full rounded border-2 border-gray-400 py-2 px-3"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            type="submit"
            className="focus:shadow-outline-blue mt-4 rounded bg-blue-500 py-2 px-4 text-white focus:outline-none hover:bg-blue-600 active:bg-blue-600"
          >
            Send
          </button>
        </form>
        <div className="rounded bg-gray-200 p-4">
          <p className="mb-2 font-medium">Output Text</p>
          <div className="w-full rounded border-2 border-gray-400 py-2 px-3">
            {outputText}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatGPT
