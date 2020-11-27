export class User {
  constructor(
    private _initialData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: Date,
    }
  ) {}

  get token() {
    if (!this._initialData._tokenExpirationDate || new Date() > this._initialData._tokenExpirationDate) {
      return null;
    }
    return this._initialData._token;
  }

  get initialData() {
    return this._initialData;
  }
}
