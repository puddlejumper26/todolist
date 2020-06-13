import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import cn from '@angular/common/locales/zh';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ItemComponent } from './components/item/item.component';
import { EditModalComponent } from './components/edit-modal/edit-modal.component';

registerLocaleData(cn);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ItemComponent,
    EditModalComponent
  ],
  imports: [
    BrowserModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NoopAnimationsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
