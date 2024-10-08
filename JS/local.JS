$(document).ready(function () {
 

    let arreglo = [
      {
        id: 1,
        first_name: "Carlos",
        last_name: "Hidalgo",
        email: "hidalgo@gmail.com",
      },
      {
        id: 2,
        first_name: "Kevin",
        last_name: "Sandoval",
        email: "kevin@gmail.com",
      },
      {
        id: 3,
        first_name: "Gabriel",
        last_name: "Andrade",
        email: "gabi@gmail.com",
      },
      {
        id: 4,
        first_name: "Perla",
        last_name: "Luna",
        email: "luna@gmail.com",
      },
    ];
  
    // Cargar usuarios
    function loadUsers() {
      let users = arreglo;
      let userTableBody = $("#user-table-body");
      userTableBody.empty();
      users.forEach((user) => {
        userTableBody.append(`
                      <tr>
                          <td>${user.id}</td>
                          <td>${user.first_name} ${user.last_name}</td>
                          <td>${user.email}</td>
                          <td>
                              <button class="btn btn-dark btn-sm edit-user-btn" data-id="${user.id}">Editar</button>
                              <button class="btn btn-outline-danger btn-sm delete-user-btn" data-id="${user.id}">Eliminar</button>
                          </td>
                      </tr>
                  `);
      });
    }
  
    // Mostrar alerta
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
  
    // Agregar usuario
    $("#user-form").submit(function (event) {
      event.preventDefault();
      let userId = $("#user-id").val();
      let userName = $("#user-name").val().split(" ");
      let userEmail = $("#user-email").val();
      let method = userId ? "PUT" : "POST";
  
      let lastName = "";
      if (userName.length > 1) {
        for (let i = 1; i < userName.length; i++) {
          lastName += userName[i] + " ";
        }
      }
      lastName = lastName.trim();
  
      if (method == "POST") {
        let newId = arreglo[arreglo.length - 1].id + 1;
        arreglo.push({
          id: newId,
          first_name: userName[0],
          last_name: lastName,
          email: userEmail,
        });
      } else {
        let objeto = searchObject(userId);
  
        objeto.first_name = userName[0];
        objeto.last_name = lastName;
        objeto.email = userEmail;
      }
      loadUsers();
      showAlert("Usuario guardado exitosamente", "success");
      $("#userModal").modal("hide");
    });
  
    function searchObject(id) {
      let objeto = {};
      for (let i = 0; i < arreglo.length; i++) {
        if (id == arreglo[i].id) {
          objeto = arreglo[i];
          break;
        }
      }
      return objeto;
    }
  
    // Editar usuario
    $(document).on("click", ".edit-user-btn", function () {
      let userId = $(this).data("id");
      let objeto = searchObject(userId);
  
      let user = objeto;
      $("#user-id").val(user.id);
      $("#user-name").val(`${user.first_name} ${user.last_name}`);
      $("#user-email").val(user.email);
      $("#userModalLabel").text("Editar Usuario");
      $("#userModal").modal("show");
    });
  
// Eliminar usuario
$(document).on("click", ".delete-user-btn", function () {
  let userId = $(this).data("id");
  let indice = 0;

  // Mostrar alerta de confirmación
  if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      for (let i = 0; i < arreglo.length; i++) {
          if (userId == arreglo[i].id) {
              indice = i;
          }
      }

      arreglo.splice(indice, 1);

      loadUsers();
      showAlert("Usuario eliminado exitosamente", "success");
  } else {
      // Opción si el usuario cancela la eliminación
      showAlert("Eliminación cancelada", "info");
  }
});
  
    // Resetear modal al cerrarlo
    $("#userModal").on("hidden.bs.modal", function () {
      $("#user-form")[0].reset();
      $("#user-id").val("");
      $("#userModalLabel").text("Agregar Usuario");
    });
  
    // Inicializar la tabla de usuarios
   
      loadUsers();
    
  });