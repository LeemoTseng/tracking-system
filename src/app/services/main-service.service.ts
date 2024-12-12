import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {
  constructor() { }
  private milestoneApiUrl = `json/milestones.json`
  private flightApiUrl = `json/flights.json`
  private apiKey = `${environment.apiKey}`

  http = inject(HttpClient)

  getMilestoneData():Observable<any>{
    return this.http.get(this.milestoneApiUrl+this.apiKey)
  }
  getFlightsData():Observable<any>{
    return this.http.get(this.flightApiUrl+this.apiKey)
  }

}
