const FormCreateClub = document.getElementById("CreateClubForm");
FormCreateClub.addEventListener("submit", (event) => {
    event.preventDefault();  // <-- evita il refresh della pagina
    const formData = new FormData(FormCreateClub);
    formData.append("id_utente",JSON.parse(localStorage.getItem("Utente")).id_user)
    fetch('http://127.0.0.1:5000/CreateClub',
        {
            method: "POST",
            body: formData
        }
    )
        .then(response => response.json())
        .then(create_result => {
            window.location.href = "index.html";
        })

})