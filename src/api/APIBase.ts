export type HTTPMethod = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';

export class APIBase {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private log(message: string) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(message);
    }
  }

  protected _fetch(req: {
    endpoint: string;
    method: HTTPMethod;
    data?: any;
  }): Promise<any> {
    const requestInit: RequestInit = {
      method: req.method,
    };

    if (
      req.method === 'POST' ||
      req.method === 'PUT' ||
      req.method === 'PATCH'
    ) {
      requestInit.headers = { 'Content-Type': 'application/json' };
      requestInit.body = JSON.stringify(req.data);
    }

    this.log(`
    ---- REQUEST ----
    url: ${this.baseUrl}/${req.endpoint}
    method: ${req.method}
    data: ${req.data ? JSON.stringify(req.data, null, 2) : 'N/A'}
    `);

    return fetch(`${this.baseUrl}/${req.endpoint}`, requestInit)
      .then(response => response.json())
      .then(json => {
        this.log(`
        ---- RESPONSE ----
        response: ${JSON.stringify(json, null, 2)}
        `);

        return json;
      });
  }
}
