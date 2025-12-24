
export enum AppState {
  TREE = 'TREE',
  EXPLODE = 'EXPLODE'
}

export interface HandData {
  isPinching: boolean;
  isOpen: boolean;
  palmX: number;
  palmY: number;
}
