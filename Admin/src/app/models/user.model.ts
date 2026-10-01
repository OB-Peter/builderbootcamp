export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'superadmin' | 'finance' | 'admin';
  token: string;
}
