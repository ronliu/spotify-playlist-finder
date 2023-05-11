import React, { useState, useEffect } from 'react';
import parse, { attributesToProps } from 'html-react-parser';

const ResultsDisplay = ({ results }) => {
  const [embeds, setEmbeds] = useState([]);

  async function fetchEmbeds() {
    const output = [];
    
    // fetch separate embed for each result
    for (const result of results) {
      const { formattedUrl, cacheId } = result;

      // format URL for oEmbed API
      const url = encodeURI(formattedUrl);
      const API = `https://open.spotify.com/oembed?url=${url}`;

      // fetch data from API
      const res = await fetch(API);
      const data = await res.json();

      // grab embed element and customize attributes
      let element = data.html;
      element = element.replace('height="352"', 'height="152"');
      console.log(element);
      // parse element from string to React component before pushing
      output.push(parse(element));
    }

    setEmbeds(output);
  }

  // fetch embeds when component receives new results
  useEffect(() => {
    fetchEmbeds();
  }, [results]);

  return (
    <div className="results">
      {embeds}
    </div>
  )
}

export default ResultsDisplay;