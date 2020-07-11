export interface Alias {
  plan_name: string;
  carrier_name: string;
  unmatched_plan_id: number;
  master_plan_id: number;
}

export interface API {
  getUnmatchedPlan: (id: number) => Promise<any>;

  getMasterPlans: () => Promise<any>;

  addAlias: (alias: Alias) => Promise<any>;

  addMasterPlan: (masterPlan: { name: string }) => Promise<any>;
}
