import { Context } from "..";
import User from "../models/user";
import { getUserFromToken } from "../utils/getUserFromToken";

export const Query = {
  user: async (_:any,  __: any, { userInfo }: Context) => {
    
    if (!userInfo) return null;

    try {
   
      const user = await User.findById(userInfo.id).populate("list");

      return user;
    } catch (error) {
      return null;
    }
    
  },
}