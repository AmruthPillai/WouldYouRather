import { isEmpty } from "lodash";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Answer from "../components/Answer";
import { AppContext } from "../contexts/AppContext";

const EndGame = () => {
  const router = useRouter();
  const { state } = useContext(AppContext);
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    if (isEmpty(state.results)) {
      router.push("/");
    }
  }, [state.results, router]);

  const handleStart = () => {
    router.push("/");
  };

  const handleShare = () => {
    setSharing(true);

    setTimeout(async () => {
      const canvas = await html2canvas(document.body);
      const timestamp = new Date().getTime();

      canvas.toBlob((blob) => {
        saveAs(blob, `WouldYouRather-${timestamp}.jpg`);

        setSharing(false);
      });
    }, 250);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-between py-2 pb-6">
      <img className="w-32 h-32" src="/logo/light.png" alt="Would You Rather" />

      {!sharing && (
        <div className="w-full mt-2 overflow-y-scroll">
          {state.results.map(({ id, choice1, choice2, selected, answer }) => (
            <Answer
              key={id}
              choices={[choice1, choice2]}
              selected={selected}
              answer={answer}
            />
          ))}
        </div>
      )}

      {sharing &&
        state.results.map(({ id, choice1, choice2, selected, answer }) => (
          <Answer
            key={id}
            choices={[choice1, choice2]}
            selected={selected}
            answer={answer}
          />
        ))}

      {!sharing && (
        <div className="flex items-center justify-center">
          <button
            type="button"
            className="btn btn-red mr-2"
            onClick={handleStart}
          >
            start new game
          </button>

          <button
            type="button"
            className="btn btn-blue ml-2"
            onClick={handleShare}
          >
            share results
          </button>
        </div>
      )}

      {sharing && (
        <p className="text-xs font-bold text-wyr-red opacity-60">
          wouldyourather.app
        </p>
      )}
    </div>
  );
};

export default EndGame;
