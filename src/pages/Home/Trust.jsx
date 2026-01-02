import { motion } from 'framer-motion';

const Trust = () => {
  const logos = ["MIT", "Stanford", "Harvard", "Oxford", "CalTech", "IIT"];

  return (
    <div className="bg-base-200/50 border-y border-base-300 overflow-hidden py-30 ">
      <p className="text-center text-3xl text-gray-600 font-bold pb-4  ">
        Trusted by students from top institutions
      </p>
      <motion.div 
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap gap-20 w-max "
      >
        {/* Render twice for seamless loop */}
        {[...logos, ...logos].map((logo, i) => (
          <span key={i} className="text-2xl md:text-6xl font-black text-neutral/20 hover:text-primary transition-colors cursor-default pb-10">
            {logo} UNIVERSITY
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Trust;