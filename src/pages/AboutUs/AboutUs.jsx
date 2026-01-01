import React from 'react';
import { IoRocketOutline, IoPeopleOutline, IoLibraryOutline, IoCheckmarkCircleOutline } from "react-icons/io5";

const AboutUs = () => {
  return (
    <div className="bg-base-100 py-16 px-4 md:px-8">
      <div className=" w-full lg:px-10 2xl:w-[1536px] mx-auto">
        
        {/* Section 1: Hero Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="order-2 lg:order-1">
            <span className="text-primary font-bold tracking-widest uppercase text-sm">Our Mission</span>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral mt-4 mb-6 leading-tight">
              Empowering Students to <br />
              <span className="text-primary italic">Learn Better, Together.</span>
            </h1>
            <p className="text-neutral/70 text-lg mb-8 leading-relaxed">
              StudyMate was founded on a simple belief: no student should have to struggle alone. 
              We've built a digital ecosystem where curiosity meets collaboration, allowing 
              learners to find their perfect study partner and share knowledge across borders.
            </p>
            
            <div className="space-y-4">
              {[
                "Access to 500+ Subject Experts",
                "Safe and Moderated Study Rooms",
                "Peer-to-Peer Resource Sharing"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <IoCheckmarkCircleOutline className="text-primary text-2xl shrink-0" />
                  <span className="text-neutral font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            {/* Decorative background shape */}
            <div className="absolute -top-4 -right-4 w-72  h-72 bg-primary/10 rounded-full blur-3xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Students studying" 
              className="rounded-2xl shadow-2xl relative z-10 border-b-8 border-primary"
            />
          </div>
        </div>

        {/* Section 2: Stats (The Numbers) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 px-6 bg-secondary rounded-3xl text-secondary-content mb-24">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-1">50K+</div>
            <div className="text-sm opacity-80 uppercase tracking-tighter">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-1">120+</div>
            <div className="text-center uppercase text-sm opacity-80 tracking-tighter">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-1">1M+</div>
            <div className="text-sm opacity-80 uppercase tracking-tighter">Notes Shared</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-1">24/7</div>
            <div className="text-sm opacity-80 uppercase tracking-tighter">Support</div>
          </div>
        </div>

        {/* Section 3: Values Grid */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral">What Drives Us</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="card bg-base-200 p-8 border-t-4 border-primary hover:translate-y-[-5px] transition-transform">
            <IoPeopleOutline className="text-primary text-4xl mb-4" />
            <h3 className="text-xl font-bold text-neutral mb-3">Community First</h3>
            <p className="text-neutral/60 text-sm">
              We prioritize the human connection. Our tools are designed to foster real friendships and academic support systems.
            </p>
          </div>

          {/* Card 2 */}
          <div className="card bg-base-200 p-8 border-t-4 border-primary hover:translate-y-[-5px] transition-transform">
            <IoRocketOutline className="text-primary text-4xl mb-4" />
            <h3 className="text-xl font-bold text-neutral mb-3">Innovation</h3>
            <p className="text-neutral/60 text-sm">
              From smart matching algorithms to collaborative whiteboards, we use technology to make studying more efficient.
            </p>
          </div>

          {/* Card 3 */}
          <div className="card bg-base-200 p-8 border-t-4 border-primary hover:translate-y-[-5px] transition-transform">
            <IoLibraryOutline className="text-primary text-4xl mb-4" />
            <h3 className="text-xl font-bold text-neutral mb-3">Accessibility</h3>
            <p className="text-neutral/60 text-sm">
              Quality education resources should be available to everyone, regardless of their background or location.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;