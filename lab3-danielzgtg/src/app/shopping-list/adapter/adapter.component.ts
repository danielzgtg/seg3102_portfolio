import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-adapter[text]',
  templateUrl: './adapter.component.html',
  styleUrls: ['./adapter.component.scss']
})
export class AdapterComponent {
  @Input() text!: string;
  @Output() del: EventEmitter<undefined> = new EventEmitter;
}
