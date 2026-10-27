import { useState } from 'react'
import { destinatii as destinatiiInitiale } from './data/destinatii.js'
import {
  getNevizitate,
  totalZile,
  marcheazaVizitat,
  adaugaDestinatie
} from './utils/destinatii.js'

import Rezumat from './components/Rezumat.jsx'
import FormularDestinatie from './components/FormularDestinatie.jsx'
import ListaDestinatii from './components/ListaDestinatii.jsx'
import './App.css'

export default function App() {
  const [destinatii, setDestinatii] = useState(destinatiiInitiale)

  const nevizitate = getNevizitate(destinatii)
  const totalZileNevizitate = totalZile(nevizitate)

  function handleToggle(id) {
    setDestinatii((curent) => marcheazaVizitat(curent, id))
  }

  function handleAdd(nouaDestinatie) {
    setDestinatii((curent) => adaugaDestinatie(curent, nouaDestinatie))
  }

  return (
    <main>
      <h1>City Explorer</h1>
      <Rezumat
        total={destinatii.length}
        nevizitate={nevizitate.length}
        zile={totalZileNevizitate}
      />
      <FormularDestinatie onAdd={handleAdd} />
      <ListaDestinatii
        destinatii={destinatii}
        onToggle={handleToggle}
      />
    </main>
  )
}