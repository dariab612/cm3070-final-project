const clientsInitialState = {
  clients: {}
}

export const clientsReducer = (state = clientsInitialState, action) => {
  switch (action.type) {
    case 'INIT_CLIENTS':
      console.log(action.payload, 'action payload')
      const clients = action.payload.clients
      return { ...state, clients };
    default:
      return state
  }

}
