const model = {
    init: function(){
        if(!localStorage.cardsList){
            localStorage.cardsList = JSON.stringify([]);
        }
        if(!localStorage.cardListId){
            localStorage.cardListId = JSON.stringify(0);
        }
    },
    getCardsList: function(){
        return JSON.parse(localStorage.cardsList);
    },
    getCardListId: function(){
        return JSON.parse(localStorage.cardListId);
    },
    updateCardsList: function(data){
        localStorage.cardsList = JSON.stringify(data);
    },
    updateCardListId: function(data){
        localStorage.cardListId = JSON.stringify(data);
    }
};

const octopus = {
    init: function(){
        model.init();
        view.init();
    },
    addCardList:function(val){
        obj = {
            id:octopus.getCardListId(),
            cardListUser: val,
            cardListContent:[],
            cardId:0
        };
        cardsList = model.getCardsList();
        cardsList.push(obj);
        model.updateCardsList(cardsList);
        view.render();
    },
    getCardListId: function(){
        val = model.getCardListId();
        val++;
        model.updateCardListId(val);
        return val;
    },
    removeCardList: function(val){
        cardsList = model.getCardsList();
        for(let i = 0;i<cardsList.length;i++){
            if(cardsList[i].id==val){
                cardsList.splice(i,1);
                model.updateCardsList(cardsList);
                break;
            }
        }
        view.render();
    },
    addCard: function(id,val,statusVal = null){
        obj = {
            task: val,
            status:statusVal,
            id: octopus.getCardId(id)
        }
        cardsList = model.getCardsList();
        for(let i = 0;i<cardsList.length;i++){
            if(cardsList[i].id==id){
                cardsList[i].cardListContent.push(obj);
                model.updateCardsList(cardsList);
                break;
            }
        }
        view.render();
    },
    getCardId: function(val){
        cardsList = model.getCardsList();
        for(let i = 0;i<cardsList.length;i++){
            if(cardsList[i].id==val){
                cardsList[i].cardId++;
                val = cardsList[i].cardId;
                model.updateCardsList(cardsList);
                return val;
            }
        }
    },
    removeCard: function(id1,id2){
        cardsList = model.getCardsList();
        for(let i = 0;i<cardsList.length;i++){
            if(cardsList[i].id==id1){
                for(let j = 0;j<cardsList[i].cardListContent.length;j++){
                    if(cardsList[i].cardListContent[j].id==id2){
                        cardsList[i].cardListContent.splice(j,1);
                        model.updateCardsList(cardsList);
                        break;
                    }
                }
                break;
            }
        }
        view.render();
    },
    getCardList: function(){
        return model.getCardsList();
    },
    getIndividualCard: function(id1,id2){
        cardsList = model.getCardsList();
        for(let i = 0;i<cardsList.length;i++){
            if(cardsList[i].id==id1){
                for(let j = 0;j<cardsList[i].cardListContent.length;j++){
                    if(cardsList[i].cardListContent[j].id==id2){
                        return cardsList[i].cardListContent[j];
                    }
                }
            }
        }
    },
    editCard: function(id1,id2, task,status){
        cardsList = model.getCardsList();
        for(let i = 0;i<cardsList.length;i++){
            if(cardsList[i].id==id1){
                for(let j = 0;j<cardsList[i].cardListContent.length;j++){
                    if(cardsList[i].cardListContent[j].id==id2){
                         cardsList[i].cardListContent[j].task = task;
                         cardsList[i].cardListContent[j].status = status;
                         model.updateCardsList(cardsList);
                         break;
                    }
                }
                break;
            }
        }
        view.render();
    },
    dragAndDropCard: function(val,id){
        index = val.indexOf(" ");
        id1 = val.slice(0,index);
        id2 = val.slice(index+1);
        if(id1==id)
        return;
        obj = octopus.getIndividualCard(id1,id2);
        task = obj.task;
        status = obj.status;
        cardsList = model.getCardsList();
        for(let i = 0;i<cardsList.length;i++){
            if(cardsList[i].id==id1){
                for(let j = 0;j<cardsList[i].cardListContent.length;j++){
                    if(cardsList[i].cardListContent[j].id==id2){
                        cardsList[i].cardListContent.splice(j,1);
                        model.updateCardsList(cardsList);
                        break;
                    }
                }
                break;
            }
        }
        octopus.addCard(id,task,status);
    }
};

