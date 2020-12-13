import React from "react";
import "./styles.scss";
import TileImage from "../../asset/tile.png";
import { ResponseObjects } from "../../config/response.json";
import { getDate, getMonth, getYear } from "../../helpers/dates";

function Tile({
  val,
  monthValue,
  thisMonth,
  thisYear,
  getEvents,
  displayEvent,
}) {
  let eventItem = [];
  if (
    getDate().includes(monthValue.toString()) &&
    getMonth().includes(thisMonth) &&
    getYear().includes(thisYear.toString())
  ) {
    // console.log(monthValue);
    eventItem.push(monthValue);
  }

  let event = getEvents(monthValue, thisMonth, thisYear);
  let today = new Date();
  let todayDay = today.getDate();
  let todayMonth = today.getMonth();
  let todayYear = today.getFullYear();

  // console.log(event[0]?.TypeOfDay.length);
  // console.log(getEvents(monthValue, thisMonth, thisYear));
  return (
    <div className="tile_container">
      {eventItem.includes(monthValue) ? (
        <div
          style={{ cursor: "pointer" }}
          className="event_container"
          onClick={() => displayEvent(true, monthValue, thisMonth, thisYear)}
        >
          <div className="inner_event_container">
            <div className="event_color">
              {event[0]?.TypeOfDay.length == 1 && (
                <p className="color_pink"></p>
              )}
              {event[0]?.TypeOfDay.length == 2 && (
                <>
                  <p className="color_pink"></p>
                  <p className="color_orange"></p>
                </>
              )}
              {event[0]?.TypeOfDay.length == 3 && (
                <>
                  <p className="color_pink"></p>
                  <p className="color_orange"></p>
                  <p className="color_blue"></p>
                </>
              )}
            </div>
            {todayDay == monthValue &&
            todayMonth === thisMonth &&
            todayYear === thisYear ? (
              <p className="inner today">{monthValue}</p>
            ) : (
              <p className="inner">{monthValue}</p>
            )}
          </div>
          <div className="image_container">
            <img src={TileImage} alt="event" />
          </div>
        </div>
      ) : (
        <p className="inner">{monthValue}</p>
      )}
    </div>
  );
}

export default Tile;
