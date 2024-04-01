export type StoreRegisterSchema = {
  email: string;
  password: string;
  confirm_password: string;
  name: string;
  address: {
    street: string;
    longitude: number;
    latitude: number;
  }
}

