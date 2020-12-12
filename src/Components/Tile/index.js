import React from "react";
import "./styles.scss";
import TileImage from "../../asset/tile.png";
function Tile({ val, monthValue }) {
  return (
    <div className="tile_container">
      {monthValue == 5 ? (
        <div className="event_container">
          <div className="inner_event_container">
            <div className="event_color">
              <p className="color_pink"></p>
              <p className="color_orange"></p>
              <p className="color_blue"></p>
            </div>
            <p className="inner">{monthValue}</p>
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
