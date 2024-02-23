const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

//show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//hide loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}
//Show new quotes
function newQuote() {
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  //check quote lenghth to determine styling

  if (quote.content.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.textContent = quote.content;
  complete();
}

async function getQuotes() {
  loading();
  const apiURL = "https://api.quotable.io/quotes/random?limit=100";
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    console.log(apiQuotes);
    newQuote();
  } catch (error) {
    alert(error);
  }
}

//tweet quote
function tweetQuote() {
  const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterURL, "_blank");
}

//event listners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

//on load
getQuotes();
