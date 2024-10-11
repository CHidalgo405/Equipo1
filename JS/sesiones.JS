$(document).ready(function() {
    const users = [
      { id: 1, first_name: "Carlos", 
        last_name: "Hidalgo", 
        email: "hidalgo@gmail.com", 
        password: "12345" 
    },
      { id: 2, first_name: "Kevin", 
        last_name: "Sandoval", 
        email: "kevin@gmail.com", 
        password: "12345" 
    },
      { id: 3, 
        first_name: "Gabriel", 
        last_name: "Andrade", 
        email: "gabi@gmail.com", 
        password: "12345" 
    },
      { id: 4, 
        first_name: "Perla", 
        last_name: "Luna", 
        email: "luna@gmail.com", 
        password: "12345" 
    },
      { id: 5, 
        first_name: "Abigail", 
        last_name: "Mejia", 
        email: "abi@gmail.com", 
        password: "12345" 
    }
    ];

    function showAlert(message, type) {
      $("#alert-container").html(`
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
          ${message}
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      `);
      setTimeout(() => {
        $("#alert-container").html("");
      }, 3000);
    }

    $("#login-form").submit(function(event) {
      event.preventDefault();
      const email = $("#email").val();
      const password = $("#password").val();
      const user = users.find(user => user.email === email && user.password === password);

      if (user) {
        window.location.href = "aindex.HTML";
        window.alert("Bienvenido al panel administrativo de nuestra empresa, aca podras realizar acciones sobre los productos, usuarios y demas cosas.");
      } else {
        window.alert("Usuario o contraseña incorrectos");
      }
    });
  });
