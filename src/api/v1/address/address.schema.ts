import { IGetAddressByIdResult } from "./address.queries";

export type CreateUserAddressSchema = {
  street: string;
  longitude: number;
  latitude: number;
  payload: {
    sub: string;
  }
}

export type GetUserAddressSchema = {
  payload: {
    sub: string;
  }
}

export type GetAllUserAddressSchema = {
  payload: {
    sub: string;
  }
}

export type DeleteUserAddressSchema = {
  payload: {
    sub: string;
  }
}

export type UpdateUserAddressSchema = {
  street: string;
  longitude: number;
  latitude: number;
  payload: {
    sub: string;
  }
}


export function convertToGetAddressResponse(address: IGetAddressByIdResult) {
  return {
    id: address.id,
    street: address.street,
    longitude: address.longitude,
    latitude: address.latitude,
    created_at: address.created_at,
    updated_at: address.updated_at,
  }
}

export function convertToGetAllAddressesResponse(addresses: IGetAddressByIdResult[]) {
  return addresses.map((address) => ({
    id: address.id,
    street: address.street,
    longitude: address.longitude,
    latitude: address.latitude,
    created_at: address.created_at,
    updated_at: address.updated_at,
  }));
}