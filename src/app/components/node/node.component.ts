import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef, ElementRef, OnChanges } from '@angular/core';
import Node from '../../interfaces/node';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit, OnChanges {


  @Input() node: Node;
  @Input() isClicked: boolean;
  // tslint:disable-next-line: no-output-rename
  @Output() dropped: EventEmitter<any> = new EventEmitter<any>();
  isStart = false;
  isFinish = false;
  @ViewChild('nodeel', {static: true}) nodeEl;

  constructor(
    private messageService: MessageService,
    private ref: ChangeDetectorRef,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.messageService.messages$.subscribe(
      (message: Node) => {
        console.log('M', message);
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnChanges(changes) {
    //console.log('changes', changes);
  }

  runChangeDetector() {
    this.ref.markForCheck();
  }

  mouseUp(event: Event) {
    console.log(event);
    try {
      let data = (event as any).dataTransfer.getData('text');
      //console.log(data, (event as any).data);
      this.dropped.emit({
        previousNode: JSON.parse(data),
        newNode: this.node
      });
    } catch(err) {
      console.log(err);
    }
  }

  mouseDown(event: Event) {
    if (this.node.isStart || this.node.isFinish) {
      this.messageService.mouseRelease();
      event.stopPropagation();
      return;
    }
  }

  dragCancel(event: Event) {
    event.preventDefault();
  }

  dragStart(event) {
    event.dataTransfer.setData('text/plain', JSON.stringify(this.node));
    event.data = this.node;
  }


}
