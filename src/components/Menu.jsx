import React, { useRef, useState } from "react";
import { sliderLists } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Menu = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("left");

  const totalCocktail = sliderLists.length;

  const gotoSlide = (index, direction) => {
    const newIndex = (index + totalCocktail) % totalCocktail;
    setDirection(direction);
    setCurrentIndex(newIndex);
  };

  const getCocktail = () => {
    return sliderLists[(currentIndex + totalCocktail) % totalCocktail];
  };

  const currentCocktail = getCocktail();

  useGSAP(() => {
    gsap.from("#title", { opacity: 0, duration: 1, ease: "power1.inOut" });
    gsap.from(".cocktail img", {
      opacity: 0,
      xPercent: direction === "left" ? 100 : -100,
      ease: "power1.inOut",
    });
    gsap.from(".details h2", {
      opacity: 0,
      yPercent: 100,
      ease: "power1.inOut",
    });
    gsap.from(".details p", {
      opacity: 0,
      yPercent: 100,
      ease: "power1.inOut",
    });
  }, [currentIndex]);

  return (
    <section id="menu" className="menu-heading">
      <img
        src={`${import.meta.env.BASE_URL}images/slider-left-leaf.png`}
        alt="left-leaf"
        id="m-left-leaf"
      />
      <img
        src={`${import.meta.env.BASE_URL}images/slider-right-leaf.png`}
        alt="right-leaf"
        id="m-right-leaf"
      />

      <h2 className="sr-only" id="menu-heading">
        Cocktail Menu
      </h2>
      <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
        {sliderLists.map((cocktail, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={cocktail.id}
              className={`${
                isActive
                  ? "text-white border-white"
                  : "text-white/50 border-white/50"
              } `}
              onClick={() => gotoSlide(index)}
            >
              {cocktail.name}
            </button>
          );
        })}
      </nav>

      <div className="content">
        <div className="arrows">
          <button
            className="text-left"
            onClick={() => gotoSlide(currentIndex - 1, "left")}
          >
            <img
              src={`${import.meta.env.BASE_URL}images/right-arrow.png`}
              alt="right-arrow"
              aria-hidden="true"
            />
          </button>
          <button
            className="text-right"
            onClick={() => gotoSlide(currentIndex + 1, "right")}
          >
            <img
              src={`${import.meta.env.BASE_URL}images/left-arrow.png`}
              alt="left-arrow"
              aria-hidden="true"
            />
          </button>
        </div>
        <div className="cocktail">
          <img src={currentCocktail.image} className="object-contain" />
        </div>
        <div className="recipe">
          <div className="info">
            <p id="title">{currentCocktail.name}</p>
          </div>
          <div className="details">
            <h2>{currentCocktail.title}</h2>
            <p>{currentCocktail.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
