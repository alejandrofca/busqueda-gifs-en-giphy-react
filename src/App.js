import React, { useState, useRef, useEffect } from 'react';
import Grid from './Grid'
import './App.css';

const LOCAL_OFFSET = 0
localStorage.setItem(LOCAL_OFFSET, 0)

const regex1 = /---offset---/
const regex2 = /---q---/
let state_display = false
const giphy_api_key = '' // Pon aquí tu API KEY de giphy -> https://developers.giphy.com/
const lang = 'es'

const giphyApiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${giphy_api_key}&q=---q---&limit=12&offset=---offset---&rating=g&lang=${lang}`

function App() {
  const [gifs, setGifs] = useState([])
  const inputNameRef = useRef()
  const buttonNameRef = useRef()
  const loadingNameRef = useRef()
  const divNameRef = useRef()
  const divErrorNameRef = useRef()

  useEffect(() => {
    if (gifs.length) {
      buttonNameRef.current.style.display = 'block'
      divNameRef.current.style.display = 'none'
    }
    console.log('actualizado')
  }, [gifs])

  async function fetch_gifs() {
    setGifs([])
    let offset = Number(localStorage.getItem(LOCAL_OFFSET))
    let url = giphyApiUrl.replace(regex1, offset)
    url = url.replace(regex2, inputNameRef.current.value)

    loadingNameRef.current.style.display = 'block'
    buttonNameRef.current.style.display = 'none'
    divNameRef.current.style.display = 'block'
    divErrorNameRef.current.style.display = 'none'

    setTimeout(
      await fetch(url)
        .then(res => res.json())
        .then(response => {
          if (response.message) {
            console.log(response.message)
            loadingNameRef.current.style.display = 'none'
            divErrorNameRef.current.style.display = 'block'
            divErrorNameRef.current.innerHTML = "Respuesta de API de giphy.com:"
             + "<br /><b>" + response.message + "</b>"
             + "<br />Visite: <a href='https://developers.giphy.com' target='_blank'>developers.giphy.com</a>"
             + "<br /><br />Dudas sobre este script <a href='https://github.com/alejandrofca/busqueda-gifs-en-giphy-react' target='_blank'>en este repositorio Github de Alejandro FCA</a>"
          } else {
            // Invalid authentication credentials
            console.log("url: " + url)
            console.log(response)
            console.log(offset)
            const { data } = response
            const gifs_ = data.map(image => {
              image.images.copied = false
              return image.images.downsized_medium.url
            })
            //console.log(gifs_)
            setGifs(gifs_)

            localStorage.setItem(LOCAL_OFFSET, Number(offset) + 12)
            buttonNameRef.current.style.display = 'block'
            divNameRef.current.style.display = 'none'
          }
        }), 1000)
  }

  function clickBtnNuevosGifs(e) {
    e.preventDefault()
    fetch_gifs()
    // setGifs(data)
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      fetch_gifs()
    } else {
      buttonNameRef.current.style.display = 'none'
    }
  }

  return (
    <div className="App">
      <section className="App-content">
        <br />
        <h3>¿Qué GIF buscas?</h3>
        <table>
          <tbody>
            <tr>
              <td>
                <input type="text" className="p-2" ref={inputNameRef} onKeyDown={handleKeyDown}
                  autoFocus />
              </td>
              <td>&nbsp;&nbsp;&nbsp;</td>
              <td>
                <div ref={loadingNameRef} className="spinner-border" role="status" style={{ display: 'none' }}>
                  <span className="sr-only">Cargando...</span>
                </div>
              </td>
              <td>&nbsp;&nbsp;&nbsp;</td>
              <td>
                <div ref={divNameRef}>

                </div>
                <button ref={buttonNameRef} onClick={clickBtnNuevosGifs} className="btn btn-primary" style={{ display: state_display ? 'block' : 'none' }}>&nbsp;Traer&nbsp;12&nbsp;más&nbsp;(Handle)&nbsp;</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="container align-center" style={{ textAlign: 'center' }}>
          <div ref={divErrorNameRef} className="alert alert-warning alert-api-error" role="status" style={{ display: 'none' }}>
            
          </div>
          <Grid gifs={gifs} />
        </div>

      </section>
    </div >
  );
}

export default App;
