var adicionais = document.getElementById('adicionais');
var botao_valores = document.getElementById('btn_valores');
var bloquear_div = document.getElementById('bloquear');
var mensagem = document.getElementById('mensagem')
var totalProdutos = 0;
var valores = [];
var total_compra = 0; // Inicializa o total da compra
var dic = []
var carrinhoCompras = document.getElementById("carrinho");
var escolha_regiao = document.getElementById("escolha_regiao");
var btn_regiao = document.getElementById("btn_regiao");
var regiao = document.querySelectorAll(".regiao");
var btn_sujestao = document.getElementById("btn_sujestao");
var esconde_carrinho = document.getElementById("esconde_carrinho");
let carrinho = [];
let valorCompra = [];
var esconde_comprar_mais = document.getElementById("esconde_comprar_mais");
var pagamentos = document.getElementById("pagamento");
var btn_pix = document.getElementById("btn_pix");
var btn_cartao = document.getElementById("btn_cartao");
var btn_dinheiro = document.getElementById("btn_dinheiro");
var res_pix = document.getElementById("res_pix");
var res_cartao = document.getElementById("res_cartao");
var res_dinheiro = document.getElementById("res_dinheiro");
var env_pix = document.getElementById("env_pix");
var env_cartao = document.getElementById("env_cartao");
var env_dinheiro = document.getElementById("env_dinheiro");
var res_pagamento = document.getElementById("res_pagamento");
var obs_pagamento = document.getElementById("obs_pagamento");
var valor_pagamento = document.getElementById("valor_pagamentos");
var res_nome = document.getElementById('res_nome')
var res_end = document.getElementById('res_end')
var res_end2 = document.getElementById('res_end2')

window.addEventListener('load', function(){
    dados_Branco()
    alert('CONCLUA TODAS AS ETAPAS ATÉ A ABA DE PAGAMENTOS PARA FINALIZAR SEU PEDIDO')
  })
/*
function alterarQuantidade(valor, quantidadeId, preco, totalId) {
    const quantidadeInput = document.getElementById(quantidadeId);
    const totalInput = document.getElementById(totalId);
    let quantidadeAtual = parseInt(quantidadeInput.value);
    let novaQuantidade = quantidadeAtual + valor;

    if (novaQuantidade < 0) novaQuantidade = 0;

    if (totalProdutos + (novaQuantidade - quantidadeAtual) <= 1000) {
        totalProdutos += (novaQuantidade - quantidadeAtual);
        quantidadeInput.value = novaQuantidade;
        totalInput.value = (novaQuantidade * preco).toFixed(2);
    } else {
        alert(`Existe algo de errado, consulte o desenvolvedor`);
    }
}
    */
let totalGeral = 0;

function alterarQuantidade(valor, quantidadeId, preco, totalId) {
    const quantidadeInput = document.getElementById(quantidadeId);
    const totalInput = document.getElementById(totalId);
    let quantidadeAtual = parseInt(quantidadeInput.value);
    let novaQuantidade = quantidadeAtual + valor;

    if (novaQuantidade < 0) novaQuantidade = 0;

    if (totalProdutos + (novaQuantidade - quantidadeAtual) <= 1000) {
        // Atualizar total de produtos
        totalProdutos += (novaQuantidade - quantidadeAtual);

        // Atualizar a quantidade do produto
        quantidadeInput.value = novaQuantidade;

        // Atualizar o total desse produto
        const totalProduto = (novaQuantidade * preco).toFixed(2);
        totalInput.value = totalProduto;

        // Atualizar o total geral
        atualizarTotalGeral();
    } else {
        alert(`Existe algo de errado, consulte o desenvolvedor`);
    }
}

function atualizarTotalGeral() {
    // Selecionar todos os campos de total de cada produto
    const totais = document.querySelectorAll('input[id^="total"]');
    totalGeral = 0;

    // Somar todos os valores de total dos produtos
    totais.forEach(total => {
        totalGeral += parseFloat(total.value);
    });

    // Atualizar o total geral na página
    document.getElementById('totalGeral').innerText = totalGeral.toFixed(2);
}


