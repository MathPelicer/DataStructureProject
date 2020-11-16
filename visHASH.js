//------------------------------ HASH IMPLEMENTATION ------------------------------

const MAX = 10;

class KeyValue{
    constructor(key, value){
        this.key = key;
        this.value = value;
    }
}

class HashDictionary{
    constructor(){
        this.table = [];
        this.n = 0;

        for(var i = 0; i < MAX; i++){
            this.table.push(new Array());
        }

        StartingNodes();

    }

    insert(item){
        const index = this.hashFunc(item.key % MAX);

        console.log(this.table);

        if(!this.search(item.key)){
            this.table[index].push(item);
            this.n++;
            return true;
        }
        else{
            alert("Já existe outro elemento com essa chave.");
            return false;
        }

    }

    remove(key){
        const index = this.hashFunc(key % MAX);

        for(var i = 0; i < this.table[index].length; i++){
            if(this.table[index][i].key == key){
                this.table[index].splice(i, 1);
                //delete this.table[index][i];
                this.n--;
                return true;
            }
        }

        alert("O elemento " + key + " não existe na hash.")

        return false;

    }

    search(key){
        const index = this.hashFunc(key % MAX);

        for(var i = 0; i < this.table[index].length; i++){
            if(this.table[index][i].key == key){
                return true;
            }
        }

        return false;
    }

    hashFunc(key){
        if(key > MAX){
            this.hashFunc(key % MAX);
        }
        return key;
    }


}

function Add(){
    var key = parseInt(document.getElementById("keyValue").value);
    var value = document.getElementById("inpValue").value;
    let kv = new KeyValue(key, value);
    var addNodeBool = hd.insert(kv);
    //AddNodes(key, value);
    if(addNodeBool){
        AddNodes(kv);
    }
}

function Delete(){
    var key = parseInt(document.getElementById("keyValue").value);
    var removeNodeBool = hd.remove(key);
    if(removeNodeBool){
        RemoveNode(key);
    }
}

function Search(){
    console.log('pesquisa');
    var key = parseInt(document.getElementById("keyValue").value);
    var searchNodeBool = hd.search(key);
    if(searchNodeBool){
        console.log('elemento existe')
        SearchNode(key);
    }
    else{
        alert("O elemento " + key + " não existe na hash.")
    }
}

// ------------------------- VIS NETWORK -----------------------------

var network;

var nodesIds = 0;
var nodes = new vis.DataSet([

]);

var edgesIds = 0;
var edges = new vis.DataSet([

]);

var container = document.getElementById("mynetwork");

var data = {
    nodes: nodes,
    edges: edges,
};

