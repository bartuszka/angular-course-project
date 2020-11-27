import { User } from "../user.model";
import * as AuthActions from "./auth.actions";
import { AppErorr } from "../../shared/alert/error.service";

export interface AuthState {
  user: User;
  authError: AppErorr;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  authError: null,
  loading: false
}

export function authReducer(state: AuthState = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      const user: User = new User({
        email: action.payload.initialData.email,
        id: action.payload.initialData.id,
        _token: action.payload.initialData._token,
        _tokenExpirationDate: action.payload.initialData._tokenExpirationDate
      });
      return {
        ...state,
        authError: null,
        user,
        loading: false
      }
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      }
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return  {
        ...state,
        authError: null,
        loading: true
      }
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false
      }
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null
      }
    default:
      return state;
  }
}
