export interface ChecklistModel {
  title: string;
  id?: string;
  data: ChecklistBlock[];
}

export interface ChecklistBlock {
  title: string;
  order: number;
  selected?: boolean;
  items: ChecklistItem[];
}

export interface ChecklistItem {
  title: string;
  order: number;
  help: string;
  checked: boolean;
}
