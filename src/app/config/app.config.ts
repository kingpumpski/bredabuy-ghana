export const appConfig = {
  name: "BredaBuy Ghana",
  version: "1.0.0",

  api: {
    baseUrl:
      import.meta.env.VITE_API_URL ||
      "http://localhost:3000/api",
  },

  features: {
    aiAssistant: true,
    marketplace: true,
    sellerPortal: false,
    inventoryManagement: false,
  },
};