import { createContext, useEffect, useReducer } from 'react';

import firebase from '../services/firebase';

const defaultState = {
  theme: 'light',
  questions: {},
  current: [],
  results: [],
};

const AppContext = createContext(defaultState);

const AppProvider = ({ children }) => {
  const reducer = (state = defaultState, { type, payload }) => {
    const newState = { ...state };

    switch (type) {
      case 'start_game':
        newState.results = []
        newState.current = payload.map((q) => {
          delete q.selected
          return q
        });
        return newState;

      case 'end_game':
        newState.results = payload;
        return newState;

      case 'select_choice':
        newState.current = newState.current.reduce((acc, q) => {
          if (q.id === payload.id) {
            q.selected = payload.choice;
          }

          acc.push(q);
          return acc;
        }, []);
        return newState;

      case 'load_questions':
        newState.questions = payload;
        return newState;

      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, defaultState);

  useEffect(() => {
    firebase.ref('/questions').once('value', (snapshot) => {
      dispatch({
        type: 'load_questions',
        payload: snapshot.val(),
      });
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
