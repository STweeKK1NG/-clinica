export interface Category {
  id: string;
  name: string;
}

export interface Service {
  id: string;
  name: string;
  price: number;
}

export interface PlanService {
  serviceId: string;
  serviceName: string;
  sessions: number;
  unitaryCommission: number;
}

export interface PlanFormData {
  category: string;
  name: string;
  description: string;
  value: string | number;
  cost: string | number;
  startDate: string;
  endDate: string;
  expirationDays: string | number;
  commission: string | number;
  loyaltyPoints: string | number;
  society: string;
  dteType: string;
  isAffected: boolean;
  taxes: boolean;
  preExpirationDays: string | number;
  services: PlanService[];
}

export interface Plan extends Omit<PlanFormData, 'value' | 'cost'> {
  id: string;
  value: number;
  cost: number;
  isExpired: boolean;
}