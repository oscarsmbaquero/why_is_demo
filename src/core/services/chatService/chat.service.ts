import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../enviroment/environment";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  constructor(private http: HttpClient) {}

  // sendMessage(messages: any[], tipo: string): Observable<any> {
  //   return this.http.post<any>( `${environment.apiUrl}chat`, { messages, tipo });
  // }
  sendMessage(messages: any[], tipo: string): Observable<any> {
  const headers = {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  };
  return this.http.post<any>(`${environment.apiUrl}`, { messages, tipo }, { headers });
}

obtenerFacturas(): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  });

  return this.http.get<any>(`${environment.apiUrlFacturas}`, { headers });
}
}
