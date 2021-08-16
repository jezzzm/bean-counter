export interface MutateModel {
  makeName: string;
  name: string;
  url?: string;
}

export interface QueryModel extends MutateModel {
  id: number;
  settings: QuerySetting[];
}

export interface Make {
  name: string;
  country?: string;
  description?: string;
  url?: string;
  models: QueryModel[];
}

export interface MutateBean {
  roasterName: string;
  name: string;
  description?: string;
  settings?: QuerySetting[];
}

export interface QueryBean extends MutateBean{
  id: number;
}

export interface Roaster {
  name: string;
  country?: string;
  description?: string;
  url?: string;
  beans?: QueryBean[];
}

export interface MutateSetting {
  modelId?: number;
  beanId?: number;
  dose: number;
  grindSize: string;
  basket: 'single' | 'double';
  comment?: string;
}

export interface QuerySetting extends MutateSetting {
  id: number;
  updatedAt: string;
  bean: QueryBean;
  grinder: QueryModel;
}
