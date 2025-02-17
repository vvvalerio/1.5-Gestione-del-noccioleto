import { NextResponse } from 'next/server';
import Papa from 'papaparse'; // Per fare il parsing del CSV
import fs from 'fs';
import path from 'path';

export async function GET(request) {
  try {
    // Ottieni i parametri della query dall'URL
    const { searchParams } = new URL(request.url);
    const giorno = searchParams.get('giorno');
    const mese = searchParams.get('mese');

    // Percorso completo del file CSV
    const filePath = path.resolve(process.cwd(), 'public/raccolta-dati/', 'datiarsial.csv');

    // Leggi il file CSV
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Usa PapaParse per fare il parsing del CSV
    const parsedData = Papa.parse(fileContent, {
      header: true, // Il file CSV ha intestazioni
      dynamicTyping: true, // Converte automaticamente i tipi
    });

    // Filtra i dati in base a giorno e mese
    const datiFiltrati = parsedData.data.filter((record) => {
      const filtroGiorno = giorno ? parseInt(record.Giorno, 10) === parseInt(giorno, 10) : true;
      const filtroMese = mese ? parseInt(record.Mese, 10) === parseInt(mese, 10) : true;
      return filtroGiorno && filtroMese;
    });

    // Restituisci i dati filtrati
    return NextResponse.json(datiFiltrati);
  } catch (error) {
    console.error('Errore nel parsing del CSV:', error);
    return NextResponse.json({ error: 'Errore nel parsing del CSV' }, { status: 500 });
  }
}
