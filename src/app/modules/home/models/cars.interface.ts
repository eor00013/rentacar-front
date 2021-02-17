import { ModelInterface } from './model.interface';
import { CategoryInterface } from './category.interface';
import { FuelTypeEnum } from './fuel-type.enum';
import { ColorEnum } from './color.enum';
export interface CarInterface {
    id: number;
    color_type: ColorEnum;
    doors: number;
    passengers: number;
    fuel_type: FuelTypeEnum;
    category: CategoryInterface;
    model: ModelInterface;
}
