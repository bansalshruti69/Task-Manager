const model = {
    init: function(){
        if(!localStorage.users){
            localStorage.users = JSON.stringify([]);
        }
        if(!localStorage.totalUsers){
            localStorage.totalUsers = JSON.stringify(0);
        }
    },
    getUsers: function(){
        return JSON.parse(localStorage.users);
    },
    getTotalUsers: function(){
        return JSON.parse(localStorage.totalUsers);
    },
    updateUsers: function(data){
        localStorage.users = JSON.stringify(data);
    },
    updateTotalUsers: function(data){
        localStorage.totalUsers = JSON.stringify(data);
    }
};

const octopus = {
    init: function(){
        model.init();
        view.init();
    },
    getUsers: function(){
        return model.getUsers();
    },
    getUser: function(val){
        users = model.getUsers();
        for(let i = 0;i<users.length;i++){
            if(users[i].id==val){
                return users[i];
            }
        }
    },
    addUser: function(obj){
        users = model.getUsers();
        users.push(obj);
        model.updateUsers(users);
        view.render();
    },
    userId: function(){
        val = model.getTotalUsers();
        val++;
        model.updateTotalUsers(val);
        return val;
    },
    removeUser: function(val){
        users = model.getUsers();
        for(let i = 0;i<users.length;i++){
            if(users[i].id==val){
                users.splice(i,1);
                model.updateUsers(users);
                break;
            }
        }
        view.render();
    },
    editUser: function(obj){
        users = model.getUsers();
        for(let i = 0;i<users.length;i++){
            if(users[i].id==obj.id){
                users[i] = obj;
                model.updateUsers(users);
                break;
            }
        }
        view.render();
    }
};

