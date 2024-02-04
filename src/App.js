import React, { useState, useEffect } from "react";
import './App.css';


const App = () => {
  const [news, setNews] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const url = "https://content.guardianapis.com/search";
    const apiKey = "4f7b9cce-c007-4eee-9176-e705b8a4f561";

    fetch(`${url}?q=${inputValue}&api-key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        setNews(data.response.results);
        setTotalPages(Math.ceil(data.response.results.length / 5));
        setCurrentPage(1);
      });
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {

    if (news.length > 0) {
      const startIndex = (currentPage - 1) * 5;
      const endIndex = startIndex + 5;
      const currentNews = news.slice(startIndex, endIndex);
      setNews(currentNews);
    }
  }, [currentPage]);

  return (
    <div className="app">
      <div className="App__header">
        <h1>
          Получите самые свежие новости от газеты <br />
          <span>The Guardian!</span>
        </h1>
        <h2>Укажите ключевое слово.</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="newsinput"
            placeholder="Введите интересующую тему"
          />{" "}
          <br />
          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </div>
      <div className="inform">
        {news.map((item) => (
          <div key={item.id}>
            <p>{item.sectionId}</p>
            <a className="App__title" href={item.webUrl}>{item.webTitle}</a>
            <p>{item.webUrl}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`page-button${currentPage} === index + 1 ? " active" : }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;