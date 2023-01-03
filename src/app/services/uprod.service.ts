import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { Uprodd } from '../models/uprod.model';
import { Uprod } from 'src/app/uprod';
import { Comwork } from 'src/app/comwork';
//import { Axios } from 'axios';

//import hmacsha1 from 'hmacsha1'
//import { v4 } from 'uuid'

const baseUrl = 'https://api.uprodit.com/v1/search/all?startIndex=0&maxResults=10&usecase=perso' //'http://localhost:8080/api/tutorials';

const API_URL = "https://api.uprodit.com/v2/profile/picture/f";

const api_auth = 'https://api.uprodit.com/v1/authheader';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

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

  SearchAll(auth: any) : Observable<Comwork[]> {
    return this.http.get<Comwork[]>(baseUrl, {
      headers: {
         Authorization : auth , 
        //'Content-Type': 'application/json'
      }
    })
  }

  getImage(id: any,auth: any): Observable<Uprod> {
    return this.http.get(`${API_URL}/${id}`, {
      headers: {
         Authorization : auth , 
        //'Content-Type': 'application/json'
      }
    });
  }


  getTerms(term: any,auth: any): Observable<Uprod> {
    return this.http.get(`${baseUrl}&terms=${term}`, {
      headers: {
         Authorization : auth , 
        //'Content-Type': 'application/json'
      }
    });
  }


  /*public generateSignature(appid : string, env : string, uri : string) {
    var auth_signature_method = 'HMAC-SHA1';
    var auth_consumer_key = encodeURIComponent(hmacsha1(appid, env));
    var auth_token = uuid.v4();
    var uri_path = uri.replace(new RegExp('http(s)?://[^/]*'), '')
    var auth_signature = encodeURIComponent(hmacsha1(appid, uri_path + auth_token));
    var auth_nonce = encodeURIComponent(hmacsha1(appid, uuid.v4()));
    var auth_callback = encodeURIComponent(uri_path);
    var auth_timestamp = new Date().getTime();
  
    return `Auth ?auth_signature=${auth_signature}&auth_nonce=${auth_nonce}&auth_callback=${auth_callback}&auth_timestamp=${auth_timestamp}&auth_token=${auth_token}&auth_signature_method=${auth_signature_method}&auth_consumer_key=${auth_consumer_key}`;
  }*/
  
 
  

}
