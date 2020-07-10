class EventSourcer {
  constructor() {
    this.value = 0;
    this.history = [0];
    this.undos = [];
    this.index = 0;
  }

  add(num) {
    //check if int
    this.value += num;
    this.index++;
    this.history.push(this.value);
  }
  subtract(num) {
    //check if int
    this.value -= num;
    this.index++;
    this.history.push(this.value);
  }

  undo() {
    if (this.index === 0) {
      console.log("No task to undo");
      return;
    }
    this.index--;
    //Adds the change to the array of undos
    this.undos.unshift(this.value - this.history[this.index]);
    this.value = this.history[this.index];
    
  }
  redo() {
    if (this.undos === undefined || this.undos.length == 0) {
      console.log("Nothing to undo");
      return;
    }
    this.value += this.undos[0];
    this.history.push(this.value);
    this.index++;
  }

  bulk_undo(num) {
    if (this.index === 0 || num === 0) {
      console.log("No task to undo");
      return;
    }
    //If the number of undos is greater than actions taken, undo as many actions as possible
    num = this.index - Math.max(0, this.index - num);
    for (let i = 0; i < num; i++) {
      this.undo();
    }
  }
  bulk_redo(num) {
    if (this.undos.length === 0 || num === 0) {
      console.log("No task to redo");
      return;
    }
    //If the number of redos is greater than actions taken, undo as many actions as possible
    num = this.undos.length - Math.max(0, this.undos.length - num);
    for (let i = 0; i < num; i++) {
      this.redo();
    }
  }
}

// ----- Do not modify anything below this line (needed for test suite) ------
module.exports = EventSourcer;
