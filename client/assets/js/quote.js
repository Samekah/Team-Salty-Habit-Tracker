const api_url = 'https://quotes.rest/qod.json';

async function getQuote() {
  try {
    const quote = await fetch(api_url);
    const data = await quote.json();
    const extractedQuote = data.contents.quotes[0].quote;
    if (extractedQuote) {
      let stringifiedQuote = `${extractedQuote}`;
      renderQuoteToDashboard(stringifiedQuote);
    }
  } catch (err) {
    console.warn(err);
  }
}

function renderQuoteToDashboard(quote) {
  const sectionId = document.querySelector('#quote h2');
  sectionId.textContent = '"' + quote + '"';
}

getQuote();
