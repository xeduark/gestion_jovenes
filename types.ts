// tipas y modelos de datos para la aplicacion
export enum SpiritualStatus {
  CRECIENDO = 'Creciendo',
  ESTABLE = 'Estable',
  NECESITA_APOYO = 'Necesita Apoyo',
  ALEJADO = 'Alejado'
}

export interface SpiritualLog {
  id: string;
  date: string;
  note: string;
  status: SpiritualStatus;
}

export interface YouthMember {
  id: string;
  name: string;
  birthDate: string;
  photoUrl: string;
  phoneNumber: string;
  email: string;
  status: SpiritualStatus;
  spiritualLogs: SpiritualLog[];
  createdAt: string;
}

export interface DashboardStats {
  totalMembers: number;
  upcomingBirthdays: number;
  statusDistribution: Record<SpiritualStatus, number>;
}
