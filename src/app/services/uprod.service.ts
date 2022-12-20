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
/*const Searchall = async (baseUrl) => {
  const result = await Axios.post(`https://api.uprodit.com/v1/authheader`, {
    "appid":"challenge_uprodit",
    "env":"production",
    "uri": baseUrl
  });
  return result.data;
};*/

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


const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';




/*
const hmacsha1 = require('hmacsha1');
const uuid = require('uuid');*/
/*
const appid = "challenge_uprodit";
const env  = "production";
const uri = "https://api.uprodit.com/v1/search/all?startIndex=0&maxResults=10&usecase=perso";
*/



@Injectable({
  providedIn: 'root'
})
export class UprodService {

 // uprod: Uprod[] = []
 
  constructor(private http: HttpClient) { 
  // console.log( this.generateSignature("challenge_uprodit", "production", "https://api.uprodit.com/v1/search/all?startIndex=0&maxResults=10&usecase=perso"));
  
  }


  getAll(): Observable<Uprod[]> {
   /* Axios.post('/user', {
      firstName: 'Fred',
      lastName: 'Flintstone'
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });*/
    return this.http.get<Uprod[]>(api_auth);
  }


  public sendGetRequest(){
    return this.http.get(baseUrl);
  }


  get(id: any): Observable<Uprod> {
    return this.http.get(`${API_URL}/${id}`);
  }
/*
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Uprod[]> {
    return this.http.get<Uprod[]>(`${baseUrl}?title=${title}`);
  }
*/

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

/*
  login(Autorisation: string, password: string): Observable<any> {
    return this.http.post(api_auth, {
      Autorisation,
      password
    }, httpOptions);
  }*/

  
  SearchAll(auth: any) : Observable<Comwork[]> {
    return this.http.get<Comwork[]>(baseUrl, {
      headers: {
         Authorization : auth , 
        //'Content-Type': 'application/json'
      }
    })
  }
/*
  getData() {
    return this.http.get(`${API_URL}/14896397`);//'/assets/config.json'
  }
  */
  getImage(id: any,auth: any): Observable<Uprod> {
    return this.http.get(`${API_URL}/${id}`, {
      headers: {
         Authorization : auth , 
        //'Content-Type': 'application/json'
      }
    });
  }



  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
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
