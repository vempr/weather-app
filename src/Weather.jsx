import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import Axios from 'axios';

function Weather() {

    const [ userCity, setUserCity ] = useState("New York");
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["weather"],
        queryFn: async () => {
            try {
                const response = await Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=ce9df0ba4216c4ec734d1ed3800fcfd0`);
                return response.data;
            } catch(error) {
                console.log(error);
                throw new Error("Invalid City");
            }
        }
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        refetch();
    };


    return(
        <>
            <form onSubmit={handleSubmit} className="formWeather">
                <input 
                    className="formInput"
                    type="text"
                    placeholder="Enter Location"
                    value={userCity}
                    onChange={(e) => setUserCity(e.target.value)}>
                </input>
            </form>


            {isError ? (
                <div className="errorMsg">Please enter a valid city</div>
            ) : (
                <div className="cityInfo">

                    <div className="cityBasicDetails">
                        <p className="cityName">{data?.name}</p>
                        <p className="cityTemp">{(data?.main.temp - 273.1).toFixed()}°C</p>
                        <p className="cityDescription">{data?.weather[0].description}</p>
                    </div>

                    <div className="cityMoreDetails">
                        <div className="cityMoreDetail">
                            <p className="cityMoreDetailInfo">{(data?.main.feels_like - 273.15).toFixed()}°C</p>
                            <p>Feels Like</p>
                        </div>
                        <div className="cityMoreDetail">
                            <p className="cityMoreDetailInfo">{data?.main.humidity}%</p>
                            <p>Humidity</p>
                        </div>
                        <div className="cityMoreDetail">
                            <p className="cityMoreDetailInfo">{(data?.wind.speed / 1000 * 3600).toFixed(1)} KMH</p> {/*convert m/s to km/h*/}
                            <p>Wind Speed</p>
                        </div>
                    </div>

                </div>
            )}
        </>
    );
}

export default Weather;