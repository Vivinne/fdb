var fdb = new ForerunnerDB();
var db = fdb.db("school");
var studentCollection = db.collection("students");
studentCollection.insert({
    name: "Koding",
    age: 18
});

$(document).ready(function() {
	studentCollection.load(detaload);
	$("#table-tbody").on("click", ".col", colClick);

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
	$("#table-tbody").find("tr").remove();

	for (var i = 0; i < datas.length; i++) {
		$("#table-tbody").append(
		"<tr class='col'>" + 
		"<td>" + (i+1) + "</td>" +　
		"<td class='dataID'>" + datas[i]._id + "</td>" +
		"<td>" + datas[i].name + "</td>" +
		"</tr>"
		);
		
	};
}


function colClick() {
	var ID = $(this).find(".dataID").text();
	var query = {
    _id : ID
};
	$("#modal-body").find("p").remove();
	var studentData = studentCollection.find(query);
	$("#modal-body").append(
		"<p>ID： " + studentData[0]._id + "</p>" +
		"<p>name： " + studentData[0].name + "</p>" +
		"<p>age： " + studentData[0].age + "</p>" 
	);
	$("#mymodal").modal("show");
}