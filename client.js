window.onload = function () { 

    var btn = document.getElementById('btn'); 
    var message_input = document.getElementById('inp'); 
    var message_container = document.getElementById('messages'); 
    var usersContainer = document.getElementById('sidebar');
    var inputName = document.getElementById('name');
    var socket = io.connect('http://localhost:8080');
var name = '';

    document.getElementById('name_btn').onclick = function() {
        name = inputName.value;

        
        if (!name) {
            alert('Please enter your name.');
            return;
        }

          // Отправляем имя на сервер
          socket.emit('add user', name);

    }


    socket.on('update users', function(users) {
        users.forEach(user => {
            var sendName = document.createElement('h5');
            sendName.textContent = user; // Форматируем текст
            usersContainer.appendChild(sendName); // Добавляем элемент в контейнер
        });
    });

  

    socket.on('chat message', function (message) {
        console.log(message)
        // сгенерировать html разметку сообщения 
        var display_message = `<div class ="panel well">
                                   <h4>${message.name}</h4>
                                   <h5>${message.text}</h5>
                               </div>` 

        // добавить результат на страницу 
        message_container.innerHTML += display_message;

    })






    btn.onclick = function () {

        if (!name) {
            alert('Please enter your name before sending messages.');
            return;
        }

        // сгенерировать событие отправки сообщения 
        socket.emit('send message', { name: name, text: message_input.value }); 

    }
}