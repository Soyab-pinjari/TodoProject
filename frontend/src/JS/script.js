const API_URL = 'http://localhost:3000/todo';

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

if(registerForm){
registerForm.addEventListener('submit',async(e)=>{
e.preventDefault();
const username=document.querySelector('#registerUser').value;
const email = document.querySelector('#registerEmail').value;
const password = document.querySelector('#registerPassword').value;

const res = await fetch(`${API_URL}/register`,{
    method:"post",
headers:{"Content-Type":"application/json"},
    body:JSON.stringify({username,email,password})
});

const data = await res.json();

if(res.ok){
 alert("registeration successful ");
 window.location.href="/login"
}else{
    alert(data.message || "registration failed");
}
})
}


if(loginForm){
loginForm.addEventListener('submit',async(e)=>{
e.preventDefault();
const username=document.querySelector('#loginUser').value;
const password = document.querySelector('#loginPassword').value;

const res = await fetch(`${API_URL}/login`,{
    method:"post",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({username,password})
});

const data = await res.json();

if(res.ok){
 localStorage.setItem("token",data.token)
 window.location.href="/todo"

}else{
    alert(data.message || "login failed");
}
}
)}