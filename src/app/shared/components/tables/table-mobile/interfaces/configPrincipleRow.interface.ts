export interface ConfigPrincipleRowInterface {
  configs: ConfigRow[];
  activeEvent: boolean,
  nameEvent?: string | null;
  iconEvent?: string | null;
}

export interface ConfigRow {
  key: any;
  label: string;
  pipe: 'status' | 'normal' | 'custom' | 'cash' | 'icon' | 'modal';
  configStatus?: ConfigStatus[];
  configCustom?: any;
}

export interface ConfigStatus {
  id: string;
  icon: string;
  color: string;
  label?: string;
  eventDrive?: boolean;
  nameEvent?: string;
}
