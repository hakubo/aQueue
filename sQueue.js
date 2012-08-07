(function(w){
	var aQueue = function(queue, arguments, callback, granularity){
		this.queue = (queue instanceof Array) ? queue : false;
		if(this.queue) {
			this.arguments = arguments;
			this.callback = (callback instanceof Function) ? callback : false;
			this.granularity = granularity || 25;
		}else{
			throw 'No queue specified';
		}

		return this;
	};

	aQueue.prototype = {
		process: function(){
			var self = this,
				task;

			while(task = self.queue.shift()){

				if(task){

					if(task instanceof Function){
						task.apply(self, self.arguments);
					}else if(task instanceof Object){
						task.function.apply(self, task.arguments.concat(self.arguments));
					}
				}else{
					self.callback && self.callback(self.arguments);
				}
			}

			return self;
		},
		stop: function(){
			clearTimeout(this.intervalProcess);

			return this;
		},
		addTask: function(task){
			if(task instanceof Function){
				this.queue[this.queue.length] = task;
			}else if(task instanceof Array){
				this.queue.concat(task);
			}

			return this;
		},
		removeTask: function(task){
			var t,
				i = 0;

			while(t = this.queue[i++]){
				if(t === task) {
					this.queue.splice(--i,1);
					break;
				}
			}

			return this;
		},
		setGranularity: function(gran){
			this.granularity = gran || 25;
			return this;
		},
		queueSize: function(){
			return this.queue.length;
		}
	}


	w.aQueue = aQueue;
})(window);/**
 * Created with JetBrains PhpStorm.
 * User: olek
 * Date: 07.08.2012
 * Time: 10:09
 * To change this template use File | Settings | File Templates.
 */
