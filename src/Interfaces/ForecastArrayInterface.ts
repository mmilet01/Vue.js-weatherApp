import { IForecast } from "./ForecastInterface";
import { IDate } from "./DateInterface";

export interface IForecastArray {
  date: IDate;
  forecastData: IForecast[];
}
