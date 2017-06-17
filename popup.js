document.addEventListener('DOMContentLoaded', AggListener,false)
var out;
function AggListener(){
	var ck=document.getElementById("ONOFF");
	console.log(ck);
	CreaTabella();
	chrome.storage.sync.get("Attivo", function(items) {
		if (!chrome.runtime.error) {
			//console.log(items);
		if (items["Attivo"]=="SI"){
			ck.checked=true;
		}
		}
	});
	ck.addEventListener("click",Test,false);
	var ta=document.getElementById("lista");
	ta.addEventListener("keyup",Test,false);
	ta.addEventListener("change",Test,false);

	chrome.storage.sync.get("Nomi", function(items) {
		if (!chrome.runtime.error) {
		ElencoNomi=items["Nomi"];
//    var ta=document.getElementById("lista");
		ta.value=ElencoNomi;
		//ta.addEventListener("keypress",Test,false);
		}
	});
}

function Test(){
	//SeparaNomi();
	var ta=document.getElementById("lista");
	chrome.storage.sync.set({ "Nomi" : ta.value });

	var ck=document.getElementById("ONOFF");
	if (ck.checked){
		console.log('Acceso');
		chrome.storage.sync.set({ "Attivo" : "SI" });
	} else {
		chrome.storage.sync.set({ "Attivo" : "NO" });
		console.log('Spento');
	}
}

function CreaTabella(){
	var metadata = [];
	metadata.push({ name: "name", label: "Nome utente", datatype: "string", editable: true});
	metadata.push({ name: "str_rep", label:"Messaggio", datatype: "string", editable: true});

	var data = [];
	data.push({id: 3, values: ["Svapo","IO SONO PIPPO"]});
	editableGrid = new EditableGrid("TabellaUtenti",{modelChanged: Cambiamento});
	editableGrid.load({"metadata": metadata, "data": data});
	editableGrid.renderGrid("tablecontent", "testgrid");
	console.log("Tabella creata");
	//editableGrid.addEventListener("modelChanged",Cambiamento)
}

function Cambiamento(rowIndex, columnIndex, oldValue, newValue, row){
	console.log("Cambiamento:"+newValue);
	console.log("Riga:"+rowIndex);
	console.log(row);
}
