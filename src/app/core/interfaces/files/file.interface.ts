export interface FileInterface {
  id?: string;
  filename: string;
  reference: string;
  type: 'base64' | 'url';
  send?: 0 | 1;
  size: number;
  ext: any;
}

export interface FileToShow {
  id: string,
  src: any,
  reference: string,
  filename: string,
  type: 'url' | 'base64',
  ext: 'pdf' | 'png' | 'jpg' | string;
  page_actual: number | 1,
  total_pages?: number | 1,
  pages_index?: string[] | [],
}
