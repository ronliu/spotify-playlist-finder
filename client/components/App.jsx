import React, { useState } from 'react';
import ResultsDisplay from './ResultsDisplay.jsx';
import '../style.css';

const App = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);

  async function fetchResults() {
    // format URL for Custom Search API
    const API_KEY = 'AIzaSyAa5WuZvSFXTntEmlm_Q1pwrBRdgUC0m6o';
    const SEARCH_ENGINE_ID = '77dac0dd3daec4a16'; // search engine is limited to spotify.com
    const query = encodeURI(`inurl:playlist ${input}`); // only retrieve playlists results
    const API = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${query}`;

    // fetch results from API
    const res = await fetch(API);
    const data = await res.json();

    // update results
    setResults(data.items);
  }

  return (
    <main>
      <div className="search">
        <input name="input" type="text" 
          // update input as user types
          onChange={e => setInput(e.target.value)} 
          // can also search by pressing enter
          onKeyDown={e => { if (e.key === 'Enter') fetchResults() }} />
        <button onClick={fetchResults}>Search</button>
      </div>
      <ResultsDisplay results={results}/>
    </main>
  )
}


export default App;