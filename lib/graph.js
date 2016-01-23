var graphs = {};

graphs.DirectedGraph = function(){
	this.edges = {};
	this.length = this.length || 0;
};

graphs.DirectedGraph.prototype = {
	addVertex : function(vertex){
		this[vertex] = this[vertex] || [];
	},

	addEdge : function(from,to){
		this.edges[from] = this.edges[from] || [];
		this.edges[from].push(to); 
		this.length++;
	},

	hasEdgeBetween : function(from,to){
		this.edges[from] = this.edges[from] || [];
		return this.edges[from].indexOf(to) >= 0;
	},

	order : function(){
		return Object.keys(this).length - 2;
	},

	size : function(){
		return this.length;
	},

	pathBetween : function(from,to,visiting){
		visiting = visiting  || [];
		if(from == to) return visiting.concat(from);
		for( index in this.edges[from]){
			var vertex = this.edges[from][index];
			if(visiting.indexOf(from) < 0){
				var path = this.pathBetween(vertex,to,visiting.concat(from));
			if(path[path.length - 1] == to) return path;
			}	
		};
		return [];
	},

	farthestVertex : function(vertex){
		if(this.edges[vertex]){
			for(i = 0  ;i < this.edges[vertex].length ; i++){
				return this.farthestVertex(this.edges[vertex][i]);
			};
		}
		return vertex;
	}

};

graphs.UndirectedGraph = function(){
	this.edges = {};
	this.length = this.length || 0;
};

graphs.UndirectedGraph.prototype = {
	addVertex : function(vertex){
		this[vertex] = this[vertex] || [];
	},
	addEdge : function(from,to){
		this.edges[from] = this.edges[from] || [];
		this.edges[from].push(to); 
		this.edges[to] = this.edges[from] || [];
		this.edges[to].push(from); 
		this.length++;
	},
	hasEdgeBetween : function(from , to){
		this.edges[from] = this.edges[from] || [];
		return this.edges[from].indexOf(to) >= 0;
	},

	order : function(){
		return Object.keys(this).length - 2;
	},

	size : function(){
		return this.length;
	},

	pathBetween : function(from,to,visiting){
		visiting = visiting  || [];
		if(from == to) return visiting.concat(from);
		for( index in this.edges[from]){
			var vertex = this.edges[from][index];
			if(visiting.indexOf(from) < 0){
				var path = this.pathBetween(vertex,to,visiting.concat(from));
			if(path[path.length - 1] == to) return path;
			}	
		};
		return [];
	}
	// pathBetween : function(from,to,visiting){
	// 	visiting = visiting  || [];
	// 	if(from == to)
	// 		return visiting.concat(from);
	// 	if(visiting.indexOf(from) == -1){
	// 		for( i = 0 ; i < this.edges[from].length; i++){
	// 			var vertex = this.edges[from][i];
	// 			if(visiting.indexOf(vertex) == -1){
	// 				var path = this.pathBetween(vertex,to,visiting.concat(from));
	// 			if(path[path.length - 1] == to)
	// 				return path;
	// 			}	
	// 		};
	// 	}
	// 	return [];
	// }
}

module.exports = graphs;