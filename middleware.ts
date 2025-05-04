export {middleware} from "./middleware/auth"
export const config = {
    matcher: [
      '/api/auth/me',
      '/api/post/create',
      '/api/post/edit/:path*', 
      '/api/post/delete/:path*',
      '/api/post/:path*',
      '/api/post/global',

    ],
  };
  


