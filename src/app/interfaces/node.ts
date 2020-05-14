import Point from './point';

export default class Node {
    isStart;
    isFinish;
    row;
    col;
    previousNode;
    distance;
    constructor(row, col, startNode: Point = null, endNode: Point = null) {
        this.row = row;
        this.col = col;
        this.isStart = this.matches(startNode, {row, col});
        this.isFinish = this.matches(endNode, {row, col});
        this.previousNode = null;
        this.distance = 9999999;
    }

    matches(point1, point2) {
        if (point1 == null) {
          return false;
        }
        if (point1.row === point2.row && point1.col === point2.col) {
          return true;
        }
        return false;
      }

      reset(){
        this.previousNode = false;
        this.previousNode = null;
        this.isStart = false;
        this.isFinish = false;
        this.distance = 9999999;
    }
}
