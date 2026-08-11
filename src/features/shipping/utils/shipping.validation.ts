import type { ShippingAddress } from "../types/shipping.types";

export interface ShippingAddressErrors {
  fullName?: string;
  phone?: string;
  region?: string;
  city?: string;
  area?: string;
  addressLine?: string;
  digitalAddress?: string;
}

export const validateShippingAddress = (
  address: ShippingAddress,
): ShippingAddressErrors => {
  const errors: ShippingAddressErrors = {};

  if (!address.fullName.trim()) errors.fullName = "Full name is required.";
  if (!address.phone.trim()) errors.phone = "Phone number is required.";
  else if (!/^[+]?[0-9\s()-]{8,20}$/.test(address.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  }
  if (!address.region.trim()) errors.region = "Region is required.";
  if (!address.city.trim()) errors.city = "City is required.";
  if (!address.area.trim()) errors.area = "Area is required.";
  if (!address.addressLine.trim()) errors.addressLine = "Address is required.";

  if (address.digitalAddress && !/^[A-Z]{2}-\d{3,}-\d{3,}$/i.test(address.digitalAddress.trim())) {
    errors.digitalAddress = "Enter a valid GhanaPost GPS address or leave it blank.";
  }

  return errors;
};

export const isShippingAddressValid = (address: ShippingAddress) =>
  Object.keys(validateShippingAddress(address)).length === 0;