const view = {
    init: function(){
        view.render();
    },
    createAddUserCardInitial: function(){
        div = document.querySelector(".users");      
        div1 = document.createElement("div");
        div1.classList.add("add-user__profile");
        div1.id = "add-icon";
        div.append(div1);
        img = document.createElement('img');
        img.src = "assets/images/plus-icon.png";
        img.id = "add-icon-image";
        img.addEventListener('click',view.displayAddUserForm);
        div1.append(img);
        div2 = document.createElement('div');
        div2.classList.add("add-user-info");
        div2.style.display = "none";
        div1.append(div2);
        div3 = document.createElement('div');
        div3.classList.add("add-user-info-name");
        div3.innerHTML = 'Name<br><input type="text" id="user-info-name">';
        div2.append(div3);
        div4 = document.createElement('div');
        div4.classList.add("add-user-info-profile");
        div4.innerHTML = 'Profile<br><input type="text" id="user-info-profile">';
        div2.append(div4);
        div5 = document.createElement('div');
        div5.classList.add("add-user-info-location");
        div5.innerHTML = 'Location<br><input type="text" id="user-info-location">';
        div2.append(div5);
        div6 = document.createElement('div');
        div6.classList.add("add-user-info-image");
        div6.innerHTML = 'Image<br><input type="text" id="user-info-image">';
        div2.append(div6);
        div7 = document.createElement('div');
        div7.classList.add("add-user-info-button");
        div2.append(div7);
        button1 = document.createElement('button');
        button1.id = "add-user-info-save-button";
        button1.textContent = "Save";
        button1.addEventListener('click',view.saveAddUserForm);
        div7.append(button1);
        button2 = document.createElement('button');
        button2.id = "add-user-info-cancel-button";
        button2.textContent = "Cancel";
        button2.addEventListener('click',view.cancelAddUserForm);
        div7.append(button2);
    },
    render: function(){
        divs = document.querySelector(".users");
        divs.innerHTML = "";
        view.createAddUserCardInitial();
        users = octopus.getUsers();
        for(let i = 0;i<users.length;i++){
            view.createCard(users[i]);
        }
    },
    displayAddUserForm: function(){
        document.getElementById("add-icon-image").style.display = "none";
        document.querySelector(".add-user-info").style.display = "block";
    },
    cancelAddUserForm: function(){
        document.getElementById("add-icon-image").style.display = "";
        document.querySelector(".add-user-info").style.display = "none";
        document.getElementById("user-info-name").value = "";
        document.getElementById("user-info-profile").value="";
        document.getElementById("user-info-location").value="";
        document.getElementById("user-info-image").value="";
    },
    saveAddUserForm: function(){
        obj = {
            id: octopus.userId(),
            name: document.getElementById("user-info-name").value,
            profile: document.getElementById("user-info-profile").value,
            location: document.getElementById("user-info-location").value,
            imageSource: document.getElementById("user-info-image").value,
        }
        octopus.addUser(obj);
        view.cancelAddUserForm();
    },
    createCard: function(obj){
        div1 = document.createElement('div');
        div1.classList.add("user__profile");
        div1.setAttribute("data-card-userID",obj.id);
        //creating of inner div to display user
        innerdiv = document.createElement('div');
        innerdiv.classList.add("display-user-content");
        div1.append(innerdiv);
        img = document.createElement('img');
        img.classList.add("user__profile--image");
        img.src = obj.imageSource;
        div2 = document.createElement('div');
        div2.classList.add("user__profile--name");
        div2.textContent = obj.name;
        div3 = document.createElement('div');
        div3.classList.add("user__profile--info");
        div3.innerHTML = obj.profile + "<br>" + obj.location;
        button = document.createElement('button');
        button.textContent = "delete";
        button.classList.add("delete-user-button");
        button.addEventListener('click',view.deleteCard);
        button.setAttribute("data-userId",obj.id);
        button1 = document.createElement('button');
        button1.textContent = "Edit";
        button1.classList.add("edit-user-button");
        button1.addEventListener('click',view.editCard);
        button1.setAttribute("data-userId",obj.id);
        innerdiv.append(img);
        innerdiv.append(div2);
        innerdiv.append(div3);
        innerdiv.append(button);
        innerdiv.append(button1);

        //creating outer div
        outerdiv = document.createElement('div');
        outerdiv.classList.add('add-user-info1');
        div1.append(outerdiv);
        outerdiv.style.display = "none";
        div11 = document.createElement('div');
        div11.classList.add('add-user-info-name');
        div11.innerHTML = "Name<br><input type='text'>";
        div11.querySelector('input').value = obj.name;
        outerdiv.append(div11);
        div21 = document.createElement('div');
        div21.classList.add('add-user-info-profile');
        div21.innerHTML = "Profile<br><input type='text'>";
        div21.querySelector('input').value = obj.profile;
        outerdiv.append(div21);
        div31 = document.createElement('div');
        div31.classList.add('add-user-info-location');
        div31.innerHTML = "Location<br><input type='text'>";
        div31.querySelector('input').value = obj.location;
        outerdiv.append(div31);
        div41 = document.createElement('div');
        div41.classList.add('add-user-info-image');
        div41.innerHTML = "Image<br><input type='text'>";
        div41.querySelector('input').value = obj.imageSource;
        outerdiv.append(div41);
        div51 = document.createElement('div');
        div51.classList.add("add-user-info-button");
        outerdiv.append(div51);
        button11 = document.createElement('button');
        button21 = document.createElement('button');
        button11.textContent = "Save";
        button21.textContent = "Cancel";
        button11.classList.add("save-edit");
        button21.classList.add("cancel-edit");
        button11.addEventListener('click',view.saveEditCard);
        button11.setAttribute("data-userId",obj.id);
        button21.addEventListener('click',view.cancelEditCard);
        button21.setAttribute("data-userId",obj.id);
        div51.append(button11);
        div51.append(button21);

        //appending to the card
        div = document.querySelector(".users");
        div.insertBefore(div1,div.lastElementChild);
    },
    cancelEditCard: function(event){
        div1 = event.target;
        id = div1.getAttribute("data-userId");
        div = document.querySelector(`[data-card-userId="${id}"]`);
        div.querySelector('.display-user-content').style.display="";
        div.querySelector('.add-user-info1').style.display="none";
    },
    saveEditCard: function(event){
        div1 = event.target;
        id1 = div1.getAttribute("data-userId");
        div = document.querySelector(`[data-card-userId="${id1}"]`);
        innerdiv = div.querySelector('.add-user-info1');
        obj = {
            id: id1,
            name: innerdiv.querySelector(".add-user-info-name").querySelector("input").value,
            profile: innerdiv.querySelector(".add-user-info-profile").querySelector("input").value,
            location: innerdiv.querySelector(".add-user-info-location").querySelector("input").value,
            imageSource: innerdiv.querySelector(".add-user-info-image").querySelector("input").value
        }
        div.querySelector('.display-user-content').style.display="";
        div.querySelector('.add-user-info1').style.display="none";
        octopus.editUser(obj);
    },
    deleteCard: function(event){
        result = confirm("Are you sure you want to delete this user?");
        if(!result)
        return;
        div = event.target;
        userId = div.getAttribute("data-userId");
        octopus.removeUser(userId);
    },
    editCard: function(event){
        div1 = event.target;
        id = div1.getAttribute("data-userId");
        obj = octopus.getUser(id);
        div = document.querySelector(`[data-card-userId="${id}"]`);
        div.querySelector('.display-user-content').style.display="none";
        div.querySelector('.add-user-info1').style.display="block";
        innerdiv = div.querySelector('.add-user-info1');
        innerdiv.querySelector(".add-user-info-name").querySelector("input").value = obj.name;
        innerdiv.querySelector(".add-user-info-profile").querySelector("input").value = obj.profile;
        innerdiv.querySelector(".add-user-info-location").querySelector("input").value = obj.location;
        innerdiv.querySelector(".add-user-info-image").querySelector("input").value = obj.imageSource;
    }
};

octopus.init();