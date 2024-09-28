import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: 'register',
      loadChildren: ()=> import('./features/auth/auth.routes').then((m) => m.registerRoutes),
    },
    {
      path: 'login',
      loadChildren: () =>
        import('./features/auth/auth.routes').then((m) => m.loginRoutes),
    },
    {
      path: '',
      loadChildren: () =>
        import('./features/globalFeed/globalFeed.routes').then((m) => m.routes),
    },
  ];
