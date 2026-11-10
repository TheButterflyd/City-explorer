import { useEffect, useState } from 'react'
import {
  getDestinatii,
  postDestinatie,
  patchVizitat
} from './api/destinatii.js'
import {
  getNevizitate,
  totalZile
} from './utils/destinatii.js'

import Rezumat from './components/Rezumat.jsx'
import FormularDestinatie from './components/FormularDestinatie.jsx'
import ListaDestinatii from './components/ListaDestinatii.jsx'
import Cautare from './components/Cautare.jsx'
import './App.css'

export default function App() {
  // Datele inițiale pornesc ca listă goală, datele venind de la server
  const [destinatii, setDestinatii] = useState([])
  const [seIncarca, setSeIncarca] = useState(true)
  const [eroare, setEroare] = useState(null)
  const [seTrimite, setSeTrimite] = useState(false)
  const [cautare, setCautare] = useState('')

  // 1b) Preluarea inițială a datelor la montarea componentei
  useEffect(() => {
    async function incarca() {
      try {
        setSeIncarca(true)
        setEroare(null)
        const date = await getDestinatii()
        setDestinatii(date)
      } catch (err) {
        setEroare(err.message)
      } finally {
        setSeIncarca(false)
      }
    }

    incarca()
  }, [])

  // 1c) Marcarea pe server (PATCH)
  async function handleToggle(id, vizitatCurent) {
    try {
      const salvata = await patchVizitat(id, !vizitatCurent)
      setDestinatii((curent) =>
        curent.map((d) => (d.id === id ? salvata : d))
      )
    } catch (err) {
      alert(`Nu s-a putut actualiza destinația: ${err.message}`)
    }
  }

  // 2c) Adăugarea pe server (POST)
  async function handleAdd(nouaDestinatie) {
    setSeTrimite(true)
    try {
      const salvata = await postDestinatie(nouaDestinatie)
      setDestinatii((curent) => [...curent, salvata])
    } catch (err) {
      alert(`Eroare la adăugare: ${err.message}`)
    } finally {
      setSeTrimite(false)
    }
  }

  // Calculele pentru Rezumat se fac întotdeauna pe lista completă din server
  const nevizitate = getNevizitate(destinatii)
  const totalZileNevizitate = totalZile(nevizitate)

  // 3b) Filtrarea destinațiilor afișate după textul căutat
  const text = cautare.trim().toLowerCase()
  const afisate = destinatii.filter(
    (d) =>
      d.oras.toLowerCase().includes(text) ||
      d.tara.toLowerCase().includes(text)
  )

  return (
    <main>
      <h1>City Explorer</h1>

      {/* Mesaje de stare pentru încărcare și eroare */}
      {seIncarca && <p className="stare">Se încarcă destinațiile...</p>}
      {eroare && <p className="stare eroare">{eroare}</p>}

      {/* Conținutul se afișează doar după finalizarea încărcării fără erori */}
      {!seIncarca && !eroare && (
        <>
          <Rezumat
            total={destinatii.length}
            nevizitate={nevizitate.length}
            zile={totalZileNevizitate}
          />

          <FormularDestinatie onAdd={handleAdd} seTrimite={seTrimite} />

          <Cautare valoare={cautare} onChange={setCautare} />

          {/* 3c) Cazurile de listă goală și afișarea cardurilor */}
          {destinatii.length === 0 ? (
            <p className="gol">
              Nu există nicio destinație. Adăugați una folosind formularul de mai sus.
            </p>
          ) : afisate.length === 0 ? (
            <p className="gol">Niciun rezultat pentru «{cautare}».</p>
          ) : (
            <ListaDestinatii
              destinatii={afisate}
              onToggle={handleToggle}
            />
          )}
        </>
      )}
    </main>
  )
}