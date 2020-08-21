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
          const cityWeather: IWeather = helperFunctions.getWeatherData(city);
          weather.push(cityWeather);
        });
        return weather;
      })
      .catch((err) => {
        throw err;
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
        return { forecast: forecastArray, cityName };
      })
      .catch((err) => {
        throw err;
      }),

  cityById: (id: number): Promise<any> =>
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&APPID=${constants.API_KEY}`
      )
      .then((res) => {
        const cityWeather: IWeather = helperFunctions.getWeatherData(res.data);
        return cityWeather;
      })
      .catch((err) => {
        throw err;
      }),

  cityByName: (name: string): Promise<any> =>
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&APPID=${constants.API_KEY}`
      )
      .then((res) => {
        console.log(res);
        const cityWeather: IWeather = helperFunctions.getWeatherData(res.data);
        return cityWeather;
      })
      .catch((err) => {
        throw err;
      }),
};

export default {
  Weather,
};
