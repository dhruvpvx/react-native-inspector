type DataCellData =
  | any[]
  | Record<string, any>
  | string
  | number
  | boolean
  | null;

interface DataCell {
  key: string;
  label: string;
  data: DataCellData;
  type?: string;
}
interface ApiRequest {
  id: number;
  success: boolean;
  method?: string;
  url?: string;
  full_url: string;
  heading_cells: Record<string, any>;
  data_cells: DataCell[];
}

interface ApiRequestProps {
  request: ApiRequest;
}

interface ExtraDetailsProps {
  heading_cells: Record<string, string>;
  data_cells: DataCell[];
}
