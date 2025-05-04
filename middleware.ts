export {middleware} from "./middleware/auth"
//todo: find out about this how this works
export const config = {
    matcher: [
      '/api/auth/me',
      '/api/post/create',
      '/api/post/edit/:path*', // <- Matches /api/post/edit/[id] and any subpaths
      '/api/post/delete/:path*',
      '/api/post/:path*',
      '/api/post/global',

    ],
  };
  


