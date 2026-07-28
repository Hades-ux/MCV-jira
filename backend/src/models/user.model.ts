import mongoose from 'mongoose';
import bycrpt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      index: true,
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email'],
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  try {
    //Password hashing
    this.password = await bycrpt.hash(this.password, Number(process.env.SALT_ROUND));
  } catch (error: any) {
    console.log('error: ' + error.message);
  }
});

export default mongoose.model('User', userSchema);
