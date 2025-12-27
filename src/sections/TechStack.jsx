import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import TitleHeader from "../components/TitleHeader";
import TechIconCardExperience from "../components/models/tech_logos/TechIconCardExperience";
import { techStackIcons } from "../constants";
// import { techStackImgs } from "../constants";

const TechStack = () => {
  // Animate the tech cards in the skills section
  useGSAP(() => {
    // This animation is triggered when the user scrolls to the #skills wrapper
    // The animation starts when the top of the wrapper is at the center of the screen
    // The animation is staggered, meaning each card will animate in sequence
    // The animation ease is set to "power2.inOut", which is a slow-in fast-out ease
    gsap.fromTo(
      ".tech-card",
      {
        // Initial values
        y: 50, // Move the cards down by 50px
        opacity: 0, // Set the opacity to 0
      },
      {
        // Final values
        y: 0, // Move the cards back to the top
        opacity: 1, // Set the opacity to 1
        duration: 1, // Duration of the animation
        ease: "power2.inOut", // Ease of the animation
        stagger: 0.2, // Stagger the animation by 0.2 seconds
        scrollTrigger: {
          trigger: "#skills", // Trigger the animation when the user scrolls to the #skills wrapper
          start: "top center", // Start the animation when the top of the wrapper is at the center of the screen
        },
      }
    );
  });

  return (
    <div id="skills" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="How I Can Contribute & My Key Skills"
          sub="🤝 What I Bring to the Table"
        />
        <div className="tech-grid">
          {/* Loop through the techStackIcons array and create a component for each item. 
              The key is set to the name of the tech stack icon, and the classnames are set to 
              card-border, tech-card, overflow-hidden, and group. The xl:rounded-full and rounded-lg 
              classes are only applied on larger screens. */}
          {techStackIcons.map((techStackIcon) => (
            <div
              key={techStackIcon.name}
              className="tech-card group relative xl:rounded-full rounded-2xl overflow-hidden aspect-[3/5] transition-all duration-500 hover:scale-105"
            >
              {/* Premium Glass Effect Container */}
              <div className="absolute inset-0 bg-black-200/30 backdrop-blur-xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] group-hover:border-blue-400/30 transition-colors duration-500">
                {/* Liquid Fill Effect */}
                <div className="absolute bottom-0 left-0 w-full h-0 bg-gradient-to-t from-blue-600/40 to-blue-400/10 group-hover:h-full transition-all duration-700 ease-in-out" />

                {/* Inner Glow Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300" />

                {/* Floating Glow Orb behind model */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/0 rounded-full blur-[50px] group-hover:bg-blue-400/20 transition-all duration-700 delay-100" />
              </div>

              <div className="tech-card-content h-full flex flex-col justify-between py-10 relative z-10">
                <div className="tech-icon-wrapper flex-1 flex justify-center items-center">
                  <TechIconCardExperience model={techStackIcon} />
                </div>

                <div className="padding-x w-full text-center relative">
                  <div className="inline-block px-4 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md">
                    <p className="text-white font-medium tracking-wide text-sm uppercase group-hover:text-blue-300 transition-colors">{techStackIcon.name}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* This is for the img part */}
          {/* {techStackImgs.map((techStackIcon, index) => (
            <div
              key={index}
              className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg"
            >
              <div className="tech-card-animated-bg" />
              <div className="tech-card-content">
                <div className="tech-icon-wrapper">
                  <img src={techStackIcon.imgPath} alt="" />
                </div>
                <div className="padding-x w-full">
                  <p>{techStackIcon.name}</p>
                </div>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default TechStack;
