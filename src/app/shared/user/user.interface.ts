export interface UserModel {
  id?: string;
  email?: string;
  checklists?: Array<string>;
  token?: string;
  password?: string;
  passwordConfirmation?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ChecklistItemModel {
  title: string;
  id: string;
}
