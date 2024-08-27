const discussionsInitialState = {
  discussions: []
}

export const discussionsReducer = (state = discussionsInitialState, action) => {

  switch (action.type) {
    case 'INIT_DISCUSSIONS':
      const discussions = action.payload.discussions
      return { ...state, discussions };

    default:
      return state
  }

}
