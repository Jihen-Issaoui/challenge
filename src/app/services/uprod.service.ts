import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Uprod } from 'src/app/uprod';
import { Comwork } from 'src/app/comwork';
import { endpointurl } from 'src/endpointurl';

@Injectable({
  providedIn: 'root'
})
export class UprodService {
 
  constructor(private http: HttpClient) { }

  SearchAll(auth: any) : Observable<Comwork[]> {
    return this.http.get<Comwork[]>(endpointurl.searchAllURL, {
      headers: {
         Authorization : auth , 
        //'Content-Type': 'application/json'
      }
    })
  }

  getImage(id: any,auth: any): Observable<Uprod> {
    return this.http.get(endpointurl.imageURL+`${id}`, {
      headers: {
         Authorization : auth , 
        //'Content-Type': 'application/json'
      }
    });
  }


  getTerms(term: any,auth: any): Observable<Uprod> {//endpointurl.searchAllURL+`&terms=${term}`
    return this.http.get(endpointurl.searchTermsURL+`${term}`, {
      headers: {
         Authorization : auth , 
        //'Content-Type': 'application/json'
      }
    });
  }

}
