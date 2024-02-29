import { Request, Response } from 'express';
import { User } from '../models/users.Schema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secretKey: string = process.env.JWT_SECRET || '';
const salt: number = parseInt(process.env.SALT_ROUND || '10');

// Define a custom Request type that includes the 'user' property
interface CustomRequest extends Request {
  user?: {
    [key: string]: unknown;
  };
}

export const UserSignUp = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { name, email, password,userName } = req.body;
    const hashedPassword = await bcrypt.hash(password, salt);
    const userWithSameId = await User.findOne({where:{userName:userName}})
    if(userWithSameId)
    {
      res.status(403).json({message:'User Name Already in use'})
    }
    const newUser = await User.create({
      name:name,
      email:email,
      userName:userName,
      phone:req.body.phone,
      bio:req?.body?.bio||null,
      password: hashedPassword,
    });

    const token = jwt.sign({ user: newUser,userType:"customer" }, secretKey, {
      expiresIn: '7d',
    });

    const refreshToken = jwt.sign({ user: newUser,userType:"customer" }, secretKey, {
      expiresIn: '30d',
    });

    res.set('x-access-token', token);
    res.set('x-refresh-token', refreshToken);
    res.set('Access-Control-Expose-Headers', ['x-access-token', 'x-refresh-token']);

    res.status(201).json({ status: true });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: error });
  }
};

export const userLogin = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    console.log(req.user);
    const { email,phone,userName, password } = req.body;
    let user
    if(email)
    {
       user = await User.findOne({
        where: {
          email,
        },
      });
    }

    else if(phone)
    {
      user = await User.findOne({
        where: {
          phone,
        },
      });    
    }
    else if(userName)
    {
      user = await User.findOne({
        where: {
          userName,
        },
      });
    }
    

    if (!user) {
      res.status(401).json({ message: 'User Does not exist' });
    } else {
      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log(passwordMatch, 'Match');
      if (!passwordMatch) {
        res.status(401).json({ message: 'Password does not match' });
      } else {
        const token = jwt.sign({ user: user,userType:"customer" }, secretKey, {
          expiresIn: '7d',
        });

        const refreshToken = jwt.sign({ user: user,userType:"customer" }, secretKey, {
          expiresIn: '30d',
        });

        res.set('x-access-token', token);
        res.set('x-refresh-token', refreshToken);
        res.set('Access-Control-Expose-Headers', ['x-access-token', 'x-refresh-token']);

        res.status(200).json({ status: true });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};



export const userLoginbyGoogle = async (req: Request, res: Response): Promise<void> => {
  try {

    console.log("Hi")
  } catch (err) {

     res.status(500).json({ error: "Internal Server Error" });
  }
};