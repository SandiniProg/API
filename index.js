  // Substitua com sua chave de API do Alpha Vantage
  const API_KEY = '77RW38CJID48Z15F';
  const symbol = 'AAPL'; // Símbolo da ação, ex: AAPL para Apple
  const functionType = 'TIME_SERIES_DAILY'; // Função para pegar séries temporais diárias
//   const functionType = 'CURRENCY_EXCHANGE_RATE'; // Função para pegar séries temporais diárias
//   const from_currency = 'USD';
//   const to_currency = 'BR';

  const url = `https://www.alphavantage.co/query?function=${functionType}&symbol=${symbol}&apikey=${API_KEY}`;
//   const url = `https://www.alphavantage.co/query?function=${functionType}&from_currency=${from_currency}&to_currency=${to_currency}&apikey=${API_KEY}`;

  // Função para formatar a data para o formato dd/mm/yyyy
  function formatDate(dateString) {
      const parts = dateString.split('-');  // Separa a data em ano, mês e dia
      return `${parts[2]}/${parts[1]}/${parts[0]}`;  // Retorna no formato dd/mm/yyyy
  }

  // Função para pegar os dados e exibi-los no console
  function fetchStockData() {
      fetch(url)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Falha ao buscar dados da API');
              }
              return response.json();
          })
          .then(data => {
              const stockDataDiv = document.getElementById('stock-data');
              if (data['Time Series (Daily)']) {
                  const timeSeries = data['Time Series (Daily)'];
                  let content = '<ul>';
                  for (let date in timeSeries) {
                      const stockData = timeSeries[date];
                      const formattedDate = formatDate(date);  // Formata a data
                      content += `
                          <li>
                              <strong>Data:</strong> ${formattedDate}<br>
                              <strong>Abertura:</strong> ${stockData['1. open']}<br>
                              <strong>Máxima:</strong> ${stockData['2. high']}<br>
                              <strong>Mínima:</strong> ${stockData['3. low']}<br>
                              <strong>Fechamento:</strong> ${stockData['4. close']}<br>
                              <strong>Volume:</strong> ${stockData['5. volume']}<br>
                          </li>
                          <hr>
                      `;
                  }
                  content += '</ul>';
                  stockDataDiv.innerHTML = content;
              } else {
                  stockDataDiv.innerHTML = 'Erro ao obter dados.';
              }
          })
          .catch(error => {
              console.error('Erro:', error);
          });
  }

  fetchStockData();