# aQueue

**Asynchrounous Tasks Queue Manager**

helps you with long and repetitive tasks
with a non blocking manner so browser have time
to update UI and stuff

sQueue.html and sQueue.js is just a show of what would happen if you run the same tasks in a simple for loop

## Usage

	var queue = new aQueue(queue, arguments, callback, granularity);
	
**queue** is an Array of:

- functions
- objects with a shape
	
	{
		function: function,
		arguments, arguments
	}
	
This lets you add specific arguments to a single function that will be added
in the begining of an array of arguments

**arguments** is an array of arguments to be passed to each task
 
**callback** is a function to be called at the end of a queue

** granularity** this is the time passed to setTimeout by default it is 25 ms

**aQueue** supports chainability and offers this API:

- **process** - get the queue going

		queue.process() 
		
	
	
- **pause** - lets you wait for something or just do nothing for a while

		queue.pause()
	
- **getQueueLength** - how many task are left in a queue

		queue.getQueueLength()
	
- **setGranularity** - lets you change granularity during queue execution

		queue.setGranularity(number)
	
	- number - time in ms

- **addTask** - you can add task to a queue whenever you want
	
		queue.addTask(task)
	
	task should be:
	
	- a single function
	- an object described earlier
	- an array of functions described earlier

- **removeTask** - and you can remove task at whatever point

	queue.removeTask(task) 
	
task is a reference to a function that you want to remove

## Example

	var queue = [
		function(name){
			console.log(name)
		},
		function(name){
			console.log(name + ': 2)
			
			this.pause();
			//wait for something
			this.process();
		},
		{
			function: function(number, name){
				console.log(name + ' ' + number)
			},
			arguments: [3]
		}
	] ,
	task = function(){
		
	},
	arguments = ['aQueue'],
	callback = function(){
		console.log('The queue is done!');
	},
	granularity = 10;
	
	queue[queue.length] = task;
	
	queue = new aQueue(queue, arguments, callback, granularity);
	
	queue.removeTask(task).process();

## TODO
- documentation
- code cleanup
- examples

## Credits
- Jakub Olek

## Licence
- if you find it useful use it, modify it, play with it!