var network;

var nodes = new vis.DataSet([{
        id: 0,
        label: "",
        group: 1
    },
    {
        id: 1,
        label: "",
        group: 1
    },
    {
        id: 2,
        label: "1",
        group: 0
    },
    {
        id: 3,
        label: "6",
        group: 0
    },
]);

var n = nodes.length;
let nodesIds = n;
let edgesIds = 3;

var edges = new vis.DataSet([{
        id: 0,
        from: 2,
        to: 3
    },
    {
        id: 1,
        from: 3,
        to: 2
    },
    {
        id: 2,
        from: 3,
        to: 0
    },
    {
        id: 3,
        from: 2,
        to: 1
    },
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

function arrRemove(arr, index) {
    //for(var i = index; i < arr.length - 1; i++){
    //    arr[i] = arr[i+1];
    //}
    //nodes.remove(1)
    //arr.pop();

};

function AdjustPosition(id) {
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

    var greater;
    var smaller;

    for (var i = 2; i < nodes.length; i++) {
        if (parseInt(nodesItems[id].label) < parseInt(nodesItems[i].label)) {
            index = nodesItems[i];

            if (!smaller) {
                smaller = index.id;
                smallerValue = parseInt(index.label);
            } else {
                if (parseInt(index.label) < smallerValue) {
                    smaller = index.id;
                }
            }

            console.log(nodesItems[id].label, " is lesser than", nodesItems[i].label);
        } else {
            console.log(nodesItems[id].label, " is equal or greater than ", nodesItems[i].label);
            if (id != i) {
                index = nodesItems[i];

                if (!greater) {
                    greater = index.id;
                    greaterValue = parseInt(index.label);
                } else if (parseInt(index.label) >= greaterValue) {
                    greater = index.id;
                    greaterValue = parseInt(index.label)
                }
            }
        }
    }

    console.log(edges.length)

    console.log("Smaller: " + smaller)
    console.log("Greater: " + greater)

    for (var j = 0; j < edgesItems.length; j++) {
        if (smaller && greater) {
            if ((edgesItems[j].from == smaller && edgesItems[j].to == greater) ||
                (edgesItems[j].to == smaller && edgesItems[j].from == greater)) {
                console.log("Removed: " + edgesItems[j])
                edges.remove({
                    id: edgesItems[j].id
                });
            }
        }
        if (!smaller) {
            if (edgesItems[j].to == '0') {
                edges.remove({
                    id: edgesItems[j].id
                });
                edgesIds++;
                edges.add({
                    id: edgesIds,
                    from: id,
                    to: '0'
                });
            }
        }
        if (!greater) {
            if (edgesItems[j].to == '1') {
                edges.remove({
                    id: edgesItems[j].id
                });
                edgesIds++;
                edges.add({
                    id: edgesIds,
                    from: id,
                    to: '1'
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

    //edges.add({from: id, to: greater});
    //edges.add({from: id, to: 0});


};

function AddNodes() {
    nodeId = nodes.length;
    nodeValue = document.getElementById("inpValue").value;
    nodes.add({
        id: nodeId,
        label: nodeValue,
        group: 0
    });
    //edges.add({from: nodeId, to: 2});
    console.log("Edge ID: " + edgesIds)
    AdjustPosition(nodeId);

};

function UpdateScreen() {
    var network = new vis.Network(container, data, options);

};

UpdateScreen();