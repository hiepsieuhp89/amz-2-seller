export interface IQueryParmaPlanWeek {
    year?: number;
    week_number?: any;
    type?: string;
  }


  export interface IUpdatePlanWeek {
    is_sent?: boolean
    military_and_equipment: MilitaryAndEquipment
    results?: Results
    plans?: Plan[]
  }
  
  export interface MilitaryAndEquipment {
    military_numbers?: MilitaryNumbers
    equipments?: Equipments
  }
  
  export interface MilitaryNumbers {
    name?: string
    official_soldier?: number
    professional_soldier?: number
    male?: number
    female?: number
    absents?: Absents
  }
  
  export interface Absents {
    wait_retirement?: number
    on_leave: number
    hospital?: number
    out_work?: number
  }
  
  export interface Equipments {
    content?: string
    format?: string
  }
  
  export interface Results {
    content?: string
    format?: string
  }
  
  export interface Plan {
    content?: string
    period?: Period
    responsible_by?: string
    implement_by?: string
  }
  
  export interface Period {
    from?: string
    to?: string
  }
  export interface IExportFile {
    year?: string
    week_number?: string
    department_room?: string
    approval_date?: string
    approver?: string
    position_approver?: string
  }
  export interface IQueryParmaVersionHistory {
    id?: string;
    version?: number;
  }
