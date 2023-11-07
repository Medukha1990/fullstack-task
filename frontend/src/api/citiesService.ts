import axios from "axios";
import { City } from '../components/types/cityTypes'

const http = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-type": "application/json",
  },
});

const cityURL = "/cities"

const getAll = (params: { cityName?: string; page: number; size: number }) => {
  return http.get(cityURL, { params });
};

const update = (body: City | null) => {
  return http.put(cityURL, body);
};

const remove = (body: City) => {
  return http.delete(cityURL, { data: JSON.stringify(body) });
};

export default {
  getAll,
  update,
  remove,
};
