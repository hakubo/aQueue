(function(w){
	var aQueue = function(queue, arguments, callback, granularity){
		if(this.queue = (queue instanceof Array) ? queue : false) {
			this.arguments = arguments;
			this.callback = (callback instanceof Function) ? callback : false;
			this.granularity = granularity || 25;
			this.intervalProcess = 0;
		}else{
			throw 'No queue specified';
		}

		return this;
	};

	aQueue.prototype = {
		process: function(){
			var self = this,
				task;

			self.intervalProcess = setTimeout(function(){
				if(task = self.queue.shift()){

					self.intervalProcess = setTimeout(arguments.callee, self.granularity);

					if(task instanceof Function){
						task.apply(self, self.arguments);
					}else if(task instanceof Object){
						task.function.apply(self, task.arguments.concat(self.arguments));
					}
				}else{
					self.callback && self.callback(self.arguments);
					self.pause();
				}

			}, self.granularity);

			return self;
		},
		pause: function(){
			clearTimeout(this.intervalProcess);
			this.intervalProcess = 0;

			return this;
		},
		addTask: function(task){
			if(task instanceof Function || (task instanceof Object && task.function && task.arguments)){
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
		getQueueLength: function(){
			return this.queue.length;
		},
		isProcessing: function(){
			return !!this.intervalProcess;
		}
	}


	w.aQueue = aQueue;
})(window);