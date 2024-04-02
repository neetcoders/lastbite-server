export type CreateUserAddressSchema = {
  street: string;
  longitude: number;
  latitude: number;
  payload: {
    sub: string;
  }
}