
### this project aims to create a basic blogging platform with user registration and authentication using JWT, allowing users to perform CRUD operations on blog posts and interact through comments. The API should ensure proper authorization, data validation, and security measures to protect user data and maintain the integrity of the platform.

## 1. User Registration and Login:
We’d like you to create a registration and login mechanism using JSON Web Tokens (JWT) for authentication.

#### User Registration (post)
##### https://blog-app-0gd2.onrender.com/user/register
{
    "userName" : "Chandranath Gupta",
    "email" : "chandranath@gmail.com",
    "password" : "Chandranath123@"
}


#### User Login (post)
##### https://blog-app-0gd2.onrender.com/user/login
{
   "email" : "chandranath@gmail.com",
    "password" : "Chandraath123@"
}

## 2. Blog Post Creation, Reading, Updating, and Deletion (CRUD Operations):
Logged-in users should be able to create a blog post, read their own and others’ posts, edit their own posts, and delete their own posts.

#### create-blog (post)
##### https://blog-app-0gd2.onrender.com/blogs/create-blogs
{
    "title" : "chandras 2 blog title",
    "description" : "chandras 2 blog desc"
}

#### get-users-blogs (get)
##### https://blog-app-0gd2.onrender.com/blogs/getUserBlogs


#### get-all-blogs (get)
##### https://blog-app-0gd2.onrender.com/blogs/getAllBlogs


#### update-my-blog (put)
##### https://blog-app-0gd2.onrender.com/blog/updateBlog/64a4345dba047470b71a847f
{
    "title" : "first blog title updated"
}

#### delete-my-blogs (delete)
##### https://blog-app-0gd2.onrender.com/blogs/delete-blog/65082e9e3c923bb4dbe28aee
(provide blogId to delete the blog)

## 3. Commenting Feature:
Logged-in users should be able to comment on their own and others’ posts. Also, they should be able to edit or delete their own comments.

#### comment-on-any-blog (post)
##### https://blog-app-0gd2.onrender.com/comment/post-comment
{
    "comment" : "this is comment on blog",
    "blogId" : "650822171324b86d6b1e93c8"
}


#### update-my-own-comments (put)
##### https://blog-app-0gd2.onrender.com/comment/update-comment/650822171324b86d6b1e93c8 (blogId)
{
    "comment" : "updating comment again",
    "commentId": "6508425ff2b48cffca9ae949"
}

#### delete-my-own comments (delete)
##### https://blog-app-0gd2.onrender.com/comment/delete-comment/650822171324b86d6b1e93c8 (blogId)
{
    "commentId" : "6508362bc675ff3cfd098411"
}


## Teck stacks - Nodejs and mongoDB