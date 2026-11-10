const BASE_URL = 'http://localhost:3002/destinatii'

export async function getDestinatii() {
  const response = await fetch(BASE_URL)
  if (!response.ok) {
    throw new Error(`Serverul a răspuns cu ${response.status}`)
  }
  return response.json()
}

export async function postDestinatie(d) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(d),
  })
  if (!response.ok) {
    throw new Error(`Serverul a răspuns cu ${response.status}`)
  }
  return response.json()
}

export async function patchVizitat(id, vizitat) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ vizitat }),
  })
  if (!response.ok) {
    throw new Error(`Serverul a răspuns cu ${response.status}`)
  }
  return response.json()
}