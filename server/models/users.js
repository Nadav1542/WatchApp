import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

  username: {
    type: String,
    unique: true,
    required: [true, 'Username is required'],
    minlength: [1, 'Username must be at least 1 character long']
  },
  displayname: {
    type: String,
    required: [true, 'Name is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    validate: {
      validator: function (v) {
        const letterPattern = /[a-zA-Z]/;
        const numberPattern = /[0-9]/;
        return v.length >= 2 && letterPattern.test(v) && numberPattern.test(v);
      },
      message: 'Password must contain both letters and numbers'
    }
  },
  img: {
    type: String,
    required: [true, 'Profile picture is required']
  },
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }]
});

userSchema.index({ username: 1 }, { unique: true });
 const User = mongoose.model('User', userSchema);


export { User };
