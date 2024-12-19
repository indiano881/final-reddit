import { Request, Response, Router } from "express";

export const getPosts= async (req: Request, res: Response)=> {

    res.status(200).json({title: 'hello POSTSSS'})
}

export const getPost= async (req: Request, res: Response) => {
   const {id}= req.params

   res.status(200).json({title: `hello single post ${id}`})
}

export const postRouter= Router();

postRouter.get('/posts', getPosts)
postRouter.get('/posts/:id', getPost)