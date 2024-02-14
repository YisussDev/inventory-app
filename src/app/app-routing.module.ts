import {NgModule} from '@angular/core';
import {PreloadingStrategy, RouterModule, Routes} from '@angular/router';
import {PresentationComponent} from "./presentation/presentation.component";
import {CustomPreloadingStrategy} from "./core/strategy/preload.strategy";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./presentation/presentation.module').then(m => m.PresentationModule),
    component: PresentationComponent
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: PreloadingStrategy,
      useClass: CustomPreloadingStrategy
    }
  ]
})
export class AppRoutingModule {
}
