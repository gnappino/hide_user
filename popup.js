document.addEventListener('DOMContentLoaded', AggListener,false)
var out;
function AggListener(){
	var ck=document.getElementById("ONOFF");
//	console.log(ck);
	CreaTabella();
	InserisciDati();
	/*
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
//		var ta=document.getElementById("lista");
		ta.value=ElencoNomi;
		//ta.addEventListener("keypress",Test,false);
		}
	});
*/
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
	var clients = [
					{ "Nome": "Prova", "Frase": "Testo"}
			];

			$("#jsGrid").jsGrid({
					width: "100%",
					height: "400px",

					inserting: true,
					editing: true,
					sorting: false,
					paging: false,

					data: [],

					fields: [
							{ name: "Nome", type: "text", width: 150, validate: "required" },
							{ name: "Frase", type: "text", width: 400 },
					]
			});
			var grid = $("#jsGrid").data("JSGrid");
			$("#jsGrid").jsGrid("insertItem", { Nome: "John", Frase: "25" }).done(function() {
			    console.log("insertion completed");
			});
			grid.insertItem({ Nome: "Pippo", Frase: "Antonella"});
			//console.log(grid);
}

function InserisciDati(){

}
