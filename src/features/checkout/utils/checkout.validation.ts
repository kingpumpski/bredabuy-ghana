export interface CheckoutFormValues {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  region: string;
  city: string;
}

export type CheckoutFormErrors = Partial<Record<keyof CheckoutFormValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[0-9\s()-]{9,20}$/;

export const validateCheckoutForm = (
  values: CheckoutFormValues,
): CheckoutFormErrors => {
  const errors: CheckoutFormErrors = {};

  if (!values.firstName.trim()) errors.firstName = "First name is required.";
  if (!values.lastName.trim()) errors.lastName = "Last name is required.";
  if (!PHONE_PATTERN.test(values.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  }
  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.address.trim()) errors.address = "Delivery address is required.";
  if (!values.region.trim()) errors.region = "Select a region.";
  if (!values.city.trim()) errors.city = "City is required.";

  return errors;
};
