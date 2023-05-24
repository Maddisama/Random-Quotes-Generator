import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";

const App = () => {
  const [quotes, setQuotes] = React.useState([]);
  const [randomQuotes, setRandomQuotes] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [color, setColor] = React.useState("#FFD6A5");
  const [prevColor, setPrevColor] = React.useState("");

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
        headers: { "X-Api-Key": "60DkzRtuqJ2WBFrhHGrxmA==gGqaTE6R31Tuf2Ul" },
        method: "GET",
        contentType: "application/json",
      });
      const result = await response.json();
      // Update component's state with fetched data
      setQuotes(result);
      console.log("Quotes:", quotes);
      let randomIndex = Math.floor(Math.random() * result.length);
      setRandomQuotes(result[randomIndex]);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const changeQuote = () => {
    const colors = [
      "#FAEDCB",
      "#C9E4DE",
      "#C6DEF1",
      "#DBCDF0",
      "#F2C6DE",
      "#F7D9C4",
    ];

    let randColorIndex;
    do {
      randColorIndex = Math.floor(Math.random() * colors.length);
    } while (colors[randColorIndex] === prevColor);
    setColor(colors[randColorIndex]);

    async function fetchData() {
      setIsLoading(true);
      const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
        headers: { "X-Api-Key": "60DkzRtuqJ2WBFrhHGrxmA==gGqaTE6R31Tuf2Ul" },
        method: "GET",
        contentType: "application/json",
      });
      const result = await response.json();
      setQuotes(result);
      console.log("Quotes:", quotes);
      let randomIndex = Math.floor(Math.random() * result.length);
      setRandomQuotes(result[randomIndex]);
      setIsLoading(false);
    }
    fetchData();
    setPrevColor(colors[randColorIndex]);
  };

  return (
    <div style={{ backgroundColor: color, minHeight: "100vh" }}>
      <div id="quote-box" className="container pt-5">
        <div className="jumbotron">
          <div className="card">
            <div className="card-header">Quotes</div>
            <div className="card-body">
              {isLoading ? (
                <h2>Loading...</h2>
              ) : (
                <>
                  <p id="text" className="card-text">
                    {" "}
                    &quot;{randomQuotes.quote}&quot;
                  </p>
                  <p id="author" className="card-title">
                    - {randomQuotes.author ? randomQuotes.author : "Anonymous"}
                  </p>
                </>
              )}
              <div className="row">
                <button
                  id="new-quote"
                  className="btn btn-primary col-2"
                  onClick={changeQuote}
                >
                  New Quote
                </button>
                <a
                  id="tweet-quote"
                  href={
                    "https://twitter.com/intent/tweet?hashtags=quotes&related&text=" +
                    encodeURIComponent(
                      '"' +
                        randomQuotes.quote +
                        '" ' +
                        "-" +
                        randomQuotes.author
                    )
                  }
                  target="_blank"
                  className="btn btn-info col-1"
                >
                  <i className="fa fa-twitter"></i>
                </a>
                <a
                  href={
                    "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,&caption=" +
                    encodeURIComponent(" - " + randomQuotes.author) +
                    "&content=" +
                    encodeURIComponent(randomQuotes.quote) +
                    "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button"
                  }
                  className="btn btn-warning col-1"
                  target="_blank"
                >
                  <i className="fa fa-tumblr"> </i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
