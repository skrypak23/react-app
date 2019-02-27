export type State = {
    readonly loading: boolean;
    readonly error: string | null;
}

export const initialState: State = {
    loading: false,
    error: null
}
