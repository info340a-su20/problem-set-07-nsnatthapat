'use strict';

/* your code goes here! */

class Task {
  constructor(newDescription, completed) {
    this.description = newDescription;
    this.complete = completed;
  }

  render() {
    let toReturn = document.createElement('li');
    toReturn.textContent = this.description;

    if(this.complete) {
      toReturn.classList.add('font-strike');
    }

    toReturn.addEventListener('click', () => {
      this.toggleFinished();
      toReturn.classList.toggle('font-strike');
    });
    return toReturn;
  }

  toggleFinished() {
    this.complete = !this.complete;
  }
}

class TaskList {
  constructor(arrayTasks) {
    this.tasks = arrayTasks;
  }

  addTask(description) {
    let aTask = new Task(description, false);
    this.tasks.push(aTask);
  }

  render() {
    let toReturn = document.createElement('ol');
    this.tasks.forEach((task) => {
      let taskElem = task.render();
      toReturn.appendChild(taskElem);
    });

  return toReturn;
  }
}


class NewTaskForm {
  constructor(functionToCall) {
    this.submitCallback = functionToCall;
  }
  render() {
    let formElem = document.createElement('form');
    let inputElem = document.createElement('input');

    inputElem.classList.add('form-control', 'mb-3');
    inputElem.setAttribute('placeholder', "What else do you have to do?");
    formElem.appendChild(inputElem);

    let buttonElem = document.createElement('button');
    buttonElem.classList.add('btn', 'btn-primary');
    buttonElem.textContent = "Add task to list";
    formElem.appendChild(buttonElem);

    buttonElem.addEventListener('click', (event) => {
      event.preventDefault();
      let inputValue = inputElem.value;
      this.submitCallback(inputValue);
    });

    return formElem;
  }
}


class App {

  constructor(newParentElement, newTaskList) {
    this.parentElement = newParentElement;
    this.taskList = newTaskList;
  }

  render() {
    let listElem = this.taskList.render();
    this.parentElement.appendChild(listElem);

    let whoGonnaCall = (arg) => this.addTaskToList(arg);
    let formObj = new NewTaskForm(whoGonnaCall);
    this.parentElement.appendChild(formObj.render());
  }

  addTaskToList(description) {
    this.taskList.addTask(description);
    this.parentElement.innerHTML = "";
    this.render();
  }
}

let aTask = new Task("Make some classes", true);
let bTask = new Task("Arrow some functions", false);

let appElem = document.querySelector('#app');
let taskListObj = new TaskList( [aTask, bTask]);
let appObj = new App(appElem, taskListObj);
appObj.render();




//Make functions and variables available to tester. DO NOT MODIFY THIS.
if(typeof module !== 'undefined' && module.exports){
  /* eslint-disable */
  if(typeof Task !== 'undefined') 
    module.exports.Task = Task;
  if(typeof TaskList !== 'undefined') 
    module.exports.TaskList = TaskList;
  if(typeof NewTaskForm !== 'undefined') 
    module.exports.NewTaskForm = NewTaskForm;
  if(typeof App !== 'undefined') 
    module.exports.App = App;
}
