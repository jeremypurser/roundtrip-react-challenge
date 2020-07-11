import { Alias, API } from './API';

export const mockAPIClient: API = {
  getUnmatchedPlan: (id: number) =>
    new Promise(resolve => {
      resolve({
        id,
        plan_name: 'Gold Plan',
        carrier_name: '1199 National Benefit Fund',
        unmatched_plan_id: 1,
        master_plan_id: 821,
      });
    }),

  getMasterPlans: () =>
    new Promise(resolve => {
      resolve([
        {
          id: 818,
          name: '1199SEIU Home Care Benefit Fund',
        },
        {
          id: 819,
          name: '1199SEIU Home Health Aide Benefit Fund',
        },
        {
          id: 8195,
          name: '1199SEIU Licensed Practical Nurses Welfare Fund',
        },
        {
          id: 821,
          name: '1199SEIU National Benefit Fund',
        },
      ]);
    }),

  addAlias: (alias: Alias) =>
    new Promise(resolve => {
      resolve({
        alias,
      });
    }),

  addMasterPlan: (masterPlan: { name: string }) =>
    new Promise(resolve => {
      resolve(masterPlan);
    }),
};
