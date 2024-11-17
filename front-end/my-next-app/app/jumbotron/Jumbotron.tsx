import React from 'react';

const Jumbotron = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto pl-8">
        <div className="text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 mt-15 font-serif">
          Reinventing Banking for a Smarter Future
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl">
            Get started with our comprehensive onboarding process or login to access your account.
          </p>
          <div className="flex gap-4">
            <a
              href="/onboarding"
              className="bg-transparent border-2 border-black text-black px-8 py-3 rounded-lg hover:bg-black hover:text-white transition-colors"
            >
              Start Onboarding
            </a>
            <a
              href="/login"
              className="bg-transparent border-2 border-black text-black px-8 py-3 rounded-lg hover:bg-black hover:text-white transition-colors"
            >
              Login
            </a>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Jumbotron;
