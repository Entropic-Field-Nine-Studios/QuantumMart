import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'profile/:userid',
    renderMode: RenderMode.Server,
  },

  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
