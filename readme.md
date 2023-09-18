

As part of our evaluation process, we’d like you to complete a small assignment that would help us assess your skills. Your task involves creating a mini version of a RESTful API for a simple blogging platform.
Here are the specifics:

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

### delete-my-blogs (delete)
##### https://blog-app-0gd2.onrender.com/blogs/delete-blog/65082e9e3c923bb4dbe28aee
(provide blogId to delete the blog)

#### 3. Commenting Feature:
Logged-in users should be able to comment on their own and others’ posts. Also, they should be able to edit or delete their own comments.

// comment-on-any-blog
// delete-my-own-comments

#### 4. Database:
All the data should be stored in a database of your choice. However, we’d like to see your ability to work with relational databases like MySQL, PostgreSQL, or SQLite.

#### 5. Documentation:
Please provide clear documentation of your API endpoints, including the necessary HTTP methods, headers, and data structures for request and response bodies.
Your main focus should be on the back-end side, so a front-end user interface isn’t required. However, please make sure your API is properly structured, secure, and ready to interact with a potential front-end.


You can use the programming language you feel most comfortable with, but keep in mind that we mostly use Python and Node.js in our tech stack.


Please, have the code published on a public GitHub repository and ensure it can be run locally. Include all necessary instructions in the README of the repository.


This exercise isn’t just about writing code that works. We’ll also be looking at how you structure your application, your choice of libraries and frameworks, how you manage dependencies, and so forth.

Deadline for submission - 11 September 2023. 
Time - 3 PM

