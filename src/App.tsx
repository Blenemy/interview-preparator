import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [videos, setVideos] = useState([])

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

      const videosWithTimecodes = response.data.items.filter((video: any) =>
        hasTimecodes(video.snippet.description)
      )

      setVideos(videosWithTimecodes)
      console.log(response)
    } catch (error) {
      console.error('Error fetching videos:', error)
      setVideos([])
    }
  }

  const hasTimecodes = (description: string) => {
    const timecodePattern = /\d{1,2}:\d{2}/
    return timecodePattern.test(description)
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
          placeholder="Enter your request here"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ padding: '10px' }}
        />
        <button style={{ padding: '10px' }} onClick={submitRequest}>
          Search your request
        </button>
        {videos.length > 0 && (
          <div>
            <h2>Видео с таймкодами:</h2>
            <ul>
              {videos.map((video: any) => (
                <li key={video.id.videoId}>{video.snippet.title}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
