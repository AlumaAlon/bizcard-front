export interface Card {
  _id?: string;
  name: string;
  address: string;
  description: string;
  phone: string;
  image: string;
  cardNumber?: number;
  user_id?: string;
}
