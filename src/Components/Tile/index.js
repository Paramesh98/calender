import React from "react";
import "./styles.scss";
import TileImage from "../../asset/tile.png";
import { getDate, getMonth, getYear } from "../../helpers/dates";

function Tile({
  val,
  monthValue,
  thisMonth,
  thisYear,
  getEvents,
  displayEvent,
  ResponseObjects,
}) {
  const colors = ["#f6cee6", "#faeed4", "#d1e8e0", "#ded2f6", "#f6cee6"];
  //CALCULATE EVENT DATE
  const eventsDate = ResponseObjects[0]?.Posts.map((item) => {
    let one;
    if (
      new Date(item.CalendarDateTime).getDate() == Number(monthValue) &&
      new Date(item.CalendarDateTime).getMonth() == thisMonth &&
      new Date(item.CalendarDateTime).getFullYear() == thisYear
    )
      return new Date(item.CalendarDateTime).getDate();
  });

  //COUNT THE NUMBER OF EVENTS
  let eventNumber;
  const getEventItems = () => {
    ResponseObjects[0].Posts.map((item, index) => {
      if (new Date(item.CalendarDateTime).getDate() == monthValue) {
        eventNumber = ResponseObjects[0].Posts[index].TypeOfDay;
      }
    });
  };

  getEventItems();

  //GET THE IMAGES OF DAY
  let eventImages;
  const getImages = () => {
    ResponseObjects[0].Posts.map((item, index) => {
      if (new Date(item.CalendarDateTime).getDate() == monthValue) {
        eventImages = ResponseObjects[0].Posts[index].Images[0]?.ImageUrl;
      }
    });
  };

  getImages();

  let event = getEvents(monthValue, thisMonth - 1, thisYear);
  let today = new Date();
  let todayDay = today.getDate();
  let todayMonth = today.getMonth();
  let todayYear = today.getFullYear();

  let todayVal = () => {
    let today;
    if (
      todayDay == monthValue &&
      todayMonth == thisMonth &&
      todayYear == thisYear
    ) {
      today = monthValue;
    }
    return today;
  };

  return (
    <div className="tile_container">
      {eventsDate.includes(Number(monthValue)) ? (
        <div
          style={{ cursor: "pointer" }}
          className="event_container"
          onClick={() => displayEvent(true, monthValue, thisMonth, thisYear)}
        >
          <div className="inner_event_container">
            <div className="event_color">
              {eventNumber &&
                Array.from(Array(eventNumber?.length)).map((item, index) => (
                  <p key={index} style={{ backgroundColor: colors[index] }}></p>
                ))}
            </div>
            {todayDay == Number(monthValue) &&
            todayMonth == thisMonth &&
            todayYear == thisYear ? (
              <p className="inner today">{monthValue}</p>
            ) : (
              <p className="inner">{monthValue}</p>
            )}
          </div>
          <div className="image_container">
            <img src={eventImages} alt="event" />
          </div>
        </div>
      ) : todayDay == Number(monthValue) &&
        todayMonth == thisMonth &&
        todayYear == thisYear ? (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "baseline",
          }}
        >
          <p className="inner today">{monthValue}</p>
        </div>
      ) : (
        <p className="inner">{monthValue}</p>
      )}
    </div>
  );
}

export default Tile;
