import { createSlice } from '@reduxjs/toolkit';

const bookmarksSlice = createSlice({
  name: 'bookmarks', 
  initialState: {
    games: [] 
  },
  reducers: {

    addBookmark: (state, action) => {
    
      const gameExists = state.games.some(game => game.id === action.payload.id);
      if (!gameExists) {
        state.games.push(action.payload); 
      }
    },
   
    removeBookmark: (state, action) => {

      state.games = state.games.filter(game => game.id !== action.payload);
    }
  }
});


export const { addBookmark, removeBookmark } = bookmarksSlice.actions;


export default bookmarksSlice.reducer;












