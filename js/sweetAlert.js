(async () => {
    const {value: pais} = await Swal.fire({
        title: "Bienvenido!",
        text: "Seleccione su pais",
        icon: "question",
        backdrop: true,
        timer: 5000,
        timerProgressBar: true,
        position: "center",
        padding: "1rem",
        allowOutsideClick: true,
        allowEscapeKey: false,
        allowEnterKey: false,
        stopKeydownPropagation: false,
        input: "select",
        inputPlaceholder: "Pais",
        inputValue: "",
        inputOptions: {
            Mexico: "Mexico",
            españa: "España",
            Mexico: "Mexico",
            Argentina: "Argentina",
            Chile: "Chile",
            Uruguay: "Uruguay",
            Colombia: "Colombia",
            Venezuela: "Venezuela",
            Peru: "Peru",
            USA: "Usa",
            Italia: "Italia",            

        },

    showConfirmButton: true,
    confirmButtonAriaLabel: "Confirmar",
    
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    cancelButtonAriaLabel:"Cancelar",

    buttonStyling: true,
    showCloseButton: true,
    closeButtonAriaLabel:"Cerrar alerta",

    
    });

    if (pais){
        Swal.fire({
            title: `Seleccionaste ${pais}`
        });
    }
})()





