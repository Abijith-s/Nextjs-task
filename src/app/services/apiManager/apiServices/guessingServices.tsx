import API from "../enpoints";
import { httpGETRequest } from "../httpRequestHandler";

export const fetchGuessingServices = (name: String) => {
  const getAgeUrl = `${API.GET_AGE}?name=${name}`;
  const genderUrl = `${API.GET_GENDER}?name=${name}`;
  const countryUrl = `${API.GET_COUNTRY}?name=${name}`;
  const fetchTasks = [
    httpGETRequest(getAgeUrl),
    httpGETRequest(genderUrl),
    httpGETRequest(countryUrl),
  ];

  return Promise.all(fetchTasks);
};
