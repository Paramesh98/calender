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

const moment = extendMoment(Moment);
function App() {
  const [thisMonth, setThisMonth] = React.useState(new Date().getMonth());
  const [thisYear, setThisYear] = React.useState(new Date().getFullYear());
  const [currentMonthValue, setCurrentMonthValue] = useState([]);
  const [nextMonthValue, setNextMonthValue] = useState([]);
  const [prevMonthValue, setPrevMonthValue] = useState([]);

  function throttle(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function () {
      previous = options.leading === false ? 0 : Date.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function () {
      var now = Date.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  }

  var lastScrollTop = 0;

  function checkScrollDirection() {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      // downscroll code
      // console.log("down");
    } else {
      // upscroll code
      // console.log("up");
    }
    lastScrollTop = st;
  }

  React.useEffect(() => {
    window.addEventListener("scroll", throttle(checkScrollDirection, 1000));
    return window.removeEventListener(
      "scroll",
      throttle(checkScrollDirection, 1000)
    );
  }, []);

  // console.log(monthValue[thisMonth - 1]);

  // const getThisMonth = (yearVal, monthVal) => {
  //   const month = moment(`${yearVal}-${monthVal}`, "YYYY-MM");
  //   const range = moment().range(
  //     moment(month).startOf("month"),
  //     moment(month).endOf("month")
  //   );
  //   const days = range.by("days");

  //   return [...days].map((date) => date.format("DD-ddd"));
  // };

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

  // console.log(
  //   prevMonthValue,
  //   currentMonthValue,
  //   nextMonthValue,
  //   thisYear,
  //   thisMonth
  // );
  return (
    <div className="App">
      <Header
        reduceMonth={reduceMonth}
        increaseMonth={increaseMonth}
        thisMonth={thisMonth}
        thisYear={thisYear}
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
