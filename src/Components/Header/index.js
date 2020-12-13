import React from "react";
import "./styles.scss";
import { monthValue } from "../../config/data.json";

function Header({ reduceMonth, increaseMonth, thisYear, thisMonth,setToday }) {
  return (
    <div className="header_container">
      <div className="heading_top_section">
        <div className="heading_section">
          <strong>{monthValue[thisMonth]}</strong> {thisYear}
        </div>
        <div className="today_section">
          <div onClick={reduceMonth}>&#8249;</div>
          <div onClick={setToday}>Today</div>
          <div onClick={increaseMonth}>&#8250;</div>
        </div>
      </div>
      <div className="day_section">
        <div className="day_item">Sun</div>
        <div className="day_item">Mon</div>
        <div className="day_item">Tue</div>
        <div className="day_item">Wed</div>
        <div className="day_item">Thu</div>
        <div className="day_item">Fri</div>
        <div className="day_item">Sat</div>
      </div>
    </div>
  );
}

export default Header;
