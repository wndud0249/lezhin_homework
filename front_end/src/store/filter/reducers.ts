import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterTypes } from './types';

const initialState: FilterTypes = {
  contentStateFilter: '',
  freedEpisodeFilter: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeContentStateFilter: (state, action: PayloadAction<{ contentStateFilter: string }>) => {
      state.contentStateFilter = action.payload.contentStateFilter;
    },
    changeFreedEpisodeFilter: (state, action: PayloadAction<{ freedEpisodeFilter: boolean }>) => {
      state.freedEpisodeFilter = action.payload.freedEpisodeFilter;
    },
    resetFilters: (state) => {
      state.contentStateFilter = '';
      state.freedEpisodeFilter = false;
    },
  },
});

export const filterAction = filterSlice.actions;

export default filterSlice.reducer;
