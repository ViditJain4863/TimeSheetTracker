import { Injectable } from '@angular/core';
import {banner, logo, title} from "../_models/images";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  getLogo(){
    return logo
  }

  getBanner(){
    return banner;
  }

  getTitle(){
    return title;
  }

}
