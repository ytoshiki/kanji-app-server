import { Context } from "..";
import User from "../models/user";

export const Query = {
  user: async (_:any, __:any, { userInfo }: Context) => {
    
    if (!userInfo) return null;

    const { id } = userInfo;
  
    const user = await User.findById(id).populate("list");

    return user;
  }
}