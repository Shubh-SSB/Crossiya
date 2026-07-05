"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";


const Motion = motion;
type MoveDirection = "left" | "right";

const pizza = [
  {
    name: "Pepperoni",
    img: "/images/pizza1.png",
    leftImg: "/images/pizza1-1.png",
    rightImg: "/images/pizza1-2.png",
    leftStyle: { width: "580px", height: "550px", top: "-30px", left: "-120px", rotate: -15 },
    rightStyle: { width: "580px", height: "550px", top: "-30px", right: "-100px", rotate: 12 },
    title: "Classic Pepperoni Pizza",
    description: "A timeless favorite with crispy pepperoni,  mozzarella, and a rich tomato base. Perfectly baked with a hint of spice and irresistible flavor in every slice.",
    background: "radial-gradient(circle at center, #00000 0%, #00000 20%, #000000 100%)"

  },

  {
    name: "Spinach",
    img: "/images/pizza2.png",
    leftImg: "/images/pizza2-1.png",
    rightImg: "/images/pizza2-2.png",
    title: "Savory Spinach Pizza",
    leftStyle: { width: "680px", height: "490px", top: "10px", left: "-190px", rotate: -15 },
    rightStyle: { width: "680px", height: "580px", top: "-60px", right: "-190px", rotate: -120 },
    description: "Fresh spinach layered over a rich tomato base, topped with creamy mozzarella and herbs for a wholesome, earthy flavor in every bite.",
    background: "radial-gradient(circle at center, #00000 0%, #00000 20%, #000000 100%)"

  },

  {
    name: "Paneer ",
    img: "/images/pizza3.png",
    leftImg: "/images/pizza3-1.png",
    rightImg: "/images/pizza3-2.png",
    title: "Paneer Tikka Pizza",
    leftStyle: { width: "600px", height: "550px", top: "-100px", left: "-100px", rotate: -15 },
    rightStyle: { width: "600px", height: "520px", top: "-100px", right: "-170px", rotate: 12 },
    description: "Smoky marinated paneer cubes baked with onions, peppers, and melted cheese on a spiced tomato base. A bold fusion of Indian flavors and classic  goodness.",
    background: "radial-gradient(circle at center, #00000 0%, #00000 20%, #000000 100%)"

  },

  {
    name: "Margherita",
    img: "/images/pizza4.png",
    leftImg: "/images/pizza4-1.png",
    rightImg: "/images/pizza4-2.png",
    title: "Classic Margherita Pizza",
    leftStyle: { width: "550px", height: "520px", top: "-80px", left: "-120px", rotate: -15 },
    rightStyle: { width: "550px", height: "520px", top: "-70px", right: "-90px", rotate: 12 },
    description: "Fresh mozzarella, vibrant tomato sauce, and aromatic basil on a perfectly baked crust. A timeless classic that captures the essence of Italian pizza.",
    background: "radial-gradient(circle at center, #00000 0%, #00000 20%, #000000 100%)"

  }

  ,
  {
    name: "Veggie ",
    img: "/images/pizza5.png",
    leftImg: "/images/pizza5-1.png",
    rightImg: "/images/pizza5-2.png",
    title: "Veggie Delight Pizza",
    leftStyle: { width: "590px", height: "500px", top: "-20px", left: "-120px", rotate: -15 },
    rightStyle: { width: "590px", height: "500px", top: "-20px", right: "-170px", rotate: 12 },
    description: "A colorful medley of fresh vegetables layered over a rich tomato base, topped with melted cheese and  herbs. A wholesome, flavorful bite in every slice.",
    background: "radial-gradient(circle at center, #00000 0%, #00000 20%, #000000 100%)"

  }
  ,

  {
    name: "BBQ Chicken",
    img: "/images/pizza6.png",
    leftImg: "/images/pizza6-1.png",
    rightImg: "/images/pizza6-2.png",
    title: "Smoky BBQ Chicken Pizza",
    leftStyle: { width: "500px", height: "450px", top: "20px", left: "-80px", rotate: -30 },
    rightStyle: { width: "500px", height: "450px", top: "-20px", right: "-80px", rotate: 12 },
    description: "Tender BBQ chicken pieces with caramelized onions, melted cheese, and smoky sauce on a perfectly baked crust. A bold, savory pizza with a rich, flavorful bite.",
    background: "radial-gradient(circle at center, #00000 0%, #00000 20%, #000000 100%)"

  }
  ,
  {
    name: "Pineapple",
    img: "/images/pizza7.png",
    leftImg: "/images/pizza7-1.png",
    rightImg: "/images/pizza7-2.png",
    title: "Hawaiian Pineapple Pizza",
    leftStyle: { width: "500px", height: "450px", top: "20px", left: "-80px", rotate: -30 },
    rightStyle: { width: "500px", height: "450px", top: "-20px", right: "-80px", rotate: 12 },
    description: "Sweet pineapple chunks paired with savory ham, melted cheese, and a rich tomato base. A tropical twist that balances sweetness and flavor in every bite.",
    background: "radial-gradient(circle at center, #00000 0%, #00000 20%, #000000 100%)"

  }
  ,
];

const STEPS = pizza.length;
const RADIUS = 500;



