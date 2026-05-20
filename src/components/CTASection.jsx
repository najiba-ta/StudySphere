import React from 'react';

const CTASection = () => {
    return (
        <div>
           <section>
  <div className="relative overflow-hidden bg-[#3C0906] px-6 md:px-10 py-10 md:py-12">

    <div className="absolute -top-16 right-0 w-52 h-52 bg-[#BC5F41]/20 blur-3xl rounded-full"></div>
    <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#E4C08A]/10 blur-3xl rounded-full"></div>

    <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
      
      <div className="max-w-xl">
        <p className="text-[#E4C08A] text-xs tracking-[4px] uppercase mb-3">
          StudySphere
        </p>

        <h2 className="text-2xl md:text-3xl font-semibold text-white leading-snug mb-4">
          Quiet spaces built for <br />
          productive study sessions.
        </h2>

        <p className="text-sm text-[#E4E4E6]/80 leading-7 max-w-md">
          Book modern and distraction-free study rooms designed
          to help you stay focused, organized, and comfortable.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button className="bg-[#E4C08A] hover:scale-[1.03] transition-all duration-300 text-[#3C0906] text-sm font-medium px-5 py-2.5 rounded-full">
          Explore Rooms
        </button>

        <button className="border border-white/15 hover:bg-white/10 transition-all duration-300 text-white text-sm font-medium px-5 py-2.5 rounded-full">
          Add Room
        </button>
      </div>
    </div>
  </div>
</section> 
        </div>
    );
};

export default CTASection;