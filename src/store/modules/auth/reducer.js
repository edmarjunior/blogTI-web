import produce from 'immer';

const INITIAL_STATE = {
  show: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@auth/OPEN_MODAL': {
        draft.show = true;
        break;
      }
      case '@auth/CLOSE_MODAL': {
        draft.show = false;
        break;
      }
     
      default:
    }
  });
}
