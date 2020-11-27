import { HttpErrorResponse } from "@angular/common/http";
import { AppErorr } from "./error.service";

export enum ErrorMessages {
  serverNotFound = 'Nie odnaleziono serwera',
  somethingWentWrong = 'Nieprawidłowy login lub hasło',
  other = "Przepraszamy. Coś poszło nie tak. Spróbuj później."
}

export const getAppError = (errorResponse: HttpErrorResponse): AppErorr => {
  const code = errorResponse.status;
  let message: string;

  switch (errorResponse.status) {
    case 500:
      message = ErrorMessages.serverNotFound;
      break;
    case 400:
      message = ErrorMessages.somethingWentWrong;
      break;
    default:
      message = ErrorMessages.other;
  }

  return { code, message };
}
