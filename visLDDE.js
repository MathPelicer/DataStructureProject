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

        newNode.data = value;
        newNode.prev = null;
        newNode.next = null;

        var antPtr = null;
        var curPtr = this.firstNode;

        while (curPtr != null && curPtr.data < value) {
            antPtr = curPtr;
            curPtr = curPtr.next;
        }

        if (antPtr != null) {
            antPtr.next = newNode;
        } else {
            this.firstNode = newNode;
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

        while (curPtr != null && curPtr.data < value) {
            antPtr = curPtr;
            curPtr = curPtr.next;
        }

        if (curPtr.data != value) {
            return false;
        }

        if (antPtr) {
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

        while (curPtr != null && curPtr.data < value && curPtr.next != null) {
            antPtr = curPtr;
            curPtr = curPtr.next;
        }

        if (curPtr.data != value) {
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
    width: "1000px",
    height: "600px",
    clickToUse: false,
    groups: {
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
    var removedNodeValue = document.getElementById("inpValue").value;

    l.remove(parseInt(removedNodeValue))

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

    for(var j = 0; j < nodesItems.length; j++){
        for(var i = 0; i < nodesItems.length - 1; i++){
            if(parseInt(nodesItems[i].label) > parseInt(nodesItems[i + 1].label)){
                var temp = nodesItems[i];
                nodesItems[i] = nodesItems[i + 1];
                nodesItems[i + 1] = temp;
            }
        }
    }

    console.log(removedNodeValue);

    var i = 2;
    var prevNode;
    var curNode;
    var nextNode;

    while(parseInt(nodesItems[i].label) < parseInt(removedNodeValue) && i + 1 < nodesItems.length){
        prevNode = nodesItems[i];
        curNode = nodesItems[i + 1];
        i++;
    }

    if(curNode.data != parseInt(removedNodeValue)){
        return false;
    }

    if()


}

function UpdateScreen() {
    var network = new vis.Network(container, data, options);
};

let l = new DoubleLinkedList();


l.insert(4);
l.insert(5);
l.insert(6);


ReadDoubleLinkedList();
UpdateScreen();