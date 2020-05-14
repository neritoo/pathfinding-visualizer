import { Component, OnInit, Input } from '@angular/core';
import Node from '../../interfaces/node';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {


  @Input() node: Node;
  isStart = false;
  isFinish = false;

  constructor() { }

  ngOnInit(): void {
  }

}
