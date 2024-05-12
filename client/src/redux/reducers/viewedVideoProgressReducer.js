import { viewedVideoProgressAT } from '../actionTypes/viewedVideoProgressAT';

const viewedVideosInitialState = {
  viewedVideosProgressed: []
}

export const viewedVideoProgressReducer = (state = viewedVideosInitialState, action) => {

  switch (action.type) {
    case viewedVideoProgressAT.INIT_VIEWED_VIDEO_PROGRESS:
      const viewedVideosProgressed = action.payload.viewedVideos
      return { ...state, viewedVideosProgressed: viewedVideosProgressed };

    default:
      return state
  }

}
