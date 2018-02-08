import { OPEN_POST_EDITOR, CLOSE_POST_EDITOR } from "./appActions";

const postEditor = (state = {open: false, post: {}}, action) => {
  switch(action.type) {
    case OPEN_POST_EDITOR:
      return {
        open: true,
        post: action.post
      };
    case CLOSE_POST_EDITOR:
      return {
        open: false,
        post: {}
      };
    default:
      return state;
  }
};

export default postEditor;