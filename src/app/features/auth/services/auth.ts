import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../core/invironments/environment';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private _HttpClient = inject(HttpClient);
  userData:any = null;

  setEmailVerify(data:object):Observable<any>{
      return this._HttpClient.post(`${environment.baseUrl}api/v1/auth/forgotPassword`, data)
     }

      setCodeVerify(data:object):Observable<any>{
      return this._HttpClient.post(`${environment.baseUrl}api/v1/auth/verifyResetCode`, data)
     }

        setResetPass(data:object):Observable<any>{
      return this._HttpClient.put(`${environment.baseUrl}api/v1/auth/resetPassword`, data)
     }

     saveUserData():void{
        if(localStorage.getItem('userToken') !== null){
          this.userData = jwtDecode(localStorage.getItem('userToken')!)
          console.log('user data:' ,this.userData)
        }
     }

}
