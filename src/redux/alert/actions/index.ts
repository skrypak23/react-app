import { action } from 'typesafe-actions';
import * as ALERT_TYPES from './types';

export const setSuccessAlert = (success: null | boolean, message: null | string) =>
  action(ALERT_TYPES.SET_SUCCESS_ALERT, { success, message });

export const setFailureAlert = (failure: null | boolean, message: null | string) =>
  action(ALERT_TYPES.SET_FAILURE_ALERT, { failure, message });
