import { HyperEndpoints } from "src/interfaces";

const hyprEndpoints: HyperEndpoints = {
  getItems: (id: string) => `/api/v1/tenant/items/${id}`,
  currency: `/api/v1/tenant/currencies`,
  collection: `/api/v1/tenant/collections`
}

export default hyprEndpoints;