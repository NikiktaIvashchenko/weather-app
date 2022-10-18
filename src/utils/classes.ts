import { IMainForecast, IWeatherForecast, IWeatherIcon, IWindData } from "./types";

export class WindData {

    public speed: number;
    public deg: number;
    public gust: number;

    constructor(wind: IWindData) {
        this.speed = wind.speed;
        this.deg = wind.deg;
        this.gust = wind.gust;
    }

    public getCardinalDirection(angle: number) {
        const directions = ['↑N', '↗N-E', '→E', '↘S-E', '↓S', '↙S-W', '←W', '↖N-W'];
        return directions[Math.round(angle / 45) % 8];
    }

    public getKPHSpeed(speed: number) {
        return (speed * 3.6).toFixed(1);
    }

}

export class WeatherIcon {

    public id: number;
    public main: string;
    public description: string;
    public icon: string;

    constructor(icon: IWeatherIcon) {
        this.id = icon.id;
        this.main = icon.main;
        this.description = icon.description;
        this.icon = `http://openweathermap.org/img/wn/${icon.icon}.png`
    }
}

export class MainForecast {

    public temp: number;
    public feels_like: number;
    public temp_min: number;
    public temp_max: number;
    public pressure: number;
    public humidity: number;

    constructor(main: IMainForecast) {
        this.temp = Math.floor(main.temp - 273.15);
        this.feels_like = Math.floor(main.feels_like - 273.15);
        this.temp_min = Math.floor(main.temp_min - 273.15);
        this.temp_max = Math.floor(main.temp_max - 273.15);
        this.pressure = main.pressure;
        this.humidity = main.humidity;
    }

}

export class WeatherForecast {

    public date: Date;
    public longDay: string;
    public shortDay: string;
    public time: number;
    public main: MainForecast;
    public icon: WeatherIcon;
    public wind: WindData;
    public sunrise: Date;
    public sunset: Date;


    constructor(weather: IWeatherForecast) {
        this.date = new Date(weather.dt * 1000);
        this.time = new Date(weather.dt * 1000).getHours();
        this.longDay = this.date.toLocaleDateString('en-EN', { weekday: 'long' });
        this.shortDay = this.date.toLocaleDateString('en-EN', { weekday: 'short' });

        this.main = new MainForecast(weather.main);
        this.icon = new WeatherIcon(weather.weather[0]);
        this.wind = new WindData(weather.wind);

        this.sunrise = new Date(weather.sys.sunrise * 1000);
        this.sunset = new Date(weather.sys.sunset * 1000);
    }
}