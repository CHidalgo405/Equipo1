$(document).ready(function () {
    let ventas = [
      {
        id: 1,
        producto: "Cloro",
        cantidad: 5,
        precio: 12,
        total: 60
      },
      {
        id: 2,
        producto: "Lavanda",
        cantidad: 3,
        precio: 24,
        total: 72
      },
      {
        id: 3,
        producto: "Hugo Boss",
        cantidad: 1,
        precio: 240,
        total: 240
      },
      {
          id: 4,
          producto: "Aromatizante de Pino",
          cantidad: 4,
          precio: 18,
          total: 72
      },
      {
          id: 5,
          producto: "Detergente Líquido",
          cantidad: 6,
          precio: 15,
          total: 90
      },
      {
          id: 6,
          producto: "Suavizante de Telas",
          cantidad: 2,
          precio: 30,
          total: 60
      },
      {
          id: 7,
          producto: "Aromatizante de Vainilla",
          cantidad: 5,
          precio: 20,
          total: 100
      },
      {
          id: 8,
          producto: "Desinfectante Multiusos",
          cantidad: 3,
          precio: 22,
          total: 66
      },
      {
          id: 9,
          producto: "Perfume para Auto 'Ocean Breeze'",
          cantidad: 2,
          precio: 35,
          total: 70
      }
  ];
  
    // Cargar ventas
    function loadSales() {
      let sales = ventas;
      let salesTableBody = $("#sales-table-body");
      salesTableBody.empty();
      sales.forEach((sale) => {
        salesTableBody.append(`
          <tr>
            <td>${sale.producto}</td>
            <td>${sale.cantidad}</td>
            <td>${sale.precio}</td>
            <td>${sale.total}</td>
            <td>
              <button class="btn btn-dark btn-sm edit-sale-btn" data-id="${sale.id}">Editar</button>
              <button class="btn btn-outline-danger btn-sm delete-sale-btn" data-id="${sale.id}">Eliminar</button>
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
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `);
      setTimeout(() => {
        $("#alert-container").html("");
      }, 3000);
    }
  
    // Agregar o editar venta
    $("#sale-form").submit(function (event) {
      event.preventDefault();
      let saleId = $("#sale-id").val();
      let saleProduct = $("#sale-product").val();
      let saleQuantity = parseInt($("#sale-quantity").val());
      let salePrice = parseFloat($("#sale-price").val());
      let saleTotal = saleQuantity * salePrice;
      let method = saleId ? "PUT" : "POST";
  
      if (method == "POST") {
        let newId = ventas.length > 0 ? ventas[ventas.length - 1].id + 1 : 1;
        ventas.push({
          id: newId,
          producto: saleProduct,
          cantidad: saleQuantity,
          precio: salePrice,
          total: saleTotal
        });
      } else {
        let sale = searchSale(saleId);
        sale.producto = saleProduct;
        sale.cantidad = saleQuantity;
        sale.precio = salePrice;
        sale.total = saleTotal;
      }
      loadSales();
      showAlert("Venta guardada exitosamente", "success");
      $("#saleModal").modal("hide");
    });
  
    function searchSale(id) {
      return ventas.find((item) => item.id == id) || {};
    }
  
    // Editar venta
    $(document).on("click", ".edit-sale-btn", function () {
      let saleId = $(this).data("id");
      let sale = searchSale(saleId);
  
      $("#sale-id").val(sale.id);
      $("#sale-product").val(sale.producto);
      $("#sale-quantity").val(sale.cantidad);
      $("#sale-price").val(sale.precio);
      $("#saleModalLabel").text("Editar Venta");
      $("#saleModal").modal("show");
    });
  
// Eliminar venta
$(document).on("click", ".delete-sale-btn", function () {
  let saleId = $(this).data("id");

  // Mostrar alerta de confirmación
  if (confirm("¿Estás seguro de que deseas eliminar esta venta?")) {
      ventas = ventas.filter((item) => item.id != saleId);

      loadSales();
      showAlert("Venta eliminada exitosamente", "success");
  } else {
      // Opción si el usuario cancela la eliminación
      showAlert("Eliminación cancelada", "info");
  }
});
  
    // Resetear modal al cerrarlo
    $("#saleModal").on("hidden.bs.modal", function () {
      $("#sale-form")[0].reset();
      $("#sale-id").val("");
      $("#saleModalLabel").text("Registrar Venta");
    });
  
    // Inicializar la tabla de ventas
    loadSales();
  });
  