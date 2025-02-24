import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {
  constructor() { }

  milestoneApiUrl = environment.milestoneApiUrl;
  flightApiUrl = environment.flightApiUrl;
  fileApiUrl = environment.fileApiUrl;
  shipmentDetailsApiUrl = environment.shipmentDetailsApiUrl;
  allShipmentListApiUrl = environment.AllShipmentListUrl;
  ShipmentSummaryUrl = environment.ShipmentSummaryUrl;
  userUrl = environment.userUrl;

  http = inject(HttpClient)

  getMilestoneData():Observable<any>{
    return this.http.get(this.milestoneApiUrl)
  }
  getFlightsData():Observable<any>{
    return this.http.get(this.flightApiUrl)
  }

  getFilesData():Observable<any>{
    return this.http.get(this.fileApiUrl)
  }

  getShipmentDetailsData():Observable<any>{
    return this.http.get(this.shipmentDetailsApiUrl)
  }

  getAllShipmentListData():Observable<any>{
    return this.http.get(this.allShipmentListApiUrl)
  }

  getShipmentSummaryData():Observable<any>{
    return this.http.get(this.ShipmentSummaryUrl)
  }

  getUserData():Observable<any>{
    return this.http.get(this.userUrl)
  }

}
