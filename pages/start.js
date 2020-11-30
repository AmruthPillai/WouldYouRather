import { useCallback, useContext, useEffect } from "react";
import { nanoid } from 'nanoid';
import isEmpty from "lodash/isEmpty";
import { useRouter } from "next/router";
import { AppContext } from "../contexts/AppContext";
import Question from "../components/Question";
import firebase from '../services/firebase';

const StartGame = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    if (isEmpty(state.current)) {
      router.push("/");
    }
  }, [state.current, router]);

  const isDisabled = useCallback(() => {
    if (
      state.current.length === state.current.filter((q) => q.selected).length
    ) {
      return false;
    }

    return true;
  }, [state.current]);

  const handleSelect = (id, choice) => {
    dispatch({
      type: "select_choice",
      payload: { id, choice },
    });
  };

  const handleCreate = async () => {
    if (isDisabled()) {
      return;
    }

    const gameId = nanoid(10),
      questions = state.current.map((q) => q.id).join(','),
      answers = state.current.map((q) => q.selected).join(',');

    await firebase.ref(`/games/${gameId}`).set({
      id: gameId,
      questions,
      answers
    });

    router.push({
      pathname: '/share',
      query: {id: gameId}
    });
  };

  return (
    <div className="h-screen flex flex-col items-center justify-between py-2 pb-6">
      <img className="w-32 h-32" src="/logo/light.png" alt="Would You Rather" />

      <div className="w-full mt-2 overflow-y-scroll">
        {state.current.map(({ id, choice1, choice2, selected = 0 }) => (
          <Question
            key={id}
            type='host'
            selected={selected}
            choices={[choice1, choice2]}
            handleSelect={(choice) => handleSelect(id, choice)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={handleCreate}
        disabled={isDisabled()}
        className={`btn btn-red mt-4 w-3/4 ${isDisabled() && "btn-disabled"}`}
      >
        lock in your choices
      </button>
    </div>
  );
};

export default StartGame;
