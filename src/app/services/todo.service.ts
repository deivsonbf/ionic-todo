import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';

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
      task_date: data,
    }

    return this.http.post(url , param , header).toPromise();
  }

  update(tarefa : string){
    let url = 'http://localhost:3000/tasks';
    var header = {
      headers: new HttpHeaders()
     .set('Content-Type' , `application/json`)
    } 
    return this.http.put(url , tarefa , header).toPromise();
  }

  list(){
    let url = 'http://localhost:3000/tasks';
    return this.http.get(url).toPromise();
  }


}
