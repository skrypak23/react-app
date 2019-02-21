import {ActionType} from 'typesafe-actions';
import {ProductActions} from '../actions';
import {PRODUCT_TYPES} from '../types';
import IProduct from '../models/Product';
import TState from '../common/types/TState';

export type State = TState & {
    readonly product: IProduct | null;
    products: ReadonlyArray<IProduct>;
};
type Action = ActionType<typeof ProductActions>;

const initialState: State = {
    loading: false,
    error: null,
    product: null,
    products: []
};

const reducer = (state: State = initialState, action: Action): State => {
    const {type, payload} = action;
    switch (type) {
        case PRODUCT_TYPES.GET_PRODUCTS_REQUEST:
        case PRODUCT_TYPES.CREATE_PRODUCT_REQUEST:
        case PRODUCT_TYPES.GET_PRODUCT_BY_ID_REQUEST:
            return {...state, loading: true, error: null};
        case PRODUCT_TYPES.GET_PRODUCTS_SUCCESS:
            return {...state, products: payload as IProduct[], loading: false, error: null};
        case PRODUCT_TYPES.FETCH_PRODUCT_ERROR:
            return {...state, loading: false, error: payload as string};
        case PRODUCT_TYPES.CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                products: [...state.products, payload as IProduct],
                loading: false,
                error: null
            };
        case PRODUCT_TYPES.GET_PRODUCT_BY_ID_SUCCESS:
            return {...state, product: payload as IProduct, loading: false, error: null};
        case PRODUCT_TYPES.EDIT_PRODUCT_SUCCESS:
            return {...state, product: payload as IProduct, loading: false, error: null};
        case PRODUCT_TYPES.RESET_PRODUCT:
            return {...state, product: null, loading: false, error: null};
        default:
            return state;
    }
};

export default reducer;
