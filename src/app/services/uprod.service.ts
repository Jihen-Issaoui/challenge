import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { Uprodd } from '../models/uprod.model';
import { Uprod } from 'src/app/uprod';
import { Comwork } from 'src/app/comwork';

const baseUrl = 'https://api.uprodit.com/v1/search/all?startIndex=0&maxResults=10&usecase=perso';

const API_URL = "https://api.uprodit.com/v2/profile/picture/f";

const api_auth = 'https://api.uprodit.com/v1/authheader';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 
  //'Access-Control-Allow-Origin': 'https://api.uprodit.com/v1/authheader',
  /*'Access-Control-Allow-Origin':'http://localhost:4200',
  'Access-Control-Allow-Methods': 'POST, GET,OPTIONS, PUT, DELETE',
  "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
  'Access-Control-Allow-Credentials': 'true'
*/
  //'Access-Control-Allow-Headers': 'X-PINGOTHER, Content-Type'
 // 'Authorization': 'Auth ?auth_signature=YfgEOH%2FEfAhneU1YLJoAlUUJZLs%3D&auth_nonce=oLUmYFOyE6tkHCRxrgHkzAy2QW8%3D&auth_callback=%2Fv1%2Fsearch%2Fall%3FstartIndex%3D0%26maxResults%3D10%26usecase%3Dperso&auth_timestamp=1671276008165&auth_token=190a2853-f446-4f54-b4b6-9f892ef97a86&auth_signature_method=HMAC-SHA1&auth_consumer_key=nhVb3d%2B3t0rP0j%2BdAGc6Mv1O5LA%3D'
})
};

@Injectable({
  providedIn: 'root'
})
export class UprodService {
  
  constructor(private http: HttpClient) { }
  
  //  auth

  AuthHeader(url: any): Observable<Uprod[]> {
    return this.http.post<Uprod[]>(api_auth, {
      //headers : {
      "appid":"challenge_uprodit",
      "env":"production",
      "uri": url
      //}
    });
  }
  
  // SearchAll
  SearchAll(auth: any) : Observable<Comwork[]> {
    return this.http.get<Comwork[]>(baseUrl, {
      headers: {
         Authorization : auth , 
        //'Content-Type': 'application/json'
      }
    })
  }

  //getImage
  getImage(id: any,auth: any): Observable<Uprod> {
    return this.http.get(`${API_URL}/${id}`, {
      headers: {
         Authorization : auth , 
        //'Content-Type': 'application/json'
      }
    });
  }
}
