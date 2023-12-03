import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState('')

  const submitRequest = () => {
    fetchVideos(inputValue)
  }

  const fetchVideos = async (query: string) => {
    try {
      const response = await axios.get(
        'https://www.googleapis.com/youtube/v3/search',
        {
          params: {
            part: 'snippet',
            maxResults: 5,
            key: process.env.REACT_APP_YOUTUBE_API_KEY,
            q: query
          }
        }
      )
      console.log(response.data)
      return response.data.items
    } catch (error) {
      return []
    }
  }

  return (
    <div
      className="App"
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div>
        <input
          type="text"
          placeholder="enter your request here"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ padding: '10px' }}
        />
        <button style={{ padding: '10px' }} onClick={submitRequest}>
          Search your request
        </button>
      </div>
    </div>
  )
}

export default App