const Pizza = () => {
  const stepRad = Math.PI / STEPS;

  const [stepIndex, setStepIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const offset = 60 / RADIUS;
  const startAngle = Math.PI + offset;
  const angle = startAngle + stepIndex * stepRad;

  const move = useCallback((dir: MoveDirection) => {
    const dirSign = dir === "right" ? 1 : -1;
    setDirection(dirSign);
    setStepIndex(prev => (prev + dirSign + STEPS) % STEPS);
    setRotation(prev => prev + (dirSign * 90));
    setActiveIndex(prev => (prev + dirSign + pizza.length) % pizza.length);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        move("left");
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        move("right");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [move]);

  return (
    <div
      className="hero font-poppins mx-6 my-10 rounded-lg overflow-hidden relative"
    >
      <div className="absolute top-12 left-0 right-0 z-20 text-center px-4 pointer-events-none">
        {/* <span className="skeu-pill inline-flex px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] mb-4">
            Wood-fired
        </span> */}
        <h2 className="text-4xl md:text-5xl font-poppins text-[#F2EAD3]">
          Our exotic range of <span className="text-primary font-handwriting text-5xl md:text-7xl inline-block ml-2">pizzas.</span>
        </h2>
      </div>

      <Motion.div
        className="hero-bg"
        animate={{ background: pizza[activeIndex].background }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      <Motion.img
        key={pizza[activeIndex].leftImg}
        src={pizza[activeIndex].leftImg}
        alt=""
        className="left-side"
        style={{
          position: "absolute",
          left: pizza[activeIndex].leftStyle.left,
          width: pizza[activeIndex].leftStyle.width,
          height: pizza[activeIndex].leftStyle.height,
          rotate: pizza[activeIndex].leftStyle.rotate,
        }}
        initial={{ top: "-400px", opacity: 0 }}
        animate={{ top: pizza[activeIndex].leftStyle.top, opacity: 0.5 }}
        exit={{ top: "-200px", opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      <Motion.img
        key={pizza[activeIndex].rightImg}
        src={pizza[activeIndex].rightImg}
        alt=""
        className="right-side"
        style={{
          position: "absolute",
          right: pizza[activeIndex].rightStyle.right,
          width: pizza[activeIndex].rightStyle.width,
          height: pizza[activeIndex].rightStyle.height,
          rotate: pizza[activeIndex].rightStyle.rotate,
        }}
        initial={{ top: "-200px", opacity: 0 }}
        animate={{ top: pizza[activeIndex].rightStyle.top, opacity: 0.5 }}
        exit={{ top: "-200px", opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      />




      <div className="hero-content">
        <div className="relative -top-[70px] z-10 px-4">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <Motion.div
              key={pizza[activeIndex].title}
              custom={direction}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            >
              <Motion.p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d7a27d] my-5">
                Use arrow keys or swipe to interact
              </Motion.p>
              <Motion.p className="font-poppins text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8 text-[#f7efe8]/80">
                {pizza[activeIndex].description}
              </Motion.p>
              <Motion.h1 className="text-4xl md:text-5xl lg:text-[4.5rem] text-[#F2EAD3] drop-shadow-lg mb-14">
                {pizza[activeIndex].title}
              </Motion.h1>
            </Motion.div>
          </AnimatePresence>
        </div>

        <div className="circular-slider">
          <div className="circle outer-circle">
            <div className="circle inner-circle">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <Motion.div
                  key={pizza[activeIndex].img}
                  className="center-image"
                  custom={direction}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <img
                    src={pizza[activeIndex].img}
                    alt={pizza[activeIndex].name}
                  />
                </Motion.div>
              </AnimatePresence>
            </div>

            <div
              className="moving-ball"
              style={{
                transform: `rotate(${(angle * 180) / Math.PI}deg) translate(${RADIUS - 10}px)`
              }}
            />
          </div>

          <div className="circle-text">
            <svg viewBox="0 0 1100 1200" width="100%" height="100%">
              <defs>
                <path
                  id="circlePath"
                  d="M600,600 m-550,0 a500,500 0 1,1 1000,0 a500,500 0 1,1 -1000,0"
                />
              </defs>
              <text fill="white" fontSize="20" letterSpacing="8">
                <textPath href="#circlePath" startOffset="50%">
                  {pizza.map((pizz) => ` • ${pizz.name.toUpperCase()} `).join("")}
                </textPath>
              </text>
            </svg>
          </div>

          <button className="arrow left" onClick={() => move('left')}>←</button>
          <button className="arrow right" onClick={() => move('right')} >→</button>

        </div>

        {/* <div className="feature-strip" aria-label="Pizza highlights">
          <div className="feature-card">
            <div className="feature-icon">❦</div>
            <div>
              <h3>Fresh Ingredients</h3>
              <p>Only the finest & freshest ingredients.</p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔥</div>
            <div>
              <h3>Wood Fired</h3>
              <p>Authentic wood fired for that perfect flavor.</p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🧀</div>
            <div>
              <h3>Melted to Perfection</h3>
              <p>Oven baked with 100% real cheese.</p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">♡</div>
            <div>
              <h3>Made With Love</h3>
              <p>Every pizza is crafted with passion.</p>
            </div>
          </div>
        </div> */}
      </div>

    </div>
  );
};

export default Pizza;
