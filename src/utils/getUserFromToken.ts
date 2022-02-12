import JTW from "jsonwebtoken";


export const getUserFromToken = (token: string) => {
  try {
    return JTW.verify(token, process.env.JWT_SECRET as JTW.Secret) as {
      id: number;
    };
  } catch (error) {
    return null;
  }
  
}
