//Estrutura da Fila
//Objeto da Fila
function LinkedQueue(maxVectorSize){
    this.n = maxVectorSize;
    this.v = [];

    this.enqueue = function(newValue){
        if(!isNumber(newValue)){
            return false;
        }

        if(this.v.length == this.n){
            alert("Tamanho máximo da fila atingido! Remova algum elemento antes de adicionar outro.");
            return false;
        }

        this.v.push(newValue);

        if(this.v.length == 1){
            nodes.update({id: 0, label: String(this.v[0]), group: 2});
        }
        else{
            for(i = 1; i < this.v.length; i++){
                nodes.update({id: i, label: String(this.v[i]), group: 1});
            }
        }

        return true;

    }

    this.dequeue = function(){
        if(this.v.length == 0){
            alert("Não há elementos para serem removidos.");
            return false;
        }

        for(i = 0; i < this.v.length-1; i++){
            this.v[i] = this.v[i+1];
            nodes.update({id: i, label: String(this.v[i+1])});
        }

        nodes.update({id: this.v.length-1, label: "", group: 0});

        this.v.pop();

        return true;

    }

    this.print = function(){
        var elements = "";
        for(i = 0; i < this.v.length; i++){
            elements += String(this.v[i]) + " ";
        }

        console.log(elements);
    }

}

//Implementação da Estrutura no HTML
//Verifica se é um número
function isNumber(value){
    if(typeof(value) === "number"){
        return true;
    }

    alert("O valor inserido não é um número.");

    return false;

}

//Função para adicionar valores na Fila
function add(){
    var value = parseInt(document.getElementById("inpValue").value);
    l.enqueue(value);
    prt();
}

//Função para remover valores da Fila
function remove(){
    l.dequeue();
    prt();
}

//Função para limpar o vetor
function clean(){
    while(l.v.length != 0){
        l.dequeue();
    }
    prt();
}

//Função para imprimir os dados da Fila
function prt(){
    l.print();
    console.log(l.n);
    console.log(l.v.length);
}

//Instancia da Fila inicializada
let l = new LinkedQueue(6);

//Base para a interface
//Declaração das variáveis
var nodes = new vis.DataSet([
    {
        id: 0,
        label: "",
        group: 0
    },
    {
        id: 1,
        label: "",
        group: 0
    },
    {
        id: 2,
        label: "",
        group: 0
    },
    {
        id: 3,
        label: "",
        group: 0
    },
    {
        id: 4,
        label: "",
        group: 0
    },
    {
        id: 5,
        label: "",
        group: 0
    }
]);

var edges = new vis.DataSet([
    {
        id: 0,
        from: 0,
        to: 1
    },
    {
        id: 1,
        from: 1,
        to: 2
    },
    {
        id: 2,
        from: 2,
        to: 3
    },
    {
        id: 3,
        from: 3,
        to: 4
    },
    {
        id: 4,
        from: 4,
        to: 5
    },
    {
        id: 5,
        from: 5,
        to: 0
    },
]);

var data = {
    nodes: nodes,
    edges: edges,
};

//Define a onde a interface do vis estará
var container = document.getElementById("mynetwork");

var options = {
    width: "1000px",
    height: "600px",
    clickToUse: false,
    groups: {
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
        enabled: true,
		addNode: true,
        addEdge: true,
        editEdge: true,
        deleteNode: true,
        deleteEdge: true
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

//Inicia a interface do vis
var network = new vis.Network(container, data, options);