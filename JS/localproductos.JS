$(document).ready(function () {
  let arreglo = [
    {
      id: 1,
      nombre: "Cloro Espumoso",
      descripcion: "Desinfecta superficies difíciles",
      precio_mayoreo: "14.00",
      precio_menudeo: "12.00",
      tipo_producto: "Productos de limpieza",
    },
    {
      id: 2,
      nombre: "Vanish Quita Manchas",
      descripcion: "Remueve manchas y blanquea",
      precio_mayoreo: "14.00",
      precio_menudeo: "10.50",
      tipo_producto: "Productos de limpieza",
    },
    {
      id: 3,
      nombre: "Limpia Cristales",
      descripcion: "Detergente biodegradable para limpiar y desengrasar",
      precio_mayoreo: "15.00",
      precio_menudeo: "13.60",
      tipo_producto: "Productos de limpieza",
    },
    {
      id: 4,
      nombre: "Dertergente zote",
      descripcion: "Jabón de lavandería puro",
      precio_mayoreo: "18.00",
      precio_menudeo: "15.60",
      tipo_producto: "Productos de limpieza",
    },
    {
      id: 5,
      nombre: "Glicerina",
      descripcion: "Ofrece una protección eficaz contra el mal olor",
      precio_mayoreo: "15.00",
      precio_menudeo: "13.00",
      tipo_producto: "Productos de limpieza",
    },
    {
      id: 6,
      nombre: "Aromatizante Stefano",
      descripcion: "Ofrece una protección eficaz contra el mal olor",
      precio_mayoreo: "14.00",
      precio_menudeo: "10.50",
      tipo_producto: "Aromatizantes",
    },
    {
      id: 7,
      nombre: "Aromatizante Coco",
      descripcion: "Concentrado de alto rendimiento con aroma agradable que permanece por varias horas en el ambiente",
      precio_mayoreo: "14.00",
      precio_menudeo: "10.50",
      tipo_producto: "Aromatizantes",
    },
    {
      id: 8,
      nombre: "Aromatizante Uva",
      descripcion: "Aroma agradable y alto rendimiento",
      precio_mayoreo: "18.00",
      precio_menudeo: "17.50",
      tipo_producto: "Aromatizantes",
    },
    {
      id: 9,
      nombre: "Aromatizante Chicle",
      descripcion: "Fragancia caracterizada por sus notas típicas de chicle",
      precio_mayoreo: "22.00",
      precio_menudeo: "20.00",
      tipo_producto: "Aromatizantes",
    },
    {
      id: 10,
      nombre: "Aromatizante Menta Limón",
      descripcion: "Aroma único y de notoria calidez",
      precio_mayoreo: "25.00",
      precio_menudeo: "21.00",
      tipo_producto: "Aromatizantes",
    },
    {
      id: 11,
      nombre: "Lavanda",
      descripcion: "Fragancia a base de agua con notas aromáticas y florales",
      precio_mayoreo: "30.00",
      precio_menudeo: "28.60",
      tipo_producto: "Bases multiusos",
    },
    {
      id: 12,
      nombre: "Mar Fresco",
      descripcion: "Perfecto para mantener superficies limpias y brillantes",
      precio_mayoreo: "28.00",
      precio_menudeo: "26.60",
      tipo_producto: "Bases multiusos",
    },
    {
      id: 13,
      nombre: "Chica Fresa",
      descripcion: "Fragancia para dar aroma a productos de cuidado personal",
      precio_mayoreo: "31.00",
      precio_menudeo: "29.00",
      tipo_producto: "Bases multiusos",
    },
    {
      id: 14,
      nombre: "Canela",
      descripcion: "Limpiador multiusos con fragancia y pH nivelado",
      precio_mayoreo: "26.00",
      precio_menudeo: "20.00",
      tipo_producto: "Bases multiusos",
    },
    {
      id: 15,
      nombre: "Nordico",
      descripcion: "Es adecuado para casi cualquier tarea y superficie de la casa",
      precio_mayoreo: "22.00",
      precio_menudeo: "20.50",
      tipo_producto: "Bases multiusos",
    },
    {
      id: 16,
      nombre: "Fresa",
      descripcion: "Desinfecta y limpia tus manos",
      precio_mayoreo: "30.00",
      precio_menudeo: "25.00",
      tipo_producto: "Shampoo para manos",
    },
    {
      id: 17,
      nombre: "Manzana Kiwi",
      descripcion: "Jabón liquido con agradable aroma a manzana-kiwi",
      precio_mayoreo: "35.00",
      precio_menudeo: "30.00",
      tipo_producto: "Shampoo para manos",
    },
    {
      id: 18,
      nombre: "Sandia",
      descripcion: "Elimina germenes, bacterias, y suciedad de la piel",
      precio_mayoreo: "28.00",
      precio_menudeo: "24.00",
      tipo_producto: "Shampoo para manos",
    },
    {
      id: 19,
      nombre: "Durazno",
      descripcion: "Contiene detergentes y agentes protectores de la piel",
      precio_mayoreo: "22.00",
      precio_menudeo: "19.00",
      tipo_producto: "Shampoo para manos",
    },
    {
      id: 20,
      nombre: "Mora Azul",
      descripcion: "Jabon antibacterial para lavado de manos y cuerpo",
      precio_mayoreo: "23.00",
      precio_menudeo: "21.00",
      tipo_producto: "Shampoo para manos",
    },
  ];
  
  // Cargar productos
  function loadProducts() {
    let products = arreglo;
    let productTableBody = $("#user-table-body");
    productTableBody.empty();
    products.forEach((product) => {
      productTableBody.append(`
        <tr>
          <td>${product.nombre}</td>
          <td>${product.descripcion}</td>
          <td>${product.precio_mayoreo}</td>
          <td>${product.precio_menudeo}</td>
          <td>${product.tipo_producto}</td>
          <td>
            <button class="btn btn-dark btn-sm edit-product-btn" data-id="${product.id}">Editar</button>
            <button class="btn btn-outline-danger btn-sm delete-product-btn" data-id="${product.id}">Eliminar</button>
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

  // Agregar producto
  $("#user-form").submit(function (event) {
    event.preventDefault();
    let productId = $("#user-id").val();
    let productName = $("#product-name").val();
    let productDescription = $("#product-description").val();
    let productPriceMayoreo = $("#product-price-mayoreo").val();
    let productPriceMenudeo = $("#product-price-menudeo").val();
    let productType = $("#product-type").val();
    let method = productId ? "PUT" : "POST";

    if (method == "POST") {
      let newId = arreglo.length > 0 ? arreglo[arreglo.length - 1].id + 1 : 1;
      arreglo.push({
        id: newId,
        nombre: productName,
        descripcion: productDescription,
        precio_mayoreo: productPriceMayoreo,
        precio_menudeo: productPriceMenudeo,
        tipo_producto: productType,
      });
    } else {
      let objeto = searchObject(productId);
      objeto.nombre = productName;
      objeto.descripcion = productDescription;
      objeto.precio_mayoreo = productPriceMayoreo;
      objeto.precio_menudeo = productPriceMenudeo;
      objeto.tipo_producto = productType;
    }
    loadProducts();
    showAlert("Producto guardado exitosamente", "success");
    $("#userModal").modal("hide");
  });

  function searchObject(id) {
    return arreglo.find((item) => item.id == id) || {};
  }

  // Editar producto
  $(document).on("click", ".edit-product-btn", function () {
    let productId = $(this).data("id");
    let objeto = searchObject(productId);

    $("#user-id").val(objeto.id);
    $("#product-name").val(objeto.nombre);
    $("#product-description").val(objeto.descripcion);
    $("#product-price-mayoreo").val(objeto.precio_mayoreo);
    $("#product-price-menudeo").val(objeto.precio_menudeo);
    $("#product-type").val(objeto.tipo_producto);
    $("#userModalLabel").text("Editar Producto");
    $("#userModal").modal("show");
  });

 // Eliminar producto
$(document).on("click", ".delete-product-btn", function () {
  let productId = $(this).data("id");

  // Mostrar alerta de confirmación
  if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      arreglo = arreglo.filter((item) => item.id != productId);

      loadProducts();
      window.alert("Producto eliminado exitosamente", "success");
  } else {
      // Opción si el usuario cancela la eliminación
      window.alert("Eliminación cancelada", "info");
  }
});


  // Resetear modal al cerrarlo
  $("#userModal").on("hidden.bs.modal", function () {
    $("#user-form")[0].reset();
    $("#user-id").val("");
    $("#userModalLabel").text("Agregar Producto");
  });

  // Inicializar la tabla de productos
  loadProducts();
});
