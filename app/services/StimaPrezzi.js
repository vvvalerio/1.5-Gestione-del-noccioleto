import { useState, useEffect } from "react";


const fertilizzanti = {
    "Azoto (N)": 30,  // Prezzo base in €/q
    "Fosforo (P)": 25,
    "Potassio (K)": 35,
    "Concimi organici": 20
  };
  
  const carburanti = {
    "Diesel": 1.50,   // Prezzo base in €/litro
    "Benzina": 1.80
  };
  
  // Funzione che genera fluttuazioni di prezzo casuali 
  const simulaPrezzo = (prezzoBase) => {
    const variazionePercentuale = (Math.random() * 0.1 - 0.05); // Fluttuazione casuale più o meno 5%
    return parseFloat((prezzoBase + (prezzoBase * variazionePercentuale)).toFixed(2));
  };
  
 

const StimaPrezzi = () => {
  const [prezzi, setPrezzi] = useState({
    Concimi: {},
    Carburanti: {}
  });

  useEffect(() => {
    const aggiornaPrezzi = () => {
      setPrezzi({
        "Concimi": {
          "Azoto (N)": simulaPrezzo(30),
          "Fosforo (P)": simulaPrezzo(25),
          "Potassio (K)": simulaPrezzo(35),
          "Concimi organici": simulaPrezzo(20)
        },
        "Carburanti": {
          "Diesel": simulaPrezzo(1.50),
          "Benzina": simulaPrezzo(1.80)
        }
      });
    };
    aggiornaPrezzi();
    const interval = setInterval(aggiornaPrezzi, 5000);  // Aggiorna i valori ogni 5 secondi
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Prezzi Concimi</h2>
      {Object.keys(prezzi.Concimi).map((prodotto, index) => (
        <p key={index}>{prodotto}: {prezzi.Concimi[prodotto]} €/q</p>
      ))}
      <h2>Prezzi Carburanti</h2>
      {Object.keys(prezzi.Carburanti).map((prodotto, index) => (
        <p key={index}>{prodotto}: {prezzi.Carburanti[prodotto]} €/l</p>
      ))}
    </div>
  );
};

export default StimaPrezzi;
