import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzModalService, NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input()
  index: number;
  @Input()
  title: string;
  @Input()
  done: boolean;

  // here date is binded with [date]='item.date' in dashboard. html
  @Input()
  date: boolean;
  @Output()
  checkItemEvent = new EventEmitter<Object>();
  @Output()
  editItemEvent = new EventEmitter<Object>();
  @Output()
  deleteItemEvent = new EventEmitter<Object>();

  private data: Object
  //dialog
  confirmModal: NzModalRef;

  constructor(private modal: NzModalService) {}

  ngOnInit() {}

  // check item
  checkItem(): void {
    const data: Object = {
      index: this.index,
      date: this.date,
      title: this.title,
      done: this.done,
    };
    this.checkItemEvent.emit(data);
  }

  editItem(){
    const data: Object = {
      index: this.index,
      date: this.date,
      title: this.title,
      done: this.done
    };
    this.editItemEvent.emit(data);
  }

  deleteItem(){
    this.confirmModal = this.modal.confirm({
      nzTitle: 'DELETE',
      nzContent: 'Confirm to delete',
      nzOkText: 'Confirm',
      nzCancelText: 'Cancel',
      nzOnOk: () => {
        const data: Object = {
          index: this.index,
          done: this.done
        };
        this.deleteItemEvent.emit(data);
      }
    })
  }
}
