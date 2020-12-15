import React from "react";

const monthValue = (val) => {
  switch (val) {
    case "Jan":
      return 0;
    case "Feb":
      return 1;
    case "Mar":
      return 2;
    case "Apr":
      return 3;
    case "May":
      return 4;
    case "Jun":
      return 5;
    case "Jul":
      return 6;
    case "Aug":
      return 7;
    case "Sep":
      return 8;
    case "Oct":
      return 9;
    case "Nov":
      return 10;
    case "Dec":
      return 11;
  }
};

export const getDate = (ResponseObjects) => {
  let date = [];
  ResponseObjects[0]?.Posts.map((item) => {
    let d = new Date(item.CalendarDateTime).toString().split(" ");
    // console.log(new Date(item.CalendarDateTime).toString());
    let day = d[2];
    date.push(day);

    let year = d[3];
  });
  return date;
};

export const getMonth = (ResponseObjects) => {
  let month = [];
  ResponseObjects[0]?.Posts.map((item) => {
    let d = new Date(item.CalendarDateTime).toString().split(" ");
    let monthVAl = d[1];
    month.push(monthValue(monthVAl));
    // console.log(monthVAl.toString());
    // console.log();
  });
  // return monthValue(month);
  return month;
};

export const getYear = (ResponseObjects) => {
  let year = [];
  ResponseObjects[0]?.Posts.map((item) => {
    let d = new Date(item.CalendarDateTime).toString().split(" ");
    // console.log(new Date(item.CalendarDateTime).toString());
    let yearVal = d[3];
    year.push(yearVal);
  });
  return year;
};
