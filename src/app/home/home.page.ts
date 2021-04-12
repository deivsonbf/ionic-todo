import { Component } from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  ToastController,
} from '@ionic/angular';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  listaDeTarefas: any[] = [];

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private todoService: TodoService
  ) {
    // let taskJson = localStorage.getItem('tasksDb');

    // if (taskJson != null) {
    //   this.listaDeTarefas = JSON.parse(taskJson);
    // }
    this.loadTasks();
  }

  loadTasks() {
    this.todoService
      .list()
      .then(async (resp: any) => {
        this.listaDeTarefas = resp.response;
      })
      .catch(async (error) => {
        console.log(error);
      });
  }

  async showAdd() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Adicionar Tarefa',
      inputs: [
        {
          name: 'task',
          type: 'text',
          placeholder: 'O que deseja fazer',
        },
        {
          name: 'data',
          type: 'date',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelei a ação');
          },
        },
        {
          text: 'Adicionar',
          handler: (form) => {
            this.add(form.task, form.data);
          },
        },
      ],
    });
    await alert.present();
  }

  async add(newTask: string, data: string) {
    if (newTask.trim().length < 1 || data.trim().length < 1) {
      const toast = await this.toastCtrl.create({
        message: 'Insira algo',
        duration: 2000,
        position: 'top',
      });
      toast.present();
      return;
    }

    if (data.substring(0, 4).valueOf() < '2021') {
      const toast = await this.toastCtrl.create({
        message: 'Data invalida',
        duration: 2000,
        position: 'middle',
      });
      toast.present();
      return;
    }

    let task = { name: newTask, date: data};

    this.listaDeTarefas.push(task);

    this.todoService
      .add(task.name, task.date)
      .then(async (response) => {
        console.log(response);
        const toast = await this.toastCtrl.create({
          message: 'cadastrado com sucesso!',
          duration: 2000,
          position: 'middle',
        });
        toast.present();
        this.loadTasks();
      })
      .catch(async (erro) => {
        const toast = await this.toastCtrl.create({
          message: 'Por algum motivo falhou essa bosta rsrs',
          duration: 2000,
          position: 'middle',
        });
        toast.present();
      });
  }

  updateLocalStorage() {
    localStorage.setItem('tasksDb', JSON.stringify(this.listaDeTarefas));
  }

  async openActions(task : any) {
    console.log(task.task_done);
    
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'O que deseja fazer?',
      buttons: [
        {
          text: task.task_done ? 'Desmarcar' : 'Marcar',
          icon: task.task_done ? 'radio-button-off' : 'checkmark-circle',
          handler: () => {
            
            task.task_done = !task.task_done;

            this.todoService
            .update(task.id_task , task.task_done , task.task_name , task.task_date)
              .then((response) => {
                console.log(task.task_done);
                console.log(task);
                
              })
              .catch((erro) => {
                console.error(erro);
              });
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
          },
        },
      ],
    });
    await actionSheet.present();
  }

 deleted(task : any) {

    console.log(task);
    
  debugger;
    this.todoService.deleted(task.id_task)
    .then(async (response) => {
      console.log(response);
      const toast = await this.toastCtrl.create({
        message: 'deletado com sucesso!',
        duration: 2000,
        position: 'middle',
      });
      toast.present();
      this.loadTasks();
    })
    .catch(async (erro) => {
      const toast = await this.toastCtrl.create({
        message: 'Por algum motivo falhou essa bosta rsrs',
        duration: 2000,
        position: 'middle',
      });
      toast.present();
    });
  }
}
