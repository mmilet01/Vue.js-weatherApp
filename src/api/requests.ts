import axios, { AxiosResponse } from "axios";
const constants = require("../assets/constants.json");
import helperFunctions from "./helperFunctions";
import { IWeather } from "@/Interfaces/WeatherInterface";

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
};

export default {
  Weather,
};
