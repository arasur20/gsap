import React from "react";
import { featureLists, goodLists } from "../constants";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Art = () => {
  const isMobile = useMediaQuery({ maxWidth: 760 });
  const base = import.meta.env.BASE_URL;

  useGSAP(() => {
    const start = isMobile ? "top 20%" : "top top";

    const maskTime = gsap.timeline({
      scrollTrigger: {
        trigger: "#art",
        start,
        end: "bottom center",
        scrub: 1.5,
        pin: true,
      },
    });

    maskTime
      .to(".will-fade", {
        opacity: 0,
        stagger: 0.2,
        ease: "power1.inOut",
      })
      .to(".masked-img", {
        scale: 1.5,
        maskPosition: "center",
        maskSize: "200%",
        duration: 1,
        ease: "power1.inOut",
      })
      .to(".masked-content", { opacity: 1, duration: 1, ease: "power1.inOut" });
  });

  return (
    <div id="art">
      <div className="container mx-auto h-full pt-20">
        <h2 className="will-fade">The Art</h2>
        <div className="content">
          <ul className="space-y-4 will-fade">
            {goodLists.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <img src={`${base}images/check.png`} alt="checkmark" />
                <p>{feature}</p>
              </li>
            ))}
          </ul>
          <div className="cocktail-img">
            <img
              src={`${base}images/under-img.jpg`}
              alt="cocktail"
              className="abs-center masked-img size-full object-contain"
            />
          </div>
          <ul className="space-y-4 will-fade">
            {featureLists.map((feature, index) => (
              <li key={index} className="flex items-center justify-start gap-2">
                <img src={`${base}images/check.png`} alt="checkmark" />
                <p>{feature}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="masked-container">
          <h2 className="will-fade">Sip-Worthy Perfection</h2>
          <div className="masked-content">
            <h3 className="text-yellow">
              Made with Craft, Poured with Passion
            </h3>
            <p>
              This isn't just a Drink. It's a carefully crafted Moment made just
              for You.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Art;
