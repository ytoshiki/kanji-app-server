import { Context } from "../.."
import Kanji, { IKanji } from "../../models/kanji"
import User from "../../models/user";

interface KanjiCreateArgs {
  input: {
    character: string;
  }
}

interface KanjiDeleteArgs {
  input: {
    character: string;
  }
}

interface KanjiStatusUpdateArgs {
  input: {
    character: string;
    status: string;
  }
}


interface KanjiPayload {
  kanjiErrors: {message: string}[];
  kanji: IKanji | null;
}


export const KanjiResolvers = {
  kanjiCreate: async (_:any, {input}: KanjiCreateArgs, {userInfo}: Context): Promise<KanjiPayload> => {
    if (!userInfo) {
      return {
        kanjiErrors: [
          {
            message: "Token is either missing or invalid"
          }
        ],
        kanji: null
      }
    }

    
    const { id } = userInfo;
    const { character } = input;

    if (!character) {
      return {
        kanjiErrors: [
          {
            message: `character is missing`
          }
        ],
        kanji: null
      }
    }
    
    try {

      const kanjiAlreadyListed = await Kanji.findOne({ character, user: id});

      if (kanjiAlreadyListed) {
        return {
          kanjiErrors: [
            {
              message: `${character} is already in your list`
            }
          ],
          kanji: null
        }
      }

      const kanji = new Kanji({character, user: id});
      const newKanji = await kanji.save();

      if (!newKanji) {
        return {
          kanjiErrors: [
            {
              message: "Failed to create kanji"
            }
          ],
          kanji: null
        }
      }

      const user = await User.findByIdAndUpdate(
        id,
        {
          $push: {
            list: newKanji._id
          }
        },
        { new: true }
      ).populate('list');

      if (!user) {
        return {
          kanjiErrors: [
            {
              message: "Faied to update user's list"
            }
          ],
          kanji: null
        }
      }

    return {
      kanjiErrors: [],
      kanji: newKanji
    }

    } catch (error) {
      console.log(error);

      return {
        kanjiErrors: [
          {
            message: "Something went wrong"
          }
        ],
        kanji: null
      }
    }
    
  },
  kanjiStatusUpdate: async (_:any, {input}: KanjiStatusUpdateArgs, {userInfo}: Context): Promise<KanjiPayload> => {

    if (!userInfo) {
      return {
        kanjiErrors: [
          {
            message: "Token is either missing or invalid"
          }
        ],
        kanji: null
      }
    }
    
    const { id } = userInfo;
    const { character, status } = input;

    if (!character || !status) {
      return {
        kanjiErrors: [
          {
            message: `Either character or status is missing`
          }
        ],
        kanji: null
      }
    }

    const validStatus = ["low", "middle", "high"];

    if (!validStatus.includes(status)) {
      return {
        kanjiErrors: [
          {
            message: `${status} is an invalid status`
          }
        ],
        kanji: null
      }
    }
    
    try {

      const kanjiFilter = {
        character,
        user: id
      }

      const kanjiUpdate = {
        status
      }

      const kanji = await Kanji.findOneAndUpdate(kanjiFilter, kanjiUpdate, {
        new: true
      });

      if (!kanji) {
        return {
          kanjiErrors: [
            {
              message: `${character} is not found in your list`
            }
          ],
          kanji: null
        }
      }

      return {
        kanjiErrors: [],
        kanji: kanji
      }

    } catch (error) {

      return {
        kanjiErrors: [
          {
            message: "Something went wrong"
          }
        ],
        kanji: null
      }
    }
  },
  kanjiDelete: async (_:any, {input}: KanjiDeleteArgs, {userInfo}: Context): Promise<KanjiPayload> => {
    if (!userInfo) {
      return {
        kanjiErrors: [
          {
            message: "Token is either missing or invalid"
          }
        ],
        kanji: null
      }
    }
    
    const { id } = userInfo;
    const { character } = input;

    if (!character) {
      return {
        kanjiErrors: [
          {
            message: `Character is missing`
          }
        ],
        kanji: null
      }
    }

    
    try {

      const kanjiFilter = {
        character,
        user: id
      }

      const kanji = await Kanji.findOneAndDelete(kanjiFilter);

      if (!kanji) {
        return {
          kanjiErrors: [
            {
              message: `${character} is not found in your list`
            }
          ],
          kanji: null
        }
      }

      const user = await User.findByIdAndUpdate(id, { $pull: { list: { $in: kanji._id } } },  {
        new: true
      });

      if (!user) {
        return {
          kanjiErrors: [
            {
              message: "Failed to delete kanji from list"
            }
          ],
          kanji: null
        }
      }

      return {
        kanjiErrors: [],
        kanji: kanji
      }

    } catch (error) {

      return {
        kanjiErrors: [
          {
            message: "Something went wrong"
          }
        ],
        kanji: null
      }
    }
  }
}