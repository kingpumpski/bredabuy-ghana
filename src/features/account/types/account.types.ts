export interface AccountStat {
  label: string;
  value: string;
  description: string;
  icon: string;
}

export interface AccountOrder {
  id: string;
  date: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  total: number;
  items: number;
}

export interface AccountAddress {
  id: string;
  label: string;
  recipient: string;
  phone: string;
  address: string;
  city: string;
  region: string;
  isDefault: boolean;
}

export interface AccountNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: "order" | "promotion" | "account" | "system";
}

export interface AccountReview {
  id: string;
  product: string;
  rating: number;
  comment: string;
  date: string;
  status: "Published" | "Pending";
}
