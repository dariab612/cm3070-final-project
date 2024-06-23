const initialState = {

  clientExist: 'initial',
  clientCreated: false

}

const signupReducer = (state = initialState, action) => {

  switch (action.type) {
    case "SIGN_UP":
      let copyClientExist = { ...state.clientExist };
      copyClientExist = action.payload.signup.clientExist;
      const copyClientCreated = action.payload.signup.clientCreated;
      return { ...state, clientExist: copyClientExist, clientCreated: copyClientCreated }

    default:
      return state
  }

}

export default signupReducer
