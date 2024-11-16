const Footer = () => {
  return (
    <footer className="bg-[#16161a] py-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        {/* Logo Text */}
        <h1 className="text-3xl font-bold text-white tracking-wide drop-shadow-lg">
          Phoenix
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 tracking-wide">
            Fi
          </span>
        </h1>

        {/* Navigation Links */}
        <div className="flex gap-8">
          <a
            href="/chat"
            className="text-lg font-medium text-gray-400 hover:text-white transition-all"
          >
            Chat
          </a>
          <a
            href="/solver"
            className="text-lg font-medium text-gray-400 hover:text-white transition-all"
          >
            Solver
          </a>
        </div>

        {/* Copyright Message */}
        <p className="text-lg font-medium text-gray-500">
          © {new Date().getFullYear()} PhoenixFi. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
