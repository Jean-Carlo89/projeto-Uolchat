let conversation = document.querySelector('ul');
    let message = document.querySelector('input')
/*----------------Entrando na sala----------------*/
let log;


function login(){

let userLog = prompt('Qual é o seu nome?')
const enter = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants',{name: userLog})

enter.then(loginSuccess)

enter.catch(loginError)


    function loginSuccess(AnswerSuccess){
        //console.log(AnswerSuccess)

    /*  conversation.innerHTML +=
        `
        <li class="message">
            ${message.value}
        </li>
        
        `*/

        log = setInterval(stayLogged,3000,userLog) 
    }
}

function loginStop(){
    clearInterval(log)
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
    //console.log('Errou')
}



function loginError(AnswerError){
    console.log(AnswerError)
    if(AnswerError.response.status===400){
        alert('Já existe um usuário com este nome')
        login()
    }
}


/*--------------------------Get messages---------------*/

const getMessages = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages')

getMessages.then(check)

function check(messages){
    console.log(messages)
    const from =messages.data[0].from
    const to =messages.data[0].to
    const text =messages.data[0].text
    const time =messages.data[0].time
    const type =messages.data[0].type
   console.log(from, to , text , time, type)
   
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
    
    conversation.innerHTML +=
    `
    <li class="message">
        ${message.value}
    </li>
    
    `
    message.value="";
    

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