botao_valores.addEventListener("click", function () {
    const produtos = [
        { id: 'item1', totalId: 'total1', quantidadeId: 'quantidade1' },
        { id: 'item2', totalId: 'total2', quantidadeId: 'quantidade2' },
        { id: 'item3', totalId: 'total3', quantidadeId: 'quantidade3' },
        { id: 'item4', totalId: 'total4', quantidadeId: 'quantidade4' },
        { id: 'item5', totalId: 'total5', quantidadeId: 'quantidade5' },
        { id: 'item6', totalId: 'total6', quantidadeId: 'quantidade6' },
        { id: 'item7', totalId: 'total7', quantidadeId: 'quantidade7' }
    ];

    valores = []; // Limpa o array de valores antes de cada clique
    total_compra = 0; // Reinicializa o total da compra a cada clique

    produtos.forEach(produto => {
        const produtoInput = document.getElementById(produto.id);
        const quantidadeInput = document.getElementById(produto.quantidadeId);
        const produtoNome = produtoInput.value.trim();
        const quantidade = parseInt(quantidadeInput.value);
        const totalInput = document.getElementById(produto.totalId);
        const vlr_tt = parseFloat(totalInput.value);

        if (quantidade > 0) {
            var itens_cx = `${produtoNome} - Qtd ${quantidade} - Valor R$ ${vlr_tt.toFixed(2)}`;
            valores.push(itens_cx);
            total_compra += vlr_tt; // Adiciona o valor do produto ao total da compra
            quantidadeInput.value = "0";
            totalInput.value = "0.00";
        }
    });

    adicionais.style.display = 'none';
    mensagem.style.display = 'block';
    console.log(valores); // Exibe os valores no console
    console.log(`Total da compra: R$ ${total_compra}`); // Exibe o total da compra no console
});

btn_sujestao.addEventListener("click", function (e) {
  e.preventDefault();
  var clienteDigitou = document.getElementById("campo").value;
  if (clienteDigitou == "") {
    var digitou = { textoDigitado: "Sem Sujestão de montagem" };
    sessionStorage.setItem("digitou", JSON.stringify(digitou));
  } else {
    var digitou = { textoDigitado: clienteDigitou };
    sessionStorage.setItem("digitou", JSON.stringify(digitou));
  }
  
  esconde_carrinho.style.display = "block";
  mensagem.style.display = "none";
});

function adicionarCarrinho() {
  valorCompra.push(total_compra);
  carrinho.push(valores);

  atualizarCarrinho();
  mostrarValorNaTela();
}

function atualizarCarrinho() {
    valores = [];
    esconde_carrinho.style.display = "none";
    contarCarrinho();
    criarListaArrays(carrinho);
    numeroDoPedido = gerarNumeroPedido();
    final.style.display = "block";
    res_nome.innerHTML = 'Nome: ' + dic[0]
    res_end.innerHTML = 'Endereço: ' + dic[1]
    res_end2.innerHTML = 'Complemento: '+ dic[2]

  }

function mostrarValorNaTela() {
    var t = somarArray(valorCompra);
    alert("Total pedido R$" + t); 
    valor_pagamento.innerHTML = "VALOR DO PEDIDO - R$" + t + ",00";
}

function contarCarrinho() {
    var contCarrinho = document.getElementById("contCarrinho");
    contCarrinho.innerHTML = carrinho.length;   
}

function somarArray(array) { 
    let soma = 0;
    array.forEach((e) => {
        soma += e;
    });
    return soma;
}


function dados_Branco(){
  dic[0] = prompt('Seu nome: ').toUpperCase()
  dic[1] = prompt('endereço: RUA, N° ').toUpperCase()
  dic[2] = prompt('Complemento: Bairro, ou Ponto de Refencia').toUpperCase()
  if (dic[0] == ''){
    dic[0] = 'Não informado'
  }
  else if (dic[1] == ''){
    dic[1] = 'Não informado'
  }
  else if (dic[2] == ''){
    dic[2] = 'Não informado'
  }
}
var npedido = document.getElementById("npedido");

function gerarNumeroPedido() {
  var datahoraatual = new Date();
  var anoatual = datahoraatual.getFullYear();
  var diaDoAno = obterDiaDoAno(datahoraatual);
  var horaAtual =
    pad(datahoraatual.getHours(), 2) +
    pad(datahoraatual.getMinutes(), 2) +
    pad(datahoraatual.getSeconds(), 2);
  var numeroPedido = anoatual.toString() + diaDoAno.toString() + horaAtual;
  return numeroPedido;
}
function obterDiaDoAno(data) {
  var inicioAno = new Date(data.getFullYear(), 0, 0);
  var diff = data - inicioAno;
  var umDia = 1000 * 60 * 60 * 24;
  var diaDoAno = Math.floor(diff / umDia);
  return diaDoAno;
}
function pad(numero, tamanho) {
  var numeroString = numero.toString();
  while (numeroString.length < tamanho) {
    numeroString = "0" + numeroString;
  }
  return numeroString;
}
function criarListaArrays(arrays) {
    const ul = document.createElement("ul");
  
    arrays.forEach((subArray) => {
      const li = document.createElement("li");
      const subul = document.createElement("ul");
  
      subArray.forEach((elemento) => {
        const subli = document.createElement("li");
  
        if (Array.isArray(elemento)) {
          const subsubul = document.createElement("ul");
          elemento.forEach((subElemento) => {
            const subsubli = document.createElement("li");
            subsubli.textContent = subElemento;
            subsubul.appendChild(subsubli);
          });
          subli.appendChild(subsubul);
        } else {
          subli.textContent = elemento;
        }
        subul.appendChild(subli);
      });
      li.appendChild(subul);
      ul.appendChild(li);
    });
    carrinhoCompras.appendChild(ul);
  }


