import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';


const GraficoMese = ({  datiMeteo, datasets, optionsConfig, setDataSelezionata, dataSelezionata,}) => {

  // Estrai le date e i valori delle precipitazioni dall'oggetto dati
  const labels = Object.keys(datiMeteo).filter(key => !isNaN(key));    
  const data = {
    labels: labels, // Giorni del mese
    datasets: datasets.map(dataset => ({
      label: dataset.label,  // Etichetta della linea
      // Dato associato alla chiave specificata, se il dato non è specificato, assegna zero
      data: labels.map(label => datiMeteo[label]?.[dataset.dataKey] || 0),       
      fill: false,
      borderColor: dataset.color, // Colore specificato
      tension: 0.3, // Curvatura della linea
      pointBackgroundColor: dataset.color,
      pointRadius: 4,
    })),
  };
  //Opzioni del grafico e scale dei valori
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: optionsConfig.titleX || 'Giorni del mese',
        }
      },
      y: {
        title: {
          display: true,
          text: optionsConfig.titleY || 'Valori',
        },
        beginAtZero: true,
        max: optionsConfig.maxY || 50,  // Default a 50 se non specificato
        ticks: {
          stepSize: optionsConfig.stepSizeY || 5,  // Default step di 5
        }
      },
    },
    // Cliccando su una data del grafico la seleziona cambiandola poi sul calendario  
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const dataIndex = elements[0].index;        
        let giornoSelezionato = labels[dataIndex];
        if(giornoSelezionato < 10){
          giornoSelezionato = giornoSelezionato.toString().padStart(2, '0');
          };
        const dataFormattata = dataSelezionata.slice(0,8) + giornoSelezionato;
        setDataSelezionata(dataFormattata);
      }
    }
  }


  return (
    
     <Line data={data} options={options} height={100}/>
    
  );
};

export default GraficoMese;
