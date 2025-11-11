import { Observable } from "rxjs";

export abstract class authApi {
  abstract login(data:any):Observable<any>;
  abstract register(data:any):Observable<any>;
  abstract changePassword(data:any):Observable<any>;
  abstract deleteMyAccount():Observable<any>;
  abstract editProfile(data:any):Observable<any>;
  abstract logout():Observable<any>;
  abstract forgotPassword(data:any):Observable<any>;
  abstract verifyResetcode(data:any):Observable<any>;
  abstract resetPassword(data:any):Observable<any>;
}



