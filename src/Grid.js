import React from 'react'
import Gif from './Gif'

export default function ListaGifs({ gifs }) {
  return (
    <div className="row">
      <Gif gifs={gifs} />
    </div>
  )
}