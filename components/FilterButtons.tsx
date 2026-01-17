"use client";

import { motion } from "framer-motion";

interface FilterButtonsProps {
  categories: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function FilterButtons({
  categories,
  activeFilter,
  onFilterChange,
}: FilterButtonsProps) {
  return (
    <motion.div
      className="flex flex-wrap justify-center gap-2 mb-10"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {categories.map((category, index) => {
        const isAll = category === "All";
        return (
          <motion.button
            key={category}
            onClick={() => onFilterChange(category)}
            className={`
              px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300
              ${
                isAll
                  ? activeFilter === category
                    ? "bg-gray-900 text-white border-2 border-gray-900"
                    : "bg-transparent text-gray-900 border-2 border-gray-900 hover:bg-gray-900 hover:text-white"
                  : activeFilter === category
                  ? "bg-accent text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }
            `}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        );
      })}
    </motion.div>
  );
}
