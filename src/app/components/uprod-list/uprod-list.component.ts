import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
//import { Comwork } from 'src/app/models/comwork.model';
import { UprodService } from 'src/app/services/uprod.service';
import { Uprod } from 'src/app/uprod';
import { Comwork } from 'src/app/comwork';
//import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
//import { FormControl } from '@angular/forms';
import { startWith} from 'rxjs/operators';
/*import { Thumbnail } from 'src/app/thmbnail';
import { promises } from 'dns';*/

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 
  
})
};

@Component({
  selector: 'app-uprod-list',
  templateUrl: './uprod-list.component.html',
  styleUrls: ['./uprod-list.component.css']
})




export class UprodListComponent implements OnInit  {

  tutorials?: Uprod;
  //comworks?: Comwork[];
  //filterText: string = '';
  private subjectKey =new Subject<any>();
  comworks: Array<Comwork>=[]
  filterText:any

  constructor(private uprodService: UprodService,
    private route: ActivatedRoute,
    private router: Router, private sanitizer: DomSanitizer) {  }

    async ngOnInit(): Promise<void> {
    this.AuthHeaderUprod();
    //console.log(this.searchAllImg(14896397, 130150))
    this.subjectKey.pipe(debounceTime(500)).subscribe(async (T)=>{
      console.log("term: "+T);
      await this.authHeaderSearchTerms(T)
    }
    )
    
  }  

  async onSearch($event: any){
    const value=$event.target.value;
    this.subjectKey.next(value);
  }

  async authHeaderImg(image_id : number, id : number): Promise<void> {
    this.uprodService.AuthHeader(`https://api.uprodit.com/v2/profile/picture/f/${image_id}`)
      .subscribe(
       ( data: any)  => {
          localStorage.setItem("token",data.authorization)
          this.searchAllImg(image_id,id)
        },
        error => {
          console.log(error);
          console.log("it's error")
        });
  }
 

  searchAllImg(image_id: any, id :any) {
    const token = localStorage.getItem("token");
    this.uprodService.getImage(image_id,token).subscribe( (data: any)=>{
        const objectURL = 'data:image/jpeg;base64,' + data.b64Content;
        //const thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        const index = this.comworks?.findIndex(item => id == item.id);
        
        const com0 = this.comworks[0];
       // console.log(com0);
        // com0.image_url = 'https://material.angular.io/assets/img/examples/shiba1.jpg'
        if (index && this.comworks) {
          const com = this.comworks[index];
          com.image_url = objectURL
         // console.log(com.image_url);
          this.comworks?.splice(index,1,com)
        }  
      },
    error => {
      console.log(error);
      console.log("it's error in searchallImage")
    });
  }


  async AuthHeaderUprod(): Promise<void> {
    this.uprodService.AuthHeader("https://api.uprodit.com/v1/search/all?startIndex=0&maxResults=10&usecase=perso")
      .subscribe(
       ( data: any)  => {
          localStorage.setItem("token",data.authorization)
          this.SearchAllUprod()
        },
        error => {
          console.log(error);
          console.log("it's error")
        });
  }


  async SearchAllUprod() : Promise<void> {
    const token = localStorage.getItem("token");
    this.uprodService.SearchAll(token).subscribe( (data: any)=>{
    for (let i = 0; i < data.length; i++) 
    {
        //data[i].image_url = "https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/mathier190500002.jpg?ver=6"
        this.authHeaderImg(data[i].image_id, data[i].id);
    }
    this.authHeaderImg(data[0].image_id, data[0].id);
    console.log(data[1].image_url)
    //console.log(data[0].image_url)
    this.comworks = data; 
    //console.log(data)     
    },
    error => {
      console.log(error);
      console.log("it's error in searchall")
    });
  }


  // serach par terms

  authHeaderSearchTerms(term : string): void{
    this.uprodService.AuthHeader(`https://api.uprodit.com/v1/search/all?startIndex=0&maxResults=10&usecase=perso&terms=${term}`)
      .subscribe(
       ( data: any)  => {
          localStorage.setItem("token",data.authorization)
          this.searchAllTerms(term)
        },
        error => {
          console.log(error);
          console.log("it's error")
        });
  }
 

  async searchAllTerms(term :any) : Promise<void> {
    const token = localStorage.getItem("token");
    this.uprodService.getTerms(term,token).subscribe( (data: any)=>{
      console.log(data);
      for (let i = 0; i < data.length; i++) 
    {
        data[i].image_url = "https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/mathier190500002.jpg?ver=6"
        this.authHeaderImg(data[i].image_id, data[i].id);
    }
    this.authHeaderImg(data[0].image_id, data[0].id);
    //this.comworks = data; 
     // console.log(data[2].skills.name);
     // console.log(data[1].specialities);
      this.comworks = data; 
      },
    error => {
      console.log(error);
      console.log("it's error in searchallterms")
    });
  }

}


