import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import axios from "axios";

function Home() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [region, setRegion] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          `https://frontend-mentor-apis-6efy.onrender.com/countries`
        );
        setCountries(response.data.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, [searchTerm, region]);

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="Headerpage flex justify-between items-center font-sans border-b mb-12 border-gray-200 shadow-md py-4">
        <h1 className="text-2xl font-bold pl-20">Where in the world?</h1>
        <p className="cursor-pointer flex items-center mr-20">
          <span className="mr-2 flex">
            <label className="swap swap-rotate">
              <input type="checkbox" />
              <svg
                className="swap-on h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 22 22"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
              <svg
                className="swap-off h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 22 22"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
          </span>
          Dark Mode
        </p>
      </div>
      <div className="container mx-auto p-4 max-w-6xl">
        <div className="flex mb-6">
          <div className="relative mr-4">
            <input
              type="text"
              placeholder="Search for a country..."
              className="w-[400px] h-[56px] mb-4 p-2 pl-10 border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-gray-400"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-3 top-3 text-gray-400">
              <IoIosSearch className="h-5 w-5 mt-[6px]" />
            </span>
          </div>
          <select
            className="w-[200px] h-[56px] border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-gray-400 ml-auto"
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {countries.map((country) => (
            <div className="border rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
              <img
                src={country.flags.png}
                alt={country.name.common}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h2 className="font-semibold text-lg">{country.name.common}</h2>
                <p className="text-sm">
                  Population: {country.population.toLocaleString()}
                </p>
                <p className="text-sm">Region: {country.region}</p>
                <p className="text-sm">
                  Capital: {country.capital ? country.capital[0] : "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