regiao.forEach(function (checkbox) {checkbox.addEventListener("change", function () { 
    var regiao_selecionados = document.querySelectorAll(".regiao:checked");
    if (regiao_selecionados.length > 1) {this.checked = false;
        alert("Ops, Escolha apenas uma Região!!");}
      else if (regiao_selecionados.length == 1){btn_regiao.style.display = 'block'}
      else if (regiao_selecionados.length == 0){btn_regiao.style.display = 'none'}
    });
  });



var btn_home = document.getElementById("home_page");
btn_home.addEventListener("click", function () {
  location.reload();
}); 

var imprimir = document.getElementById("imprimir");
imprimir.addEventListener("click", function () {
    final.style.display = "none";
    pagamentos.style.display = "block";
    gerarImagemPedido()
    generateQRCode()
    horaDelivery()
    
  });

  
function gerarImagemPedido() {
    var mensagemCarrinho = "";
    var contped = 0;
    carrinho.forEach(function (element) {
      if (Array.isArray(element)) {
        contped += 1;
        mensagemCarrinho += "\n\nMontagem N° " + contped + "\n";
        mensagemCarrinho += formatarArrayWhats(element);
      } else {
        mensagemCarrinho += "-" + element + "\n";
      }
    });
  
    var tw = somarArray(valorCompra);

    var informar_data_hora = informarDataHora()
  
    var detalhesPedido = "\n" + informar_data_hora +
      "\n\nN° Pedido: " +
      numeroDoPedido +
      "\nCliente: " +
      dic[0] +
      "\nEndereço: " +
      dic[1] +
      "," +
      dic[2] +
      "\nValor total: R$" +
      tw  + ",00" +
      mensagemCarrinho;
  
    // Adiciona os detalhes do pedido em um elemento HTML
    var pedidoElement = document.createElement("div");
    pedidoElement.style.background = "white";
    pedidoElement.style.padding = "20px";
    pedidoElement.style.border = "1px solid #000";
    pedidoElement.innerHTML = "<pre>" + detalhesPedido + "</pre>";
    document.body.appendChild(pedidoElement);
  
    // Usando html2canvas para capturar o elemento como imagem
    html2canvas(pedidoElement).then(function(canvas) {
      // Converte o canvas para um link de download
      var link = document.createElement("a");
      link.download = "pedido.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
  
      // Remova o elemento temporário do pedido
      document.body.removeChild(pedidoElement);
  
      alert("Pedido gerado! Por favor, envie-a manualmente via WhatsApp.");
    });
  }
  const cnpjPixKey = "43227642000130"; // Substitua pelo seu CNPJ fixo

function padStart(str, targetLength, padString) {
  targetLength = targetLength >> 0; // Truncate if number, or convert non-number to 0;
  padString = String(padString || " ");
  if (str.length > targetLength) {
    return String(str);
  } else {
    targetLength = targetLength - str.length;
    if (targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length); // Append to original to ensure we are longer than needed
    }
    return padString.slice(0, targetLength) + String(str);
  }
}

function calculateCRC(payload) {
  let polinomio = 0x1021;
  let resultado = 0xffff;

  for (let byte of payload) {
    resultado ^= byte.charCodeAt(0) << 8;
    for (let bit = 0; bit < 8; bit++) {
      if ((resultado <<= 1) & 0x10000) resultado ^= polinomio;
      resultado &= 0xffff;
    }
  }

  return padStart(resultado.toString(16).toUpperCase(), 4, "0");
}
  function formatField(id, value) {
    const length = value.length.toString().padStart(2, "0");
    return id + length + value;
  }

  function generateQRCode() {
    const amount = valorCompra;
  
    const payloadFormatIndicator = formatField("00", "01");
    const pointOfInitiationMethod = formatField("01", "12");
    const merchantAccountInformation = formatField(
      "26",
      formatField("00", "BR.GOV.BCB.PIX") + formatField("01", cnpjPixKey)
    );
    const merchantCategoryCode = formatField("52", "0000");
    const transactionCurrency = formatField("53", "986");
    const transactionAmount = formatField("54", amount);
    const countryCode = formatField("58", "BR");
    const merchantName = formatField("59", "WanderleiJunior");
    const merchantCity = formatField("60", "TARUMA");
    const additionalDataFieldTemplate = formatField(
      "62",
      formatField("05", "***")
    );
  
    let pixPayload =
      payloadFormatIndicator +
      pointOfInitiationMethod +
      merchantAccountInformation +
      merchantCategoryCode +
      transactionCurrency +
      transactionAmount +
      countryCode +
      merchantName +
      merchantCity +
      additionalDataFieldTemplate +
      "6304";
  
    const crc = calculateCRC(pixPayload);
    pixPayload += crc;
    dic.push(pixPayload)
  
    // Gerar QR Code
    QRCode.toCanvas(
      document.getElementById("qrcode"),
      pixPayload,
      function (error) {
        if (error) console.error(error);
      }
    );
  
    // Exibir payload para copiar e colar
    document.getElementById("pixCopyPaste").value = pixPayload;
  }  