const view = {
    init: function(){
        accountManagementDiv = document.querySelector(".account-management-cancel");
        accountManagementDiv.addEventListener('click',view.removeAccountManagementDiv);
        view.render();
    },
    render: function(){
        section = document.querySelector(".card-group");
        section.innerHTML = "";
        view.createInitialDefaultDisplay();
        cardList = octopus.getCardList();
        for(let i = 0;i<cardList.length;i++){
            view.createCardList(cardList[i]);
        }
    },
    createInitialDefaultDisplay: function(){
        section1 = document.querySelector(".card-group");
        section = document.createElement('section');
        section.classList.add("card", "body-color");
        section1.append(section);
        div1 = document.createElement("div");
        div1.classList.add("card__add-list");
        div1.addEventListener('click',view.addAnotherListDisplay);
        div1.innerHTML = "<span>+ Add another list</span>";
        section.append(div1);
        div2 = document.createElement('div');
        div2.classList.add("card__add-list");
        div2.id = "add-another-list-input";
        div2.style.display = "none";
        section.append(div2);
        input = document.createElement("input");
        input.type = "text";
        input.id = "add-another-list-in";
        input.placeholder="Enter list title..";
        div2.append(input);
        div3 = document.createElement("div");
        div3.classList.add("add-another-list-button");
        div2.append(div3);
        button1 = document.createElement('button');
        button1.type="button";
        button1.id = "add-another-list-save-button";
        button1.textContent = "Save";
        button1.addEventListener('click',view.saveAddAnotherListDisplay);
        div3.append(button1);
        button2 = document.createElement('button');
        button2.type="button";
        button2.id = "add-another-list-cancel-button";
        button2.textContent = "Cancel";
        button2.addEventListener('click',view.canceladdAnotherListDisplay);
        div3.append(button2);
    },
    removeAccountManagementDiv: function(event){
        div = event.target.closest(".account-management");
        div.remove();
    }, 
    addAnotherListDisplay: function(event){
        event.currentTarget.style.display = "none";
        input = document.getElementById("add-another-list-input");
        input.style.display="block";
    },
    canceladdAnotherListDisplay: function(){
        document.getElementById("add-another-list-in").value = "";
        document.getElementById("add-another-list-input").style.display="none";
        document.querySelector(".card__add-list").style.display="";
    },
    saveAddAnotherListDisplay: function(){
        val = document.getElementById("add-another-list-in").value;
        octopus.addCardList(val);
    },
    cardDragOver: function(event){
        event.preventDefault();
    },
    cardDrop: function(event){
        val = event.dataTransfer.getData('text');
        id = event.currentTarget.getAttribute("data-cardListId");
        octopus.dragAndDropCard(val,id);
    },
    createCardList: function(obj){
        section1 = document.createElement('section');
        section1.classList.add("card");
        section1.setAttribute("data-cardListId",obj.id);
        section1.addEventListener("dragover",view.cardDragOver);
        section1.addEventListener("drop",view.cardDrop);
        //Card Title Creation
        div1 = document.createElement('div');
        div1.classList.add("card-title");
        div2 = document.createElement('div');
        div2.classList.add("card-user-name");
        div2.textContent = obj.cardListUser;
        div1.append(div2);
        p1 = document.createElement('img');
        p1.src="assets/images/cancel-icon.png";
        p1.style.width = "20px";
        p1.setAttribute("data-cardListIdRemove",obj.id);
        p1.addEventListener('click',view.removeCardList);
        div1.append(p1);
        section1.append(div1);
        // Card Footer
        div3 = document.createElement('div');
        div3.classList.add("card-content-group");
        div11 = document.createElement('div');
        div11.classList.add("card-footer");
        div22 = document.createElement('div');
        div22.classList.add("add-another-card");
        div22.textContent = "+ Add another card";
        div22.setAttribute("data-cardListIdAddAnotherCard",obj.id);
        div22.addEventListener('click',view.addAnotherCard);
        div33 = document.createElement('div');
        div33.classList.add("add-another-card");
        div33.classList.add("three-dots");
        div33.textContent = "...";
        div11.append(div22);
        div11.append(div33);
        div3.append(div11);
        section1.append(div3);
        //Hidden Add Card Functionality
        div4 = document.createElement('div');
        div4.style.display = "none";
        div4.classList.add("add-another-card-input");
        input = document.createElement('input');
        input.type = "text";
        input.classList.add("add-another-card-in");
        input.placeholder="Enter a title for this card...";
        div4.append(input);
        div5 = document.createElement("div");
        div5.classList.add("add-another-card-button");
        div4.append(div5);
        button1 = document.createElement("button");
        button1.type = "button";
        button1.classList.add("add-another-card-save-button");
        button1.textContent = "Save";
        button1.setAttribute("data-cardListIdSaveAddAnotherCard",obj.id);
        button1.addEventListener("click",view.saveAddAnotherCard);
        div5.append(button1);
        button2 = document.createElement("button");
        button2.type = "button";
        button2.classList.add("add-another-card-cancel-button");
        button2.textContent = "Cancel";
        button2.setAttribute("data-cardListIdCancelAddAnotherCard",obj.id);
        button2.addEventListener("click",view.cancelAddAnotherCard);
        div5.append(button2);
        div3.append(div4);
        //Card Appending
        section = document.querySelector(".card-group");
        section.insertBefore(section1,section.lastElementChild);
        for(let i = 0;i<obj.cardListContent.length;i++){
            view.addCard(obj.cardListContent[i],obj.id)
        }
    },
    saveAddAnotherCard: function(event){
        id = event.target.getAttribute("data-cardListIdSaveAddAnotherCard");
        section = document.querySelector(`[data-cardListId="${id}"]`);
        val = section.querySelector(".add-another-card-in").value;
        octopus.addCard(id,val);
    },
    cardDrag: function(event){
        event.dataTransfer.setData('text',event.target.getAttribute("data-cardIdListId")+" "+event.target.getAttribute("data-cardId"));
    },
    addCard: function(obj,val){
        section = document.querySelector(`[data-cardListId="${val}"]`);
        div1 = document.createElement('div');
        div1.setAttribute("data-cardId",obj.id);
        div1.setAttribute("data-cardIdListId",val);
        div1.draggable = true;
        div1.addEventListener('dragstart',view.cardDrag);
        div1.classList.add("card-content");
        div = document.createElement('div');
        div.setAttribute("data-cardIdDefaultDisplay",obj.id);
        div1.append(div);
        div2 = document.createElement('div');
        div2.classList.add("card-content-text");
        div2.textContent = obj.task;
        div3 = document.createElement('div');
        div3.classList.add("card-content-status");
        div3.textContent = "Due Date: ";
        span = document.createElement('span');
        span.textContent = obj.status;
        div3.append(span);
        img = document.createElement('img');
        img.src = "assets/images/cancel-icon.png";
        img.setAttribute("data-cardListIdRemoveCard",val);
        img.setAttribute("data-cardIdRemoveCard",obj.id);
        img.addEventListener('click',view.removeCard);
        img2 = document.createElement('img');
        img2.src = "assets/images/edit-icon.png";
        img2.setAttribute("data-cardListIdEditCard",val);
        img2.setAttribute("data-cardIdEditCard",obj.id);
        img2.addEventListener('click',view.editCard);
        div.append(div2);
        div.append(img);
        div.append(img2);
        div2.append(div3);

        //creating edit part 
        div4 = document.createElement('div');
        div4.setAttribute("data-cardIdEditDisplay",obj.id);
        div4.style.display = "none";
        div1.append(div4);
        input1 = document.createElement('input');
        input1.classList.add("card-edit-display-task-input");
        div4.append(input1);
        div5 = document.createElement('div');
        div4.append(div5);
        div5.textContent = "Due Date:";
        input2 = document.createElement('input');
        input2.type = "date";
        input2.classList.add("card-edit-display-status-input");
        div5.append(input2);
        div6 = document.createElement('div');
        div6.classList.add("edit-card-button");
        div4.append(div6);
        button1 = document.createElement('button');
        button1.textContent = "Save";
        button1.setAttribute("data-cardListIdSaveEditCard",val);
        button1.setAttribute("data-cardIdSaveEditCard",obj.id);
        button1.addEventListener('click',view.saveEditCard);
        div6.append(button1);
        button2  = document.createElement('button');
        button2.textContent = "Cancel";
        button2.setAttribute("data-cardListIdCancelEditCard",val);
        button2.setAttribute("data-cardIdCancelEditCard",obj.id);
        button2.addEventListener('click',view.cancelEditCard);
        div6.append(button2);
        section.querySelector(".card-content-group").insertBefore(div1,section.querySelector(".card-footer"));
    },
    cancelEditCard: function(event){
        id1 = event.target.getAttribute("data-cardListIdCancelEditCard");
        id2 = event.target.getAttribute("data-cardIdCancelEditCard");
        div1 = document.querySelector(`[data-cardListId="${id1}"]`);
        div2 = div1.querySelector(`[data-cardIdDefaultDisplay="${id2}"]`);
        div2.style.display = "";
        div3 = div1.querySelector(`[data-cardIdEditDisplay="${id2}"]`);
        div3.style.display = "none";
    },
    saveEditCard: function(event){
        id1 = event.target.getAttribute("data-cardListIdSaveEditCard");
        id2 = event.target.getAttribute("data-cardIdSaveEditCard");
        div1 = document.querySelector(`[data-cardListId="${id1}"]`);
        div2 = div1.querySelector(`[data-cardIdDefaultDisplay="${id2}"]`);
        div3 = div1.querySelector(`[data-cardIdEditDisplay="${id2}"]`);
        octopus.editCard(id1,id2,div3.querySelector(".card-edit-display-task-input").value,div3.querySelector(".card-edit-display-status-input").value);
    },
    editCard: function(event){
        id1 = event.target.getAttribute("data-cardListIdEditCard");
        id2 = event.target.getAttribute("data-cardIdEditCard");
        div1 = document.querySelector(`[data-cardListId="${id1}"]`);
        div2 = div1.querySelector(`[data-cardIdDefaultDisplay="${id2}"]`);
        div2.style.display = "none";
        div3 = div1.querySelector(`[data-cardIdEditDisplay="${id2}"]`);
        div3.style.display = "block";
        card = octopus.getIndividualCard(id1,id2);
        div3.querySelector(".card-edit-display-task-input").value = card.task;
        div3.querySelector(".card-edit-display-status-input").value = card.status;
    },
    removeCard: function(event){
        result = confirm("Do you want to remove this card?");
        if(!result)
        return;
        id1 = event.target.getAttribute("data-cardListIdRemoveCard");
        id2 = event.target.getAttribute("data-cardIdRemoveCard");
        octopus.removeCard(id1,id2);
    },
    cancelAddAnotherCard: function(event){
        id = event.target.getAttribute("data-cardListIdCancelAddAnotherCard");
        section = document.querySelector(`[data-cardListId="${id}"]`);
        section.querySelector(".card-footer").style.display = "";
        section.querySelector(".add-another-card-input").style.display="none";
        section.querySelector(".add-another-card-in").value = "";
    },
    removeCardList: function(event){
        result = confirm("Do you want to remove this User?");
        if(!result)
        return;
        section = event.target;
        id = section.getAttribute("data-cardListIdRemove");
        octopus.removeCardList(id);
    },
    addAnotherCard: function(event){
        id = event.target.getAttribute("data-cardListIdAddAnotherCard");
        section = document.querySelector(`[data-cardListId="${id}"]`);
        section.querySelector(".card-footer").style.display = "none";
        section.querySelector(".add-another-card-input").style.display="";
    }
};

octopus.init();

