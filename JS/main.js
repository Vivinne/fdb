var fdb = new ForerunnerDB();
var db = fdb.db("school");
var studentCollection = db.collection("students");
studentCollection.insert({
    name: "Koding",
    age: 18
});

$(document).ready(function() {
	studentCollection.load(dataload);
	$("#table-tbody").on("click", ".dataID", colIDClick);
	$("#table-tbody").on("click", ".btn-danger", btnDeleteClick);
	$("#table-tbody").on("click", ".btn-warning", btnEditClick);

	$("#btn-insertData").on("click", insertData);

	$("#btnSave").on("click", saveUpdateData);
	$("#btnLimitSearch").on("click", limitSearch);


});


//console.log(studentCollection.find());

// studentCollection.load(callback);

function dataload(){
	// creatdata();
	console.log(studentCollection.find());
	updataTable(studentCollection.find());
}

function dataSave() {
	console.log("data Save");
	updataTable(studentCollection.find());

}

function creatdata() {
	console.log("creatdata");
	for (var i = 0; i < 20; i++) {
		studentCollection.insert({
			name : String.fromCharCode(Math.floor((Math.random() * 26) + 65),
				Math.floor((Math.random() * 26) + 97),
				Math.floor((Math.random() * 26) + 97)),
			age : Math.floor((Math.random() * 7) + 7)
		});
	}
	console.log(studentCollection.find());
	studentCollection.save(dataSave);
}





function insertData() {
	var name = $("#name1").val();
	var age = $("#age1").val();

	 if (name != "undefined" && age != "undefined") {
		studentCollection.insert({
			name : name,
			age : age
		})

		studentCollection.save(dataSave);


	 }
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
	studentCollection.save(dataSave);
	studentCollection.remove({
    _id: ID
});
};

function btnEditClick() {
	var ID = $(this).closest("tr").find(".dataID").text();
	var query = {
    _id : ID
	}
	var studentData = studentCollection.find(query);
	$("#modalName").val(studentData[0].name);	
	$("#modalAge").val(studentData[0].age);
	$("#EditModal").attr("studentsID", ID);
	$("#EditModal").modal("show");

};





function saveUpdateData() {
	var name = $("#modalName").val();
	var age = $("#modalAge").val();
	var ID	= $("#EditModal").attr("studentsID");

	 if (name != "undefined" || age != "undefined") {
		var newData = {
			name : name,
			age : age
		}

    studentCollection.updateById(ID, newData);
    $("#EditModal").modal("hide");

	studentCollection.save(dataSave);




	 }

}



function limitSearch() {
	var edtGT = $("#edtGT").val();
	var edtLT = $("#edtLT").val();

	var datas = 
	studentCollection.find({
        "$gt": edtGT,
        "$lt": edtLT
    });

updataTable(datas);
studentCollection.save(dataSave);



};