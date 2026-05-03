const ErrorScreen = ({ error }) => {
  if (!error) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-red-950 to-purple-950 text-white relative overflow-hidden">

      {/* Glow Effects */}
      <div className="absolute w-[250px] sm:w-[350px] md:w-[500px] h-[250px] sm:h-[350px] md:h-[500px] bg-red-500/20 blur-3xl rounded-full top-[-120px] left-[-120px]"></div>
      <div className="absolute w-[250px] sm:w-[350px] md:w-[500px] h-[250px] sm:h-[350px] md:h-[500px] bg-purple-500/20 blur-3xl rounded-full bottom-[-120px] right-[-120px]"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-lg px-6">

        <div className="backdrop-blur-xl bg-white/5 border border-white/20 shadow-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-center">

          {/* Icon */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-500/10 border border-red-400 flex items-center justify-center animate-pulse">
              <span className="text-2xl sm:text-3xl">⚠️</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-300">
         {error}
          </h1>

          {/* Message */}
          <p className="mt-3 text-sm sm:text-base md:text-lg text-gray-300">
            {error || "Unexpected error occurred. Please try again later."}
          </p>

        </div>
      </div>
    </div>
  );
};

export default ErrorScreen;