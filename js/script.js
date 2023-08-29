document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("listForm")
    let list = document.querySelector(".ToDoList");///UL
    const addBtn = document.getElementById("addBtn");
    const itemInput = document.getElementById('form2'); // Moved input element selection outside the click handler
    // let arrayItems = []; // Array to store tasks


    addBtn.classList.add('load')
    itemInput.style.fontSize = "20px"
    const iconContent = document.createElement('div');
    iconContent.classList.add('icons', 'd-flex')
    iconContent.style.gap = '15px';
    const textContentent = document.createElement('div')
    textContentent.classList.add('textbox', 'd-flex');
    textContentent.style.gap = '15px'; textContentent.style.alignItems = "center";
    const listItem = document.createElement('li');

    listItem.id = "job";
    listItem.classList.add('list-group-item', 'd-flex', 'align-items-center', 'border-start-0', 'border-top-0', 'border-end-0', 'border-bottom', 'rounded-0', 'mb-2');

    listItem.style.justifyContent = 'space-between'; listItem.style.paddingBottom = '10px';

    list.style.display = "flex"; list.style.flexDirection = "column"; list.style.gap = "25px"; list.style.padding = "33px 4px 0px"
    const checkboxInput = document.createElement('input');
    checkboxInput.classList.add('form-check-input', 'me-2');
    checkboxInput.type = 'checkbox';


    const dataIn = document.createElement('input');//// this the input read only for now
    dataIn.classList.add('inputTitle')
    dataIn.readOnly = true;
    dataIn.style.background = "none"; dataIn.style.border = "none"; 



    // for mobile
        
    // const mobile = window.matchMedia('(max-width: 767px)');
    //     if (mobile.matches) { // If media query matches
    //         dataIn.style.width = "188px";
    //     }else{
    //         dataIn.style.width = "617px";
    //     }
    

    
    dataIn.style.fontSize = '20px'
    textContentent.appendChild(checkboxInput);
    textContentent.appendChild(dataIn);





    const deleteLink = document.createElement('a');
    deleteLink.classList.add("delete");
    deleteLink.href = '#!';
    deleteLink.setAttribute('data-mdb-toggle', 'tooltip');
    deleteLink.title = 'Remove item';


    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('material-icons');///////////delete img 
    deleteIcon.textContent = 'delete';
    deleteLink.appendChild(deleteIcon);



    const updateLink = document.createElement('a');
    updateLink.classList.add('update')
    updateLink.href = '#!';
    updateLink.setAttribute('data-mdb-toggle', 'tooltip');
    updateLink.title = 'Update item';
    const updateImg = document.createElement('img');
    updateImg.classList.add('updateImg')///////////////////////////update img 
    updateImg.src = 'icons/edit_FILL0_wght400_GRAD0_opsz24.svg';
    updateLink.appendChild(updateImg);
    iconContent.appendChild(updateLink);
    iconContent.appendChild(deleteLink);

    listItem.appendChild(textContentent)
    listItem.appendChild(iconContent);
    // form.addEventListener{("submit")}


    //delete function

    function viewEventListener(ulList, liList) {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then((todos)=> {
                for (let i = 0; i < todos.length; i++) { // for each item we create li and also we edit immeditaltito the  todos item title
                    const task = todos[i];
                    let clonedListItem = liList.cloneNode(true);
                    const spanIn = clonedListItem.querySelector('.inputTitle');
                    const checkedItem = clonedListItem.querySelector('.form-check-input');
                    spanIn.value = `${task.title}`;
    
                    //delete btn
                    const deletedItem = clonedListItem.querySelector(".delete") // we want it delete 
    
                    const img = deletedItem.querySelector(".material-icons")
    
                    //update btn
                    const updatedItem = clonedListItem.querySelector(".update")
    
                    const img2 = updatedItem.querySelector(".updateImg")
    
                    clonedListItem.setAttribute("id", `job-${task.id}`)
                    deletedItem.setAttribute("data-id", task.id);
                    img.setAttribute("data-id", task.id)
                    spanIn.setAttribute("data-id", task.id)
                    updatedItem.setAttribute("data-id", task.id)
    
                    img2.setAttribute("data-id", task.id)
                    checkedItem.setAttribute("data-id", task.id)
                    attachDeleteEventListener(deletedItem);
                    checkBoxEventListener(checkedItem, task.id);
                    updateEventListener(updatedItem, spanIn);
                    ulList.appendChild(clonedListItem); // add todo item tothe ul baby

                }
            });
    }

    function attachDeleteEventListener(itemToDelete) {
        itemToDelete.addEventListener('click', function (event) {
            const id = event.target.dataset.id;

            fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'DELETE',
            })
                .then((response) => response.json())
                .then(() => {
                    const itemToRemove = list.querySelector(`#job-${id}`);
                    list.removeChild(itemToRemove);

                })
                .catch((error) => {
                    console.error('Error deleting item:', error);
                });
        });
    }

    function checkBoxEventListener(checkboxInput, id) {
        checkboxInput.addEventListener('change', function (event) {
            const checked = event.target.checked;


            fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    completed: checked // Set the completed key to true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => response.json())




        });
    }

    function updateEventListener(updateItem, data) {
        updateItem.addEventListener('click', function (event) {
            event.preventDefault();
            const id = event.target.dataset.id;

            data.readOnly = false;

            data.style.border = "3px solid rgba(87, 154, 255, 0.63)";
            data.style.borderRadius = "5px";
            data.style.padding = "0px 10px"
            data.addEventListener("keypress", function (event) {
                const id = event.target.dataset.id;
                const txt = event.target.value;


                if (event.key == "Enter") {
                    console.log(`hi`)
                    event.preventDefault();
                    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                        method: 'PATCH',
                        body: JSON.stringify({
                            title: data.value
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        }

                    })
                        .then((response) => response.json())
                        .then(() => {
                            // console.log({ id })
                            
                            data.readOnly = true;
                            data.style.border = "none"


                        });


                }
            })







        });
    }

    addBtn.onclick = (event) => {
        const inputValue = itemInput.value; // Get the input value
        if(inputValue==""){
            alert("Go home")
            return;
        }
        addBtn.disabled = true; 
        addBtn.innerHTML="<img src=\"icons/progress_activity_FILL0_wght400_GRAD0_opsz24.svg\" >"
        event.preventDefault();
        



        // const inputValue = itemInput.value; // Get the input value
        const clonedListItem = listItem.cloneNode(true);
        const spanIn = clonedListItem.querySelector('.inputTitle');
        const checkedItem = clonedListItem.querySelector('.form-check-input');
        spanIn.value = `${inputValue}`;
        //delete btn



        const deletedItem = clonedListItem.querySelector(".delete") // we want it delete 


        const img = deletedItem.querySelector(".material-icons")

        //update btn
        const updatedItem = clonedListItem.querySelector(".update")

        const img2 = updatedItem.querySelector(".updateImg")

        let task = {
            title: inputValue,
            completed: false,
            id: Math.floor(Math.random() * 1000),
            userId: 1,
        };
        clonedListItem.setAttribute("id", `job-${task.id}`)
        deletedItem.setAttribute("data-id", task.id);
        img.setAttribute("data-id", task.id)
        spanIn.setAttribute("data-id", task.id)
        updatedItem.setAttribute("data-id", task.id)

        img2.setAttribute("data-id", task.id)
        checkedItem.setAttribute("data-id", task.id)
        attachDeleteEventListener(deletedItem)
        checkBoxEventListener(checkedItem, task.id)
        updateEventListener(updatedItem, spanIn)




        
      

        fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            body: JSON.stringify(task),
            headers:{
                "Content-Type": "application/json; charset=UTF-8"
            } 
            
        })
              
            .then(Response => Response.json())
            .then(() => {
          
                 

                if (list.childNodes.length === 0) {
                  
                    list.appendChild(clonedListItem);/// add to the UL
                    
                } else {
                  
                   list.insertBefore(clonedListItem, list.childNodes[0])
                  
                }
             addBtn.disabled=false;
             addBtn.innerHTML="Add"
                document.getElementById('form2').value = "";
             
               
            })
       
            
    }






    viewEventListener(list,listItem)
});







