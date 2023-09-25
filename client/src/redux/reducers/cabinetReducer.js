
const initialState = { viewedVideos: { viewedVideos: [], coursesContent: [] } }

export const cabinetReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_CABINET': {
      console.log('cabinet INIT_CABINET')
      const copyViewedVideos = { ...state.viewedVideos };

      copyViewedVideos.coursesContent = action.payload.coursesContent;
      copyViewedVideos.viewedVideos = action.payload.viewedVideos;

      return { ...state, viewedVideos: copyViewedVideos }
    }
    default:
      return state;
  }
};

export default cabinetReducer;
