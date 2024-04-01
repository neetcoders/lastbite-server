export type UserRegisterSchema = {
  email: string;
  password: string;
  confirm_password: string;
  display_name: string;
  birth_date: string;
}

export type UserLoginSchema = {
  email: string;
  password: string;
}