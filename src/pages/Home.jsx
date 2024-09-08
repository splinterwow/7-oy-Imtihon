import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useTranslation } from "react-i18next";
import axios from "../redux/axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Home() {
  const { t } = useTranslation();
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [region, setRegion] = useState("");
  
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoading(true);
      try {
        let url = "/countries";

        if (region) {
          url += `?region=${region}`;
        } else if (searchTerm) {
          url += `?search=${searchTerm}`;
        }

        const response = await axios.get(url);
        setCountries(response.data.data);
      } catch (error) {
        console.error("Error fetching countries:", error);

      } finally {
        setIsLoading(false);
      }
    };
    fetchCountries();
  }, [searchTerm, region]);

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
              placeholder={t("search")}
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
            <option value="">{t("filterByRegion")}</option>
            <option value="Africa">{t("africa")}</option>
            <option value="Americas">{t("americas")}</option>
            <option value="Asia">{t("asia")}</option>
            <option value="Europe">{t("europe")}</option>
            <option value="Oceania">{t("oceania")}</option>
          </select>
        </div>


        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {countries.map((country, index) => (
              <div
                key={`${country.name.common}-${index}`}
                className="border rounded-lg overflow-hidden shadow-lg transition-transform transform hover: cursor-pointer"
                onClick={() =>
                  onCountryClick(country.name.common.toLowerCase())
                }
              >
                <img
                  src={country.flags.png}
                  alt={country.name.common}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h2 className="font-semibold text-lg">
                    {country.name.common}
                  </h2>
                  <p className="text-sm">
                    {t("population")}: {country.population.toLocaleString()}
                  </p>
                  <p className="text-sm">
                    {t("region")}: {country.region}
                  </p>
                  <p className="text-sm">
                    {t("capital")}:{" "}
                    {country.capital ? country.capital[0] : "N/A"}
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
