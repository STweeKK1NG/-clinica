export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  date: Date;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  treatment: string;
  startTime: string;
  endTime: string;
}