var fdb = new ForerunnerDB();
var db = fdb.db("school");
var studentCollection = db.collection("students");
studentCollection.insert({
    name: "Koding",
    age: 18
});

$(document).ready(function() {
	studentCollection.load(detaload);
	$("#table-tbody").on("click", ".dataID", colIDClick);
	$("#table-tbody").on("click", ".btn-danger", btnDeleteClick);

});
//console.log(studentCollection.find());

// studentCollection.load(callback);

function detaload(){
	// creatDeta();
	console.log(studentCollection.find());
	updataTable(studentCollection.find());
}

function detaSave() {
	console.log("deta Save");
	updataTable(studentCollection.find());

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
		"<td>" + "<button class = 'btn btn-warning'>修改</button>" + "<td>" +
		"<td>" + "<button class = 'btn btn-danger'>刪除</button>" + "<td>" + 
		"</tr>"
		);
		
	};
}


function colIDClick() {
	var ID = $(this).text();
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

function btnDeleteClick() {
	var ID = $(this).closest("tr").find(".dataID").text();
	if (!confirm("確地要刪除？")) {return;}
	studentCollection.save(detaSave);
	studentCollection.remove({
    _id: ID
});

	
};