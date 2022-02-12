import * as mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends mongoose.Document {
  username: string;
  password: string;
  avatar?: string;
  list: mongoose.ObjectId[];
}

export interface IUserDocument extends IUser, mongoose.Document {
  verifyPassword: (password: string) => Promise<boolean>;
}

const UserSchema = new mongoose.Schema({
      username: {
          type: String,
          required: true,
          unique: true,
          trim: true
      },
      password: {
        type: String,
        required: true,
        minLength: 6
      },
      avatar: {
        type: String,
        default: "example.svg"
      },
      list: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Kanji'
        }
      ]
    },
    {
      timestamps: true
    })

// Hash password before saving
UserSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    console.log(error);
    return next(error as any);
  }
});

// Varify password
UserSchema.methods.verifyPassword = async function (password: string) {
  
  try {
    const success = await bcrypt.compare(password, (this as any).password);
    if (success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

const User: mongoose.Model<IUserDocument> = mongoose.model('User', UserSchema);

export default User