import type { UUIDv4 } from "../lib/uuid";

export const API_ENDPOINTS = {
  // Пользователи
  users: {
    all: 'users/all',
    byId: (id: UUIDv4) => `users/${id}`,
    byUsername: 'users'
  },

  // Посты
  posts: {
    all: 'posts/all',
    create: 'posts/new',
    byId: (id: UUIDv4) => `posts/${id}`,
  },

  // Авторизация
  auth: {
    login: 'auth/login',
    signup: 'auth/signup',
  },

  // Комментарии
  comments: {
    create: 'comments/new',
    byPost: (postId: UUIDv4) => `posts/${postId}/comments`,
    byUser: (userId: UUIDv4) => `users/${userId}/comments`,
    byId: (id: UUIDv4) => `comments/${id}`
  },

  // Лайки
  likes: {
    postLikes: (postId: UUIDv4) => `likes/posts/${postId}`,
    commentLikes: (commentId: UUIDv4) => `likes/comments/${commentId}`,

    postIsLiked: (userId: UUIDv4, postId: UUIDv4) =>
      `users/${userId}/post_likes/${postId}`,
    likePost: (userId: UUIDv4, postId: UUIDv4) =>
      `users/${userId}/post_likes/${postId}`,
    unlikePost: (userId: UUIDv4, postId: UUIDv4) =>
      `users/${userId}/post_likes/${postId}`,

    commentIsLiked: (userId: UUIDv4, commentId: UUIDv4) =>
      `users/${userId}/comment_likes/${commentId}`,
    likeComment: (userId: UUIDv4, commentId: UUIDv4) =>
      `users/${userId}/comment_likes/${commentId}`,
    unlikeComment: (userId: UUIDv4, commentId: UUIDv4) =>
      `users/${userId}/comment_likes/${commentId}`,
  },
};