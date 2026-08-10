import type {
  AccountAddress,
  AccountNotification,
  AccountOrder,
  AccountReview,
} from "../types/account.types";

export const accountOrders: AccountOrder[] = [
  {
    id: "BB-2026-000128",
    date: "Aug 08, 2026",
    status: "Delivered",
    total: 1250,
    items: 3,
  },
  {
    id: "BB-2026-000117",
    date: "Aug 03, 2026",
    status: "Shipped",
    total: 680,
    items: 2,
  },
  {
    id: "BB-2026-000094",
    date: "Jul 26, 2026",
    status: "Processing",
    total: 2150,
    items: 5,
  },
];

export const accountAddresses: AccountAddress[] = [
  {
    id: "addr-1",
    label: "Home",
    recipient: "Kingsley Norku",
    phone: "+233 20 000 0000",
    address: "Community 18",
    city: "Accra",
    region: "Greater Accra",
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "Office",
    recipient: "Kingsley Norku",
    phone: "+233 20 000 0000",
    address: "Accra Business District",
    city: "Accra",
    region: "Greater Accra",
    isDefault: false,
  },
];

export const accountNotifications: AccountNotification[] = [
  {
    id: "notification-1",
    title: "Order delivered",
    message: "Your order BB-2026-000128 has been delivered successfully.",
    date: "Today",
    read: false,
    type: "order",
  },
  {
    id: "notification-2",
    title: "New deals available",
    message: "Discover new discounts from verified BredaBuy sellers.",
    date: "Yesterday",
    read: false,
    type: "promotion",
  },
  {
    id: "notification-3",
    title: "Profile security",
    message: "Your account security settings were recently updated.",
    date: "Aug 05, 2026",
    read: true,
    type: "account",
  },
];

export const accountReviews: AccountReview[] = [
  {
    id: "review-1",
    product: "Premium Wireless Headphones",
    rating: 5,
    comment: "Excellent product and very fast delivery.",
    date: "Aug 04, 2026",
    status: "Published",
  },
  {
    id: "review-2",
    product: "Smart LED Television",
    rating: 4,
    comment: "Good quality and exactly as described.",
    date: "Jul 22, 2026",
    status: "Published",
  },
];
