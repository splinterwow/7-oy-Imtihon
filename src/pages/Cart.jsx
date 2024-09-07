import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function Cart() {
  const { slug } = useParams();
  const [country, setCountry] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [region, setRegion] = useState("");

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await axios.get(
          `https://frontend-mentor-apis-6efy.onrender.com/countries/${slug}`
        );
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
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setRegion={setRegion}
      />
      <Link to="/" className="text-blue-500 mb-4 inline-block">
        ← Back
      </Link>
      <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={country.flags.png}
          alt={country.name.common}
          className="w-9/12 h-64 object-cover"
        />
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-2">{country.name.common}</h2>
          <p className="mb-2">
            <strong>Native Name:</strong> {country.name.nativeName || "N/A"}
          </p>
          <p className="mb-2">
            <strong>Population:</strong> {country.population.toLocaleString()}
          </p>
          <p className="mb-2">
            <strong>Region:</strong> {country.region}
          </p>
          <p className="mb-2">
            <strong>Sub Region:</strong> {country.subregion}
          </p>
          <p className="mb-2">
            <strong>Capital:</strong>{" "}
            {country.capital ? country.capital[0] : "N/A"}
          </p>
          <p className="mb-2">
            <strong>Top Level Domain:</strong>{" "}
            {country.tld ? country.tld.join(", ") : "N/A"}
          </p>
          <p className="mb-2">
            <strong>Currencies:</strong>{" "}
            {country.currencies
              ? Object.keys(country.currencies).join(", ")
              : "N/A"}
          </p>
          <p className="mb-2">
            <strong>Languages:</strong>{" "}
            {country.languages
              ? Object.values(country.languages).join(", ")
              : "N/A"}
          </p>
          <p className="mb-2">
            <strong>Border Countries:</strong>{" "}
            {country.borders ? country.borders.join(", ") : "None"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Cart;
