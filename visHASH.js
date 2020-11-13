//------------------------------ LDDE IMPLEMENTATION ------------------------------

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class DoubleLinkedList {
    constructor() {
        this.firstNode = null;
        this.lastNode = null;
        this.n = 0;
    }

    insert(value) {
        let newNode = new Node(value);

        if (!newNode) {
            return false;
        }

        //newNode.data = value;
        newNode.prev = null;
        newNode.next = null;

        var antPtr = null;
        var curPtr = this.firstNode;

        while (curPtr != null && curPtr.data.value < value) {
            antPtr = curPtr;
            curPtr = curPtr.next;
        }

        if (antPtr != null) {
            antPtr.next = newNode;
        } else {
            this.firstNode = newNode;
            console.log(this.firstNode)
        }

        newNode.next = curPtr;

        if (curPtr != null) {
            curPtr.prev = newNode;
        } else {
            this.lastNode = newNode;
        }

        newNode.prev = antPtr;

        this.n++;
        return true;
    }

    remove(value) {
        if (this.n === 0) {
            return false;
        }

        var antPtr = new Node(null);
        var curPtr = this.firstNode;

        while (curPtr != null && curPtr.data.key != value) {
            antPtr = curPtr;
            curPtr = curPtr.next;
        }

        if (curPtr.data.key != value) {
            return false;
        }

        if (antPtr && antPtr.data != null) {
            console.log(antPtr)
            antPtr.next = curPtr.next;
        } else {
            this.firstNode = curPtr.next;
        }

        if (curPtr.next) {
            var nextPtr = curPtr.next;
            nextPtr.prev = curPtr.prev;
        } else {
            this.lastNode = curPtr.prev;
        }

        //delete(curPtr);
        this.n--;
        return true;
    }

    search(value) {
        if (this.n === 0) {
            return false;
        }

        var antPtr = new Node(null);
        var curPtr = this.firstNode;

        while (curPtr != null && curPtr.data.value < value && curPtr.next != null) {
            antPtr = curPtr;
            curPtr = curPtr.next;
        }

        if (curPtr.data.value != value) {
            return false;
        }

        return true;
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
        //Azul
        0: {
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
        //Cinza
        1: {
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
        }
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

function ReadDoubleLinkedList() {
    var temp = l.firstNode;

    nodes.add({
        id: nodesIds,
        label: "",
        group: 1
    });
    var first = nodesIds;
    nodesIds++;
    nodes.add({
        id: nodesIds,
        label: "",
        group: 1
    });
    var last = nodesIds;
    nodesIds++;

    while (temp) {
        nodes.add({
            id: nodesIds,
            label: String(temp.data),
            group: 0
        });

        if (temp.prev == null) {
            edges.add({
                id: edgesIds,
                from: String(nodesIds),
                to: String(first)
            });
            edgesIds++;
        } else if (temp.next == null) {
            edges.add({
                id: edgesIds,
                from: String(prevNode),
                to: String(nodesIds)
            });
            edgesIds++;
            edges.add({
                id: edgesIds,
                from: String(nodesIds),
                to: String(prevNode)
            });
            edgesIds++;
            edges.add({
                id: edgesIds,
                from: String(nodesIds),
                to: String(last)
            });
            edgesIds++;
        } else {
            edges.add({
                id: edgesIds,
                from: String(prevNode),
                to: String(nodesIds)
            });
            edgesIds++;
            edges.add({
                id: edgesIds,
                from: String(nodesIds),
                to: String(prevNode)
            });
            edgesIds++;
        }

        nodesIds++;
        prevNode = nodesIds - 1;
        temp = temp.next;
    }
}

function AddNodes() {
    newNodeValue = document.getElementById("inpValue").value;
    l.insert(newNodeValue);

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

    // criar função separada pro bobble sort

    for(var j = 0; j < nodesItems.length; j++){
        for(var i = 0; i < nodesItems.length - 1; i++){
            if(parseInt(nodesItems[i].label) > parseInt(nodesItems[i + 1].label)){
                var temp = nodesItems[i];
                nodesItems[i] = nodesItems[i + 1];
                nodesItems[i + 1] = temp;
            }
        }
    }

    console.log(nodesItems);

    var smaller;
    var greater;

    for (var i = 0; i < nodes.length; i++) {
        index = nodesItems[i];

        if (parseInt(newNodeValue) < parseInt(index.label)) {

            if (!smaller) {
                smaller = index.id;
                smallerValue = parseInt(index.label);
            } else if (parseInt(index.label) < smallerValue) {
                smaller = index.id;
            }

        } else if (index.label != "") {

            if (!greater) {
                greater = index.id;
                greaterValue = parseInt(index.label);
            } else if (parseInt(index.label) >= greaterValue) {
                greater = index.id;
                greaterValue = parseInt(index.label)
            }
        }
    }

    console.log("greater: " + greater)
    console.log("smaller: " + smaller)

    nodes.add({
        id: nodesIds,
        label: newNodeValue,
        group: 0
    });
    var id = nodesIds;
    nodesIds++;

    for (var i = 0; i < edgesItems.length; i++) {
        if (smaller && greater) {
            if ((edgesItems[i].from == smaller && edgesItems[i].to == greater) ||
                (edgesItems[i].to == smaller && edgesItems[i].from == greater)) {
                console.log("Removed: " + edgesItems[i])
                edges.remove({
                    id: edgesItems[i].id
                });
            }
        }
        if (!smaller) {
            if (edgesItems[i].to == '1') {
                edges.remove({
                    id: edgesItems[i].id
                });
                edgesIds++;
                edges.add({
                    id: edgesIds,
                    from: id,
                    to: '1'
                });
            }
        }
        if (!greater) {
            if (edgesItems[i].to == '0') {
                edges.remove({
                    id: edgesItems[i].id
                });
                edgesIds++;
                edges.add({
                    id: edgesIds,
                    from: id,
                    to: '0'
                });
            }
        }
    }

    edgesIds++;
    edges.add({
        id: edgesIds,
        from: smaller,
        to: id
    })
    edgesIds++;
    edges.add({
        id: edgesIds,
        from: id,
        to: smaller
    })
    edgesIds++;
    edges.add({
        id: edgesIds,
        from: greater,
        to: id
    })
    edgesIds++;
    edges.add({
        id: edgesIds,
        from: id,
        to: greater
    })
}

function RemoveNode(){
    var i;
    var removedNodeValue = document.getElementById("inpValue").value;

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

    for(var j = 0; j < nodesItems.length; j++){
        for(i = 0; i < nodesItems.length - 1; i++){
            if(parseInt(nodesItems[i].label) > parseInt(nodesItems[i + 1].label)){
                var temp = nodesItems[i];
                nodesItems[i] = nodesItems[i + 1];
                nodesItems[i + 1] = temp;
            }
        }
    }

    console.log(removedNodeValue);

    var prevNodeId;
    var nextNodeId;
    var removedNodeId;
    var firstNode;
    var lastNode;

    /*while(parseInt(nodesItems[i].label) < parseInt(removedNodeValue) && i + 1 < nodesItems.length){
        prevNode = nodesItems[i];
        curNode = nodesItems[i + 1];
        i++;
    }

    if(curNode.data != parseInt(removedNodeValue)){
        return false;
    }

    if()*/

    console.log(nodesItems);
    console.log(edgesItems);

    for(i = 2; i < nodes.length; i++){
        console.log("Iterações: ", i-1);
        console.log(parseInt(nodesItems[i].label));
        if(parseInt(nodesItems[i].label) == removedNodeValue){
            console.log("achou o valor");
            removedNodeId = nodesItems[i].id;
            nodes.remove({id: removedNodeId});
            console.log("removeu o número");
            /*prevNodeId = nodesItems[i-1].id;
            nextNodeId = nodesItems[i+1].id;*/
            if(i == 2){
                console.log("primeiro node");
                firstNode = true;
                prevNodeId = nodesItems[0].id;
                nextNodeId = nodesItems[i+1].id;
                break;
            }
            else if(i == nodes.length){
                console.log("ultimo node");
                lastNode = true;
                prevNodeId = nodesItems[i-1].id;
                break;
            }
            else{
                console.log("outro node");
                prevNodeId = nodesItems[i-1].id;
                nextNodeId = nodesItems[i+1].id;
                break;
            }
        }
    }

    //console.log("estou aqui");
    /*console.log("Prev: ", prevNodeId);
    console.log("Next: ", nextNodeId);

    console.log("Id: 0 = ", nodesItems[0]);
    console.log("Id: 1 = ", nodesItems[1]);*/

    for(i = 0; i < edges.length; i++){
        if(edgesItems[i].from == removedNodeId){
            edges.remove({id: edgesItems[i].id});
        }

        /*if(firstNode){
            if(edgesItems[i].from == nextNodeId && edgesItems[i].to == removedNodeId){
                console.log(edgesItems[i]);
                edges.update({id: edgesItems[i].id, to: "0"});
            }

        }
        else if(lastNode){
            if(edgesItems[i].from == prevNodeId && edgesItems[i].to == removedNodeId){
                console.log(edgesItems[i]);
                edges.update({id: edgesItems[i].id, to: "1"});
            }

        }
        else{
            if(edgesItems[i].from == prevNodeId && edgesItems[i].to == removedNodeId){
                console.log(edgesItems[i]);
                edges.update({id: edgesItems[i].id, to:nextNodeId});
            }
            else if(edgesItems[i].from == nextNodeId && edgesItems[i].to == removedNodeId){
                console.log(edgesItems[i]);
                edges.update({id: edgesItems[i].id, to:prevNodeId});
            }*/

        if(edgesItems[i].from == prevNodeId && edgesItems[i].to == removedNodeId){
                //console.log(edgesItems[i]);
                edges.update({id: edgesItems[i].id, to:nextNodeId});
        }
        else if(edgesItems[i].from == nextNodeId && edgesItems[i].to == removedNodeId){
                //console.log(edgesItems[i]);
                edges.update({id: edgesItems[i].id, to: prevNodeId});
        }
        
    }

    if(lastNode){
        edges.update({id: edgesItems[edges.length].id, from: prevNodeId, to: 1});
    }

    console.log(edgesItems[edges.length]);

    return true;

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
        //let table = new DoubleLinkedList();
        this.table = [];
        //console.log(table);
        //table.push("Adele");
        //console.log(table);
        this.n = 0;

        for(var i = 0; i < MAX; i++){
            this.table.push(new Array());
            //table.push(new Array());
        }

        console.log(this.table)

    }

    insert(item){
        console.log("insert");
        const index = this.hashFunc(item.key % MAX);

        if(index < MAX){
            this.table[index].push(item);
            this.n++;
            return true;
        }
        return false;

    }

    remove(key){
        console.log("remove");
        const index = this.hashFunc(key % MAX);

        console.log("Tabela: ",this.table);
        console.log("Lista: ",this.table[index]);
        console.log("Tamanho lista: ", this.table[index].length);
        console.log("Elemento: ", this.table[index][0]);
        console.log("Chave: ", this.table[index][0].key);
        console.log("Chave de busca: ", key);
        console.log(this.tables[index][i].key === key);

        if(index < MAX){
            for(var i = 0; i < this.tables[index].length; i++){
                if(this.tables[index][i].key === key){
                    this.tables[index][i].splice(i, 1);
                    this.n--;
                    console.log(this.table);
                    return true;
                }
            }
        }

        return false;

    }

    hashFunc(key){
        console.log("hashFunc");
        if(key > MAX){
            console.log("entrei");
            this.hashFunc(key % MAX);
        }
        return key;
    }


}

function Add(){
    let key = parseInt(document.getElementById("keyValue").value);
    let value = document.getElementById("inpValue").value;
    let kv = new KeyValue(key, value);
    hd.insert(kv);
}

function Delete(){
    var key = parseInt(document.getElementById("keyValue").value);
    hd.remove(key);
}

function Search(){

}

let hd = new HashDictionary();