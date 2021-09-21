import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISignInData, ISignUpData } from 'src/app/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {}

  getData(url: string) {
    return this.http.get(`/${url}`);
  }

  postNewUser(body: ISignUpData) {
    return this.http.post(`/users/register`, body);
  }

  getUserInfo() {
    return this.http.get(`/users/userInfo`);
  }

  postUser(body: ISignInData) {
    return this.http.post(`/users/login`, body);
  }

  postInCart(id: string) {
    const body = {
      "id": id
    }
    return this.http.post(`/users/cart`, body);
  }

  deleteGoodFromCart(id: string) {
    return this.http.delete(`/users/cart?id=${id}`);
  }

  deleteGoodFromFavourite(id: string) {
    return this.http.delete(`/users/favorites?id=${id}`);
  }

  deleteOrder(id: string) {
    return this.http.delete(`/users/order?id=${id}`);
  }

  getToken(): string {
    return <string>localStorage.getItem('user');
  }

  postInFavourite(id: string) {
    const body = {
      "id": id
    }
    return this.http.post(`/users/favorites`, body);
  }

  postOrder(body: any) {
    return this.http.post(`/users/order`, body, {responseType: 'text'});
  }

}
