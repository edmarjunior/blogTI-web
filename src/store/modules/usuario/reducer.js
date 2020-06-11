import produce from 'immer';

const INITIAL_STATE = {
  perfil: null,
};

export default function usuario(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@usuario/CREATE': {
        draft.perfil = action.payload.usuario;
        break;
      }
      default:
    }
  });
}
