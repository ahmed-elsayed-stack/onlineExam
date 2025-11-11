import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { authApi } from './base/authApi';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthEndPoint } from './enums/authEndPoint';
import { AuthApiAdaptor } from './adaptor/auth-api';

@Injectable({
  providedIn: 'root',
})
export class Authentication  implements authApi{

  _HttpClient = inject(HttpClient);
  _AuthApiAdaptor = inject(AuthApiAdaptor);
   userData:any = null;

   login(data: any): Observable<any> {
      return this._HttpClient.post(AuthEndPoint.LOGIN , data).pipe(map(res=> this._AuthApiAdaptor.adapt(res))
      ,catchError(err=> of(err))
    )
  }

   register(data: any): Observable<any> {
      return this._HttpClient.post(AuthEndPoint.REGISTER , data).pipe(map(res=> this._AuthApiAdaptor.adapt(res))
      ,catchError(err=> of(err))
    )
  }
   forgotPassword(data: any): Observable<any> {
      return this._HttpClient.post(AuthEndPoint.FORGOTPASSWORD , data)
  }
   verifyResetcode(data: any): Observable<any> {
      return this._HttpClient.post(AuthEndPoint.VERIFYRESETCODE , data)
  }

   resetPassword(data: any): Observable<any> {
      return this._HttpClient.put(AuthEndPoint.RESETPASSWORD , data)
  }
   editProfile(data: any): Observable<any> {
      return this._HttpClient.put(AuthEndPoint.EDITPROFILE , data)
  }
   changePassword(data: any): Observable<any> {
      return this._HttpClient.patch(AuthEndPoint.CHANGEpASSWORD , data)
  }
   deleteMyAccount(): Observable<any> {
      return this._HttpClient.delete(AuthEndPoint.DELETEMYACCOUNT )
  }
   logout(): Observable<any> {
      return this._HttpClient.get(AuthEndPoint.LOGOUT )
  }

     saveUserData():void{
        if(localStorage.getItem('userToken') !== null){
          this.userData = jwtDecode(localStorage.getItem('userToken')!)
          console.log('user data:' ,this.userData)
        }
     }

}
