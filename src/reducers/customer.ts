import {ActionType} from 'typesafe-actions';
import {CustomerActions} from '../actions';
import {CUSTOMER_TYPES} from '../types';
import ICustomer from '../models/Customer';
import TState from '../common/types/TState';

export type State = TState & {
    readonly customer: ICustomer | null;
    customers: ReadonlyArray<ICustomer>;
};
export type Action = ActionType<typeof CustomerActions>;

const initialState: State = {
    loading: false,
    error: null,
    customer: null,
    customers: []
};

const reducer = (state: State = initialState, action: Action): State => {
    const {type, payload} = action;
    switch (type) {
        case CUSTOMER_TYPES.GET_CUSTOMERS_REQUEST:
        case CUSTOMER_TYPES.CREATE_CUSTOMER_REQUEST:
        case CUSTOMER_TYPES.GET_CUSTOMER_BY_ID_REQUEST:
            return {...state, loading: true, error: null};
        case CUSTOMER_TYPES.GET_CUSTOMERS_SUCCESS:
            return {...state, customers: payload as ICustomer[], loading: false, error: null};
        case CUSTOMER_TYPES.CREATE_CUSTOMER_SUCCESS:
            return {
                ...state,
                customers: [...state.customers, payload as ICustomer],
                loading: false,
                error: null
            };
        case CUSTOMER_TYPES.GET_CUSTOMER_BY_ID_SUCCESS:
            return {...state, customer: payload as ICustomer, loading: false, error: null};
        case CUSTOMER_TYPES.EDIT_CUSTOMER_SUCCESS:
            return {...state, customer: payload as ICustomer, loading: false, error: null};
        case CUSTOMER_TYPES.RESET_CUSTOMER:
            return {...state, customer: null, loading: false, error: null};
        case CUSTOMER_TYPES.FETCH_CUSTOMER_ERROR:
            return {...state, loading: false, error: payload as string};
        default:
            return state;
    }
};

export default reducer;
