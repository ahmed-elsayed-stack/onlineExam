// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayout } from './layouts/blank-layout/blank-layout';
import { Notfound } from './features/pages/notfound/notfound';
import { AUTH_ROUTES } from './features/auth/authRouter';


export const routes: Routes = [
  ...AUTH_ROUTES,       // دمج كل مسارات الـ auth بشكل صحيح
  { path: 'blank', component: BlankLayout },
  { path: '**', component: Notfound }   // صفحة 404 لأي مسار غير موجود
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
