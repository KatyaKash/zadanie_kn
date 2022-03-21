let students = [];
let grp;
var id_cur = 0;
let id;
let a;
let li;
let p;
let div;
// объект с группами
let groups = {}

function load_from_site() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://217.71.129.139:4003/students.php');
	xhr.send();
	xhr.onload = function(){
		if (xhr.status != 200){
			alert(`Error ${xhr.status}: ${xhr.statusText}`); // например 404: Not Found
		}
		else{
			students = JSON.parse(xhr.responseText)['response']
			// формируем объект групп
			for (let i = 0; i < students.length; i++){
				if (students[i].group in groups) { //такая группа уже есть. добавим студента
					groups[students[i].group].push(students[i])
				}
				else { //группы ещё нет. сперва добавим группу в объект, а потом уже добавим студента
					groups[students[i].group] = []
					groups[students[i].group].push(students[i])
				}
			}
			console.log(groups)
		}
	};
	xhr.onerror = function(){
		alert('запрос не удался');
	};
};	

//создаем табличку с группой

function load_group(){
	grp = students[id_cur].group;
	grpt = grp
	count = 1
	id_cur = 0

	//выясняем количество групп
	for (let i = 0; i < students.length; i++){
		if (grpt != students[i].group){
			count++
			grpt = students[i].group;
		}
	}
	//создаем окно с вкладками
	for (let i = 0; i <count; i++){

		grp = students[id_cur].group;
		a = $(document.createElement('a'))
		li = $(document.createElement('li'))
		a.prop('textContent', students[id_cur].group)
		a.attr({'href':`#tabs-${String(i+1)}`})

		$('ul').append(li.append(a))

		div = $(document.createElement('div'))
		div.attr({'id':`tabs-${String(i+1)}`})
		load_all(id_cur,  grp)
		$('#tabs').append(div.append(p))	

	}
}
function load_all(id_curr, grp) {
		
		let table = document.createElement('table')
			let tr1 = document.createElement('tr')
			let th1 = document.createElement('th')
			let th2 = document.createElement('th')
			let th3 = document.createElement('th')
			let th4 = document.createElement('th')
			let th5 = document.createElement('th')
			th1.textContent = 'id'
			th2.textContent = 'Имя'
			th3.textContent = 'Фамилия'
			th4.textContent = 'Оценки'
			th5.textContent = 'Средний балл'
			tr1.append(th1);
			tr1.append(th2);
			tr1.append(th3);
			tr1.append(th4);
			tr1.append(th5);
			table.append(tr1)
			
//main.js:81 Uncaught TypeError: Cannot read properties of undefined (reading 'group')
		while (grp === students[id_curr].group) {
			id = students[id_curr].id
			let name = students[id_curr].name
			let surname = students[id_curr].surname
			let scores = students[id_curr].scores

			let sum = 0;
			for(let i = 0; i < students[id_curr].scores.length; i++){
				sum+=students[id_curr].scores[i]
			}
			let sr = String(sum / (students[id_curr].scores.length))
			

			//создадим строку и ячейки
			let tr = document.createElement('tr')
				let td1 = document.createElement('td')
				let td2 = document.createElement('td')
				let td3 = document.createElement('td')
				let td4 = document.createElement('td')
				let td5 = document.createElement('td')

			//запишем данные в ячейки
			td1.textContent = id;
				td2.textContent = name;
				td3.textContent = surname;
				td4.textContent = scores;
				td5.textContent = sr;

			//вставим ячейки в строку
			tr.append(td1);
			tr.append(td2);
			tr.append(td3);
			tr.append(td4);
			tr.append(td5);
			table.append(tr);

			p = $(document.createElement('p'))
			p.append(table);
			id_curr++
			id_cur=id_curr
		}
}

 $(document).ready(function() {

   $("#tabs").tabs();
   $("#tabs").css("width", "500px");
});