function formatarArrayWhats(array) {
    var mensagem = "";
    array.forEach(function (element) {
      if (Array.isArray(element)) {
        mensagem += formatarArrayWhats(element).replace(/\n$/, "");
      } else {
        mensagem += " - " + element + "\n";
      }
    });
    return mensagem;
  }  
function informarDataHora() {
    var dataAtual = new Date();
    var hora = dataAtual.getHours();
    var minutos = dataAtual.getMinutes();
    var diaSemana = dataAtual.getDay();
    var ds = [
      "Domingo",
      "Segunda-Feira",
      "Terça-Feira",
      "Quarta-Feira",
      "Quinta-Feira",
      "Sexta-Feira",
      "Sabado",
    ];
  
    if (hora < 10) hora = "0" + hora;
    if (minutos < 10) minutos = "0" + minutos;
    return ds[diaSemana] + ', Hora ' + hora + ':' + minutos
  
  }

  btn_pix.addEventListener("click", function () {
    res_pix.style.display = "block";
    res_cartao.style.display = "none";
    res_dinheiro.style.display = "none";
    antecipar_envio_pix()
    
  });
  btn_cartao.addEventListener("click", function () {
    res_pix.style.display = "none";
    res_cartao.style.display = "block";
    res_dinheiro.style.display = "none";
    
  });
  btn_dinheiro.addEventListener("click", function () {
    res_pix.style.display = "none";
    res_cartao.style.display = "none";
    res_dinheiro.style.display = "block";
    
  });
  function antecipar_envio_pix(){
    var mensagemCarrinho = "";
    var contped = 0;
    carrinho.forEach(function (element) {
      if (Array.isArray(element)) {
        contped += 1;
        mensagemCarrinho += "\n\nMontagem N° " + contped + "\n";
        mensagemCarrinho += formatarArrayWhats(element);
      } else {
        mensagemCarrinho += "-" + element + "\n";
      }
    });
  
    var tw = somarArray(valorCompra);
    var te = "";
  
    if (tw < 20 && dic[4] === "Tarumã") {
      te = "Taxa de entrega R$" + dic[5] + ",00";
      tw = tw + dic[5];
    } else if (tw < 150 && dic[4] === "Usina Nova America") {
      te = "Taxa de entrega R$" + dic[5] + ",00";
      tw = tw + dic[5];
    } else if (tw < 50 && dic[4] === "Usina Agua Bonita") {
      te = "Taxa de entrega R$" + dic[5] + ",00";
      tw = tw + dic[5];
    } else if (tw < 50 && dic[4] === "Posto Pioneiro") {
      te = "Taxa de entrega R$" + dic[5] + ",00";
      tw = tw + dic[5];
    } else {
      te = "Taxa de entrega isento";
    }
    var vlr_total_whats = "R$" + tw + ",00";
  
    var detalhesPedido =
      "N° Pedido: " +
      numeroDoPedido +
      "\nCliente: " +
      dic[0] +
      "\nEndereço: " +
      dic[1] +
      "," +
      dic[2] +
      "\nValor total: " +
      vlr_total_whats +
      "\nTaxa entrega: " +
      te +
      "\nPagamento via Pix" +
      "" +
      mensagemCarrinho;
    var numeroWhatsApp = "5518999999999";
    var mensagemWhatsApp = encodeURIComponent(
      "Olá!, esse é meu pedido \u{1F609} \n" + detalhesPedido + "\n\n\n\n\nSeu Codigo para pagamento\n\n" + dic[6] + '\n\n\nClique em enviar - \u{1F53D}\n'
    );
    var linkWhatsApp =
      "https://wa.me/" + numeroWhatsApp + "?text=" + mensagemWhatsApp;
  
    window.open(linkWhatsApp);
    alert('"ENVIAR COMPROVANTE DO PIX VIA WHATSAPP"')
  }  