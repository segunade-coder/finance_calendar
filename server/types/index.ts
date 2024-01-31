export interface cash {
  amount: number;
  category: string;
  description: string;
}
export interface people {
  name: string;
  role: string;
}
export interface tasks {
  task: string;
  assignTo: string | [];
  deadline: string;
  status: string;
  progress: string;
  priority: string;
}
export interface settings {
  others_category: string | [];
  role_category: string | [];
  cashin_category: string | [];
  cashout_category: string | [];
}
export type Database = {
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
};
