import React from "react";
import EventCard from "../EventCard";
import "./styles.scss";
import {ResponseObjects} from '../../config/response.json'

function Curosel({ closeEvent,date }) {
  const [transform, setTransform] = React.useState(0);
  
let responesData = ResponseObjects[0].Posts
let onlyDate = responesData.map((item) => new Date(item.CalendarDateTime).toLocaleDateString() );
console.log(onlyDate.indexOf(date))
console.log(transform)

React.useEffect(() =>{
  let indexValue = onlyDate.indexOf(date.toString())-1
    setTransform(indexValue * -330)
},[])

  const goLeft = () => {
   setTransform(transform + 330);
  };
  const goRight = () => {
    
     setTransform(transform - 330);
  };
  return (
    <div className="curosel_container">
      <button
        onClick={closeEvent}
        style={{ cursor: "pointer", zIndex: "10" }}
        className="close_item"
      >
        x
      </button>
      <button
        onClick={goLeft}
        disabled={transform >= 0}
        className="button_left"
      >
        &#8592;
      </button>
      <div
        style={{ transform: `translate(${transform}px)` }}
        className="curosel_item_container"
      >
        {responesData &&
          responesData.map((item, index) => (
            <div
              className={
                Math.abs(transform / 330)+1 === index
                  ? `curosel_item active`
                  : `curosel_item `
              }
            >
              <EventCard
                data={item}
                active={Math.abs(transform / 330) == index}
                key={item.id}
              />
            </div>
          ))}
      </div>
      <button
        disabled={
          Math.abs(transform) >= (responesData.length - 3) * 330 ? true : false
        }
        onClick={goRight}
        className="button_right"
      >
        {" "}
        &#8594;
      </button>
    </div>
  );
}

export default Curosel;
