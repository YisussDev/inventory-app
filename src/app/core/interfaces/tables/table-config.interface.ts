export interface TableConfigInterface {
  column_name: string;
  column_type: any;
  column_translate: string;
  column_pipe?: 'cash' | 'normal' | 'status' | 'link' | 'icon' | 'custom' | undefined;
  config_pipe?: ConfigPipeInterface[];
  config_custom?: any;
  isActive: boolean;
  active_search?: boolean;
}

export interface ConfigPipeInterface {
  id?: string | number;
  key?: string;
  label?: string;
  icon?: string;
  color?: string;
}
