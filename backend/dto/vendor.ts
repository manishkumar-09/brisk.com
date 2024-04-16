export interface createVendorInput {
  name: string;
  ownerName: string;
  foodType: [string];
  pincode: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}

export interface vendorLoginInput {
  email: string;
  password: string;
}

export interface editVendorDetails {
  name: string;
  address: string;
  phone: string;
  foodType: [string];
}
export interface editVendorService {
  serviceAvailable: boolean;
}
export interface vendorPayload {
  _id: string;
  email: string;
  name: string;
  foodType: [string];
}
