import { Injectable } from '@angular/core';
import { HistoryDTO } from '../DTOs/historyDTO';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from '../shared/CONFIG'
import { Observable } from 'rxjs';
import { UserDTO } from '../DTOs/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  config: CONFIG = new CONFIG();

  constructor(private http: HttpClient) { }

  async getMockData(){
    /*let historyPosts = [];
    let historyPost1 = new HistoryDTO();
    historyPost1.date = "30.03.2023";
    historyPost1.actionId = "101";
    historyPost1.id = "201";
    historyPost1.userId = "301";

    let historyPost2 = new HistoryDTO();
    historyPost2.date = "01.04.2023";
    historyPost2.actionId = "102";
    historyPost2.id = "202";
    historyPost2.userId = "301";

    let historyPost3 = new HistoryDTO();
    historyPost3.date = "29.03.2023";
    historyPost3.actionId = "101";
    historyPost3.id = "203";
    historyPost3.userId = "302";

    let historyPost4 = new HistoryDTO();
    historyPost4.date = "31.04.2023";
    historyPost4.actionId = "103";
    historyPost4.id = "204";
    historyPost4.userId = "302";

    historyPosts.push(historyPost1);
    historyPosts.push(historyPost2);
    historyPosts.push(historyPost3);
    historyPosts.push(historyPost4);
    return historyPosts*/
  }

  getFeed() {

    this.http.get<HistoryDTO[]>(this.config.backendDevAPI + 'Login')
      .subscribe(result => {
        let loginResult = String((result as any).value);

        if(loginResult != "not logged in") {
          let userId: string = loginResult.split(' ')[2];

          this.http.get(this.config.backendDevAPI + 'Users/' + userId)
            .subscribe(user => {
              let currentUser = (user as UserDTO);

              return this.http.get(this.config.backendDevAPI + 'History/GetHistoryByCompanyId/' + currentUser.companyId );
            });

        }
      });
  }
}
