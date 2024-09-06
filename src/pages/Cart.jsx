import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Cart() {
  const { slug } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        console.log("Fetching details for:", slug); // Tekshiruv uchun
        const response = await axios.get(
          `https://frontend-mentor-apis-6efy.onrender.com/countries/${slug}`
        );
        console.log("Fetched country details:", response.data); // Tekshiruv uchun
        setCountry(response.data);
      } catch (error) {
        console.error("Error fetching country details:", error);
      }
    };
    fetchCountryDetails();
  }, [slug]);

  if (!country) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={country.flags.png}
          alt={country.name.common}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{country.name.common}</h2>
          <p className="mb-2">
            Population: {country.population.toLocaleString()}
          </p>
          <p className="mb-2">Region: {country.region}</p>
          <p className="mb-2">
            Capital: {country.capital ? country.capital[0] : "N/A"}
          </p>
          <p className="mb-2">Subregion: {country.subregion}</p>
          <p className="mb-2">
            Currencies: {Object.keys(country.currencies).join(", ")}
          </p>
          <p className="mb-2">
            Languages: {Object.values(country.languages).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Cart;
