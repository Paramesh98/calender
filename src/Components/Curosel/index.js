import React from "react";
import EventCard from "../EventCard";
import "./styles.scss";

import Axios from "axios";

function Curosel({ closeEvent, date }) {
  const [transform, setTransform] = React.useState(0);
  const [ResponseObjects, setResponseObject] = React.useState([]);
  const [responesData, setResponseData] = React.useState(null);

  React.useEffect(() => {
    const requestObject = {
      RequestObjects: [
        {
          Post: {
            OperationType: "Read",
            Privacy: {
              SearchValues: ["Public"],
              Return: true,
            },
            UserId: {
              SearchValues: ["assign"],
              Return: false,
            },
            id: {
              Return: true,
            },

            IsCalendarEntry: {
              SearchValues: [true],
              Return: true,
            },
            Images: {
              Return: true,
            },
            Text: {
              Return: true,
            },
            Rating: {
              Return: true,
            },
            TypeOfDay: {
              Return: true,
            },

            MaxItemCount: "5",

            CalendarDateTime: {
              Return: true,
              Sort: "Descending",
            },
            ContinuationToken: null,
          },
        },
      ],
    };
    Axios.post(
      "https://quinncareapidev.azurewebsites.net/api/graph",
      requestObject
    )
      .then((res) => {
        setResponseObject(res.data.ResponseObjects);
        // let responesData = res.data.ResponseObjects[0].Posts;
        let responesData = res.data.ResponseObjects[0].Posts.sort(
          (a, b) => new Date(a.CalendarDateTime) - new Date(b.CalendarDateTime)
        );
        let onlyDate = responesData.map((item) =>
          new Date(item.CalendarDateTime).toLocaleDateString()
        );

        // let sortDate = onlyDate.sort((a, b) => new Date(a) - new Date(b));
        console.log(onlyDate, date);
        let indexValue = onlyDate.indexOf(date.toString()) - 1;
        setTransform(indexValue * -330);
        setResponseData(responesData);
      })
      .catch((err) => console.log(err));
  }, []);

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
                Math.abs(transform / 330) + 1 === index
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
          Math.abs(transform) >= (responesData?.length - 3) * 330 ? true : false
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
