import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, registerLocaleData } from '@angular/common';

import esCl from '@angular/common/locales/es-CL';
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
import { CloseScrollStrategy, Overlay } from '@angular/cdk/overlay';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from './angular.module';

registerLocaleData(esCl);

export function scrollFactory(overlay: Overlay): () => CloseScrollStrategy {
  return () => overlay.scrollStrategies.close();
}

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
    MatNativeDateModule,
    { provide: LOCALE_ID, useValue: 'es-CL' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
