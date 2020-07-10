import { API } from '../api/API';

interface PaymentEnvironment {
  api: API;
}

export class Environment {
  api: API;

  static current: PaymentEnvironment;

  static set(init: PaymentEnvironment) {
    if (this.current === undefined) {
      this.current = new this(init);
    }
  }

  private constructor(init: PaymentEnvironment) {
    this.api = init.api;
  }
}
