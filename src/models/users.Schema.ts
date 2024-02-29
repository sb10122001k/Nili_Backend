import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/sequalize';

class User extends Model {
  public id!: string;
  public name!: string;
  public phone!: string;
  public userName!: string;
  public email!: string;
  public bio!: string;
  public password!:string;
  public friendsList!: string[];
  public image!: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },  
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.STRING,
    },
   
    friendsList: {
      type: DataTypes.ARRAY(DataTypes.UUID),
    },
    
    image: {
      type: DataTypes.STRING,
    },

    password:{
      type:DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: true,
    version: false,
  }
);

export { User };
