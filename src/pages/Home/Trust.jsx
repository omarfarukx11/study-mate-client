import { motion } from 'framer-motion';

const Trust = () => {
  const logos = ["MIT", "Stanford", "Harvard", "Oxford", "CalTech", "IIT"];

  return (
    <div className="bg-base-100 border-y border-base-300 overflow-hidden rounded-xl my-30 ">
      <p className="text-center text-3xl text-neutral-content font-bold py-4  ">
        Trusted by students from top institutions
      </p>
      <motion.div 
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap gap-20 w-max "
      >
        {[...logos, ...logos].map((logo, i) => (
          <span key={i} className="text-2xl md:text-6xl font-black text-neutral hover:text-primary transition-colors cursor-default pb-10">
            {logo} UNIVERSITY
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Trust;