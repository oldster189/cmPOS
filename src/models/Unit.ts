export interface Unit {
  success: number;
  data?: (UnitData)[] | null;
  message?: string | null;
}

export interface UnitData {
  _id: number;
  name_th: string;
  name_en: string;
}
