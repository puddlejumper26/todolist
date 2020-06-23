import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  // add todo Title
  todoTitle = '';

  dataArray: Array<Object> = [];
  doingArray: Array<Object> = [];
  doneArray: Array<Object> = [];

  // double-binding edit-modal through isVisible; here to control the display of the add to do dialog
  // combine with the [nzVisible] in the nz-modal of edit-modal
  modalIsVisible: boolean = false;



  editTitle: string = '';
  editDate: string = '';
  editDone: boolean = false;
  editIndex: number = 0;

  // this message is to pop in the middle
  constructor(private message: NzMessageService) {}

  ngOnInit() {
    this.getTodoList();
  }

  // initiate
  getTodoList(): void {
    const dataString: string = localStorage.getItem('sha');
    // here I just name it 'sha', could be named as anything, just need to be identical with following three localStorage.setItem
    // when the name is identical, then any operation is done, and refresh the browser, status is the same,
    // otherwise, after refresh, status is cleared to null, start from zero.
    if (dataString != null) {
      this.dataArray = JSON.parse(dataString);
      for (let i = 0; i < this.dataArray.length; i++) {
        const element: any = this.dataArray[i];
        if (element.done === true) {
          this.doneArray.push(element); // add to doneArray(finished)
        } else {
          this.doingArray.push(element);
        }
      }
    }
  }

  // this is the default setting when new dialog is opend after clicking Add button
  // and binding with edit-modal through here
  addTodo(): void {
    // before clicking Add button ,there is already content inside input, then copy this content to the new opened dialog as title
    if(this.todoTitle !==''){
      this.editTitle = this.todoTitle;
    }else{
      this.editTitle='';
    }

    this.editDate = '';
    this.editDone = false;
    this.editIndex = 0;
    this.modalIsVisible = true;
  }

  // This is to combine with the submit function in edit-modal
  // here is to obtain the updated data passed from edit-modal
  // here the data is the params object (submitForm function) sent from edit-modal
  addTodoEvent(data: Object) {
    const item = {
      title: data['title'],
      date: data['date'],
      done: data['done'],
    };

    if (data['done'] == true) {
      this.doneArray[data['index']] = item;
    } else {
      if (data['isEdit'] == true) {
        this.doingArray[data['index']] = item;
      } else {
        this.doingArray.push(item);
      }
    }
    this.dataArray = this.doingArray.concat(this.doneArray);
    localStorage.setItem('sha', JSON.stringify(this.dataArray));
  }

  // this function is to mark item, and put them into doneArray or doingArray, so it needs to set a newItem Object, and push into the array
  checkItem(data: Object) {
    // index and done are to make the cut and paste in doingArray (Working) and doneArray(finished)
    const index: number = data['index'];
    const done: boolean = data['done'];
    // newItem is the object to be cut or pasted
    const newItem = {
      title: data['title'],
      date: data['date'],
      done: done,
    };
    if (done) {
      this.doingArray.splice(index, 1);
      this.doneArray.push(newItem);
    } else {
      this.doneArray.splice(index, 1);
      this.doingArray.push(newItem);
    }
    // then re-concat the doingArray and doneArray
    this.dataArray = this.doingArray.concat(this.doneArray);
    // put into the localStorage
    localStorage.setItem('sha', JSON.stringify(this.dataArray));
  }

  // here need to combine with edit-modal component,passing the data
  // cause when edit button is clicked, data from the item component needs to be passed to edit-modal component
  // then when edit-modal component (dialog) is displayed, these data could be shown inside the input slots.
  editItem(data: Object) {
    this.editTitle = data['title'];
    this.editDate = data['date'];
    this.editDone = data['done'];
    this.editIndex = data['index'];
    this.modalIsVisible = true; // open the dialog for editing, if here is false, then dialog could not be opened
  }

  // similar to checkItem funciton, but without creating newItem Object
  deleteItem(data: Object) {
    // take the index number sent from the item component, then take 1 digit, and delete this number.
    const index: number = data['index'];
    const done: boolean = data['done'];
    if (done) {
      this.doneArray.splice(index, 1);
    } else {
      this.doingArray.splice(index, 1);
    }
    this.dataArray = this.doingArray.concat(this.doneArray);
    localStorage.setItem('sha', JSON.stringify(this.dataArray));
  }
}
