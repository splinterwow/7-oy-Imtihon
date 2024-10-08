import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../redux/axios";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import Navbar from "../components/Navbar";
import { useTranslation } from "react-i18next";

const Cart = () => {

  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [borderSlug, setBorderSlug] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const endpoint = borderSlug
        ? `countries/${borderSlug}`
        : `countries/${slug}`;

      try {
        const response = await axios.get(endpoint);
        setProduct(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug, borderSlug]);

  const handleBack = () => {
    navigate("/");
  };

  const handleBorderClick = (borderSlug) => {
    setBorderSlug(borderSlug);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto">
        <div className="mt-10 -ml-16">
          <button
            onClick={handleBack}
            className="mt-16 text-2xl bg-transparent text-black border border-transparent font-semibold cursor-pointer"
          >
            <MdOutlineKeyboardBackspace className="absolute -ml-7 w-6 h-6 mt-1" />
            {t("back")}
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : product ? (
          <div className="mt-10 -ml-24 flex-wrap gap-20">
            <div className="w-[540px] h-[391px]">
              {product.flags && product.flags.png ? (
                <img
                  src={product.flags.png}
                  alt={product.name?.common}
                  className="w-full h-full rounded-2xl object-cover"
                />
              ) : (
                <p>...</p>
              )}
            </div>
            <div className="ml-[580px] -mt-[400px]">
              <h1 className="text-4xl font-semibold">
                {product.name?.common || t("noProductFound")}
              </h1>
              <br />
              <div className="flex flex-wrap gap-10">
                <div className="w-[300px]">
                  <p className="font-semibold text-lg">
                    {t("nativeName")}
                    <span className="font-normal text-base">
                      {product.name?.nativeName}
                    </span>
                  </p>
                  <p className="font-semibold text-lg">
                    {t("population")}
                    <span className="font-normal text-base">
                      {product.population}
                    </span>
                  </p>
                  <p className="font-semibold text-lg">
                    {t("region")}
                    <span className="font-normal text-base">
                      {product.region}
                    </span>
                  </p>
                  <p className="font-semibold text-lg">
                    {t("subRegion")}
                    <span className="font-normal text-base">
                      {product.subregion}
                    </span>
                  </p>
                  <p className="font-semibold text-lg">
                    {t("capital")}
                    <span className="font-normal text-base">
                      {product.capital}
                    </span>
                  </p>
                </div>
                <div className="w-[1800px] ml-[320px] -mt-44">
                  <p className="font-semibold text-lg">
                    {t("topLevelDomain")}
                    <span className="font-normal text-base">
                      {product.topLevelDomain?.[0]}
                    </span>
                  </p>
                  <p className="font-semibold text-lg">
                    {t("currencies")}
                    <span className="font-normal text-base">
                      {product.currencies}
                    </span>
                  </p>
                  <p className="font-semibold text-lg">
                    {t("languages")}
                    <span className="font-normal text-base">
                      {product.languages}
                    </span>
                  </p>
                </div>
              </div>

              <br />
              <div className="-mt-8">
                <p className="font-semibold text-lg">{t("borderCountries")}:</p>
                <ul className="flex gap-4 flex-wrap ">
                  {product.borders.length > 0 ? (
                    product.borders.map((border, index) => (
                      <li
                        key={index}
                        className="flex w-24 items-center justify-center bg-gray-2 border border-gray-500 rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-300 text-center"
                        onClick={() => handleBorderClick(border.slug)}
                      >
                        {border.common}
                      </li>
                    ))
                  ) : (
                    <li>{t("noBordersAvailable")}</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center mt-12">
            <p>{t("noProductFound")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
