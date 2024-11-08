import { Session } from '@/model/session/session.class';

export interface SessionsReducer {
  sessions: Session[];
  sessionInPlay?: Session;
}

interface ReducerState {
  sessionsState: SessionsReducer;
}

export const sessionsSelector = (state: ReducerState) => {
  return state?.sessionsState?.sessions;
};

export const sessionInPlaySelector = (state: ReducerState) => {
  return state?.sessionsState?.sessionInPlay;
};
