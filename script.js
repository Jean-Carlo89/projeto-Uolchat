let conversation = document.querySelector('ul');
let message = document.querySelector('input')
let log, newMessages,last;
let userLog
/*----------------Entrando na sala----------------*/


function login(){

userLog = prompt('Qual é o seu nome?')
const enter = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants',{name: userLog})

enter.then(loginSuccess,userLog)

enter.catch(loginError)

function loginSuccess(AnswerSuccess){
    getMessages()
    newMessages = setInterval(getMessages,3000)
    log = setInterval(stayLogged,5000,userLog) 
}
}



function loginError(AnswerError){
    console.log(AnswerError)
    if(AnswerError.response.status===400){
        alert('Já existe um usuário com este nome, insira outro')
        login()
    }
}

function loginStop(){
    clearInterval(log)
    clearInterval(newMessages)
}

function stayLogged(userLog){
    const stayMessage = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/status',{name: userLog})

    stayMessage.then(stayCheck)
    stayMessage.catch(stayError)
}

function stayCheck(stay){
   // console.log(stay)
   // console.log('ainda on')
}

function stayError(stayError){
    console.log(stayError.response)
    alert('Você foi desconectado')
    login()
    //console.log('Errou')
}






/*--------------------------Get messages---------------*/

function getMessages(){
conversation.innerHTML=""
//console.log('atualizou as msg')
const getMessages = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages')

getMessages.then(check)
}

function check(messages){
    //console.log(messages)
    /*const from =messages.data[0].from
    const to =messages.data[0].to
    const text =messages.data[0].text
    const time =messages.data[0].time
    const type =messages.data[0].type
   console.log(from, to , text , time, type)*/
   
   //console.log(messages.data[messages.data.length-1])
   last=messages.data[messages.data.length-1]
   
   console.log('primeiro last abaixo')
   console.log(last)
 
   for(i=0;i<messages.data.length;i++){
        
    const from =messages.data[i].from
    const to =messages.data[i].to
    const text =messages.data[i].text
    const time =messages.data[i].time
    const type =messages.data[i].type
    
    
    if(type==='message'){
    
    conversation.innerHTML +=
        `
        <li class="message">
           <p><span>(${time}) &nbsp <strong>${from}</strong> &nbsp para &nbsp <strong>${to}</strong>:</span> &nbsp ${text}</p>
        </li>
        
        `
    }

    if(type==='status'){
        conversation.innerHTML +=
        `
        <li class="message action">
           (${time})&nbsp <strong>${from}</strong> &nbsp ${text}
        </li>
        
        `
    }
    }

    

}

/*`
<li class="message">
   <span>(${time})</span> &nbsp <span><strong>${from}</strong></span> &nbsp para &nbsp <span><strong>${to}</strong>:</span> &nbsp ${text}
</li>

`*/



function sendMessage(){
   
    /* const conversation = document.querySelector('ul');
    let message = document.querySelector('input').value
    conversation.innerHTML +=
    `
    <li class="message">
        ${message}
    </li
    
    `
    message="";*/

    
    
    if(message.value===""){
        return;
    }
    
    const sendMessage = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages',{from: userLog, to:"todos",text: message.value, type:'message'})
    message.value="";
    
    console.log(sendMessage.then())

}


function updateMessages(){
    const getMessages = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages')
    getMessages.then(update)
}

/*-------------Funcoes do bonus*/

function openParticipants(){
    
    const body = document.querySelector('body')
    body.innerHTML +=`
    <div class="sidebar-container move" onclick="goBack(this)">
            <div class="sidebar">

            </div>
    </div>
    `
 const sidebar = document.querySelector('.sidebar-container')
   
}

function goBack(page){
   page.remove()
}