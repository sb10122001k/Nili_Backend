import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/sequalize';


class Party extends Model {
  public type!: string;
  public name!: string | null;
  public details!: string;
  public host!: string;
  public amount!: string;
  public maxUser!: string;
  public venue!: string | null;
  public startDate!: string | null;
  public endDate!: string | null;
  public startTime!: string | null;
  public endTime!: string | null;
}

Party.init(
  {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    details: {
      type: DataTypes.STRING,     
      allowNull: false,      
    },
    host: {
      type: DataTypes.STRING,
      references:{
        model:'User',
        key:'id'
      },
      allowNull: false,
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maxUser: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    venue: {
      type: DataTypes.STRING,
    },
    startDate: {
      type: DataTypes.STRING,
    },
    endDate: {
      type: DataTypes.STRING,
    },
    startTime: {
      type: DataTypes.STRING,
    },
    endTime: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Party',
    timestamps: true,
    version: false,
  }
);

export {Party};