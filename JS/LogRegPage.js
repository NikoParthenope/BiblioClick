const FormRegistrazione = document.getElementById("RegisterForm");

FormRegistrazione.addEventListener("submit", (event) =>{
    event.preventDefault();
    const formData = new FormData(FormRegistrazione);
    console.log(formData.get("Nome"));
    fetch('http://127.0.0.1:5000/Register', {
    method:'POST', 
    body: formData
    })
    .then(response => response.json())
    .then(ciao => {
        console.log(ciao.username);
    })

})