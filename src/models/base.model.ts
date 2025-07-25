import {
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

/**
 * BaseModel with id, createdAt, updatedAt
 */
export abstract class BaseModel<
  TModel extends Model<InferAttributes<TModel>, InferCreationAttributes<TModel>>
> extends Model<InferAttributes<TModel>, InferCreationAttributes<TModel>> {
  declare id: CreationOptional<number>;
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}
