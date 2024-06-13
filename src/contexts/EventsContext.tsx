import { createContext, useReducer, useCallback, FC, ReactNode } from 'react';
import useEventListener from '../hooks/useEventListener';
export interface EventsContext {
  doLogout: boolean;
}

export const EventsContext = createContext<EventsContext>({
  doLogout: false,
});

interface EventsProviderProps {
  children: ReactNode;
}

interface State {
  doLogout: boolean;
}

const initialState: State = {
  doLogout: false,
};

type LogoutEvent = {
  type: 'LOGOUT_EVENT';
};

type Action = LogoutEvent;

const handlers: Record<string, (state: State, action: Action) => State> = {
  LOGOUT_EVENT: (state: State): State => ({
    ...state,
    doLogout: true,
  }),
};

const reducer = (state: State, action: Action): State =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const EventsProvider: FC<EventsProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleLogoutEvent = useCallback(() => {
    dispatch({ type: 'LOGOUT_EVENT' });
  }, []);
  useEventListener('LOGOUT_EVENT', handleLogoutEvent);
  return (
    <EventsContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
