import React, { useState } from 'react';

const App = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);

  async function search() {
    /* format URL for Custom Search API */
    const API_KEY = 'AIzaSyAa5WuZvSFXTntEmlm_Q1pwrBRdgUC0m6o';
    const SEARCH_ENGINE_ID = '77dac0dd3daec4a16'; // search engine is limited to spotify.com
    const query = encodeURI(`inurl:playlist ${input}`) // only retrieve playlists results
    const URL = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${query}`;

    const res = await fetch(URL);
    const data = await res.json();
    console.log(data);

    // add items to search results
    setResults(data.items);
  }

  return (
    <div>
      <input name="input" type="text" 
        // update input as user types
        onChange={e => setInput(e.target.value)} 
        // can also search by pressing enter
        onKeyDown={e => { if (e.key === 'Enter') search() }}
      />
      <button onClick={search}>Search</button>
      <ResultsDisplay results={results} />
    </div>
  )
}

const ResultsDisplay = ({ results }) => {
  results = results.map((result) =>
    <Result key={result.cacheId} url={result.formattedUrl} />
  );

  return (
    <div>
      {results}
    </div>
  )
}

const Result = ({ url }) => {
  return (
    <div>
      <a href={url}>{url}</a>
    </div>
  )
}

export default App;