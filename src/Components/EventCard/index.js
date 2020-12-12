import React from "react";
import CardImage from "../../asset/card-image.png";
import "./styles.scss";
function EventCard() {
  return (
    <div className="event_card">
      <div className="image_container">
        <img src={CardImage} alt="event-image" />
      </div>
      <div className="event_container">
        <div className="event_items">
          <p className="w">W</p>
          <p className="dc">DC</p>
          <p className="pr">Pr</p>
          <p className="c">C</p>
        </div>
        <div className="rating_items">
          {Array.from(Array(5).keys()).map((item) => (
            <span>&#9734;</span>
          ))}
        </div>
      </div>
      <div className="description_section">
        <h6>
          <strong>17th Nov,2020</strong>
        </h6>
        <p>
          Today was an amazing day! I really felt enjoyed my trip to parague
          last weekend. Next up is Budapest & Austria
        </p>
      </div>
    </div>
  );
}

export default EventCard;
