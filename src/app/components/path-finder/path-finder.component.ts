import { Component, OnInit } from '@angular/core';
import Point from '../../interfaces/point';
import Node from '../../interfaces/node';

@Component({
  selector: 'app-path-finder',
  templateUrl: './path-finder.component.html',
  styleUrls: ['./path-finder.component.css']
})
export class PathFinderComponent implements OnInit {
  rows: number;
  cols: number;
  nodes = [];
  startNode: Point;
  endNode: Point;


  constructor() {
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

}
