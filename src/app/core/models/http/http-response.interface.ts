export interface HttpResponseInterface<Entity> {
  data: Entity[];
  links: Links;
  meta: Meta;
  translate_fillable: any[];
}

export interface Links {
  first: string;
  last: string;
  next: string | null;
  prev: string | null;
  self: string;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: { active: boolean; label: string; url: string | null }[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}
