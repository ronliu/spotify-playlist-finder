import React, { useState } from 'react';

const App = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);

  const API_KEY = 'AIzaSyAa5WuZvSFXTntEmlm_Q1pwrBRdgUC0m6o';
  const SEARCH_ENGINE_ID = '77dac0dd3daec4a16';

  function handleKeyDown(event) {
    if(event.key === 'Enter') handleClick();
  }

  async function performSearch() {
    // format URL for API call
    const query = encodeURI(`inurl:playlist ${input}`)
    const URL = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${query}`;

    const res = await fetch(URL);
    const data = await res.json();
    console.log(data);

    const items = data.items;
    const totalResults = data.searchInformation.totalResults;
    const startIndex = data.queries.request[0].startIndex;
    console.log(items, totalResults, startIndex);
  }

  return (
    <div>
      <input name="input" type="text" 
        // update input as user types
        onChange={e => setInput(e.target.value)} 
        // user can also search by pressing enter
        onKeyDown={e => { if (e.key === 'Enter') performSearch() }}
      />
      <button onClick={performSearch}>Search</button>
      <PlaylistDisplay/>
    </div>
  )
}

const PlaylistDisplay = () => {
  return (
    <div>
    </div>
  )
}

const Playlist = () => {
  return (
    <div>
    </div>
  )
}

export default App;