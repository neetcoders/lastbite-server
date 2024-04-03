import { IGetAddressByIdResult } from "../address/address.queries";
import { IGetStoreByIdResult } from "./store.queries";

export type StoreRegisterSchema = {
  email: string;
  password: string;
  confirm_password: string;
  display_name: string;
  address: {
    street: string;
    longitude: number;
    latitude: number;
  }
}

export type StoreLoginSchema = {
  email: string;
  password: string;
}

export function convertToGetStoreResponse(store: IGetStoreByIdResult) {
  return {
    email: store.email,
    display_name: store.display_name,
    address: {
      street: store.address_street,
      longitude: store.address_longitude,
      latitude: store.address_latitude,
      created_at: store.address_created_at,
      updated_at: store.adress_updated_at,
    },
    created_at: store.created_at,
    updated_at: store.created_at,
  }
}