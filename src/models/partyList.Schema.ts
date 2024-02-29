import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/sequalize';

class PartyList extends Model {
  public id!: string;
  public title!: string;
  public date!: string;
  public location!: string;
  public link!: string;
  public imageURL!: string;
}

PartyList.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },  
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageURL: {
      type: DataTypes.STRING,
    },
   
  },
  {
    sequelize,
    modelName: 'PartyList',
    timestamps: true,
    version: false,
  }
);

export { PartyList };
