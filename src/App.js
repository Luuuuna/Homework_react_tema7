import React, { useState } from "react";
import "./App.css";


const App = () => {
  const [news, setNews] = useState([]);
  const [inputValue, setInputValue] = useState("");



  const handleFormSubmit = (event) => {
    event.preventDefault();

    const url = "https://content.guardianapis.com/search";
    const apiKey = "4f7b9cce-c007-4eee-9176-e705b8a4f561";

    fetch(`${url}?q=${inputValue}&api-key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        setNews(data.response.results);
      });
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);

  };


  return (
    <div className="App">
     <div className="App__header">
      <h1>
        Получите самые свежие новости от газеты <br/>
        <span>The Guardian!</span>
      </h1>
      <h2>Укажите ключевое слово.</h2>
      <form onSubmit={handleFormSubmit}>
        
        <input 
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="newsinput"
          placeholder="введите интересующую тему"
        /> <br />
        <button type="submit" className="button">Submit</button>
      </form>
      </div>
      <div className="inform">
        {news.map((item) => (
          <div key={item.id}>
             <p>{item.sectionId}</p>
            <a href={item.webUrl}>{item.webTitle}</a>
              <p>{item.webUrl}</p> 
          </div>
        ))}
      </div>

    </div>
  );
};

export default App;
