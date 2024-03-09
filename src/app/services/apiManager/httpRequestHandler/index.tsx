
import axios from "axios";

export const httpGETRequest = (url: any) => {
   return axios.get(url);
}