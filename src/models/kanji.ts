import * as mongoose from 'mongoose';

export interface IKanji extends mongoose.Document {
  character: string;
  user: mongoose.ObjectId;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const KanjiSchema = new mongoose.Schema(
  {
    character: {
      type: String,
      required: true,
      unique: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    status: {
      type: String,
      enum: ["low", "middle", "high"],
      default: "middle"
    }
  },
  {
    timestamps: true
  }
);



const Kanji: mongoose.Model<IKanji> = mongoose.model('Kanji', KanjiSchema);

export default Kanji;