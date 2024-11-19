export interface Service {
  id: string;
  name: string;
  price: number;
}

export interface Plan {
  id: string;
  name: string;
  value: number;
}

export interface Product {
  id: string;
  name: string;
  value: number;
}

export interface TemplateItem {
  id: string;
  type: 'service' | 'plan' | 'product';
  itemId: string;
  name: string;
  sessions: number;
  basePrice: number;
  discount: number;
  clinicId?: string;
}

export interface BudgetTemplateFormData {
  name: string;
  includedValue: string;
  paymentMethods: string;
  observations: string;
  items: TemplateItem[];
}

export interface BudgetTemplate extends BudgetTemplateFormData {
  id: string;
  createdAt: string;
  value: number;
}