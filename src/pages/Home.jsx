import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import axios from "../utils/axios"; // axios faylini import qiling
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [region, setRegion] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Loader holati
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoading(true); // Yuklanayotganini ko'rsatish
      try {
        let url = "/countries"; // Asosiy URL

        // Agar region tanlangan bo'lsa, URL ga qo'shamiz
        if (region) {
          url += `?region=${region}`;
        } 
        // Agar qidiruv so'zi mavjud bo'lsa, URL ga qo'shamiz
        else if (searchTerm) {
          url += `?search=${searchTerm}`;
        }

        const response = await axios.get(url); // API dan ma'lumotlarni olish
        setCountries(response.data.data); // Olingan ma'lumotlarni saqlash
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setIsLoading(false); // Yuklash tugagach, holatni yangilash
      }
    };
    fetchCountries();
  }, [searchTerm, region]); // searchTerm va regionni kuzatamiz

  const onCountryClick = (slug) => {
    navigate(`/cart/${slug}`);
  };

  return (
    <div className="container mx-auto w-full">
      <Navbar />
      <div className="container mx-auto p-4 max-w-7xl">
        <div className="flex mb-6">
          <div className="relative mr-4">
            <input
              type="text"
              placeholder="Search for a country..."
              className="w-[400px] h-[56px] mb-4 p-2 pl-10 border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-gray-400 dark:bg-[#2B3844] dark:border-gray-600 dark:text-gray-200" // Dark rejim uchun ranglar
              onChange={(e) => setSearchTerm(e.target.value)} // Qidiruv so'zini o'rnatish
            />
            <span className="absolute left-3 top-3 text-gray-400">
              <IoIosSearch className="h-5 w-5 mt-[6px]" />
            </span>
          </div>
          <select
            className="w-[200px] h-[56px] border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-gray-400 ml-auto dark:bg-[#2B3844] dark:border-gray-600 dark:text-gray-200" // Dark rejim uchun ranglar
            onChange={(e) => setRegion(e.target.value)} // Mintaqani o'rnatish
          >
            <option value="">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>

        {isLoading ? ( // Yuklanayotganini ko'rsatish
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {countries.map((country, index) => (
              <div
                key={`${country.name.common}-${index}`}
                className="border rounded-lg overflow-hidden shadow-lg transition-transform transform hover: cursor-pointer"
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
        )}
      </div>
    </div>
  );
}

export default Home;