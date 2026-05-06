import React from 'react'
import {Link} from 'react-router-dom'
import './linkList.css'

export const LinksList = ({ links }) => {
  if (!links.length) {
    return <p className="links-empty">Ссылок пока нет</p>
  }

  return (
    <table className="links-table">
      <thead>
        <tr>
          <th>№</th>
          <th>Оригинальная</th>
          <th>Сокращённая</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {links.map((link, index) => (
          <tr key={link._id}>
            <td>{index + 1}</td>
            <td><span className="link-from">{link.from}</span></td>
            <td><span className="link-to">{link.to}</span></td>
            <td>
              <Link className="link-open" to={`/detail/${link._id}`}>
                Открыть ↗
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}