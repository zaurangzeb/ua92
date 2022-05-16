function formvalidate(){
	var name = document.formpage.textname.value;
	var email = document.formpage.textemail.value;
	var phonenumber = document.formpage.textphonenumber.value;
	var message = document.formpage.textmessage.value;
	if (name==null || name==""){
		alert("name can't be blank");
		return false;
	} else if (email==null || email==""){
		alert("email can't be blank");
		return false;
	}else if (phonenumber==null || phonenumber==""){
		alert("phonenumber can't be blank");
		return false;
	}else if (message==null || message==""){
		alert ("message can't be blank");
		return false;
	} else {
		alert("Message Sent");
		document.getElementById('myform1').action = "sent.html";
	}
}