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
 // const rslt : Observable<any> = this.uprodService.SearchAll(this.uprodService.AuthHeader("https://api.uprodit.com/v1/search/all?startIndex=0&maxResults=10&usecase=perso"));
         
  tutorials?: Uprod;
  comwork?: Comwork[] = [];
  cowork? : Comwork ;
  
  filterTerm!: string;
  userRecords = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      username: 'Samantha',
      email: 'Nathan@yesenia.net',
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      username: 'Karianne',
      email: 'Julianne.OConner@kory.org',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      username: 'Kamren',
      email: 'Lucio_Hettinger@annie.ca',
    },
    {
      id: 6,
      name: 'Mrs. Dennis Schulist',
      username: 'Leopoldo_Corkery',
      email: 'Karley_Dach@jasper.info',
    },
    {
      id: 7,
      name: 'Kurtis Weissnat',
      username: 'Elwyn.Skiles',
      email: 'Telly.Hoeger@billy.biz',
    },
    {
      id: 8,
      name: 'Nicholas Runolfsdottir V',
      username: 'Maxime_Nienow',
      email: 'Sherwood@rosamond.me',
    },
    {
      id: 9,
      name: 'Glenna Reichert',
      username: 'Delphine',
      email: 'Chaim_McDermott@dana.io',
    },
    {
      id: 10,
      name: 'Clementina DuBuque',
      username: 'Moriah.Stanton',
      email: 'Rey.Padberg@karina.biz',
    },
  ];


//  image_id? : [];
  
/*
    myControl = new FormControl('');
    options: string[] = ['One', 'Two', 'Three'];
    filteredOptions?: Observable<string[]>;
*/

  constructor(private uprodService: UprodService,
    private route: ActivatedRoute,
    private router: Router, private sanitizer: DomSanitizer) {  }

  ngOnInit(): void {
   
    const fileId = localStorage.getItem("fileId");
    console.log(fileId) 
    this.AuthHeaderUprod();


  
    //const image_id = localStorage.getItem("names");
    //console.log(image_id);

    //this.AuthHeaderImg(image_id)

 /*   this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );*/
  }


 /* private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }*/
  

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
