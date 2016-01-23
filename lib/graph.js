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
		var visiting = visiting  || [];
		if(from == to){
			return visiting.concat(from);
		}else if (this.edges[from]){
			if(visiting .indexOf(from) == -1)
				visiting = visiting.concat(from);
			for( i = 0 ; i < this.edges[from].length; i++){
				var vertex = this.edges[from][i];
				if(visiting.indexOf(vertex) == -1){
					visiting = this.pathBetween(vertex,to,visiting);
				}
			};
			return visiting;
		}
		return visiting;
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

module.exports = graphs;