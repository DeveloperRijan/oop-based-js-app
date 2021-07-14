function MyCcoxyApp(){
	this.run_app = function(arg){
		if (arg === true) {
			RunMyApp()
		}
	};
	this.title = "OOP Based JS Application";
	this.author_meta = "DeveloperRijan";
	this.keywords = function(){
		return ["tags 1", "tags 2", "tags 3"]
	};
	this.tune = "Hello World";
	this.response = false;
	this.json_response = null;
}



var myapp = false;
function RunMyApp(){

	myapp = new MyCcoxyApp()

	//fetch server data
	fetch('https://jsonplaceholder.typicode.com/todos')
		.then(response =>response.json())
		.then(json =>{
			myapp.json_response = json;
			processResponse();
		})


	document.getElementsByTagName('title')[0].innerHTML = myapp.title;
	let head = document.getElementsByTagName('head')[0];
	head.insertAdjacentHTML('beforeend', "<meta name='author' content='"+myapp.author_meta+"'>")

	let meta_list = document.getElementsByTagName("meta")
	for (let i = 0; i < meta_list.length; i++) {
		if (meta_list[i].getAttribute('name') === "description") {
			meta_list[i].setAttribute('content', "Dynamic Description")
		}
	}
	
}



function processResponse(){
	let data = myapp.json_response;
	console.log(data)

	let html = "<table id='response_tbl'><thead><tr><th>ID</th><th>UserID</th><th>Title</th></tr></thead><tbody></tbody></table>"
	document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', html)
	
	tbl_body = '';
	console.log(data.length)
	let tbl = document.getElementById('response_tbl')

	for (let i = 0; i < data.length; i++) {
		let even = "0";
		if (i % 2 == 0) {
			even = '1'
		}

		tbl_body = "<tr is_even='"+even+"'>"+
						"<td>"+data[i].id+"</td>"+
						"<td>"+data[i].userId+"</td>"+
						"<td>"+data[i].title+"</td>"+
					"</tr>";

		tbl.querySelectorAll('tbody')[0].insertAdjacentHTML('beforeend', tbl_body)
		
	}
	
	tbl.style.cssText = "border:1px solid #ddd;padding:10px;width:100%;text-align:center";
	let td = tbl.querySelectorAll('tr td')
	for (let i = 0; i < td.length; i++) {
		td[i].style.cssText = "border:1px solid #ddd";
	}

	//add some even listiner
	addTblEventListner('response_tbl')
}



function addTblEventListner(tbl){
	let get_app_head = document.querySelectorAll('head')[0];
	let styles = `<style>
					.even_tr{background:#efefef} 
					.not_even_tr{background:#fff} 

					.even_tr:hover,
					.not_even_tr:hover
					{background: #ddd}
				</style>`
	get_app_head.insertAdjacentHTML('beforeend', styles)

	let find_tbl = document.getElementById(tbl)
	let all_tr = find_tbl.querySelectorAll('tr')

	for (let i = 0; i< all_tr.length; i++) {
		if (all_tr[i].getAttribute('is_even') === '1') {
			all_tr[i].setAttribute('class', "even_tr")
		}else{
			all_tr[i].setAttribute('class', "not_even_tr")
		}
	}
}


