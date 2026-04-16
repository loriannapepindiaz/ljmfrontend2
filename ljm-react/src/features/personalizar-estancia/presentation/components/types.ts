export type Option = {
  id: string;
  label: string;
  icon: string;
  description?: string;
  activeDescription?: string;
};

export type SummaryData = {
  services: string[];
  pillow: string;
  diet: string;
  allergies: string[];
};
