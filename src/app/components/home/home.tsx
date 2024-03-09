"use client";
import { fetchGuessingServices } from "@/app/services/apiManager/apiServices/guessingServices";
import { useState } from "react";

export default function GuessingApp() {
  const [name, setName] = useState("");
  const [isSubmitted,setIsSubmitted] = useState(false);
  const [guessedUserDetails, setGuessedUserDetails] = useState({
    age: "",
    gender: "",
    country: [],
    fetched: false,
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmitted(true);
    if(!name){
        return;
    }
    fetchGuessingServices(name).then((res) => {
      const responseData = {
        age: res[0]?.data.age,
        gender: res[1]?.data.gender,
        country: res[2]?.data.country?.map((item: any) => item.country_id),
        fetched: true,
      };
      setGuessedUserDetails(responseData);
    }).catch((error) =>{
        console.log("error",error);
    })
  };

  return (
    <>
      <div className="container mt-4">
        <form onSubmit={handleSubmit}>
          <div className="row align-items-center">
            <div className="col-md-2 ">
              <label>Please enter your name :</label>
            </div>
            <div className="col-md-4">
              <input
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                type="text"
                placeholder="Name"
              />
             {(isSubmitted && !name) && <div className="error mt-1">This field is required</div>}
            </div>
            <div className="col-md-2">
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>

        {guessedUserDetails.fetched && (
          <div className="row mt-4">
            <label>Guessed User Details</label>
            <div className="col-md-6">
              <table className="user-details mt-2">
                <tbody>
                  <tr>
                    <td>Age</td>
                    <td>{guessedUserDetails?.age}</td>
                  </tr>
                  <tr>
                    <td>Gender</td>
                    <td>{guessedUserDetails?.gender}</td>
                  </tr>
                  <tr>
                    <td>Probable Countries</td>
                    <td>{guessedUserDetails.country?.join(", ")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
