import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import { Comwork } from 'src/app/models/comwork.model';
import { UprodService } from 'src/app/services/uprod.service';
import { Uprod } from 'src/app/uprod';
import { Comwork } from 'src/app/comwork';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { startWith} from 'rxjs/operators';

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

  thumbnail: any;      
  tutorials?: Uprod;
  comwork?: Comwork[] = [];
  cowork? : Comwork ;


  constructor(private uprodService: UprodService,
    private route: ActivatedRoute,
    private router: Router, private sanitizer: DomSanitizer) {  }

  ngOnInit(): void {
   
    const fileId = localStorage.getItem("fileId");
    console.log(fileId) 
    this.AuthHeaderUprod();

  }
  
  // Token AuthImage

  AuthHeaderImg(image_id : number, id : number): void {
  
    this.uprodService.AuthHeader(`https://api.uprodit.com/v2/profile/picture/f/${image_id}`)
      .subscribe(
       ( data: any)  => {
          //console.log(data.authorization);
          localStorage.setItem("token",data.authorization)
          this.SearchAllImg(image_id,id)
          //this.img();
         // console.log("hhh"+this.SearchAllImg)

        },
        error => {
          console.log(error);
          console.log("it's error")
        });
  }


SearchAllImg(image_id: any, id :any) : void {
  const token = localStorage.getItem("token");
  
  this.uprodService.getImage(image_id,token).subscribe( (data: any)=>{
     
      if ( data.searchId == image_id && data.profileId ==  id){
      this.tutorials = data;
      let objectURL = 'data:image/jpeg;base64,' + data.b64Content;

       this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);

      }
  },
  error => {
    console.log(error);
    console.log("it's error in searchallImage")
  });
}


  // Token AuthSearchAll
  AuthHeaderUprod(): void {
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


  SearchAllUprod() : void {
    const token = localStorage.getItem("token");
    this.uprodService.SearchAll(token).subscribe( (data: any)=>{
      this.comwork = data;
      
      var names = [];
      for (let i = 0; i < data.length; i++) {

        console.log(data[i].image_id);
        console.log(data[i].id);
        this.AuthHeaderImg(data[i].image_id, data[i].id);
        names[i] = data[i].image_id;

        }
      localStorage.setItem("names", JSON.stringify(names));
      console.log("img console : "+ names);
      
    },
    error => {
      console.log(error);
      console.log("it's error in searchall")
    });
  }

}
