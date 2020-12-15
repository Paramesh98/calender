import React from "react";
import Footer from "../Footer";
import Tile from "../Tile";
import "./styles.scss";
// import { ResponseObjects } from "../../config/response.json";
import Curosel from "../Curosel";
import Axios from "axios";

function Calender({ currentMonth, nextMonth, prevMonth, thisMonth, thisYear }) {
  const [prevMonthData, setPrevMonthData] = React.useState([]);
  const [nextMonthData, setNextMonthData] = React.useState([]);
  const [thisMonthData, setThisMonthData] = React.useState([]);
  const [showEventCard, setShowEventCard] = React.useState(false);
  const [curoselDate, setCuroselDate] = React.useState();
  const [ResponseObjects, setResponseObject] = React.useState();

  //CONVERT FIRST DAY INTO NUMBER
  const checkFirstDate = (day) => {
    switch (day) {
      case "sun":
        return 0;
      case "mon":
        return 1;
      case "tue":
        return 2;
      case "wed":
        return 3;
      case "thu":
        return 4;
      case "fri":
        return 5;
      case "sat":
        return 6;
    }
  };

  //CONVERT LAST DAY INTO NUMBER
  const checkLastDate = (day) => {
    switch (day) {
      case "sun":
        return 6;
      case "mon":
        return 5;
      case "tue":
        return 4;
      case "wed":
        return 3;
      case "thu":
        return 2;
      case "fri":
        return 1;
      case "sat":
        return 0;
    }
  };

  //FETCH DATA FROM SERER
  const getData = () => {
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
      .then((res) => setResponseObject(res.data.ResponseObjects))
      .catch((err) => console.log(err));
  };

  //MERGE LAST MONTH,THIS MONTH ,NEXT MONTH VALUE
  React.useEffect(() => {
    getData();
    const checkFirstDay = () => {
      let firstDay = currentMonth[0].split("-")[1];
      let lastDay = currentMonth[currentMonth.length - 1].split("-")[1];
      let firstValue = checkFirstDate(firstDay.toLowerCase());
      // let lastValue = checkFirstDate(lastDay.toLowerCase());
      let prevValue =
        firstValue === 0 ? [] : prevMonth.slice(-Number(firstValue));
      let nextValue = nextMonth.splice(0, checkLastDate(lastDay));

      let thisOwnValue = [];
      let nextOwnValue = [];
      let prevOwnValue = [];
      const thisMonthData = currentMonth.map((item) =>
        thisOwnValue.push(item.split("-")[0])
      );
      const prevMonthData = prevValue.map((item) =>
        prevOwnValue.push(item.split("-")[0])
      );
      const nextMothData = nextValue.map((item) =>
        nextOwnValue.push(item.split("-")[0])
      );

      setPrevMonthData(prevOwnValue);
      setThisMonthData(thisOwnValue);
      setNextMonthData(nextOwnValue);
    };
    if (currentMonth.length > 0) {
      checkFirstDay();
    }
  }, [currentMonth, nextMonth, prevMonth]);

  //CHECK IS DAY HAVE ANY EVENTS
  const getEvents = (day, month, year) => {
    let items = [];

    ResponseObjects &&
      ResponseObjects[0]?.Posts.map((item) => {
        if (
          new Date(item.CalendarDateTime).toLocaleDateString() ==
          new Date(year, month, day).toLocaleDateString()
        ) {
          items.push(item);
        }
      });

    return items;
  };

  //CONVERT EVENTS INTO STRING
  const displayEvent = (val, day, month, year) => {
    let date = new Date(year, month, day).toLocaleDateString();
    setCuroselDate(date);
    setShowEventCard(val);
  };
  //CLOSE MODAL
  const closeEvent = () => {
    setShowEventCard(false);
  };

  return (
    <React.Fragment>
      {ResponseObjects &&
        [
          ...prevMonthData,
          ...thisMonthData,
          ...nextMonthData,
        ]?.map((item, index) => (
          <Tile
            key={index}
            monthValue={item}
            thisMonth={thisMonth}
            thisYear={thisYear}
            val={index + 1}
            getEvents={getEvents}
            displayEvent={displayEvent}
            ResponseObjects={ResponseObjects}
          />
        ))}
      <Footer thisMonth={thisMonth} thisYear={thisYear} />
      {showEventCard && <Curosel date={curoselDate} closeEvent={closeEvent} />}
    </React.Fragment>
  );
}

export default Calender;
