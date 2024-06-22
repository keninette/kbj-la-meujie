import { Session } from '@/model/session/session.class';
import { SessionsReducer } from '@/lib/store/sessions/sessions.selector';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SessionsState {
  sessions: Session[];
}

const initialState: SessionsReducer = { sessions: [], sessionInPlay: undefined };

export const sessionsSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {
    setSessions: (state, action: PayloadAction<Array<Session>>) => {
      state.sessions = [];
      state.sessions.push(...action.payload);
    },
    setSessionInPlay: (state, action: PayloadAction<Session>) => {
      state.sessionInPlay = action.payload;
    },
  },
});

export const { setSessions, setSessionInPlay } = sessionsSlice.actions;
export default sessionsSlice.reducer;
