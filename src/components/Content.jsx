import React, { useState, useEffect } from "react";
import { FcSearch } from "react-icons/fc";
import { Mosaic } from "react-loading-indicators";
import Swal from "sweetalert2";

const Content = () => {
  const [state, setState] = useState({
    dishes: [],
    loading: true,
    searchDish: "",
  });

  useEffect(() => {
    fetchData("chicken");
  }, []);

  const fetchData = async (dish) => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${dish}`
      );
      const data = await response.json();
      if (!data.meals) throw new Error("No dishes found");

      setState((prev) => ({
        ...prev,
        dishes: data.meals,
        loading: false,
      }));
    } catch (error) {
      console.error(error.message);
      Swal.fire({
        title: `${state.searchDish} not Found! 😔`,
        showClass: {
          popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
        },
        hideClass: {
          popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
        },
      });
      setState((prev) => ({ ...prev, searchDish: "", loading: false }));
    }
  };

  const handleSearch = (e) => {
    setState((prev) => ({
      ...prev,
      searchDish: e.target.value,
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      fetchData(state.searchDish || "chicken");
    }
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    fetchData(state.searchDish || "chicken");
  };

  return (
    <div className="px-1">
      <div className="flex justify-between bg-neutral-200 items-center">
        <h1 className="text-4xl lg:text-5xl text-neutral-800 p-2 font-bold font-mono">
          Recipe Finder
        </h1>
        <form className="inline-flex">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for new foods"
              name="search"
              id="search"
              value={state.searchDish}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
              className="outline-none bg-neutral-100 p-2 rounded-full cursor-pointer w-sm lg:w-md lg:text-xl md:w-sm sm:w-xs xs:w-[100px]"
            />
            <button
              type="submit"
              onClick={handleSearchClick}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl lg:text-2xl"
            >
              <FcSearch />
            </button>
          </div>
        </form>
      </div>

      {state.loading ? (
        <div className="flex justify-center items-center min-h-[80vh]">
          <Mosaic
            color="#3a6880"
            size="large"
            text="Loading..."
            textColor="#417177"
          />
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          {state.dishes.map((dish, i) => (
            <article key={dish.idMeal}>
              <h3 className="my-8 lg:my-12 text-3xl lg:text-4xl font-bold text-neutral-800 flex items-center gap-4 flex-wrap">
                {i + 1}. {dish.strMeal}
                <span className="bg-neutral-200 font-normal text-sm px-2 rounded-full">
                  {dish.strCategory}
                </span>
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

              <ul className="flex items-center justify-start gap-4 mt-6 lg:mt-8 flex-wrap mb-8">
                {dish.strYoutube && (
                  <li>
                    <a
                      href={dish.strYoutube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-neutral-200 px-4 py-1 rounded-full font-normal text-base hover:bg-neutral-400 transition-all duration-200 hover:text-neutral-800"
                    >
                      Video
                    </a>
                  </li>
                )}
                {dish.strSource && (
                  <li>
                    <a
                      href={dish.strSource}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-neutral-200 px-4 py-1 rounded-full font-normal text-base hover:bg-neutral-400 transition-all duration-200 hover:text-neutral-800"
                    >
                      Source
                    </a>
                  </li>
                )}
              </ul>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Content;
