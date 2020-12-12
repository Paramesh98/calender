import React from "react";
import "./styles.scss";
import { monthValue } from "../../config/data.json";

function Footer({ thisYear, thisMonth }) {
  return (
    <div className="footer_container">
      <div className="footer_top_section">
        <div className="heading_section">
          <strong>{monthValue[thisMonth === 12 ? 1 : thisMonth + 1]}</strong>
        </div>
      </div>
    </div>
  );
}

export default Footer;
