import React, { useEffect, useState} from 'react'
import { Loader } from '../components/Loader'
import {LinksList} from '../components/LinksList'
import { getAllLinks } from '../http/linksApi'

const LinksPage = () => {
  const [links, setLinks] = useState([])
  const [loading,setLoading] = useState(true)
  

  const fetchLinks = async() => {
    const data = await getAllLinks()
    setLinks(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchLinks()
  }, [])


  while (loading) {
    return <Loader/>
  }



  return (
    <>
      {!loading && <LinksList links={links} />}
    </>
  )
}

export default LinksPage