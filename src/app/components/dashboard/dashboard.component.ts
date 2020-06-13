import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  // add Todo title
  todoTitle = '';
  // data array
  dataArray: Array<Object> = [];
  // waiting list array
  doingArray: Array<Object> = [];
  // finished array
  doneArray: Array<Object> = [];

  constructor(private message: NzMessageService) {}

  ngOnInit() {
    this.getToDoList();
  }

  // obtain list data
  private getToDoList(): void {
    const dataString: string = localStorage.getItem('todo-list');
    if (dataString != null) {
      this.dataArray = JSON.parse(dataString);
      for (let i = 0; i < this.dataArray.length; i++) {
        const element: any = this.dataArray[i];
        if (element.done === true) {
          this.doneArray.push(element);
        } else {
          this.doingArray.push(element);
        }
      }
    }
  }

  // add Todo
  addTodo(): void {
    if (this.todoTitle === '') {
      this.message.info('Please input title');
    } else {
      const item = {
        done: false,
        title: this.todoTitle,
      };
      this.doingArray.push(item);
      this.dataArray.push(item);
      this.todoTitle = '';
      localStorage.setItem('todo-list', JSON.stringify(this.dataArray));
    }
  }

  checkItem(data: Object) {
    const index: number = data['index'];
    const title: boolean = data['title'];
    const done: boolean = data['done'];
    const newItem = {
      done: done,
      title: title,
    };
    if (done) {
      this.doingArray.splice(index, 1);
      this.doneArray.push(newItem);
    } else {
      this.doneArray.splice(index, 1);
      this.doingArray.push(newItem);
    }
    this.dataArray = this.doingArray.concat(this.doneArray);
    localStorage.setItem('todo-list', JSON.stringify(this.dataArray));
  }

  editItem(data: Object) {}

  deleteItem(data: Object) {
    const index: number = data['index'];
    const done: boolean = data['done'];
    if(done){
      this.doneArray.splice(index,1);
    }else{
      this.doingArray.splice(index,1);
    }
    this.dataArray = this.doingArray.concat(this.doneArray);
    localStorage.setItem('todo-list', JSON.stringify(this.dataArray));
  }
}
