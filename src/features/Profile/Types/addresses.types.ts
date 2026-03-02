export interface Address {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

export interface AddAddressPayload {
  name: string;
  details: string;
  phone: string;
  city: string;
}

export interface AddressesResponse {
  results: number;
  data: Address[];
}