import { TConstructorIngredient } from '@utils-types';

type TOrderModalData = {
  _id: string;
  status: string;
  name: string;
  owner: {
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
  number: number;
  price: number;
};

export type BurgerConstructorUIProps = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  price: number;
  orderModalData: TOrderModalData | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