var options = {
    width: "1600px",
    height: "800px",
    clickToUse: false,
    groups: {
        //Cinza
        0: {
            color: {
                background: '#7a7a7a',
                border: '#403c3c',
                highlight: {
                    border: '#000000',
                    background: '#403c3c',
                },
            },
            borderWidth: 3,
        },
        //Azul
        1: {
            color: {
                
                background: '#26b8e0',
                border: '#2a30db',
                highlight: {
                        border: '#171b96',
                        background: '#6db4de',
                },
            },
            borderWidth: 3,
        },
        //Vermelho
        2: {
            color:{
                background: '#d6747f',
                border: '#d91e34',
                highlight: {
                    border: '#f00723',
                    background: '#e89ba4',
                },
            },
            borderWidth: 3,
        },
        //Verde
        3: {
            color:{
                background: '#aee693',
                border: '#479c32',
                highlight: {
                    border: '#517348',
                    background: '#b9e0af',
                },
            },
            borderWidth: 3,
        },
    },
    edges: {
        arrows: {
            to: {
                enabled: true,
                scaleFactor: 1,
                type: "arrow",
            }
        }
    },
    interaction: {
        hover: true
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

function StartingNodes(){
    var nodesItems = nodes.get({
        fields: ['id', 'label', 'group'],
    });

    for(var i = 0; i < MAX; i++){
        var str = "Index " + i;
        nodes.add({
            id: nodesIds,
            label: str,
            group: i,
            title: str
        });
        nodesIds++;
    }

    for(var i = 0; i < MAX-1; i++){
        edges.add({
            id: edgesIds,
            from: i,
            to: i+1
        });
        edgesIds++;
    }

}

function AddNodes(nodeKV) {
    var newNodeValue = nodeKV.value;
    var newNodeKey = nodeKV.key;
    var index = hd.hashFunc(newNodeKey % MAX);

    console.log("Chave: " + newNodeKey)
    console.log("Valor: " + newNodeValue)

    var nodesItems = nodes.get({
        fields: ['id', 'label', 'group'],
    });
 
    var edgesItems = edges.get({
        fields: ['id', 'from', 'to'],
    });

    //console.log(hd.table) 
    
    if(hd.table[index].length <= 1){
        nodes.add({
            id: nodesIds,
            label: newNodeValue,
            group: index,
            title: newNodeKey
        });

        edges.add({
            id: edgesIds,
            from: index,
            to: nodesIds,
        })

        nodesIds++;
        edgesIds++;
    }
    else{
        var lastElementIndex = hd.table[index].length - 2;

        console.log("Último elemento: ", lastElementIndex)

        for(var i = 0; i < nodes.length; i ++){
            var curNode = nodesItems[i];

            console.log("Node Atual: ", curNode);
            //console.log(hd.table[index][lastElementIndex].value);
            
            if(curNode.label == hd.table[index][lastElementIndex].value){
                console.log("achei")
                nodes.add({
                    id: nodesIds,
                    label: newNodeValue,
                    group: index,
                    title: newNodeKey
                });
        
                edges.add({
                    id: edgesIds,
                    from: curNode.id,
                    to: nodesIds,
                });
                
                nodesIds++;
                edgesIds++;

                return true;
            }
        }
    }
}

function RemoveNode(nodeKey){
    var i;
    var j;
    var k;

    var prevNodeId = null;
    var nextNodeId = null;
    var updateEdgeId = null;
    var removingEdgeId = null;

    const index = hd.hashFunc(nodeKey % MAX);

    var nodesItems = nodes.get({
        fields: ['id', 'title']
    });

    var edgesItems = edges.get({
        fields: ['id', 'from', 'to']
    });

    //procura o node que será removido
    for(i = 0; i < nodesItems.length; i++){
        if(nodesItems[i].title == nodeKey){
            var removingNodeId = nodesItems[i].id;
            console.log("I");
            console.log("Removing Node:", nodesItems[i]);
            console.log("Removing Node Id:", removingNodeId);
            //procura qual é o node anterior
            for(j = 0; j < edgesItems.length; j++){
                if(edgesItems[j].to == removingNodeId){
                    prevNodeId = edgesItems[j].from;
                    removingEdgeId = edgesItems[j].id;
                    console.log("J");
                    console.log("Prev Edge:", edgesItems[j]);
                    console.log("Prev Node Id:", prevNodeId);
                    console.log("Removing Edge Id:", removingEdgeId);
                    //verifica se há um node seguinte
                    for(k = 0; k < edgesItems.length; k++){
                        if(edgesItems[k].from == removingNodeId){
                            nextNodeId = edgesItems[k].to;
                            updateEdgeId = edgesItems[j].id;
                            removingEdgeId = edgesItems[k].id;
                            console.log("K");
                            console.log("Next Edge:", edgesItems[k]);
                            console.log("Next Node Id:", nextNodeId);
                            console.log("Update Edge Id:", updateEdgeId);
                            console.log("Removing Edge Id:", removingEdgeId);
                            break;
                        }
                    }
                    break;
                }
            }
            break;
        }
    }

    nodes.remove({id: removingNodeId});
    edges.remove({id: removingEdgeId});

    if(nextNodeId != null){
        console.log("update");
        edges.update({id: updateEdgeId, from: prevNodeId, to: nextNodeId});
    }

}

function SearchNode(nodeKey){
    //indica qual index da tabela estará o elemento
    const index = hd.hashFunc(nodeKey % MAX);

    //cria um vetor acessivel com os elementos do vetor nodes
    var nodesElem = nodes.get({
        fields: ['id', 'label', 'group', 'title']
    });

    //procura o primeiro node com o mesmo valor de label q o 'nodeKey'
    for(var i = 0; i < nodesElem.length; i++){
        console.log("Elemento atual: ", nodesElem[i]);
        if(parseInt(nodesElem[i].title) == nodeKey){
            console.log("Elemento compativel: ", nodesElem[i].label)
            var nodeId = nodesElem[i].id;
            var nodeGroup = nodesElem[i].group;
            //atualiza a cor do node desejado
            nodes.update({id: nodeId, group: 11});
            //ativa um intervalo e depois retorna a cor do node para a cor original
            setTimeout(() => { nodes.update({id: nodeId, group: nodeGroup}); }, 3500);
            return true;
        }
    }

}

/*function UpdateScreen() {
    var network = new vis.Network(container, data, options);
};*/

//Execução

let hd = new HashDictionary();

var network = new vis.Network(container, data, options);

/*network.on("showPopup", function (params) {
    document.getElementById("eventSpan").innerHTML =
      "<h2>showPopup event: </h2>" + JSON.stringify(params, null, 4);
  });
  network.on("hidePopup", function () {
    console.log("hidePopup Event");
  });*/