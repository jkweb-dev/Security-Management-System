import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard")
    } else {
      navigate("/login")
    }


  }


  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-purple-900 to-indigo-900 text-white">

      {/* Glow Effects */}
      <div className="absolute w-[350px] md:w-[500px] h-[350px] md:h-[500px] bg-blue-500/20 blur-3xl rounded-full top-[-120px] left-[-120px]"></div>
      <div className="absolute w-[350px] md:w-[500px] h-[350px] md:h-[500px] bg-purple-500/20 blur-3xl rounded-full bottom-[-120px] right-[-120px]"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
          Security Management <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Made Effortless
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed">
          Effortlessly manage your security workforce with a modern system built for real operations. 
          Track attendance, assign locations, and monitor activities — all in one powerful platform.
        </p>

     <div className="
  mt-10 
  grid grid-cols-2 sm:flex sm:flex-wrap 
  justify-center gap-4 sm:gap-5
  text-sm sm:text-base md:text-lg
">

  {/* Attendance */}
  <span className="
    px-4 py-2.5 sm:px-5 sm:py-2.5
    border border-white/20 rounded-full 
    bg-white/5 backdrop-blur-md
    text-center

    shadow-md
    transition duration-300

    hover:scale-110
    hover:border-white
    hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]
  ">
    Attendance Tracking
  </span>

  {/* Location */}
  <span className="
    px-4 py-2.5 sm:px-5 sm:py-2.5
    border border-white/20 rounded-full 
    bg-white/5 backdrop-blur-md
    text-center

    shadow-md
    transition duration-300

    hover:scale-110
    hover:border-white
    hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]
  ">
    Location Assignment
  </span>

  {/* Guards */}
  <span className="
    px-4 py-2.5 sm:px-5 sm:py-2.5
    border border-white/20 rounded-full 
    bg-white/5 backdrop-blur-md
    text-center

    shadow-md
    transition duration-300

    hover:scale-110
    hover:border-white
    hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]
  ">
    Guard Management
  </span>

  {/* Reports */}
  <span className="
    px-4 py-2.5 sm:px-5 sm:py-2.5
    border border-white/20 rounded-full 
    bg-white/5 backdrop-blur-md
    text-center

    shadow-md
    transition duration-300

    hover:scale-110
    hover:border-white
    hover:shadow-[0_0_20px_rgba(251,191,36,0.5)]
  ">
    Reports & Analytics
  </span>

</div>

        {/* Button */}
        <div className="mt-12">
          <button
            onClick={handleGetStarted}
            className="
              relative 
              px-8 py-4 
              sm:px-10 sm:py-4 
              md:px-12 md:py-5 
              lg:px-16 lg:py-6 

              text-base sm:text-lg md:text-xl lg:text-2xl 
              font-semibold text-white 

              rounded-2xl md:rounded-3xl

              border border-white/30 
              bg-white/5 backdrop-blur-lg

              overflow-hidden
              transition duration-300

              hover:bg-white/10 hover:border-white
              hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]
              hover:scale-105
            "
          >
            <span className="relative z-10">Get Started</span>

            {/* Shine Effect */}
            <span className="
              absolute inset-0 
              bg-gradient-to-r from-transparent via-white/20 to-transparent 
              opacity-0 hover:opacity-100 
              transition duration-500
            "></span>
          </button>
        </div>

      </div>
    </div>
  );
};

