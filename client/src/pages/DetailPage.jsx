import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {LinkCard} from '../components/LinkCard'
import { getLinkById } from '../http/linksApi'

 const DetailPage = () => {
  const [loading,setLoading] = useState(true)
  const [link, setLink] = useState(null)
  const linkId = useParams().id

  const getLink = async(linkId) => {
      const fetched = await getLinkById(linkId)
      setLink(fetched)
      setLoading(false)
  } 

  useEffect(() => {
    getLink(linkId)
  }, [linkId])




  return (
    <>
      {!loading && link && <LinkCard link={link} /> }
    </>
  )
}

export default DetailPage