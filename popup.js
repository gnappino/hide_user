document.addEventListener('DOMContentLoaded', AggListener,false)
var out;
var Grid;
function AggListener(){
	var ck=document.getElementById("ONOFF");

	$.when(CreaTabella()).done(Aggiornamento());
	chrome.storage.sync.get("Attivo", function(items) {
		if (!chrome.runtime.error) {
		if (items["Attivo"]=="SI"){
			ck.checked=true;
		}
		}
	});
	ck.addEventListener("click",AggiornaON_OFF,false);
}

function AggiornaON_OFF(){
	var ck=document.getElementById("ONOFF");
	if (ck.checked){
		chrome.storage.sync.set({ "Attivo" : "SI" });
	} else {
		chrome.storage.sync.set({ "Attivo" : "NO" });
	}
}

function SalvaDati(dati){
	chrome.storage.sync.set({ "Nomi_Grid" : dati });
}

function CreaTabella(){
			$("#jsGrid").jsGrid({
					width: "100%",
					height: "100%",

					filtering: false,
					inserting: true,
					editing: true,
					sorting: false,
					paging: false,

					data: [],

					fields: [
							{ name: "Nome", type: "text", width: 120, validate: "required" },
							{ name: "Frase", type: "text", width: 350 },
							{ type: "control" }
					]
			});
			Grid = $("#jsGrid").data("JSGrid");
			// $("#jsGrid").jsGrid("insertItem", { Nome: "John", Frase: "25" }).done(function() {
			// 		console.log("insertion completed");
			// });
			// Grid.insertItem({ Nome: "Pippo", Frase: "Antonella"});
			console.log(Grid.data);
			$("#jsGrid").jsGrid({
					onItemInserted: function(args) {
							console.log("Inserimento");
							//Leggere tutti i dati della tabella e reinserirli
							SalvaDati(args.grid.data);
					}
			});
			$("#jsGrid").jsGrid({
					onItemDeleted: function(args) {
							console.log("Eliminazione");
							//Leggere tutti i dati della tabella e reinserirli
							SalvaDati(args.grid.data);
					}
			});
			$("#jsGrid").jsGrid({
					onItemUpdated: function(args) {
							console.log("Aggionramento");
							//Leggere tutti i dati della tabella e reinserirli
							SalvaDati(args.grid.data);
					}
			});

			//Questo finisce quà per via della caratteristica peculiare di JavaScript, li mortacci sua
			chrome.storage.sync.get("Nomi_Grid", function(items) {
				if (!chrome.runtime.error) {
					ElencoNomi=items["Nomi_Grid"];
					console.log("Elenco Nomi");
					console.log(ElencoNomi);
					Grid.data=ElencoNomi;
					Grid.refresh();
				}
			});
			console.log("Tabella creata")
}

function Aggiornamento(){
	console.log("Aggiornamento");
	chrome.storage.sync.get("Ver", function(items) {
			if (!chrome.runtime.error) {
				Vers=items["Ver"];
				console.log("1");
				AggiungiNomi(Vers);
			}
		});
}

function AggiungiNomi(Vers){
	if (Vers===undefined ){
		console.log("2");
		chrome.storage.sync.get("Nomi", function(items) {
				if (!chrome.runtime.error) {
					console.log("3");
					ElencoNomi=items["Nomi"];
					ElencoNomi=ElencoNomi.split(";");
					console.log("ElencoNomi");
					console.log(ElencoNomi)
					console.log(Grid);
					for (i=0;i<ElencoNomi.length;i++)
						Grid.insertItem({Nome:ElencoNomi[i], Frase:""});
					chrome.storage.sync.set({ "Ver" : "1" });
				}
			});
		}
}
