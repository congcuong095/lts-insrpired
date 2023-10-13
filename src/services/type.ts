export interface IParamsReport {
  from_date?: string;
  to_date?: string;
  category?: string;
  group?: string;
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
  sales_by_category?: {
    processing_date?: string;
    categories?: {
      id?: number;
      name?: string;
      gross?: number;
      void?: number;
      cancelled?: number;
      net?: number;
    }[];
  }[];
  total_gross?: number;
  total_void?: number;
  total_cancelled?: number;
  total_net?: number;
}
