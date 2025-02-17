
/***********************************************************************************
  RICHIESTA DATI ALL'API CHE LEGGE IL FILE CSV
/***********************************************************************************/

export default async function recuperaPrezziNocciole() {
  try {    
    // URL per il recupero dei dati sui prezzi
    let url = `http://localhost:3000/api/prezzi`;
    
    
    // Chiamata all'API
    const response = await fetch(url);

    // Controlla se la risposta è ok
    if (!response.ok) {
      throw new Error('Si è verificato un errore durante il recupero dei dati');
    }

    // Ottengo i dati dalla risposta
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Si è verificato un errore durante il caricamento dei dati:', err);
    return null;
  }
}