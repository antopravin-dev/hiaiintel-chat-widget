import { motion } from 'framer-motion';

const TypingIndicator = () => {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="flex justify-start">
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="bg-neutral-100 dark:bg-neutral-900 rounded-2xl rounded-bl-sm px-5 py-4 flex items-center gap-1.5 border border-neutral-200 dark:border-neutral-800"
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.2,
              repeatDelay: 0.2,
            }}
            className="w-2 h-2 bg-brand-cyan-500 dark:bg-brand-cyan-400 rounded-full"
          />
        ))}
      </motion.div>
    </div>
  );
};

export default TypingIndicator;
