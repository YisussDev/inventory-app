export interface PaginationInterface {
  current_page: number;
  from:         number;
  last_page:    number;
  links:        Link[];
  path:         string;
  per_page:     number;
  to:           number;
  total:        number;
  prev: null | string;
  next: null | string;
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}
