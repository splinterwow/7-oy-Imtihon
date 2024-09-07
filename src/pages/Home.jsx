import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [region, setRegion] = useState("");
  const navigate = useNavigate();

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

  const onCountryClick = (slug) => {
    navigate(`/cart/${slug}`);
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <Navbar />
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
          {countries.map((country, index) => (
            <div
              key={`${country.name.common}-${index}`}
              className="border rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
              onClick={() => onCountryClick(country.name.common.toLowerCase())}
            >
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
