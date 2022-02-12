import { Context } from "../..";
import User from "../../models/user";
import { generateAccessToken } from "../../utils/generateAccessToken";

interface Args {
  credentials: {
    username: string;
    password: string;
  }
}

interface AuthPayloadType {
  userErrors: {message: string}[];
  token: string | null;
  avatar: string | null;
  username: string | null;
}


export const userResolvers = {
  signup: async (_:any, {credentials}: Args, {}: Context): Promise<AuthPayloadType> => {

    const { username, password } = credentials;

    if (!username || !password) {
      return {
        userErrors: [{
          message: "Username and password are required"
        }],
        token: null,
        username: null,
        avatar: null
      }
    }
  
    if (password.length < 6) {
      return {
        userErrors: [{
          message: "Password is too short. At least 6 charateres are required"
        }],
        token: null,
        username: null,
        avatar: null
      }
    }

    try {

      const user = new User(credentials);
      const newUser = await user.save();
  
      // Create Token
      const token = generateAccessToken({ id: newUser._id.toString() });
  
      return {
        userErrors: [],
        token,
        username: newUser.username,
        avatar: null
      }
      
    } catch (error) {
      
       return {
        userErrors: [{
          message: "Username is already taken."
        }],
        token: "",
        username: null,
        avatar: null
      }
    }
  },
  signin: async (_:any, {credentials}: Args, {}: Context): Promise<AuthPayloadType> => {

    const { username, password } = credentials;

    if (!username || !password) {
      return {
        userErrors: [{
          message: "Username and password are required"
        }],
        token: null,
        username: null,
        avatar: null
      }
    }

    try {
      const user = await User.findOne({ username });

      if (!user) {
        return {
          userErrors: [{
            message: "User Not Found"
          }],
          token: null,
          username: null,
        avatar: null
        }
      } 

      const userVerified = await user.verifyPassword(password);

      
      if (!userVerified) {
        return {
          userErrors: [{
            message: "Username and Password don't match"
          }],
          token: null,
          username: null,
        avatar: null
        }
      }

      // create token
      const token = generateAccessToken({ id: user._id.toString() });

      return {
        userErrors: [],
        token,
        username: user.username,
        avatar: user.avatar || null
      }

    } catch (error) {
      return {
        userErrors: [
          {
            message: "Something went wrong"
          }
        ],
        token: null,
        username: null,
        avatar: null
      }
    }
  }
  // signin: async (_:any, { credentials }: Args, { }: Context): Promise<AuthPayloadType> => {
  //   const { username, password } = credentials;

  //   // const user = await prisma.user.findUnique({
  //   //   where: {
  //   //     email
  //   //   }
  //   // })

  //   // if (!user) {
  //   //   return {
  //   //     userErrors: [
  //   //       {
  //   //         message: "Invalid email or password"
  //   //       }
  //   //     ],
  //   //     token: null
  //   //   }
  //   // }

  //   // const isValidPassword = await bcypt.compare(password, user.password);

  
  //   // if (!isValidPassword) {
  //   //   return {
  //   //     userErrors: [
  //   //       {
  //   //         message: "Invalid email or password"
  //   //       }
  //   //     ],
  //   //     token: null
  //   //   }
  //   // }

  //   // const token = await JWT.sign({
  //   //   userId: user.id
  //   // }, JSON_SIGNATURE, {
  //   //   expiresIn: 3600000
  //   // })

  //   // return {
  //   //   userErrors: [],
  //   //   token
  //   // }

  //   return {
  //     userErrors: [],
  //     token: ""
  //   }

    
  // }
}