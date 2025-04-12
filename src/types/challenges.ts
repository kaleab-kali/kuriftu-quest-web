export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  points: number;
  image_url?: string;
  is_active: boolean;
  qr_code_id?: string;
  created_at: string;
}
