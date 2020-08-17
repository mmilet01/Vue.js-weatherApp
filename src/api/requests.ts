import axios, { AxiosResponse } from "axios";
const constants = require("../assets/constants.json");
import helperFunctions from "./helperFunctions";
import { IWeather } from "@/Interfaces/WeatherInterface";
import { IForecast } from "@/Interfaces/ForecastInterface";
import { IDate } from "@/Interfaces/DateInterface";
import { IForecastArray } from "@/Interfaces/ForecastArrayInterface";

const Weather = {
  list: (): Promise<any> =>
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/find?lat=45.1&lon=15.20&cnt=10&units=metric&APPID=${constants.API_KEY}`
      )
      .then((res) => {
        const weather: IWeather[] = [];
        res.data.list.forEach((city: any) => {
          const cityWeather: IWeather = {
            id: city.id,
            temperature: Math.round(city.main.temp),
            wind_speed: city.wind.speed,
            details: city.weather[0].description,
            humidity: city.main.pressure,
            pressure: city.main.humidity,
            description: city.weather[0].main,
            name: city.name,
            icon: `http://openweathermap.org/img/w/${city.weather[0].icon}.png`,
            wind_direction: helperFunctions.getWindDirection(city.wind.deg),
          };
          weather.push(cityWeather);
        });
        return weather;
      })
      .catch((err) => {
        return err;
      }),

  forecast: (id: string): Promise<any> =>
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/forecast?id=${id}&units=metric&APPID=${constants.API_KEY}`
      )
      .then((res) => {
        let forecastArray: IForecastArray[] = [];

        let firstDayDate: IDate;
        let secondDayDate: IDate;
        let thirdDayDate: IDate;
        let forthDayDate: IDate;
        let fifthDayDate: IDate;
        let sixthDayDate: IDate;

        const firstDay: IForecast[] = [];
        const secondDay: IForecast[] = [];
        const thirdDay: IForecast[] = [];
        const forthDay: IForecast[] = [];
        const fifthDay: IForecast[] = [];
        const sixthDay: IForecast[] = [];

        const cityName = res.data.city.name;

        // if its in the evening -> [32], [39] su isti a preskocimo prvi dan - FIX
        firstDayDate = helperFunctions.getDateAndMonth(res.data.list[0].dt);
        secondDayDate = helperFunctions.getDateAndMonth(res.data.list[8].dt);
        thirdDayDate = helperFunctions.getDateAndMonth(res.data.list[16].dt);
        forthDayDate = helperFunctions.getDateAndMonth(res.data.list[24].dt);
        fifthDayDate = helperFunctions.getDateAndMonth(res.data.list[32].dt);
        sixthDayDate = helperFunctions.getDateAndMonth(res.data.list[39].dt);

        const todaysDate = new Date().getDate();

        for (let i = 0; i < res.data.list.length; i++) {
          const forecastData: IForecast = helperFunctions.getForecastData(
            res.data.list[i]
          );
          const date = new Date(res.data.list[i].dt * 1000).getDate();
          console.log(date, todaysDate);
          if (date === todaysDate) {
            firstDay.push(forecastData);
          } else if (i < firstDay.length + 8) {
            secondDay.push(forecastData);
          } else if (i < firstDay.length + 16) {
            thirdDay.push(forecastData);
          } else if (i < firstDay.length + 24) {
            forthDay.push(forecastData);
          } else if (i < firstDay.length + 32) {
            fifthDay.push(forecastData);
          } else {
            sixthDay.push(forecastData);
          }
        }
        const dataForForecastArray = {
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
        };

        forecastArray = helperFunctions.createForecastArray(
          dataForForecastArray
        );
        return forecastArray;
      })
      .catch((err) => console.log("Errors", err)),

  random: (id: number): Promise<any> =>
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&APPID=${constants.API_KEY}`
      )
      .then((res) => {
        console.log("inside randomcity", res);
        const cityWeather: IWeather = {
          id: res.data.id,
          temperature: Math.round(res.data.main.temp),
          wind_speed: res.data.wind.speed,
          details: res.data.weather[0].description,
          humidity: res.data.main.pressure,
          pressure: res.data.main.humidity,
          description: res.data.weather[0].main,
          name: res.data.name,
          icon: `http://openweathermap.org/img/w/${res.data.weather[0].icon}.png`,
          wind_direction: helperFunctions.getWindDirection(res.data.wind.deg),
        };
        return cityWeather;
      })
      .catch((err) => console.log("Errors", err)),
};

export default {
  Weather,
};
