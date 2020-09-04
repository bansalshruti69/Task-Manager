const model = {
    users: null,
    totalUsers:null,
    init: function(){
        model.users = [];
        model.totalUsers = 0;
    }
};

const octopus = {
    init: function(){
        model.init();
        view.init();
    },
    addUser: function(obj){
        model.users.push(obj);
    },
    userId: function(){
        return model.totalUsers++;
    },
    removeUser: function(val){
        obj = model.users[val];
        obj.display = false;
    }
};

const view = {
    init: function(){
        img = document.getElementById("add-icon-image");
        img.addEventListener('click',view.displayAddUserForm);
        cancelButton = document.getElementById("add-user-info-cancel-button");
        cancelButton.addEventListener('click',view.cancelAddUserForm);
        saveButton = document.getElementById("add-user-info-save-button");
        saveButton.addEventListener('click',view.saveAddUserForm);
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
            name: document.getElementById("user-info-name").value,
            profile: document.getElementById("user-info-profile").value,
            location: document.getElementById("user-info-location").value,
            imageSource: document.getElementById("user-info-image").value,
            display: true
        }
        octopus.addUser(obj);
        view.createCard(obj);
        view.cancelAddUserForm();
    },
    createCard: function(obj){
        div1 = document.createElement('div');
        div1.classList.add("user__profile");
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
        div1.append(img);
        div1.append(div2);
        div1.append(div3);
        div1.append(button);
        div1.setAttribute("data-userId",""+octopus.userId());
        div = document.querySelector(".users");
        div.insertBefore(div1,div.lastElementChild);
    },
    deleteCard: function(event){
        div = event.target.closest(".user__profile");
        userId = div.getAttribute("data-userId");
        octopus.removeUser(userId);
        div.remove();
    }
};

octopus.init();