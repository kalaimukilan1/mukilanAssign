import "./index.css";

const BookItem = (props) => {
  const { details } = props;
  const { title, genre, publishYear } = details;

  return (
    <div className="book-item-container">
      <h1>{title}</h1>
      <p>{genre}</p>
      <p>{publishYear}</p>
    </div>
  );
};

export default BookItem;
