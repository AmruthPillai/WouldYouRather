const Question = ({ type, choices, handleSelect, selected }) => (
  <div className="flex items-center justify-center">
    <div className="choice" onClick={() => handleSelect(1)}>
      {selected === 1 && (
        <img
          alt="Selected"
          src={
            type === "host"
              ? "/images/circle-red.png"
              : "/images/circle-blue.png"
          }
          className="animate__animated animate__faster animate__fadeIn"
        />
      )}
      <div className="w-full px-6 text-center selected">{choices[0]}</div>
    </div>

    <div className="w-0.5 h-6 rounded bg-gray-200" />

    <div className="choice" onClick={() => handleSelect(2)}>
      {selected === 2 && (
        <img
          alt="Selected"
          src={
            type === "host"
              ? "/images/circle-red.png"
              : "/images/circle-blue.png"
          }
          className="animate__animated animate__faster animate__fadeIn"
        />
      )}
      <div className="w-full px-6 text-center">{choices[1]}</div>
    </div>
  </div>
);

export default Question;
