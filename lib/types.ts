export interface Product {
  id: string | number;
  name: string;
  nameBn?: string;
  emoji: string;
  category: string;
  price: number;
  change: number;
  markets?: { name: string; price: number }[];
}