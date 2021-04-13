
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

    const conversation = document.querySelector('ul');
    let message = document.querySelector('input')
    
    if(message.value===""){
        return;
    }
    
    conversation.innerHTML +=
    `
    <li class="message">
        ${message.value}
    </li
    
    `
    message.value="";
    

}