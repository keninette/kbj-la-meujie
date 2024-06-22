import { Adventure } from '@/model/AdventureManager.class';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdventuresReducer } from '@/lib/store/adventures/adventures.selector';

export interface AdventuresState {
  adventures: Adventure[];
  adventure?: Adventure;
}

const initialState: AdventuresReducer = { adventures: [] };
export const adventuresSlice = createSlice({
  name: 'adventures',
  initialState,
  reducers: {
    setAdventures: (state, action: PayloadAction<Array<Adventure>>) => {
      state.adventures = [];
      state.adventures.push(...action.payload);
    },
    setAdventure: (state, action: PayloadAction<Adventure>) => {
      state.adventure = action.payload;
    },
  },
});

export const { setAdventures, setAdventure } = adventuresSlice.actions;

export default adventuresSlice.reducer;
