import { useCallback, useContext } from "react";
import { useRouter } from "next/router";
import { AppContext } from "../contexts/AppContext";
import { getRandom } from "../utils";
import { isEmpty } from "lodash";

const Home = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(AppContext);

  const handleStart = () => {
    if (isDisabled()) {
      return;
    }

    const randQuestions = getRandom(Object.values(state.questions), 5);

    dispatch({
      type: "start_game",
      payload: randQuestions,
    });

    router.push("/start");
  };

  const isDisabled = useCallback(() => {
    if (
      !isEmpty(state.questions) &&
      Object.values(state.questions).length >= 5
    ) {
      return false;
    }

    return true;
  }, [state.questions]);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <img className="w-64 h-64" src="/logo/light.png" alt="Would You Rather" />

      <div className="py-8" />

      <button
        type="button"
        onClick={handleStart}
        disabled={isDisabled()}
        className={`btn btn-red w-3/4 ${isDisabled() && "btn-disabled"}`}
      >
        {isDisabled() ? "loading..." : "start new game"}
      </button>

      <button type="button" className="my-6 text-sm btn btn-link">
        how to play
      </button>
    </div>
  );
};

export default Home;
