import type { ShippingAddress } from "@/features/shipping/types/shipping.types";

export function validateShippingAddress(
  address?: ShippingAddress,
): Record<string, string> {
  if (!address) {
    return {
      shippingAddress:
        "A delivery address is required.",
    };
  }

  const errors: Record<string, string> = {};

  if (!address.fullName.trim()) {
    errors.fullName =
      "Full name is required.";
  }

  if (!address.phone.trim()) {
    errors.phone =
      "Phone number is required.";
  }

  if (!address.region.trim()) {
    errors.region =
      "Region is required.";
  }

  if (!address.city.trim()) {
    errors.city =
      "City is required.";
  }

  if (!address.addressLine.trim()) {
    errors.addressLine =
      "Address is required.";
  }

  return errors;
}
