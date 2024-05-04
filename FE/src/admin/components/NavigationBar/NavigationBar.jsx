import logoBlack from "../../../assets/logoblack.png.webp";
import { motion } from "framer-motion";
import { Store, ShoppingBasket, Users, ArrowRight } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
const navLinks = [
  {
    name: "Users",
    icon: Users,
    link: "user-list",
  },
  {
    name: "Products",
    icon: Store,
    link: "product-list",
  },
  {
    name: "Orders",
    icon: ShoppingBasket,
    link: "order-list",
  },
];
const vartiants = {
  expanded: { width: "20%" },
  nonExpanded: { width: "5%" },
};
export default function NavigationBar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <motion.div
      animate={isExpanded ? "expanded" : "nonExpanded"}
      variants={vartiants}
      className={
        "py-12 flex flex-col border border-r-1  w-1/5 h-screen relative " +
        (isExpanded ? "px-10" : "px-4")
      }
    >
      <div>
        <img
          src={logoBlack}
          style={{ width: `${isExpanded ? "50%" : "100%"}` }}
          alt="logo"
        />
      </div>
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-7 h-7 bg-[#FF8C8C] rounded-full absolute -right-[14px] top-12 flex justify-center items-center text-white"
      >
        <ArrowRight />
      </div>
      <div className="mt-10 flex flex-col space-y-8">
        {navLinks.map((item, index) => (
          <NavLink
            to={`${item.link}`}
            onClick={() => setActiveIndex(index)}
            className={`flex space-x-3 p-2 rounded ${
              activeIndex === index
                ? "bg-[#FF8C8C] text-white font-semibold"
                : ""
            } ${isExpanded ? "" : "flex justify-center items-center"}`}
            key={index}
          >
            {<item.icon />}
            <span className={` ${isExpanded ? "block" : "hidden"}`}>
              {item?.name}
            </span>
          </NavLink>
        ))}
      </div>
    </motion.div>
  );
}
