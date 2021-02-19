const addBtn = document.querySelector("#add");

const updateLSD = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];

    textAreaData.forEach((note) => {
        return notes.push(note.value);
    })

    localStorage.setItem('notes' , JSON.stringify(notes));
}

const addnewNot = (text = '') => {
    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData = `
    <div class="operation">
    <button class="edit"> <i class="fa fa-edit"></i> </button>
    <button class="delete"> <i class="fa fa-trash"></i> </button>
    </div>

    <br/><br/><br/><br/><br/>

    <div class="main ${text ? "" : "hidden"} "> </div>
    <textarea class="${text ? "hidden" : ""}" cols="30" rows="10"></textarea>`;

    note.insertAdjacentHTML('afterbegin' , htmlData);

    const editBtn = note.querySelector('.edit');
    const delBtn = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const txtAre = note.querySelector('textarea');

    delBtn.addEventListener('click' , () => {
        note.remove();
        updateLSD();
    })

    txtAre.value = text;
    mainDiv.innerHTML = text;

    editBtn.addEventListener('click' , () => {
        mainDiv.classList.toggle('hidden');
        txtAre.classList.toggle('hidden');
    })

    txtAre.addEventListener('change' , (event) => {
        const value = event.target.value;
        mainDiv.innerHTML = value;

        updateLSD();
    })

    document.body.appendChild(note);
}

const notes = JSON.parse(localStorage.getItem('notes'));

if(notes){notes.forEach((note) => addnewNot(note))};

addBtn.addEventListener( 'click' , () => addnewNot() );