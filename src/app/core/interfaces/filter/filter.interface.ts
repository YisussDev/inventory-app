export interface FilterInterface {
  type?: string;
  selectColumns?: string[];
  singleQuery?: string[];
  lucky?: boolean;
  orSingleQueries?: string[][];
  orSingleFullTextQuery?: [];
  orderColumn?: string;
  singleFullTextQuery?: [];
  dateQuery?: dateQuery;
  columnQuery?: string[];
  withRelationships?: string[];
  paginate?: number;
}

interface dateQuery {
  column: string;
  operator: string;
  param: string;
}
