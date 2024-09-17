import { Component, ReactNode } from "react";

import "./styles.css";
import BookItem from "./component/bookItem";

class BookApp extends Component {
  state = { bookDetails: [], status: "loading", searchInput: "" };

  componentDidMount() {
    this.getBookDetails();
  }

  getBookDetails = async () => {
    const url = "https://openlibrary.org/search.json?q=%3Cyour-query%3E";

    const data = await fetch(url);
    const responseData = await data.json();

    const updatedBookDetails = responseData.docs.map((eachBook) => ({
      title: eachBook.title,
      publishYear: eachBook.publish_year[0],
      genre: eachBook.type,
    }));

    this.setState({ bookDetails: updatedBookDetails, status: "success" });

    console.log(responseData);
  };

  changeSearchInput = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  displayBookApp = () => {
    const { bookDetails, searchInput } = this.state;

    const filteredDetails = bookDetails.filter((each) =>
      each.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
      <div>
        <h1>Book searching App</h1>
        <div>
          <input
            type="search"
            className="search-bar"
            placeholder="search here"
            onChange={this.changeSearchInput}
            value={searchInput}
          />
        </div>

        <ul>
          {filteredDetails.map((each) => (
            <BookItem details={each} />
          ))}
        </ul>
      </div>
    );
  };

  render() {
    const { status } = this.state;
    return (
      <div className="App">
        {status === "success" ? this.displayBookApp() : ""}
      </div>
    );
  }
}

export default BookApp;
