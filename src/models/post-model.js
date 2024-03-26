const mongoose = require('mongoose');

// Schema for media
const mediaSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  type: {
    type: String, 
    required: true,
    enum:['video','image']
  }
});

// Schema for post
const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  caption: {
    type: String,
    required: true
  },

  media: [{
    type: mediaSchema,
    required: true
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

  likeCount: {
    type: Number,
    default: 0
  },

    comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    text: {type:String},
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],

   commentCount: {
    type: Number,
    default: 0
  },
  tags: [String],
  location: String,

  isPrivate: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },

   shares: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  shareCount: {
    type: Number,
    default: 0
  },
  saves: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  saveCount: {
    type: Number,
    default: 0
  },
   reportedBy: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    category: {
      type: String,
      enum: ['spam', 'inappropriate', 'copyright', 'other'],
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }] 

 
},{
  timestamps:true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
