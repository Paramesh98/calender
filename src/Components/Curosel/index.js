import React from "react";
import EventCard from "../EventCard";
import "./styles.scss";
function Curosel() {
  const [transform, setTransform] = React.useState(0);
  const goLeft = () => {
    setTransform(transform - 330);
  };
  const goRight = () => {
    setTransform(transform + 330);
  };
  console.log(transform);
  return (
    <div className="curosel_container">
      <button className="close_item">x</button>
      <button onClick={goLeft} className="button_left">
        &#8592;
      </button>
      <div
        style={{ transform: `translate(${transform}px)` }}
        className="curosel_item_container"
      >
        <div className="curosel_item">
          <EventCard />
        </div>
        <div className="curosel_item active">
          <EventCard />
        </div>
        <div className="curosel_item">
          <EventCard />
        </div>
        <div className="curosel_item">
          <EventCard />
        </div>
        <div className="curosel_item">
          <EventCard />
        </div>
      </div>
      <button onClick={goRight} className="button_right">
        {" "}
        &#8594;
      </button>
    </div>
  );
}

export default Curosel;
