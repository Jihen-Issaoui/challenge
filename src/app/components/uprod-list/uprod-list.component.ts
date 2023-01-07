import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, map } from 'rxjs/operators';
import { UprodService } from 'src/app/services/uprod.service';
import { Uprod } from 'src/app/uprod';
import { Comwork } from 'src/app/comwork'; 
import { DomSanitizer } from '@angular/platform-browser';
//import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import generateSignature from 'src/signature';
import { endpointurl } from 'src/endpointurl';

@Component({
  selector: 'app-uprod-list',
  templateUrl: './uprod-list.component.html',
  styleUrls: ['./uprod-list.component.css']
})

export class UprodListComponent implements OnInit  {

  uprod?: Uprod;
  private subjectKey =new Subject<any>();
  comworks: Array<Comwork>=[]
  filterText:any

  constructor(private uprodService: UprodService,
              private sanitizer: DomSanitizer) {  }

    async ngOnInit(): Promise<void> {
    this.SearchAllUprod();
    this.subjectKey.pipe(debounceTime(500)).subscribe(async (T)=>{
      await this.searchAllTerms(T)
    }
    )
  }  

  async onSearch($event: any){
    const value=$event.target.value;
    this.subjectKey.next(value);
  }

  // serach Image
  searchAllImg(image_id: any, id :any) {
    const token = generateSignature(endpointurl.imageURL+`${image_id}`);
    this.uprodService.getImage(image_id,token).subscribe( (data: any)=>{
        const objectURL = 'data:image/jpeg;base64,' + data.b64Content;
        const index = this.comworks?.findIndex(item => id == item.id);
        const com = this.comworks[index];
        com.image_url = objectURL
        this.comworks?.splice(index,1,com)
      },
    error => {
      console.log(error);
      console.log("it's error in searchallImage")
    });
  }

  // serach ALL
  async SearchAllUprod() : Promise<void> {
    const token = generateSignature(endpointurl.searchAllURL);
    this.uprodService.SearchAll(token).subscribe( (data: any)=>{
    this.comworks = data; 
    for (let i = 0; i < data.length; i++) 
    {
        data[i].image_url = "https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/mathier190500002.jpg?ver=6"
        this.searchAllImg(data[i].image_id, data[i].id);
    }
  },
    error => {
      console.log(error);
      console.log("it's error in searchall")
    });
  }


  // serach par terms
  searchAllTerms(term :any) {
    const token = generateSignature(endpointurl.searchTermsURL+`${term}`);
    this.uprodService.getTerms(term,token).subscribe( (data: any)=>{
      console.log(data);
      for (let i = 0; i < data.length; i++) 
    {
        this.searchAllImg(data[i].image_id, data[i].id);
        data[i].image_url = "https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/mathier190500002.jpg?ver=6"
        
    }
    this.searchAllImg(data[0].image_id, data[0].id);
    this.comworks = data; 
      },
    error => {
      console.log(error);
      console.log("it's error in searchallterms")
    });
  }

}


