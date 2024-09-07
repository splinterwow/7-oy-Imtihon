import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const language = localStorage.getItem('language') || 'en';

i18n
  .use(initReactI18next) 
  .init({
    resources: {
      en: {
        translation: {
          welcome: "Welcome",
          search: "Search for a country...",
          filterByRegion: "Filter by Region",
          africa: "Africa",
          americas: "Americas",
          asia: "Asia",
          europe: "Europe",
          oceania: "Oceania",
          noProductFound: "No product found",
          back: "Back",
          population: "Population",
          region: "Region",
          capital: "Capital",
          nativeName: "Native Name",
          topLevelDomain: "Top Level Domain",
          currencies: "Currencies",
          languages: "Languages",
          borderCountries: "Border Countries",
          noBordersAvailable: "No borders available",
          subRegion: "Sub Region",
          productNotFound: "No product found",
        }
      },
      ru: {
        translation: {
          welcome: "Добро пожаловать",
          search: "Поиск страны...",
          filterByRegion: "Фильтр по региону",
          africa: "Африка",
          americas: "Америка",
          asia: "Азия",
          europe: "Европа",
          oceania: "Океания",
          noProductFound: "Товар не найден",
          back: "Назад",
          population: "Население",
          region: "Регион",
          capital: "Столица",
          nativeName: "Родное имя",
          topLevelDomain: "Домен верхнего уровня",
          currencies: "Валюты",
          languages: "Языки",
          borderCountries: "Соседние страны",
          noBordersAvailable: "Нет соседних стран",
          subRegion: "Подрегион",
          productNotFound: "Товар не найден",
        }
      },
      uz: {
        translation: {
          welcome: "Xush kelibsiz",
          search: "Mamlakatni qidiring...",
          filterByRegion: "Mintaqa bo'yicha filtr",
          africa: "Afrika",
          americas: "Amerikalar",
          asia: "Osiyo",
          europe: "Evropa",
          oceania: "Okeaniya",
          noProductFound: "Mahsulot topilmadi",
          back: "Orqaga",
          population: "Aholi",
          region: "Mintaqa",
          capital: "Poytaxt",
          nativeName: "Mahalliy nomi",
          topLevelDomain: "Eng yuqori darajadagi domen",
          currencies: "Valyutalar",
          languages: "Tillari",
          borderCountries: "Chekka mamlakatlar",
          noBordersAvailable: "Chekka mamlakatlar mavjud emas",
          subRegion: "Subregion",
          productNotFound: "Mahsulot topilmadi",
        }
      },
    },
    lng: language,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;