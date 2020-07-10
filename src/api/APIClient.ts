import { Alias, API } from './API';
import { APIBase } from './APIBase';

export class APIClient extends APIBase implements API {
  /**
   * endpoint -> /unmatched-plans/:id
   */
  getUnmatchedPlans(id: number): Promise<any> {
    return this._fetch({
      endpoint: `unmatched-plans/${id}`,
      method: 'GET',
    });
  }

  /**
   * endpoint -> master-plans
   */
  getMasterPlans(): Promise<any> {
    return this._fetch({
      endpoint: 'master-plans',
      method: 'GET',
    });
  }

  /**
   * endpoint -> /aliases
   * payload -> {
      "id":1,
      "plan_name":"Faker Plan",
      "carrier_name":"Roundtrip Insurance Company",
      "unmatched_plan_id":2,
      "master_plan_id":1
    }
   */
  addAlias(alias: Alias): Promise<any> {
    return this._fetch({
      endpoint: 'aliases',
      method: 'POST',
      data: alias,
    });
  }
}
