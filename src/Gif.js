import React from 'react'
import { v4 } from 'uuid'

export default function Gif({ gifs }) {
  return (
    <>
      {
        gifs.map(singleGif =>
          <div className="col-md-3 p-3" style={{overflowWrap: true }}>
            <img ref={() => v4()} src={singleGif} width="150" height="150" alt="" />            
          </div>
        )
      }
    </>
  )
}