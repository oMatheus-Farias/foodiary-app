export type Meal = {
  id: string;
  name: string;
  icon: string;
  createdAt: Date;
  foods: {
    name: string;
    quantity: string;
    calories: number;
    proteins: number;
    carbohydrates: number;
    fats: number;
  }[];
};
