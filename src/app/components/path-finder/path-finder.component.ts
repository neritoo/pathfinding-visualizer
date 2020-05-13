import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-path-finder',
  templateUrl: './path-finder.component.html',
  styleUrls: ['./path-finder.component.css']
})
export class PathFinderComponent implements OnInit {

  nodes: any[];

  constructor() { }

  ngOnInit(): void {
    this.componentDidMount();
    console.log(this.nodes);
  }

  componentDidMount() {
    this.nodes = [];
    for (let row = 0; row < 15; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push([]);
      }
      this.nodes.push(currentRow);
    }

  }

}
