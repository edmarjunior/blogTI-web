import produce from 'immer';

const INITIAL_STATE = {
  dados: {},
};

export default function conteudo(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@conteudo/curtir': {
        draft.dados.curtido = true;
        break;
      }
      case '@conteudo/set': {
        draft.dados = action.payload.conteudo;
        break;
      }
     
      default:
    }
  });
}
