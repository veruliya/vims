import type { ChipVariants } from "@heroui/styles";

export interface Unit {
  id: number;
  short_name: string;
  full_name: string;
  data_type: string;
}

export interface Vessel {
  id: number;
  name: string;
}

export interface Store {
  id: number;
  name: string;
  breadcrumbs: string[];
  vessel: Vessel;
}

export interface Item {
  id: number;
  name: string;
  category: {
    value: string;
    label: string;
    color: ChipVariants['color'];
  };
  subcategory: string;
  severity: {
    value: string;
    label: string;
    color: ChipVariants['color'];
  };
  unit: Unit;
}

export interface StoreItem {
  id: number;
  minimum_quantity: number;
  available_quantity: number;
  item: Item;
  store: Store;
}

export interface Stock {
  id: number;
  quantity: number;
  condition: {
    value: string;
    label: string;
    color: ChipVariants['color'];
  };
}
