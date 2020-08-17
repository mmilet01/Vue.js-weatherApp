import { IDate } from "@/Interfaces/DateInterface";
import { WeekDays } from "@/Enums/Enums";
import { IForecastArray } from "@/Interfaces/ForecastArrayInterface";

export default {
  getForecastData(data: any) {
    return {
      icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      hour: data.dt_txt.slice(11, 16),
      temperature: Math.round(data.main.temp),
      description: data.weather[0].main,
      details: data.weather[0].description,
    };
  },

  /* pushDayToForecastArray(data: IForecast[], date: IDate) {
    forecastArray.push({
      date,
      forecastData: data,
    });
  }, */

  createForecastArray(data: any) {
    const forecastArray: Array<IForecastArray> = [];
    const {
      firstDay,
      firstDayDate,
      secondDay,
      secondDayDate,
      thirdDay,
      thirdDayDate,
      forthDay,
      forthDayDate,
      fifthDay,
      fifthDayDate,
      sixthDay,
      sixthDayDate,
    } = data;

    if (firstDay.length !== 0) {
      forecastArray.push({
        date: firstDayDate,
        forecastData: firstDay,
      });
    }

    forecastArray.push({
      date: secondDayDate,
      forecastData: secondDay,
    });
    forecastArray.push({
      date: thirdDayDate,
      forecastData: thirdDay,
    });
    forecastArray.push({
      date: forthDayDate,
      forecastData: forthDay,
    });
    forecastArray.push({
      date: fifthDayDate,
      forecastData: fifthDay,
    });
    forecastArray.push({
      date: sixthDayDate,
      forecastData: sixthDay,
    });
    return forecastArray;
  },

  convertEnumToString(day: WeekDays) {
    switch (day) {
      case WeekDays.Monday:
        return "Monday";
      case WeekDays.Tuesday:
        return "Tuesday";
      case WeekDays.Wednesday:
        return "Wednesday";
      case WeekDays.Thursday:
        return "Thursday";
      case WeekDays.Friday:
        return "Friday";
      case WeekDays.Saturday:
        return "Saturday";
      case WeekDays.Sunday:
        return "Sunday";
    }
  },

  getDateAndMonth(unixTimestamp: number) {
    const date = new Date(unixTimestamp * 1000);
    const returnDate: IDate = {
      month: date.getUTCMonth(),
      date: date.getUTCDate(),
      day: this.convertEnumToString(date.getUTCDay()),
    };
    return returnDate;
  },

  getWindDirection(windDeg: number) {
    if (windDeg >= 22.5 && windDeg <= 67.5) {
      return "NE";
    } else if (windDeg >= 67.5 && windDeg <= 112.5) {
      return "N";
    } else if (windDeg >= 112.5 && windDeg <= 157.5) {
      return "NW";
    } else if (windDeg >= 157.5 && windDeg <= 202.5) {
      return "W";
    } else if (windDeg >= 202.5 && windDeg <= 247.5) {
      return "SW";
    } else if (windDeg >= 247.5 && windDeg <= 292.5) {
      return "S";
    } else if (windDeg >= 292.5 && windDeg <= 337.5) {
      return "SE";
    } else {
      return "E";
    }
  },
};
