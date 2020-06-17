import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {

  @Input()
  title: string = '';
  @Input()
  date: string = '';
  @Input()
  done: string = '';
  @Input()
  index: number = 0;

  //no need to set value here, cause in the dashboard component, it is already set
  // combine with nzOnCancel, check the website for more explaination
  // to close the dialog when clicking X or cancel button with setting of false,
  // with setting of true, then clicking is not working
  @Input()
  isVisible: boolean;

  @Output()
  isVisibleChange = new EventEmitter<boolean>();

  @Output()
  clickEvent = new EventEmitter<Object>();

  isEdit: boolean = false;
  validateForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required, Validators.maxLength(15)]],
      date: [null, [Validators.required]]
    });
  }

  ngOnInit() { }

  ngOnChanges() {
    if (this.title) {
      this.isEdit = true;
      this.validateForm.setValue({
        title: this.title,
        date: this.date,
      });
    } else {
      this.isEdit = false;
      this.validateForm.setValue({
        title: '',
        date: '',
      });
    }
  }

  handleOk(): void {
    this.submitForm();
  }

  handleCancel(): void {
    // to close the dialogs
    this.isVisibleChange.emit(false);
  }

  submitForm(): void {
    let params = {};

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
      if (!(this.validateForm.controls[i].status == 'VALID') && this.validateForm.controls[i].status !== 'DISABLED') {
        return;
      }
      if (this.validateForm.controls[i] && this.validateForm.controls[i].value) {
        params[i] = this.validateForm.controls[i].value;
      } else {
        params[i] = '';
      }
    }

    this.setDate('date');
    params['date'] = this.validateForm.get('date').value;
    params['isEdit'] = this.isEdit;

    if (this.isEdit) {
      params['done'] = this.done;
      params['index'] = this.index;
    }

    // console.log(666, params);
    // emit the params object to dashboard, including date, title information
    this.clickEvent.emit(params);
    this.isVisibleChange.emit(false);
  }

  // to transform date form from Mon Jun 29 2020 12:06:20 GMT+0800 to 2020-06-29
  setDate(dates) {
    const time = new Date(this.validateForm.get(dates).value);
    const datetime = time.getFullYear() + '-' + this.formatDayAndMonth(time.getMonth() + 1) + '-' + this.formatDayAndMonth(time.getDate());
    // set the datetime based on the result grasping from dates parameter
    this.validateForm.get(dates).setValue(datetime);
  }

  formatDayAndMonth(val) {
    if (val < 10) {
      val = '0' + val;
    }
    return val;
  }
}
