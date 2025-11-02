import React, { useState, useEffect } from "react";
import { FcSearch } from "react-icons/fc";

const Content = () => {
  let [state, setState] = useState({
    index: 0,
    dishes: [],
    dish: "",
  });
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/search.php?s=chicken"
        );
        const data = await response.json();
        setState({ ...state, dishes: data.meals });
      };
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  }, []);
  return (
    <div className="px-1 ">
      <div className="flex justify-between bg-neutral-200 items-center">
        <h1 className="text-4xl lg:text-5xl text-neutral-800 p-2 font-bold font-mono">
          Recipe Finder
        </h1>
        <form className="inline-flex ">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for new foods"
              name="search"
              id="search"
              className="outline-none bg-neutral-100 p-2 rounded-full cursor-pointer w-sm lg:w-md lg:text-xl md:w-sm sm:w-xs xs:w-[100px]"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl lg:text-2xl"
            >
              <FcSearch />
            </button>
          </div>
        </form>
      </div>
      <div className="max-w-4xl mx-auto">
        {state.dishes.map((dish, i) => (
          <article>
            <h3 className="my-8 lg:my-12  text-3xl lg:text-4xl font-bold text-neutral-800 flex items-center gap-4 flex-wrap">
              {i + 1}, {dish.strMeal}
              <span className="bg-neutral-200 font-normal text-sm px-2 rounded-full">
                {dish.strCategory}
              </span>{" "}
              <span className="bg-neutral-200 font-normal text-sm px-2 rounded-full">
                {dish.strArea}
              </span>
            </h3>
            <img
              src={dish.strMealThumb}
              alt={dish.strMeal}
              className="w-full"
            />

            <h3 className="font-bold text-2xl mt-6 mb-2 lg:mb-4 text-neutral-800">
              Ingredients
            </h3>
            <ul className="list-decimal pl-4">
              {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => {
                const ingredient = dish[`strIngredient${num}`];
                const measure = dish[`strMeasure${num}`];
                if (ingredient && measure && ingredient.trim() !== "") {
                  return (
                    <li key={num}>
                      {ingredient} - {measure}
                    </li>
                  );
                }
                return null;
              })}
            </ul>

            <h3 className="font-bold text-2xl mt-6 mb-2 lg:mb-4 text-neutral-800">
              Instructions
            </h3>
            <p>{dish.strInstructions}</p>

            <ul className="flex items-center justify-start gap-3 mt-6 lg:mt-8 flex-wrap">
              <li className=" bg-neutral-200 px-2 rounded-full font-normal text-base">
                <a
                  href={dish.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Video
                </a>
              </li>
              <li className=" bg-neutral-200 px-2 rounded-full font-normal text-base">
                <a
                  href={dish.strSource}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source
                </a>
              </li>
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Content;
