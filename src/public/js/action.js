$('#modalProduto').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var id = button.data('id');
    var modal = $(this);
    $.ajax({
        type: "get",
        url: "api/produto/id/" + id,
        dataType: "json",
        success: function (data) {
            modal.find('#modalFotoProduto').html('<button type="button" class="btn btn-success" data-dismiss="modal" data-toggle="modal" data-target="#modalModFoto" data-id=' + data.id + '>Adicionar Foto</button>')
            modal.find('#modalExcluirProduto').attr("href", "?excluirProduto=" + data.id);
            modal.find('#modalEditarProduto').html('<button type="button" class="btn btn-primary" data-dismiss="modal" data-toggle="modal" data-target="#modalModProduto" data-id=' + data.id + '>Editar</button>');
            modal.find('#modalNomeProduto').text(data.nome);
            modal.find('#modalPrecoProduto').text("R$ " + data.valor);
            modal.find('#modalFabricanteProduto').text(data.fabricante);
            modal.find('#modalDescricaoProduto').text(data.descricao);
        }
    });
    $.ajax({
        type: "get",
        url: "api/produto/fotos/" + id,
        dataType: "json",
        success: function (data) {
            $carousel = "";
            $.each(data, function (i, dados) {
                if (i == 0) {
                    $carousel += '<div class="carousel-item active"><img src="' + dados.foto + '" class="d-block w-100"> </div>';
                } else {
                    $carousel += '<div class="carousel-item"><img src="' + dados.foto + '" class="d-block w-100"> </div>';
                }
            });
            $('#carouselProduto').html($carousel);
        }
    });
});

$('#modalModProduto').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var id = button.data('id');
    var modal = $(this);
    if (id != undefined) {
        $.ajax({
            type: "get",
            url: "api/produto/id/" + id,
            dataType: "json",
            success: function (data) {
                modal.find('#frmProduto #produtoID').html('<input type="hidden" name="produtoId" value="' + data.id + '">');
                modal.find('#produtoCategoria option[value=' + data.id_categoria + ']').attr({
                    selected: "selected"
                });
                modal.find('#produtoNome').val(data.nome);
                modal.find('#produtoValor').val(data.valor);
                modal.find('#produtoFabricante').val(data.fabricante);
                modal.find('#produtoDescricao').val(data.descricao);
            }
        });
    } else {
        modal.find('#frmProduto #produtoID').html(null);
        modal.find('#produtoCategoria option[value=1]').attr({
            selected: "selected"
        });
        modal.find('#produtoNome').val(null);
        modal.find('#produtoValor').val(null);
        modal.find('#produtoFabricante').val(null);
        modal.find('#produtoDescricao').val(null);
    }
});
$('#modalModCategoria').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var id = button.data('id');
    var modal = $(this);
    if (id != undefined) {
        var parametros = {
            "id": id
        };
        $.ajax({
            type: "post",
            url: "ajax.php?acao=listarCategoria",
            data: parametros,
            dataType: "json",
            success: function (data) {
                modal.find('#frmCategoria #categoriaID').html('<input type="hidden" name="categoriaId" value="' + data.categoria.id + '">');
                modal.find('#categoriaNome').val(data.categoria.nome);
            }
        });
    } else {
        modal.find('#frmCategoria #categoriaID').html(null);
        modal.find('#categoriaNome').val(null);
    }
});
$('#modalModFoto').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var id = button.data('id');
    var modal = $(this);
    modal.find('#frmFotoProduto #nomeFotoID').html('<input type="hidden" name="nomeFotoId" value="' + id + '">');
});