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
        }
        return false;

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
    hd.insert(kv);
    AddNodes(key, value);
}

function Delete(){
    var key = parseInt(document.getElementById("keyValue").value);
    hd.remove(key);
}

function Search(){
    var key = parseInt(document.getElementById("keyValue").value);
    hd.search(key);
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
        var str = "" + i;
        nodes.add({
            id: nodesIds,
            label: str,
            group: i,
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

function AddNodes() {
    var newNodeValue = document.getElementById("inpValue").value;
    var newNodeKey = document.getElementById("keyValue").value;
    var index = hd.hashFunc(newNodeKey % MAX);

    console.log("Chave: " + newNodeKey)
    console.log("Valor: " + newNodeValue)

    var nodesItems = nodes.get({
        fields: ['id', 'label', 'group'],
    });
 
    var edgesItems = edges.get({
        fields: ['id', 'from', 'to'],
    });

    console.log(hd.table)   
    
    if(hd.table[index].length <= 1){
        nodes.add({
            id: nodesIds,
            label: newNodeValue,
            group: index,
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

        console.log(lastElementIndex)

        for(var i = 0; i < nodes.length; i ++){
            var curNode = nodesItems[i];

            console.log(curNode)
            console.log(hd.table[index][lastElementIndex].value)
            
            if(curNode.label == hd.table[index][lastElementIndex].value){
                console.log("achei")
                nodes.add({
                    id: nodesIds,
                    label: newNodeValue,
                    group: index,
                });
        
                edges.add({
                    id: edgesIds,
                    from: curNode.id,
                    to: nodesIds,
                });
                
                nodesIds++;
                edgesIds++;
            }
        }
    }
}

function RemoveNode(){
    var i;
    var removedNodeValue = document.getElementById("inpValue").value;
    var removedNodeValue = document.getElementById("keyValue").value;

    var verify = l.remove(parseInt(removedNodeValue));

    if(!verify){
        return false;
    }

    var nodesItems = nodes.get({
        fields: ['id', 'label']
    });

    var edgesItems = edges.get({
        fields: ['id', 'from', 'to']
    });

    

}

function SearchNode(){
    //define o valor de entrada em uma variável
    var value = document.getElementById("inpValue").value;

    //verifica se o elemento está na lista
    if(!l.search(value)){
        var str = "O elemento " + value + " não existe na lista.";
        alert(str);
        return false;
    }

    //cria um vetor acessivel com os elementos do vetor nodes
    var nodesElem = nodes.get({
        fields: ['id', 'label', 'group']
    });

    //procura o primeiro node com o mesmo valor de label q o 'value'
    for(var i = 0; i < nodesElem.length; i++){
        if(parseInt(nodesElem[i].label) == value){
            var nodeId = nodesElem[i].id;
            //atualiza a cor do node desejado
            nodes.update({id: nodeId, group: 2});
            //ativa um intervalo e depois retorna a cor do node para a cor original
            setTimeout(() => { nodes.update({id: nodeId, group: 0}); }, 3500);
            return true;
        }
    }

}

function UpdateScreen() {
    var network = new vis.Network(container, data, options);
};

//Execução

let hd = new HashDictionary();

var network = new vis.Network(container, data, options);