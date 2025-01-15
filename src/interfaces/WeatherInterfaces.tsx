interface ForecastEntry {
    dt: number;
    dt_txt: string;
    weather: Weather[];
    main: {
      temp_max: number;
      temp_min: number;
      temp: number;
      feels_like: number;
    };
  }
  
  interface Weather {
    id: string;
    main: string;
    description: string;
    icon: string;
  }
  
  interface City {
    id: string;
    name: string;
    coord: CityCoord;
    country: string;
    population: number;
    timezone: string;
    sunrise: number;
    sunset: number;
  }
  
  interface CityCoord {
    lat: number;
    lon: number;
  }
  
  interface ResponseJson {
    city: City;
    list: ForecastEntry[];
  }