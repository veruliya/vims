import type { ChipVariants } from "@heroui/styles";
import { User } from "@/types";

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
  category: Enum;
  subcategory: string;
  severity: Enum;
  unit: Unit;
}

export interface StoreItem {
  id: number;
  minimum_quantity: number;
  balance: number;
  item: Item;
  store: Store;
}

export interface Enum {
  value: string;
  label: string;
  chipColor?: ChipVariants['color'];
}

export interface ReceivedReport {
  id: number;
  created_by: User;
  number: string;
  formatted_created_at: string;
}

export interface Movement {
  id: number;
  quantity: number;
  type: Enum;
  condition: Enum;
  snapshot: Snapshot;
}

export interface Snapshot {
  id: number;
  store_name: string;
  store_breadcrumbs: string[];
  unit_short_name: string;
  unit_full_name: string;
  unit_data_type: string;
  item_category: Enum;
  item_subcategory: string;
  item_name: string;
  item_severity: Enum;
  store_item_minimum_quantity: number;
}