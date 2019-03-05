export type State = {
  message:  null | string;
  success: null | boolean;
  failure: null | boolean;
};

export const initialState: State = {
  success: null,
  message: null,
  failure: null
};
