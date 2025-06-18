const SecurityLevelBar = ({ level = "low" }) => {
  // Set color and active segments based on level
  const levelMap = {
    low: {
      label: "Low",
      color: "red",
      activeCount: 1,
      class: "text-red-500",
      bg: "bg-red-600",
      shadow: "shadow-red-400",
    },
    medium: {
      label: "Medium",
      color: "yellow",
      activeCount: 2,
      class: "text-yellow-400",
      bg: "bg-yellow-500",
      shadow: "shadow-yellow-300",
    },
    high: {
      label: "High",
      color: "green",
      activeCount: 3,
      class: "text-green-500",
      bg: "bg-green-600",
      shadow: "shadow-green-400",
    },
  };

  const current = levelMap[level] || levelMap.low;

  return (
    <div>
      <p className='text-sm text-white font-semibold'>
        2FA Security Level{" "}
        <span className={`${current.class} font-semibold ml-1`}>
          {current.label}
        </span>
      </p>

      <div className='relative flex h-[12px] lg:h-[18px] w-full lg:w-[500px] rounded-full overflow-hidden mt-2 gap-2'>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`relative flex-1 rounded-full ${
              i < current.activeCount ?
                `${current.bg} z-10 shadow-2xl ${current.shadow}`
              : "bg-zinc-800"
            }`}
          >
            {i === current.activeCount - 1 && i !== 2 ?
              <div
                className={`absolute right-0 top-0 h-full w-3 skew-x-[-30deg] ${current.bg}`}
              ></div>
            : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityLevelBar;
