import React from "react";
import Footer from "../Footer";
import Tile from "../Tile";
import "./styles.scss";

function Calender({ currentMonth, nextMonth, prevMonth, thisMonth, thisYear }) {
  const [prevMonthData, setPrevMonthData] = React.useState([]);
  const [nextMonthData, setNextMonthData] = React.useState([]);
  const [thisMonthData, setThisMonthData] = React.useState([]);

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

  // console.log(currentMonth, nextMonth, prevMonth);
  React.useEffect(() => {
    const checkFirstDay = () => {
      let firstDay = currentMonth[0].split("-")[1];
      let lastDay = currentMonth[currentMonth.length - 1].split("-")[1];
      let firstValue = checkFirstDate(firstDay.toLowerCase());
      // let lastValue = checkFirstDate(lastDay.toLowerCase());
      let prevValue =
        firstValue === 0 ? [] : prevMonth.slice(-Number(firstValue));
      let nextValue = nextMonth.splice(0, checkLastDate(lastDay));

      // setPrevMonthData(prevValue);
      // setNextMonthData(nextValue);
      // console.log(prevValue, nextValue);
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
  return (
    <React.Fragment>
      {[...prevMonthData, ...thisMonthData, ...nextMonthData]?.map(
        (item, index) => (
          <Tile key={index} monthValue={item} val={index + 1} />
        )
      )}
      <Footer thisMonth={thisMonth} thisYear={thisYear} />
    </React.Fragment>
  );
}

export default Calender;
