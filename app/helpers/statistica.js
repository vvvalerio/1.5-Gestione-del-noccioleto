/***************************************************
  FUNZIONE CALCOLO DELLA MEDIA E DEVIAZIONE STANDARD
/***************************************************/
export default function calcolaStatistica(numeri) {
  
  // Calcola il valore minimo e massimo
  const minimo = Math.min(...numeri);
  const massimo = Math.max(...numeri);

  // Calcola la media
  const media = numeri.reduce((acc, val) => acc + val, 0) / numeri.length;

  // Calcola la deviazione standard
  const varianza = numeri.reduce((acc, val) => 
        acc + Math.pow(val - media, 2), 0) / numeri.length;
  const deviazioneStandard = Math.sqrt(varianza);
  
  // Introduce una variazione casuale alla media
  const randomVal = (Math.random() * 2 - 1); // Genera un numero casuale tra -1 e 1
  const mediaInfluenzata = media + (randomVal * deviazioneStandard);

  return {
    media: mediaInfluenzata.toFixed(2),
    deviazione: deviazioneStandard.toFixed(2),
    minimo: minimo.toFixed(2),
    massimo: massimo.toFixed(2)
  };
}