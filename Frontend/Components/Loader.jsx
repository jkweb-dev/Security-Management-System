const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-purple-900 to-indigo-900 text-white relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-[250px] sm:w-[350px] md:w-[500px] h-[250px] sm:h-[350px] md:h-[500px] bg-purple-500/20 blur-3xl rounded-full top-[-100px] left-[-100px]"></div>
      <div className="absolute w-[250px] sm:w-[350px] md:w-[500px] h-[250px] sm:h-[350px] md:h-[500px] bg-blue-500/20 blur-3xl rounded-full bottom-[-100px] right-[-100px]"></div>

      {/* Loader Content */}
      <div className="relative flex flex-col items-center justify-center">

        {/* Spinning Ring */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32">

          <div className="absolute inset-0 rounded-full border-4 border-white/10"></div>

          <div className="absolute inset-0 rounded-full border-4 border-t-blue-400 border-r-purple-400 border-b-transparent border-l-transparent animate-spin"></div>

          <div className="absolute inset-3 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center animate-pulse">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"></div>
          </div>

        </div>

        {/* Text */}
        <h2 className="mt-6 text-lg sm:text-xl md:text-2xl font-semibold tracking-wide text-white/80 animate-pulse">
          Loading Dashboard...
        </h2>

        <p className="text-xs sm:text-sm md:text-base text-gray-400 mt-2 text-center max-w-xs">
          Preparing secure environment for your data
        </p>

      </div>
    </div>
  );
};

export default Loader;