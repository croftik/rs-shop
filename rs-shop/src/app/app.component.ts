import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { HttpService } from './services/http/http.service';
import { SetCategories, SetCurrentCategory, SetToken, SetUserInfo } from './store/shop.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store, private httpService: HttpService){}
  
  ngOnInit() {
    this.httpService.getData('categories').subscribe((data:any) => {
      this.store.dispatch(new SetCategories(data));
      this.store.dispatch(new SetCurrentCategory(data[0]));
    });
    if (localStorage.getItem('user')) this.store.dispatch(new SetToken(<string>localStorage.getItem('user')));
  }
}
