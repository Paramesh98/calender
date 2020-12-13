import React from "react";
import CardImage from "../../asset/card-image.png";
import "./styles.scss";


function EventCard({data}) {

  const colors = ["red","blue","green", "yellow"]
  return (
    <div className="event_card">
      <div className="image_container">
        <img src={CardImage} alt="event-image" />
      </div>
      <div className="event_container">
        <div className="event_items">
          {data.TypeOfDay.map((item, index) => {
            let splited = item.split(" ");
            let initials =
              splited.length > 1
                ? splited[0]?.substring(0, 1).toUpperCase() +
                  splited[1]?.substring(0, 1)?.toLowerCase()
                : splited[0]?.substring(0, 1).toUpperCase();

            return (
              <p style={{ backgroundColor: colors[index] }} className="w">
                {initials}
              </p>
            );
          })}
        </div>
        <div className="rating_items">
          {Array.from(Array(5).keys()).map((item, index) => (
            <span
              style={{
                color: index + 1 <= data.Rating ? "#e7900d" : "black",
              }}
            >
              &#9734;
            </span>
          ))}
        </div>
      </div>
      <div className="description_section">
        <h6>
          <strong>{new Date(data.CalendarDateTime).toDateString()}</strong>
        </h6>
        <p>{data.Text}</p>
      </div>
    </div>
  );
}

export default EventCard;
