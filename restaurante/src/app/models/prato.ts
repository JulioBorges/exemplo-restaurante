import { Restaurante } from './restaurante';

export interface Prato {
  id: number;
  nome: string;
  preco: number;
  idRestaurante: number;
  restaurante: Restaurante;
}
