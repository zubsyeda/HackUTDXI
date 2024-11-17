import React from 'react';

const Jumbotron = () => {
  return (
    <div className="relative h-screen">
      {/* Video Background */}
      <video 
        autoPlay 
        loop 
        muted 
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/goldman.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content Overlay */}
      <div className="relative z-10 bg-black bg-opacity-50 h-full">
        <div className="container mx-auto pl-8 h-full flex items-center">
          <div className="text-left text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 mt-15 font-serif">
              Reinventing Banking for a Smarter Future
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-2xl">
              Get started with our comprehensive onboarding process or login to access your account.
            </p>
            <div className="flex gap-4">
              <a
                href="/onboarding"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-black transition-colors"
              >
                Start Onboarding
              </a>
              <a
                href="/login"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-black transition-colors"
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
