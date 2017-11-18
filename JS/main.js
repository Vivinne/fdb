var fdb = new ForerunnerDB();
var db = fdb.db("school");
var studentCollection = db.collection("students");
studentCollection.insert({
    name: "Koding",
    age: 18
});

$(document).ready(function() {
	studentCollection.load(detaload);

});
console.log(studentCollection.find());

// studentCollection.load(callback);

function detaload(){
	// creatDeta();
	console.log(studentCollection.find());
	updataTable(studentCollection.find());
}

function detaSave() {
	console.log("deta Save");

}

function creatDeta() {
	console.log("creatDeta");
	for (var i = 0; i < 20; i++) {
		studentCollection.insert({
			name : String.fromCharCode(Math.floor((Math.random() * 26) + 65),
				Math.floor((Math.random() * 26) + 97),
				Math.floor((Math.random() * 26) + 97)),
			age : Math.floor((Math.random() * 7) + 7)
		});
	}
	console.log(studentCollection.find());
	studentCollection.save(detaSave);
}

function updataTable(datas) {
	$("#tabel-tbody").find("tr").remove();

	for (var i = 0; i < datas.length; i++) {
		$("#tabel-tbody").append(
		"<tr>" + 
		"<td>" + (i+1) + "</td>" +　
		"<td>" + datas[i]._id + "</td>" +
		"<td>" + datas[i].name + "</td>" +
		"</tr>"
		);
		
	};
}


