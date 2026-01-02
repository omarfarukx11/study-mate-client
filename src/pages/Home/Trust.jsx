import { motion } from 'framer-motion';

const Trust = () => {
  const logos = ["MIT", "Stanford", "Harvard", "Oxford", "CalTech", "IIT"];

  return (
    <div className="py-10 bg-base-200/50 border-y border-base-300 overflow-hidden">
      <p className="text-center text-xs font-bold uppercase tracking-widest text-neutral/40 mb-6">
        Trusted by students from top institutions
      </p>
      <motion.div 
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap gap-20 w-max"
      >
        {/* Render twice for seamless loop */}
        {[...logos, ...logos].map((logo, i) => (
          <span key={i} className="text-2xl md:text-4xl font-black text-neutral/20 hover:text-primary transition-colors cursor-default">
            {logo} UNIVERSITY
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Trust;