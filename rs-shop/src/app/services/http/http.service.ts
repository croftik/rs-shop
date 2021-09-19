import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseUrl } from 'src/app/utils/data';
import { ISignInData, ISignUpData } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {}

  getData(url: string) {
    return this.http.get(`${baseUrl}/${url}`);
  }

  postNewUser(body: ISignUpData, token: string) {
    const myHeaders = new HttpHeaders().set('token', token);
    return this.http.post(`${baseUrl}/users/register`, body, {headers: myHeaders});
  }

  getUserInfo(token: string) {
    const myHeaders = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${baseUrl}/users/userInfo`, {headers: myHeaders});
  }

  postUser(body: ISignInData) {
    return this.http.post(`${baseUrl}/users/login`, body);
  }

  postInCart(id: string) {
    const body = {
      "id": id
    }
    return this.http.post(`${baseUrl}/users/cart`, body, {headers: this.getHeadersAuthorization()});
  }

  deleteGoodFromCart(id: string) {
    return this.http.delete(`${baseUrl}/users/cart?id=${id}`, {headers: this.getHeadersAuthorization()});
  }

  deleteGoodFromFavourite(id: string) {
    return this.http.delete(`${baseUrl}/users/favorites?id=${id}`, {headers: this.getHeadersAuthorization()});
  }

  getToken(): string {
    return <string>localStorage.getItem('user');
  }

  getHeadersAuthorization(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
  }

  postInFavourite(id: string) {
    const body = {
      "id": id
    }
    return this.http.post(`${baseUrl}/users/favorites`, body, {headers: this.getHeadersAuthorization()});
  }

  postOrder(body: any) {
    return this.http.post(`${baseUrl}/users/order`, body, {headers: this.getHeadersAuthorization()});
  }

}
