import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
import { Role } from './add-ons/role';


// array in local storage for registered users
const usersKey = 'angular-11-crud-example-users';
const usersJSON = localStorage.getItem(usersKey);
let users: any[] = usersJSON ? JSON.parse(usersJSON) : [{
    id: 1,
    title: 'Mr',
    firstName: 'Joe',
    lastName: 'Bloggs',
    email: 'joe@bloggs.com',
    role: Role.Admin,
    password: 'joe123'
}];



@Injectable()
export class DangerInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const { url, method,body } = request;
    return <any>handleRoute();

    
    function handleRoute() {
      switch (true) {
          case url.endsWith('/users') && method === 'GET':
              return getUsers();
          case url.match(/\/users\/\d+$/) && method === 'GET':
              return getUserById();
          case url.endsWith('/users') && method === 'POST':
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
    const user = body;

    if (user.find((x: { email: any; }) => x.email === user.email)) {
        return Error(`User with the email ${user.email} already exists`);
    }

    // assign user id and a few other properties then save
    user.id = newUserId();
    delete user.confirmPassword;
    users.push(user);
    localStorage.setItem(usersKey, JSON.stringify(users));
    return ok();
   
}
function ok(body?: any) { return of(new HttpResponse({ status: 200, body })).pipe(delay(500));}
function getUsers() {
  return ok(users.map(x => basicDetails(x)));
}


function getUserById() {
  const user = users.find(x => x.id === idFromUrl());
  return ok(basicDetails(user));
}

function updateUser() {
  let params = body;
  let user = users.find(x => x.id === idFromUrl());

  if (params.email !== user.email && users.find(x => x.email === params.email)) {
      return Error(`User with the email ${params.email} already exists`);
  }

  // only update password if entered
  if (!params.password) {
      delete params.password;
  }

  // update and save user
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
  return parseInt(urlParts[urlParts.length - 1]);
}

function newUserId() {
  return users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
}
function basicDetails(user: any) {
  const { id, title, firstName, lastName, email, role } = user;
  return { id, title, firstName, lastName, email, role };
}
  }
}


