var graphs = {
	Edge : function(name , head , tail , weight){
		this.name = name;
		this.head = head;
		this.tail = tail;
		this.weight = weight;
	}
};

graphs.WeightedGraph = function(){
	this.graph = this.graph || {};
};

graphs.WeightedGraph.prototype = {
	addVertex : function(vertex){
		this.graph[vertex] = [];
	}, 

	addEdge : function(edge){
		this.graph[edge.head] = this.graph[edge.head] || [];
		this.graph[edge.head].push(edge);
	},

	getSmallest :  function(distaces,vertices){
		return vertices.reduce(function(pv, cv){
			if(distaces[pv] < distaces[cv]) return pv;
			return cv;
		});
	},

	algorithm : function(source){
		var vertices = Object.keys(this.graph);
		var parent = {};
		var distaces = {};
		for(var i in this.graph){
			parent[i] = null;
			distaces[i] = Infinity;
		};
		parent[source] = source;
		distaces[source] = 0;
		while(vertices.length > 0){
			var Minimal_vertex = this.getSmallest(distaces ,vertices);
			var adjEdges = this.graph[Minimal_vertex];
			for(var  j = 0 ; j < adjEdges.length ; j++){
				if(distaces[adjEdges[j].tail] > adjEdges[j].weight+distaces[Minimal_vertex]){
					distaces[adjEdges[j].tail] = adjEdges[j].weight;
					parent[adjEdges[j].tail] = adjEdges[j].head;
				}
			};
			vertices.splice(vertices.indexOf(Minimal_vertex) , 1);
		};
		return parent;
	} ,

	shortestPath_with_vertices : function(head , tail){
		var parent = this.algorithm(head);
		var result = [];
		result.push(tail);
		if(parent[tail] == head){
			result.push(parent[tail]);
			return result.reverse();
		};
		while(parent[tail] != head){
			result.push(parent[tail]);
			tail = parent[tail];
		}
		result.push(head)
		return result.reverse();
	},

	findEdge : function(head , tail){
		var adjEdges = this.graph[head];
		for(var  i = 0 ; i < adjEdges.length ; i++){
			if(adjEdges[i].tail == tail) return adjEdges[i];
		}
	},

	shortestPath : function(head , tail){
		var result = this.shortestPath_with_vertices(head , tail);
		var edges = [];
		for(var i = 0 ; i < result.length - 1 ; i++){
			var edge = this.findEdge(result[i],result[i+1]);
			edges.push(edge);
		};
		return edges;
	}
};


module.exports = graphs;