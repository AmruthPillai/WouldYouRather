import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useState } from "react";
import Question from "../../components/Question";
import { AppContext } from "../../contexts/AppContext";
import firebase from "../../services/firebase";

const Share = () => {
  const router = useRouter();
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(AppContext);

  const { id } = router.query;

  useEffect(async () => {
    setLoading(true);

    if (id && !isEmpty(state.questions)) {
      const snapshot = (await firebase.ref(`/games/${id}`).get()).val();
      const questions = snapshot.questions.split(",").reduce((acc, id) => {
        acc.push(state.questions[id]);
        return acc;
      }, []);
      const answers = questions.map((q, index) => ({
        id: q.id,
        answer: +snapshot.answers.split(",")[index],
      }));

      setAnswers(answers);
      dispatch({
        type: "start_game",
        payload: questions,
      });

      setLoading(false);
    }
  }, [id, state.questions]);

  const handleSelect = (id, choice) => {
    dispatch({
      type: "select_choice",
      payload: { id, choice },
    });
  };

  const handleCheck = () => {
    if (isDisabled()) {
      return;
    }

    const results = state.current.map((q) => {
      const { answer } = answers.find((a) => a.id === q.id);
      q.answer = answer;
      return q;
    });

    dispatch({
      type: "end_game",
      payload: results,
    });

    router.push('/end');
  };

  const isDisabled = useCallback(() => {
    if (
      state.current.length === state.current.filter((q) => q.selected).length &&
      !isEmpty(state.questions) &&
      state.questions.length >= 5
    ) {
      return false;
    }

    return true;
  }, [state.current]);

  return (
    <div className="h-screen flex flex-col items-center justify-between py-2 pb-6">
      <img className="w-32 h-32" src="/logo/light.png" alt="Would You Rather" />

      <div className="w-full mt-2 overflow-y-scroll">
        {state.current.map(({ id, choice1, choice2, selected = 0 }) => (
          <Question
            key={id}
            type="player"
            selected={selected}
            choices={[choice1, choice2]}
            handleSelect={(choice) => handleSelect(id, choice)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={handleCheck}
        disabled={isDisabled()}
        className={`btn btn-blue mt-4 w-3/4 ${isDisabled() && "btn-disabled"}`}
      >
        {loading ? "loading..." : "check results"}
      </button>
    </div>
  );
};

export default Share;
