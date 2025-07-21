function Btn({ label, sec, className = " " }) {
  const baseStyles =
    "inline-block py-3 px-6 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-lg";
  const secondary = sec
    ? "bg-transparent hover:bg-gray-50 text-purple-600   border-2 border-purple-600"
    : "  bg-purple-600 hover:bg-purple-700 text-white    ";

  return (
    <button className={`${baseStyles}  ${secondary} ${className}`}>
      {label}
    </button>
  );
}

export default Btn;

export function AnimatedButton({ label }) {
  return (
    <motion.button
      className="relative overflow-hidden px-6 py-3 rounded-lg font-semibold text-white bg-primary"
      whileHover="hover"
    >
      <motion.span
        className="absolute left-0 top-0 h-full w-0 bg-purple-700 "
        variants={{
          hover: {
            width: "100%",
            transition: { duration: 0.5, ease: "easeInOut" },
          },
        }}
        initial={{ width: "0%" }}
      />
      <span className="relative z-10">{`${label}`}</span>
    </motion.button>
  );
}
