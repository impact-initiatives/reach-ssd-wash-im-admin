type Option = {
  label: string;
  value: string;
  title?: string;
};

type DataProp = string | string[] | number;

type LabeledDataProp = string | string[] | number | Option | Option[];

interface Data {
  id: string;
  file: string;
  title: string;
  endDate: string;
  admin0: string[];
  admin1: string[];
  admin2: string[];
  createdAt: number;
  createdBy: string;
  updatedAt: number;
  updatedBy: string;
  status: string;
  [key: string]: DataProp;
}

interface LabeledData {
  id: string;
  file: string;
  title: string;
  endDate: string;
  admin0: string[];
  admin1: Option[];
  admin2: Option[];
  createdAt: number;
  createdBy: string;
  updatedAt: number;
  updatedBy: string;
  status: string;
  [key: string]: LabeledDataProp;
}
