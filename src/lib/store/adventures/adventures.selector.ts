import { AdventuresState } from '@/lib/store/adventures/adventures.reducer';
import { Adventure } from '@/model/AdventureManager.class';

export interface AdventuresReducer {
  adventures: Adventure[];
  adventure?: Adventure;
}

interface ReducerState {
  adventuresState: AdventuresReducer;
}

export const adventuresSelector = (state: ReducerState) => {
  return state?.adventuresState?.adventures;
};

export const adventureSelector = (state: ReducerState) => {
  return state?.adventuresState?.adventure;
};
