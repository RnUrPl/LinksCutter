import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { generateLink } from '../http/linksApi'
import './createPage.css'
import { useMessage } from '../hooks/useMessage'

export default function CreatePage() {

  const [from, setFrom] = useState()
  const navigate = useNavigate()
  const message = useMessage()


  const pressHandler = async event => {
    if(event.key === "Enter"){
      try {
            const data = await generateLink({ from })
            navigate(`/detail/${data.link._id}`)
        } catch (e) {
            message(e.response?.data?.message || 'Ошибка')
        }
    }
  }



    return (
  <div className="create-root">
    <div className="create-inner">
      <h1 className="create-title">Сократить ссылку</h1>
      <p className="create-hint">Вставьте длинный URL и нажмите Enter</p>

      <div className="create-input-wrap">
        <input
          className="create-input"
          id="link"
          type="text"
          placeholder="https://example.com/very/long/url..."
          value={from}
          onChange={e => setFrom(e.target.value)}
          onKeyPress={pressHandler}
        />
        <span className="create-enter-hint">Enter ↵</span>
      </div>
    </div>
  </div>
)
  
}
