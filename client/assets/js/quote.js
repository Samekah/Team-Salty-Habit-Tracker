const api_url = 'http://quotes.rest/qod.json';
async function getQuote() {
  // e.preventDefault();
  try {
    const quote = await fetch(api_url);
    const data = await quote.json();
    const extractedQuote = data.contents.quotes[0].quote;
    let stringifiedQuote = `${extractedQuote}`;
    console.log(typeof stringifiedQuote);
    renderQuoteToDashboard(stringifiedQuote);
  } catch (err) {
    console.warn(err);
  }
}

function renderQuoteToDashboard(quote) {
  const sectionId = document.querySelector('#quote h2');
  sectionId.textContent = '"' + quote + '"';
  sectionId.appendChild(newQuote);

  return newQuote;
}

getQuote();
