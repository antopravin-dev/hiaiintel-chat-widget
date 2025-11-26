import React from "react";
import { motion } from "framer-motion";

interface SuggestionChipsProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
}

const SuggestionChips: React.FC<SuggestionChipsProps> = ({
  suggestions,
  onSuggestionClick,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const chipVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-3"
    >
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <motion.button
            key={index}
            variants={chipVariants}
            type="button"
            onClick={() => onSuggestionClick(suggestion)}
            className="
              inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm
              border border-neutral-700/60 bg-neutral-900/70
              hover:bg-neutral-800 hover:border-neutral-500
              text-neutral-100
              cursor-pointer select-none
              transition-transform transition-colors duration-150
              focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-neutral-500 focus:ring-offset-neutral-900
            "
          >
            {suggestion}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default SuggestionChips;
