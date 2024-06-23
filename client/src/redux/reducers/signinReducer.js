const initialState = {

  clientExist: 'initial', correctPassword: 'inital'

}

const signinReducer = (state = initialState, action) => {

  switch (action.type) {
    case "SIGN_IN":
      let copyClientExist = { ...state.clientExist };
      let copyCorrectPassword = { ...state.correctPassword };
      if (action.payload.signin.clientExist !== undefined) {
        copyClientExist = action.payload.signin.clientExist;
      }
      if (action.payload.signin.correctPassword !== undefined) {
        copyCorrectPassword = action.payload.signin.correctPassword;
      }
      return { ...state, clientExist: copyClientExist, correctPassword: copyCorrectPassword }


    default:
      return state
  }

}

export default signinReducer
