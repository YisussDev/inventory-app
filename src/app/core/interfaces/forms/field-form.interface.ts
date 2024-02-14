export interface FieldFormInterface{
  typeField: 'TEXT'|'NUMBER'|'SELECT'|'DATE'|'AUTOCOMPLETE'|'MULTIPLE',
  label: string;
  placeholder: string | null;
  delayActive: boolean | null ;
  delayTime: number | null ;
  customLogicActive: boolean | null ;
  nameCustomLogic: string | null ;
  formControlName: string ;
  keyToChangeControl:string | null ;
  keyToShowControl: string | null ;
  data: any[] | null;
  icon?: string;
}
