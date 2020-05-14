import { Component, OnInit, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import Point from '../../interfaces/point';
import Node from '../../interfaces/node';
import { MessageService } from '../../services/message.service';
import { NodeComponent } from '../node/node.component';

@Component({
  selector: 'app-path-finder',
  templateUrl: './path-finder.component.html',
  styleUrls: ['./path-finder.component.css']
})
export class PathFinderComponent implements OnInit {
  rows: number;
  cols: number;
  isClicked: boolean = false;
  nodes = [];
  startNode: Point;
  endNode: Point;
  @ViewChildren('node') myComponents: QueryList<any>;


  constructor(
    private ref: ChangeDetectorRef,
    private messageService: MessageService
  ) {
    this.CreateNodes();
    this.InitializeStartEndNodes();
  }

  ngOnInit(): void {
  }

  InitializeStartEndNodes() {
    this.startNode = { row: 13, col: 14 };
    this.endNode = { row: 8, col: 44 };
    let stNd: Node = this.getNode(this.startNode);
    stNd.isStart = true;
    this.startNode = stNd;
    let enNd = this.getNode(this.endNode);
    enNd.isFinish = true;
    this.endNode = enNd;

    console.log(stNd);
  }

  getNode(point): Node {
    for (const row of this.nodes) {
      for (const node of row) {
        if (node.row === point.row && node.col === point.col) {
          return node;
        }
      }
    }
  }

  CreateNodes() {
    for (let i = 0; i < 15; i++) {
      const cols: Array<Node> = [];
      for (let j = 0; j < 50; j++) {
        cols.push(new Node(i, j, this.startNode, this.endNode));
      }
      this.nodes.push(cols);
    }
  }

  mouseDown(event: Event) {
    this.messageService.mouseClicked();
    //event.preventDefault();
    event.stopPropagation();
  }

  mouseUp(event: Event) {
    this.messageService.mouseRelease();
    event.preventDefault();
    event.stopPropagation();
  }

  drop(event) {
    let previousNode: Node = event.previousNode;
    let newNode: Node = event.newNode;
    //console.log(previousNode, newNode);

    if(previousNode.isStart && !newNode.isFinish) {
      console.log('previouse:', previousNode);
      console.log('new: ', newNode);
      let {row, col} = previousNode;
      this.nodes[row][col].isStart = false;
      previousNode.isStart = false;
      this.nodes[newNode.row][newNode.col].isStart = true;
      this.startNode = this.nodes[newNode.row][newNode.col];
    } else if(previousNode.isFinish && !newNode.isStart) {
      let {row, col} = previousNode;
      this.nodes[row][col].isFinish = false;
      previousNode.isFinish = false;
      this.nodes[newNode.row][newNode.col].isFinish = true;
      this.endNode = this.nodes[newNode.row][newNode.col];


      this.runChangeDetector();
    }
  }

  runChangeDetector(type = 'all', index?) {
    if (type === 'all') {
      let toRun = [];
      this.myComponents.forEach((cmp: NodeComponent) => {
        toRun.push(cmp.runChangeDetector());
      });
      Promise.all(toRun);
    }
  }

}
