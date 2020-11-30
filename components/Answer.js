const Answer = ({ choices, selected, answer }) => {
  const isMatch = () => {
    return selected === answer && selected;
  };

  return (
    <div className="flex items-center justify-center">
      <div className="choice">
        {isMatch() === 1 && (
          <img
            alt="Selected"
            src="/images/circle-green.png"
            className="animate__animated animate__faster animate__fadeIn"
          />
        )}
        {!isMatch() && (
          <img
            alt="Selected"
            src={
              selected === 1
                ? "/images/circle-blue.png"
                : "/images/circle-red.png"
            }
            className="animate__animated animate__faster animate__fadeIn"
          />
        )}
        <div className="w-full px-6 text-center selected">{choices[0]}</div>
      </div>

      <div className="w-0.5 h-6 rounded bg-gray-200" />

      <div className="choice">
        {isMatch() === 2 && (
          <img
            alt="Selected"
            src="/images/circle-green.png"
            className="animate__animated animate__faster animate__fadeIn"
          />
        )}
        {!isMatch() && (
          <img
            alt="Selected"
            src={
              selected === 2
                ? "/images/circle-blue.png"
                : "/images/circle-red.png"
            }
            className="animate__animated animate__faster animate__fadeIn"
          />
        )}
        <div className="w-full px-6 text-center">{choices[1]}</div>
      </div>
    </div>
  );
};

export default Answer;
