import React, { useState } from "react";
import Curosel from "./Components/Curosel";
import EventCard from "./Components/EventCard";
import Header from "./Components/Header";
import Tile from "./Components/Tile";
import { ResponseObjects } from "./config/response.json";
import Moment from "moment";
import { extendMoment } from "moment-range";
import "./App.css";
import Calender from "./Components/Calender";
import { debounce } from "lodash";

const moment = extendMoment(Moment);
function App() {
  const [thisMonth, setThisMonth] = React.useState(new Date().getMonth());
  const [thisYear, setThisYear] = React.useState(new Date().getFullYear());
  const [currentMonthValue, setCurrentMonthValue] = useState([]);
  const [nextMonthValue, setNextMonthValue] = useState([]);
  const [prevMonthValue, setPrevMonthValue] = useState([]);
  const [yaxis, setYaxis] = useState(0);

  const evntHandler = debounce((e) => {
    // setYaxis(window.scrollY);
    if (yaxis <= window.scrollY) {
      // console.log("scroll down");
      increaseMonth();
    } else {
      // console.log("scroll up");
      reduceMonth();
    }
  }, 500);
  // const secondEvent = debounce((e) => {
  //   // console.log("event");
  //   // console.log(window.scrollY, yaxis);
  //   // setYaxis(window.scrollY);
  //   if (window.scrollY == 0) {
  //     console.log("scroll up");
  //     // increaseMonth();
  //     if (thisMonth === 12) {
  //       setThisYear(thisYear - 1);
  //     }
  //     if (thisMonth === 1) {
  //       setThisMonth(12);
  //     } else {
  //       setThisMonth(thisMonth - 1);
  //     }
  //   } else {
  //     console.log("scroll down");
  //     // reduceMonth();
  //     if (thisMonth === 11) {
  //       setThisYear(thisYear + 1);
  //     }
  //     if (thisMonth === 12) {
  //       setThisMonth(1);
  //     } else {
  //       setThisMonth(thisMonth + 1);
  //     }
  //   }
  // }, 500);

  // React.useEffect(() => {
  //   window.addEventListener("scroll", (e) => evntHandler(e));
  // }, []);
  // React.useEffect(() => {
  //   window.addEventListener("wheel", (e) => secondEvent(e));
  // }, []);

  React.useEffect(() => {
    let currentMonth = getThisMonth(
      thisYear,
      thisMonth === 12 ? 1 : thisMonth + 1
    );
    setCurrentMonthValue(currentMonth);
    let prevMonth = getThisMonth(thisYear, thisMonth);
    setPrevMonthValue(prevMonth);
    let nextMonth = getThisMonth(
      thisYear,
      thisMonth === 11 ? 1 : thisMonth === 12 ? 2 : thisMonth + 2
    );
    setNextMonthValue(nextMonth);
  }, [thisMonth, thisYear]);

  var getThisMonth = function (year, month) {
    var monthIndex = month - 1; // 0..11 instead of 1..12
    var names = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    var date = new Date(year, monthIndex, 1);
    var result = [];
    while (date.getMonth() == monthIndex) {
      result.push(date.getDate() + "-" + names[date.getDay()]);
      date.setDate(date.getDate() + 1);
    }
    return result;
  };
  const reduceMonth = () => {
    if (thisMonth === 12) {
      setThisYear(thisYear - 1);
    }
    if (thisMonth === 1) {
      setThisMonth(12);
    } else {
      setThisMonth(thisMonth - 1);
    }
  };
  const increaseMonth = () => {
    if (thisMonth === 11) {
      setThisYear(thisYear + 1);
    }
    if (thisMonth === 12) {
      setThisMonth(1);
    } else {
      setThisMonth(thisMonth + 1);
    }
  };

  const setToday = () => {
    setThisMonth(new Date().getMonth());
    setThisYear(new Date().getFullYear());
  };

  return (
    <div className="App">
      <Header
        reduceMonth={reduceMonth}
        increaseMonth={increaseMonth}
        thisMonth={thisMonth}
        thisYear={thisYear}
        setToday={setToday}
      />
      <div className="date_section">
        {currentMonthValue && (
          <Calender
            currentMonth={currentMonthValue}
            prevMonth={prevMonthValue}
            nextMonth={nextMonthValue}
            thisMonth={thisMonth}
            thisYear={thisYear}
          />
        )}
        {/* {months.map((item, index) => (
          <Tile key={index} monthValue={item} val={index + 1} />
        ))} */}
      </div>
    </div>
  );
}

export default App;
