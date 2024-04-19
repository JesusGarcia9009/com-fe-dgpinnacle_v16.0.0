import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SidebarModule } from './modules/sidebar/sidebar.module';
import { FooterModule } from './modules/shared/footer/footer.module';
import { NavbarModule } from './modules/navbar/navbar.module';
import { FixedpluginModule } from './modules/shared/fixedplugin/fixedplugin.module';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { AppRoutes } from './app.routing';
import { CoreModule } from './modules/core/core/core.module';
import { ClienteExternoComponent } from './layouts/cliente-externo/cliente-externo.component';
import { LOCALE_ID } from '@angular/core';
import { MaterialModule } from './app.material.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true
    }),
    MaterialModule,
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedpluginModule,
    CoreModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    ClienteExternoComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CL' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }