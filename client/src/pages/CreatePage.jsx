import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { generateLink } from '../http/linksApi'
import './createPage.css'

export default function CreatePage() {

  const [from, setFrom] = useState()
  const navigate = useNavigate()

  const pressHandler = async event => {
    if(event.key === "Enter"){
      const data = await generateLink({from})
      navigate(`/detail/${data.link._id}`)
    }
  }



  return (
    <div className="container">
      <div className="col " style={{paddingTop: '2rem'}}>
        <div className="input-field blue lighten-3">
          <input
            placeholder="Вставьте ссылку"
            id="link"
            type="text"
            value={from}
            onChange={e => setFrom(e.target.value)}
            onKeyPress={pressHandler}
            style={{color: "#ffff"}}
          />
        </div>
      </div>
    </div>
  )
}
