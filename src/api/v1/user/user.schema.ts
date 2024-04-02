import { IGetUserWithAddressResult } from "./user.queries";

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

export function convertToGetUserResponse(user: IGetUserWithAddressResult) {
  return {
    email: user.email,
    display_name: user.display_name,
    birth_date: user.birth_date,
    active_address: user.address_id ? {
      id: user.address_id,
      street: user.address_street,
      longitude: user.address_longitude,
      latitude: user.address_latitude,
      created_at: user.address_created_at,
      updated_at: user.address_updated_at,
    } : null,
    created_at: user.created_at,
    updated_at: user.updated_at,
  }
}