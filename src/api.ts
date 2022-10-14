import { CitiesApiOptions } from "./utils/types";

export const CITIESAUTOCOMPLETE_API_OPTIONS: CitiesApiOptions = {
    method: 'GET',
    url: `${process.env.REACT_APP_RAPIDAPILINK}`,
    params: { limit: '15', skip: '0', q: '', type: 'CITY' },
    headers: {
        'X-RapidAPI-Key': `${process.env.REACT_APP_XRAPIDAPIKEY}`,
        'X-RapidAPI-Host': 'spott.p.rapidapi.com'
    }
};