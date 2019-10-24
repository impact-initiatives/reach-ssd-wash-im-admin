interface Select {
  label: string;
  options: {
    [key: string]: string;
  };
}

interface SelectTagOption {
  value: string;
  label: string;
  title?: string;
}

interface SchemaTag {
  value: string;
  label: string;
  multiple: boolean;
  options: SelectTagOption[];
}

interface Admin0 {
  label: string;
  value: string;
}

interface Admin1 extends Admin0 {
  admin0: string;
}

interface Admin2 extends Admin1 {
  admin1: string;
}

interface SchemaAdmin {
  admin0: Admin0[];
  admin1: Admin1[];
  admin2: Admin2[];
}
