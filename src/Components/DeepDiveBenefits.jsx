import React from 'react';
import { motion } from 'framer-motion';
import { FaLightbulb, FaHandshake, FaBrain, FaRocket } from 'react-icons/fa';
import { Link } from 'react-router';

const DeepDiveBenefits = () => {
  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="px-4 lg:px-10 pt-20">
      <div className="max-w-[1536px] mx-auto">
        
        {/* --- Header Area --- */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-16 border-l-8 border-primary pl-8"
        >
          <h2 className="text-4xl lg:text-6xl font-black text-neutral mb-6 leading-tight">
            The Neurobiology & Sociology of <br />
            <span className="text-primary">Collaborative Learning</span>
          </h2>
          <p className="text-xl text-neutral/60 max-w-3xl italic">
            "To teach is to learn twice." — Exploring why a study partner is the single greatest variable in academic success.
          </p>
        </motion.div>

        {/* --- Long Form Content Grid --- */}
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Left Column: Detailed Academic Breakdown */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="lg:col-span-8 space-y-12 text-neutral/80 leading-relaxed text-lg text-justify"
          >
            
            <motion.section variants={fadeInUp}>
              <h3 className="text-2xl font-bold text-neutral mb-4 flex items-center gap-3">
                <FaBrain className="text-primary" /> 1. The Protege Effect: Cognitive Reinforcement
              </h3>
              <p>
                The most profound benefit of a study partner is a psychological phenomenon known as the <strong>Protege Effect</strong>. When you prepare to explain a concept to a partner, your brain processes information differently than when you study for yourself. You move from "passive recognition" to "active synthesis." 
              </p>
              <p className="mt-4">
                By externalizing your thoughts, you are forced to identify gaps in your own logic. If you cannot explain the Third Law of Thermodynamics or the intricacies of React's Reconciliation process to your partner, you haven't truly mastered it. A partner acts as a "live mirror" for your intelligence, reflecting back the areas that require more focus.
              </p>
            </motion.section>

            <motion.section variants={fadeInUp}>
              <h3 className="text-2xl font-bold text-neutral mb-4 flex items-center gap-3">
                <FaHandshake className="text-primary" /> 2. Radical Accountability & Procrastination Defense
              </h3>
              <p>
                Procrastination is rarely a time-management problem; it is an emotion-management problem. Isolation breeds demotivation. When you study alone, the "Instant Gratification Monkey" in your brain often takes control. However, the presence of a study partner introduces a "Social Contract."
              </p>
              <p className="mt-4">
                Research shows that individuals are 65% more likely to complete a goal if they have committed to someone else. If you know your StudyMate partner is waiting for you in a Zoom room or a library at 9:00 AM, the friction of starting is drastically reduced. This "External Discipline" eventually transforms into "Internal Habit," building a long-term professional work ethic.
              </p>
            </motion.section>

            <motion.section 
              variants={fadeInUp}
              className="bg-slate-50 dark:bg-zinc-900 p-8 rounded-3xl border-2 border-dashed border-primary/20"
            >
              <h3 className="text-2xl font-bold text-neutral mb-4 flex items-center gap-3">
                <FaLightbulb className="text-primary" /> 3. Diversified Perspective & Heuristic Problem Solving
              </h3>
              <p>
                In solitary study, we are trapped within our own <strong>Cognitive Biases</strong>. We tend to approach problems using the same mental heuristics repeatedly. A study partner brings a different cultural background, a different academic foundation, and a unique way of processing logic.
              </p>
              <p className="mt-4">
                When two minds tackle a complex calculus problem or a literature analysis, they create a "Third Mind" that is greater than the sum of its parts. This is where innovation happens. Peer-to-peer learning allows for real-time "Socratic Dialogue," where questioning leads to deeper investigative thought that a textbook simply cannot provide.
              </p>
            </motion.section>

            <motion.section variants={fadeInUp}>
              <h3 className="text-2xl font-bold text-neutral mb-4 flex items-center gap-3">
                <FaRocket className="text-primary" /> 4. Emotional Resilience in High-Stakes Environments
              </h3>
              <p>
                Academic burnout is a significant crisis in modern education. The weight of competitive exams and high-pressure career paths can lead to isolation-induced anxiety. A study partner provides <strong>Psychological Safety</strong>. Knowing that someone else is struggling with the same difficult module or facing the same exam stress creates a sense of "Shared Humanity."
              </p>
              <p className="mt-4">
                This emotional support system prevents "The Wall"—that moment of exhaustion where a student wants to give up. The encouragement of a peer is often more potent than the advice of a mentor because it comes from a place of equal experience.
              </p>
            </motion.section>
          </motion.div>

          {/* Right Column: Key Stats & Quick Summaries */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="sticky top-32"
            >
              <div className="bg-primary text-white p-8 rounded-4xl shadow-xl mb-8">
                <h4 className="text-2xl font-black mb-4">Quick Fact Check</h4>
                <ul className="space-y-4 text-sm opacity-90">
                  <li className="flex gap-2">
                    <span className="font-bold">80%</span> 
                    <span>Increase in retention rates when teaching a peer.</span>
                  </li>
                  <hr className="border-white/20" />
                  <li className="flex gap-2">
                    <span className="font-bold">2.5x</span> 
                    <span>Faster problem solving in collaborative environments.</span>
                  </li>
                  <hr className="border-white/20" />
                  <li className="flex gap-2">
                    <span className="font-bold">45%</span> 
                    <span>Reduction in reported academic stress levels.</span>
                  </li>
                </ul>
              </div>

              <div className="p-8 border border-base-300 rounded-[2rem] bg-base-200/50">
                <h4 className="text-xl font-bold mb-4 text-neutral">The "Double-Win" Strategy</h4>
                <p className="text-sm text-neutral/60 leading-relaxed">
                  Study partnering isn't just about getting help; it's about giving it. The act of clarifying a concept for your partner solidifies your own neural pathways, making the memory permanent. It is a mutually beneficial ecosystem of growth.
                </p>
                <Link to={'/contract'} className="btn btn-primary btn-block mt-6 rounded-xl">Join the Community</Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* --- Conclusion Area --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          className="mt-20 pt-10 border-t border-base-300 text-center"
        >
          <p className="text-2xl font-medium text-neutral/70 max-w-4xl mx-auto leading-relaxed">
            In conclusion, finding a study partner is not a sign of weakness—it is a strategic move toward <strong>Hyper-Productivity</strong>. By merging minds, we don't just study harder; we study smarter, building the soft skills of communication and leadership that define the modern workforce.
          </p>
        </motion.div>

      </div>
    </div>
  );
};

export default DeepDiveBenefits;