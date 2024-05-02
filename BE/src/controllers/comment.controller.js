import { CommentModel } from "../models/comment.model.js"
import { PostModel } from "../models/post.model.js"

const commentController = {
    listByPostId: async (req, res) => {
        try {
            const { listPostId, limit } = req.query
            if (!listPostId) throw new Error('Please provide post information')
            const allComment = await CommentModel
                .find({
                    post: {
                        $in: listPostId.split(',')
                    }
                })
                .sort({ createdAt: -1 })
                .limit(limit || 5)
            res.status(200).json({
                data: allComment,
                success: true
            })
        }
        catch (error) {
            res.status(403).json({
                message: error.message,
                success: false
            })
        }
    },
    createComment: async (req, res) => {
        try {
            const { postId, content } = req.body
            const user = req.user
            const currentPost = await PostModel.findById(postId)
            if (!currentPost) throw new Error('No post found')
            const createdComment = await CommentModel.create({
                post: postId,
                author: user.userId,
                content
            })
            res.status(201).json({
                message: 'Comment successful',
                data: createdComment,
                success: true
            })
        }
        catch (error) {
            res.status(403).json({
                message: error.message,
                success: false
            })
        }
    },
    updateCommentById: async (req, res) => {
        try {
            const { id } = req.params
            const { content } = req.body
            const currentComment = await CommentModel.findByIdAndUpdate(id, {
                content
            })
            if (!currentComment) throw new Error('No comment found')
            const updatedComment = await CommentModel.findById(id)
            res.status(201).json({
                message: 'Comment updated successful',
                success: true,
                data: updatedComment
            })
        }
        catch (error) {
            res.status(403).json({
                message: error.message,
                success: false
            })
        }
    },
    deleteCommentById: async (req, res) => {
        try {
            const { id } = req.params
            const user = req.user
            const currentComment = await CommentModel.findById(id).populate('post')
            if (!currentComment) throw new Error('Comment not found')
            if (currentComment.author.toString() === user.userId || user.userId === currentComment.post.author.toString()) {
                await currentComment.deleteOne()
            } else {
                throw new Error(`Can't delete this comment`)
            }
            res.status(200).json({
                success: true,
                message: 'Comment deleted successful'
            })
        }
        catch (error) {
            res.status(403).json({
                message: error.message,
                success: false
            })
        }
    }
}

export default commentController