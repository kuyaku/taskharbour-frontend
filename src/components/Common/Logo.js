const Logo = ({ color }) => {
  return (
    <div className="flex gap-3 items-center">
      <div className="flex flex-col gap-[2px] justify-center">
        <div className="bg-blue-800  h-[6px] w-6"></div>
        <div className="flex gap-2">
          <div className="bg-orange-500 h-2 w-2"></div>
          <div className="bg-orange-500 h-2 w-2"></div>
        </div>
        <div className="bg-blue-800  h-[6px] w-6"></div>
      </div>
      <h3
        className={
          "leading-none text-[20px] whitespace-nowrap md:text-[25px] font-extrabold drop-shadow-2xl " +
          color
        }
      >
        TASK HARBOUR
      </h3>
    </div>
  );
};

export default Logo;
