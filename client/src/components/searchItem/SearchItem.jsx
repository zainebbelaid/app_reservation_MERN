import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance} du centre</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
        séjournez au cœur de la ville
        </span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Annulation gratuite</span>
       
      </div>
      <div className="siDetails">
        {item.rating && <div className="siRating">
          <span>Excellent</span>
          <button>{item.rating}</button>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice">{item.cheapesPrice}DH</span>
          <span className="siTaxOp">Comprend les taxes </span>
          <Link to={`/hotels/${item._id}`}>
          <button className="siCheckButton">voir les détails</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
