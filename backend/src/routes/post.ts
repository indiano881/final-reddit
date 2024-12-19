import { Request, Response, Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import { isValidObjectId, ObjectId } from "mongoose";
import { Post } from "../models/post";


type AuthorWithUsername = {
    _id: ObjectId
    username: string
  }


const getPosts = async (req: Request, res: Response) => {
    // await new Promise((resolve) => setTimeout(resolve, 3000))
    try {
      
  
      
  
      const posts = await Post.find()
        .populate('author', 'username')
  
      const responsePosts = posts.map((post) => {
        const author = post.author as unknown as AuthorWithUsername
  
        return {
          id: post._id,
          title: post.title,
          author: {
            username: author.username,
          }
        }
      })
  
      
  
      res.status(200).json({
        posts: responsePosts
      })
    } catch (error) {
      console.error(error)
      res.status(500).send()
    }
  }

const getPost = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
  
      if (!isValidObjectId(id)) {
        res.status(400).json({ message: 'invalid post id' })
        return
      }
  
      const post = await Post.findById(id).populate('author', 'username')
  
      if (!post) {
        res.status(404).json({ message: 'post not found' })
        return
      }
  
      const author = post.author as unknown as AuthorWithUsername
  
      res.status(200).json({
        id: post._id,
        title: post.title,
        content: post.content,
        author: {
          id: author._id,
          username: author.username,
        },
      })
    } catch (error) {
      console.error(error)
      res.status(500).send()
    }
  }

const createPost = async (req: Request, res: Response) => {
    try {
      const { title, content } = req.body
  
      if (!title || typeof title !== 'string') {
        res.status(400).json({ message: 'malformed title' })
        return
      }
  
      if (content !== undefined && typeof content !== 'string') {
        res.status(400).json({ message: 'malformed content' })
        return
      }
  
      const post = await Post.create({
        title,
        content,
        author: req.userId,
      })
  
      res.status(201).json({ id: post._id })
    } catch (error) {
      console.error(error)
      res.status(500).send()
    }
  }
  
  const deletePost = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
  
      if (!isValidObjectId(id)) {
        res.status(400).json({ message: 'invalid post id' })
        return
      }
  
      const post = await Post.findById(id)
  
      if (!post) {
        res.status(404).json({ message: 'post not found' })
        return
      }
  
      if (post.author.toString() !== req.userId) {
        res
          .status(403)
          .json({ message: 'you are not allowed to delete this post' })
        return
      }
  
      await post.deleteOne()
      res.status(200).json({ message: 'post deleted' })
    } catch (error) {
      console.error(error)
      res.status(500).send()
    }
  }
  
  const editPost = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
  
      if (!isValidObjectId(id)) {
        res.status(400).json({ message: 'invalid post id' })
        return
      }
  
      const post = await Post.findById(id)
  
      if (!post) {
        res.status(404).json({ message: 'post not found' })
        return
      }
  
      if (post.author.toString() !== req.userId) {
        res.status(403).json({ message: 'you are not allowed to edit this post' })
        return
      }
  
      const { title, content } = req.body
  
      if (title !== undefined && typeof title !== 'string') {
        res.status(400).json({ message: 'malformed title' })
        return
      }
  
      if (content !== undefined && typeof content !== 'string') {
        res.status(400).json({ message: 'malformed content' })
        return
      }
  
      await post.updateOne({
        title,
        content,
      })
      res.status(200).json({ message: 'post updated' })
    } catch (error) {
      console.error(error)
      res.status(500).send()
    }
  }
export const postRouter= Router();

postRouter.get('/posts', getPosts)
postRouter.get('/posts/:id', getPost)
postRouter.post('/posts', authenticate, createPost)
postRouter.delete('/posts/:id', authenticate, deletePost)
postRouter.put('/posts/:id', authenticate, editPost)