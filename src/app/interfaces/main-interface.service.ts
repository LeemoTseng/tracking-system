import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainInterfaceService {
  constructor() { }
}

export interface processItems {
  name: string;
  icon: string;
  flight?: [{
    flight: string;
    origin: string;
    destination: string;
  }],
  time?: string;
  image?: boolean;
  imgUrlList?: [
    {
      imgUrl?: string;
      imgAlt?: string;
    }
  ];

}