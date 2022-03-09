import { Injectable, } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { delay, Observable, of} from 'rxjs';
import { Role } from './add-ons/role';



// array in local storage for registered users
const usersKey = 'USERS DATA';
const usersJSON = localStorage.getItem(usersKey);
//json parse is used dto convert the jsonstring into object
let users: any[] = usersJSON ? JSON.parse(usersJSON) : [
{
  id: 1,
  title: 'Mr',
  firstName: 'RAGAVENDRAN',
  lastName: 'R',
  email: 'hi@gmail.com',
  role: Role.Admin,
  password: 'joe123'
}
];



@Injectable()
export class DangerInterceptor implements HttpInterceptor{

  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const { url, method,body } = request;

    return <any>handleRoute();

    function handleRoute() {

      console.log('Interceptor function tiggered')
      console.log(method)

        switch (true) {
            case url.endsWith('/users') && method === 'GET':
                return getUsers();
            case url.match(/\/users\/\d+$/) && method === 'GET':
                return getUserById();
            case  method === 'POST':
                return createUser();
            case url.match(/\/users\/\d+$/) && method === 'PUT':
                return updateUser();
            case url.match(/\/users\/\d+$/) && method === 'DELETE':
                return deleteUser();
            default:
                // pass through any requests not handled above
                return next.handle(request);
        }    
  }

  function createUser() {
    let user = body;
    user.id = newUserId();
    delete user.confirmPassword;
    users.push(user);
    //stringify used to convert array to string.
    localStorage.setItem(usersKey, JSON.stringify(users));
    return ok();
}


function getUsers() {
  localStorage.getItem('key')
  //itaration of array
  return ok(users.map(x => basicDetails(x)));
}


function getUserById() {
  //find used to find array predication (true/undefined)
  let user = users.find(x => x.id === idFromUrl());
  return ok(basicDetails(user));
}

function updateUser() {
  let params = body;
  
  let user = users.find(x => x.id === idFromUrl());

  if (params.email !== user.email && users.find(x => x.email === params.email)) {
      return Error(`User with the email already exists`);
  }

  if (!params.password) {
      delete params.password;
  }

  Object.assign(user, params);
  localStorage.setItem(usersKey, JSON.stringify(users));
  return ok();
}

function deleteUser() {

  users = users.filter(x => x.id !== idFromUrl());
  
  localStorage.setItem(usersKey, JSON.stringify(users));
  
  return ok();
}

function idFromUrl() {
  
  const urlParts = url.split('/');

  //used to convert the string into integer
  return parseInt(urlParts[urlParts.length - 1]);
}

function newUserId() {
 
  return users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;

}

function basicDetails(user: any) {
  return user;
}
// of is used to create an observable 
function ok(body?: any) { return of(new HttpResponse({ status: 200, body })).pipe(delay(500));}
}

}


