import { KanjiResolvers } from "./kanji";
import { userResolvers } from "./user";

export const Mutation = {
  ...userResolvers,
  ...KanjiResolvers
}