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

export interface statusInterface {
  number?: number
  MAWB_No: string
  HAWB_No: string
  processes: Array<{
    status: string;
    dateAndTime: string;
    img?: Array<{
      id?: number;
      imgName?: string;
      imgUrl?: string;
    }>;
  }>;
}