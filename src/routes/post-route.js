const express = require("express");
const router=express.Router()
const postController=require('../controller/post-controller')
const upload=require('../middleware/fileUpload')
const isAuthenticUser=require('../middleware/isAuthenticated')



router.post('/createPost',isAuthenticUser,upload,postController.createPost)


router.put('/toggleLike/:postID', isAuthenticUser, postController.toggleLikesPost);

router.put('/postComment/:postID', isAuthenticUser, postController.postComment);

router.delete('/deleteComment/:postID/:commentID', isAuthenticUser, postController.deleteComment);


router.get('/allPosts', postController.getAllPosts);






module.exports=router
