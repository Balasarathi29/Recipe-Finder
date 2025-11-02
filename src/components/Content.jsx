import React from "react";
import { FcSearch } from "react-icons/fc";
const Content = () => {
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
      <div>
        <article>
          <h3 className="my-6 lg:my-8  text-3xl lg:text-4xl font-bold text-neutral-800 flex items-center gap-4 flex-wrap">
            Name of the food{" "}
            <span className="bg-neutral-200 font-normal text-sm px-2 rounded-full">
              Category
            </span>{" "}
            <span className="bg-neutral-200 font-normal text-sm px-2 rounded-full">
              Region
            </span>
          </h3>
          <img
            src="https://images.pexels.com/photos/33771131/pexels-photo-33771131.jpeg"
            alt="Recipe Image"
          />

          <h3 className="font-bold text-2xl mt-6 mb-2 lg:mb-4 text-neutral-800">Ingredients</h3>
          <ul className="list-">
            <li>Item1</li>
            <li>Item2</li>
            <li>Item3</li>
            <li>Item4</li>
          </ul>

          <h3 className="font-bold text-2xl mt-6 mb-2 lg:mb-4 text-neutral-800">Instructions</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure
            fugiat quod aperiam cupiditate beatae facilis tenetur laboriosam
            velit itaque doloremque.
          </p>

          <ul className="flex items-center justify-start gap-3 mt-6 lg:mt-8 flex-wrap">
            <li className=" bg-neutral-200 px-2 rounded-full font-normal text-base">Video</li>
            <li className=" bg-neutral-200 px-2 rounded-full font-normal text-base">Source</li>
          </ul>
        </article>
      </div>
    </div>
  );
};

export default Content;
