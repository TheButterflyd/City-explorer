const BASE_URL = 'http://localhost:3001/destinatii';

// 1. intoarce lista comppleta
export async function getDestinatii() {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error(`Eroare la preluare: status ${response.status}`);
  }

  return await response.json();
}

// 2. Trimite o destinatie noua si intoarce obiectul salvat
export async function postDestinatie(d) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(d),
  });

  if (!response.ok) {
    throw new Error(`Eroare la salvare: status ${response.status}`);
  }

  return await response.json();
}

// 3. schimba doar campul vizitat si intoarce campul utilizat 
export async function patchVizitat(id, vizitat) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ vizitat }),
  });

  if (!response.ok) {
    throw new Error(`Eroare la actualizare: status ${response.status}`);
  }

  return await response.json();
}

export default function Cautare({ valoare, onChange }) {
  return (
    <div className="cautare">
      <input
        type="text"
        placeholder="Caută după oraș sau țară..."
        value={valoare}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}