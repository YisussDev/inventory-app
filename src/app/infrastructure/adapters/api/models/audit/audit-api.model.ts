export interface AuditApiModel {
  _id?: string;
  action_type: string;
  module_name: string;
  user_id: string;
  date_action: string;
  data: string;
}
