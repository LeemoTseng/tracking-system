import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainInterfaceService {
  constructor() { }
}

export interface processItems {
  status: string;
  icon: string;
  dateAndTime: string;
  formattedDate?: string;
  flight?: {
    flight: string;
    origin: string;
    destination: string;
  };
  image?: boolean;
  imgUrl?: {
    url: string;
    alt: string;
  }[];
}

export interface ShipmentStatus {
  shipmentId: string;
  processes: processItems[];
}

export interface ApiResponse {
  status: ShipmentStatus[];
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