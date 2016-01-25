var graphs = {};

graphs.DirectedGraph = function(){
	this.graph = this.graph || {};
};

graphs.DirectedGraph.prototype = {
	addVertex : function(vertex){
		this.graph[vertex] = this.graph[vertex] || [];
	},

	addEdge : function(from , to){
		this.graph[from].push(to); 
	},

	hasEdgeBetween : function(from ,to){
		this.graph[from] = this.graph[from] || [];
		return this.graph[from].indexOf(to) != -1;
	},

	order : function(){
		return Object.keys(this.graph).length;
	},

	size : function(){
		var edges =  Object.keys(this.graph);
		var size = 0 ;
		for(i = 0 ;i < edges.length ; i++){
			size += this.graph[edges[i]].length;
		};
		return size;
	},

	pathBetween : function(from , to , visited){
		var visited = visited || [];
		if(from == to)
			return visited.concat(from);
		if(visited.indexOf(from) == -1 && this.graph[from]){
			for(i = 0 ;i < this.graph[from].length ; i++){
				var vertex = this.graph[from][i];
				var path = this.pathBetween(vertex , to , visited.concat(from));
				if(path[path.length - 1] == to) return path;
			}
		}
		return [];
	},

	farthestVertex : function(vertex){
		var farthest;
		var length = 0;
		var vertices = Object.keys(this.graph);
		var i = 0;
		for(var i = 0 ;i < vertices.length ; i++){
			var path = this.pathBetween(vertex , vertices[i]);
			if(path.length > length){
				farthest = vertices[i];
				length = path.length;
			}
		}
		return farthest;
	},

	allPaths : function(from , to , visited,all_paths){
		var visited = visited || [];
		var all_paths = all_paths || [];
		if(from == to)
			return visited.concat(from);
		for(var i = 0 ; i < this.graph[from].length ; i++){
			var vertex = this.graph[from][i];
			if(visited.indexOf(vertex) == -1){
				var path = this.allPaths(vertex , to , visited.concat(from) , all_paths);
				if(path[path.length - 1] == to) 
					all_paths.push(path);
			}
		};
		return all_paths;
	}
}

graphs.UndirectedGraph = function(){
	this.graph = this.graph || {};
};

graphs.UndirectedGraph.prototype = {
	addVertex : function(vertex){
		this.graph[vertex] = [];
	},

	addEdge : function(from , to){
		this.graph[from].push(to);
		this.graph[to].push(from);
	},

	hasEdgeBetween : function(from , to){
		this.graph[from] = this.graph[from] || [];
		return this.graph[from].indexOf(to) != -1;
	},

	order : function(){
		return Object.keys(this.graph).length;
	},

	size : function(){
		var edges =  Object.keys(this.graph);
		var size = 0 ;
		for(i = 0 ;i < edges.length ; i++){
			size += this.graph[edges[i]].length;
		};
		return size/2;
	},

	pathBetween : function(from , to , visited){
		var visited = visited || [];
		if(from == to)
			return visited.concat(from);
		for(var i = 0 ;i < this.graph[from].length ; i++){
			var vertex = this.graph[from][i];
			if(visited.indexOf(vertex) == -1){
				var path = this.pathBetween(vertex , to , visited.concat(from));
				if(path[path.length - 1] == to) return path;
			}
		}
		return [];
	},


	farthestVertex : function(vertex){
		var farthest;
		var length = 0;
		var vertices = Object.keys(this.graph);
		var i = 0;
		while(i < vertices.length){
			var path = this.pathBetween(vertex , vertices[i]);
			if(path.length > length){
				farthest = vertices[i];
				length = path.length;
			}
			i++;
		}
		return farthest;
	},

	allPaths : function(from , to , visited,all_paths){
		var visited = visited || [];
		var all_paths = all_paths || [];
		if(from == to)
			return visited.concat(from);
		for(var i = 0 ; i < this.graph[from].length ; i++){
			var vertex = this.graph[from][i];
			if(visited.indexOf(vertex) == -1){
				var path = this.allPaths(vertex , to , visited.concat(from) , all_paths);
				if(path[path.length - 1] == to) 
					all_paths.push(path);
			}
		};
		return all_paths;
	}
}

module.exports = graphs;