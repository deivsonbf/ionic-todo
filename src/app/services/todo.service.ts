import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http : HttpClient) { }

  add(tarefa : string , data : string){
    let url = 'http://localhost:3000/tasks';
    var header = {
      headers: new HttpHeaders()
     .set('Content-Type' , `application/json`)
    } 

    let param = {
      task_name: tarefa,
      task_date: data
    }

    return this.http.post(url , param , header).toPromise();
  }

  update(tarefa : any , done : boolean , nome: string , data : string){
    let url = 'http://localhost:3000/tasks';
    var header = {
      headers: new HttpHeaders()
     .set('Content-Type' , `application/json`)
    } 

    let param = {
      id_task: tarefa,
      task_done : done,
      task_name : nome, 
      task_date : data   
    }

    return this.http.patch(url , param , header).toPromise();
  }

  list(){
    
    let url = 'http://localhost:3000/tasks';

    return this.http.get(url).toPromise();
  }

 
  deleted(id: any){
debugger

    let url = 'http://localhost:3000/tasks/id/';

      return this.http.delete(url).toPromise(); 

    }

  }
