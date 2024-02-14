import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';


@NgModule({
  declarations: [
    FooterComponent,
    BreadcrumbComponent
  ],
  exports: [
  ],
  imports: [
    CommonModule,
  ]
})
export class LayoutComponentsModule {
}
