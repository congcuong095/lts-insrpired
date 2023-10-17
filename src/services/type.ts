export interface IParamsReport {
  from_date?: string;
  to_date?: string;
  category_id?: number;
  product_group_id?: number;
}

export interface ResponeSummary {
  id?: number;
  processing_date?: string;
  gross?: number;
  void?: number;
  cancelled?: number;
  net?: number;
}

export interface ResponeCategory {
  sales_by_category?: SalesByCategory[];
  total_gross?: number;
  total_void?: number;
  total_cancelled?: number;
  total_net?: number;
}

export interface SalesByCategory {
  processing_date?: string;
  categories?: SalesByCategoryItem[];
  daily_net?: number;
}

export interface SalesByCategoryItem {
  id?: number;
  name?: string;
  gross?: number;
  void?: number;
  cancelled?: number;
  net?: number;
}

export interface ResponeProductGroup {
  sales_by_productgroup?: SalesByProductGroup[];
  total_gross?: number;
  total_void?: number;
  total_cancelled?: number;
  total_net?: number;
}

export interface SalesByProductGroup {
  processing_date?: string;
  product_groups?: SalesByProductGroupItem[];
  daily_net?: number;
}

export interface SalesByProductGroupItem {
  id?: number;
  name?: string;
  gross?: number;
  void?: number;
  cancelled?: number;
  net?: number;
}
export interface ResponeCategoryAndProductGroup {
  sales_by_category_productgroup?: SalesByCategoryAndProductGroup[];
  total_gross?: number;
  total_void?: number;
  total_cancelled?: number;
  total_net?: number;
}

export interface SalesByCategoryAndProductGroup {
  processing_date?: string;
  categories?: CategoryAndProductGroupItemCategory[];
  daily_net?: number;
}

export interface CategoryAndProductGroupItemCategory {
  id?: number;
  name?: string;
  product_groups?: CategoryAndProductGroupItemProduct[];
  total_gross?: number;
  total_void?: number;
  total_cancelled?: number;
  total_net?: number;
  category_net?: number;
}

export interface CategoryAndProductGroupItemProduct {
  id?: number;
  name?: string;
  gross?: number;
  void?: number;
  cancelled?: number;
  net?: number;
}
