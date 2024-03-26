const Post = require("../models/post-model");
const isValidObjectId = require("../utils/validateObjectId");

const createPost = async (req, res, next) => {
    try {
        const { caption } = req.body;
        const mediaFiles = req.files; // Assuming multer has processed the files and added them to req.files

        // Map the media files to get their types
        const extractedMedia = mediaFiles.map((item, index) => {
            // Determine the type based on the file mimetype
            return {type:item.mimetype.startsWith('image/') ? "image" : "video",
            url:process.env.BASE_URL+item.filename
        }
        })

        const post=await Post({
            caption,
            user:req.user.userID,
            media:extractedMedia
        })

        await post.save()

        res.status(201).json({ message: 'Post created successfully',post:post});
    } catch (error) {
        // Pass any errors to the error handling middleware
        next(error);
    }
};





const toggleLikesPost=async(req,res,next)=>{
    try {
        const {postID}=req.params
        console.log(postID)
        console.log(req.query)
        const userID=req.user.userID

        const post=await Post.findById(postID)
        if(!post){
            return res.status(404)
            .json({
                status:false,
                message:"post not found"
            })
        }

        const userLiked=post.likes.includes(userID)

        let update={}

        if(userLiked){
            update={$pull:{likes:userID},$inc:{likeCount:-1}}
        }else{
            update={$addToSet:{likes:userID},$inc:{likeCount:+1}}
        }

        const updatedPost=await Post.findByIdAndUpdate(postID,update,{new:true})

         // Respond with the updated post
        res.status(200).json({ message: 'Post liked/disliked successfully.', post: updatedPost });


        
    } catch (error) {
        next(error)
        
    }
}


const postComment = async (req, res, next) => {
    try {
        const { text } = req.body;
        const { postID } = req.params;
        const userID = req.user.userID;

        const post = await Post.findById(postID);
        if (!post) {
            return res.status(404).json({
                status: false,
                message: "Post not found"
            });
        }

        if (!text) {
            return res.status(400).json({
                status: false,
                message: "Please provide a comment"
            });
        }

        const update = {
            $push: { comments: { text: text, user: userID } },
            $inc: { commentCount: 1 }
        };

        const updatedPost = await Post.findByIdAndUpdate(postID, update, { new: true });

        return res.status(200).json({
            status: true,
            message: "Comment added successfully 💞",
            updatedPost
        });
    } catch (error) {
        next(error);
    }
};


const deleteComment = async (req, res, next) => {
    try {
        const { postID,commentID } = req.params;
        const userID = req.user.userID;

         if(!isValidObjectId(postID)){
            return res.status(400)
            .json({
                status:false,
                message:"Invalid post ID"
            })

         }

        const post = await Post.findById(postID);
        if (!post) {
            return res.status(404).json({
                status: false,
                message: "Post not found"
            });
        }

        const commentIndex=post.comments.findIndex((comment)=>comment._id.toString()===commentID && comment.user.toString()===userID)

         if (commentIndex === -1) {
            return res.status(404).json({ message: 'Comment not found or you are not authorized to delete this comment' });
        }

        post.comments.splice(commentID,1)

        post.commentCount--;

         // Save the updated post
        await post.save();

         return res.status(200).json({ message: 'Comment deleted successfully', post });



     


        return res.status(200).json({
            status: true,
            message: "Comment added successfully 💞",
            updatedPost
        });
    } catch (error) {
        next(error);
    }
}

const getAllPosts=async(req,res,next)=>{
    try {
        console.log('YES I AM HERE')

        const page=parseInt(req.query.page) ||1  // Current Page ,default is 1 
        const limit=parseInt(req.query.limit)|| 10 //Number of posts per page default is 10 

        const skip=(page-1)*limit

        const countDocuments=await Post.countDocuments()

        const posts=await Post.find().skip(skip).limit(limit)



        return res.status(200)
        .json({
            status:true,
            message:"All post got successfully",
            count:countDocuments,
            posts,
            currentPage:page,
            totalPage:Math.ceil(countDocuments/limit)

        

        })

        

    } catch (error) {
        next(error)
        
    }
}

const savePost=async(req,res,next)=>{
    try {
        
    } catch (error) {
        
    }
    
}










module.exports={
    createPost,
    toggleLikesPost,
    postComment,
    deleteComment,
    getAllPosts

}