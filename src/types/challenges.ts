export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  points: number;
  image_url?: string;
  is_active: boolean;
  qr_code?: string;
  created_at: string;
}
export interface SubChallenge {
id: string;
  title: string;
  description: string;
  challenge_id: string;  // Reference to the parent challenge
  points: number;
  qr_code_id?: string;  // Optional QR code ID for the sub-challenge
  created_at: string;
  updated_at: string;
}
