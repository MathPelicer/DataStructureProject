var network;

var nodes = new vis.DataSet([
    {id: 0, label: "", group: 1},
    {id: 1, label: "", group: 1},
    {id: 2, label: "1", group: 0},
    {id: 3, label: "6", group: 0},
]);

var n = nodes.length;

var edges = new vis.DataSet([
    {id: 0, from: 2, to: 3},
    {id: 1, from: 3, to: 2},
    {id: 2, from: 3, to: 0},
    {id: 3, from: 2, to: 1},
]);

var container = document.getElementById("mynetwork");

var data = {
    nodes: nodes,
    edges: edges,
};

var options = {
    width: "1000px",
    height: "600px",
    clickToUse: false,
    groups: {
        0: {
            color:{
                background:'#26b8e0', 
                border:'#2a30db', 
                highlight:{
                    border: '#171b96',
                    background: '#6db4de',
                },
        }, 
        borderWidth: 3,
        },
        1: {
            color:{
                background:'#7a7a7a', 
                border:'#403c3c',
                highlight:{
                    border: '#000000',
                    background: '#403c3c',
                },
            }, 
            borderWidth: 3,
        }
    },
    edges: {
        arrows:{
            to:{
                enabled: true,
                scaleFactor: 1,
                type: "arrow",
            }
        }
    },
    manipulation: {
        enabled: true
    },
    physics: {
        enabled: true
    },
    nodes: {
        font: {
            color: '#ffffff',
            align: 'center',
        },
        shape: 'dot',
        size: 25,
    }
};

function arrRemove(arr, index){
    //for(var i = index; i < arr.length - 1; i++){
    //    arr[i] = arr[i+1];
    //}
    //nodes.remove(1)
    //arr.pop();

};

function AdjustPosition(id){
      var nodesItems = nodes.get({
        fields: ['id', 'label'],
        type: {
          date: 'ISODate'
        }
      });

      var edgesItems = edges.get({
        fields: ['id', 'from', 'to'],
        type: {
          date: 'ISODate'
        }
      });

      var greatest = 0;
      var smallest = 0;

      for(var i = 2; i < nodes.length; i++){
          if(nodesItems[id].label < nodesItems[i].label){
            smallest = i;
            console.log(nodesItems[id].label, " is lesser than", nodesItems[i].label);
          }
          else{
              console.log(nodesItems[id].label, " is equal or greater than ", nodesItems[i].label);
              if(id != i){
                greatest = i;
                //edges.add({from: id, to: i});
              }
          }
      }

      console.log(edges.length)

      console.log(smallest)
      console.log(greatest)

      for(var j = 0; j < edges.length; j++){
          if(smallest && greatest){
              if(edgesItems[j].from == smallest && edgesItems[j].to == greatest ||
                 edgesItems[j].to == smallest && edgesItems[j].from == greatest){
                  console.log(edgesItems[j])
                  edges.remove({id: j})
              }
          }
      }
      
      edges.add({id: edges.length + 2, from: smallest, to: id})
      edges.add({id: edges.length + 3, from: id, to: smallest})
      edges.add({id: edges.length + 4, from: greatest, to: id})
      edges.add({id: edges.length + 5, from: id, to: greatest})
      
      //edges.add({from: id, to: greatest});
      //edges.add({from: id, to: 0});
      

};

function AddNodes(){
    nodeId = nodes.length;
    nodeValue = document.getElementById("inpValue").value;
    nodes.add({id: nodeId, label: nodeValue, group: 0});
    //edges.add({from: nodeId, to: 2});

    AdjustPosition(nodeId);

};

function UpdateScreen(){
    var network = new vis.Network(container, data, options);

};

UpdateScreen();