
/***********************************************************************************
  RICHIESTA DATI ALL'API CHE LEGGE IL FILE CSV FILTRANDO I VALORI IN BASE ALLA DATA
/***********************************************************************************/

export default async function recuperaDatiFiltrati(mese, giorno = null) {
  try {    
    // Costruzione dell'URL con il mese fisso e viene aggiunto opzionalmente il giorno
    let url = `http://localhost:3000/api/dati?mese=${mese}`;
    
    if (giorno !== null && giorno !== undefined) {
      url += `&giorno=${giorno}`;
    }

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