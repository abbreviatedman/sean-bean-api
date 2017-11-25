import mongoose, {Schema} from 'mongoose';

var movieSchema = new Schema({
  title: {
    type: String,
    unique: true
  },
  year: Number,
  dies: Boolean,
  cloudinaryName: {
    type: String,
    unique: true
  },
  posterUri:  {
    type: String,
    unique: true
  }
});

export default mongoose.model('movie', movieSchema);
