import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { OtpComponent } from './user/otp/otp.component';
import { RegisterComponent } from './user/register/register.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

//material link
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ToastrModule } from 'ngx-toastr';
import { NgOtpInputModule } from  'ng-otp-input';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ApiHeadInterceptor } from './service/api-head.interceptor';
import { DeginTestComponent } from './degin-test/degin-test.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { LoaderCompComponent } from './loader-comp/loader-comp.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { UserFormComponent } from './user-form/user-form.component';
import { CustomPipePipe } from './custom-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OtpComponent,
    RegisterComponent,
    PageNotFoundComponent,
    DeginTestComponent,
    LoaderCompComponent,
    UserFormComponent,

  ],
  imports: [
    BrowserModule,FormsModule,ReactiveFormsModule,MatBottomSheetModule,
    AppRoutingModule,HttpClientModule,MatNativeDateModule,MatProgressSpinnerModule,
    NoopAnimationsModule,MatDatepickerModule,MatDialogModule,
    MatIconModule,MatSidenavModule,MatSelectModule,MatTabsModule,BrowserAnimationsModule,MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,ToastrModule,NgOtpInputModule,RouterModule,
    ToastrModule.forRoot(
      {timeOut: 1000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        maxOpened:1,
        autoDismiss:true,
      })
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:ApiHeadInterceptor,multi : true},MatSnackBar,
    {provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
  

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
