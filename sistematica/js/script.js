/* Sistemática Hernia3D — "a curva sai do centro cirúrgico" (20/10/2026).
   Cada camada responde UMA pergunta e aponta para a seguinte (de fora para dentro, 21/10/2026):
     ecossistema — quem sustenta o curso, e quem ganha com ele (o ganho não volta)
     sistema     — a curva de aprendizado: hoje no paciente, com o Hernia3D no modelo
     serviços    — o que se oferece em cada etapa, e quem paga cada parte
     jornadas    — o que o residente vive, e o que roda por trás
   Dados: js/data.js, GERADO de 08_sintese/dados/*.csv (não editar à mão).
   Sem valores em reais nesta peça: eles ficam no vault e no deck.
   Encaixe sem rolagem herdado da Sistemática Longevidade (encaixa/dimensiona). */

(function () {
  "use strict";
  var D = window.H3D;
  var NS = "http://www.w3.org/2000/svg";
  var ENQ = D.enquadramentos;
  var ATOR = {}; D.atores.forEach(function (a) { ATOR[a.id] = a; });
  var ETAPA = {}; D.etapas.forEach(function (e) { ETAPA[e.id] = e; });
  var OURO = "#B8860B", RISCO = "#B3261E", TINTA = "#0C325A";

  /* ---------- utilidades ---------- */
  function el(tag, attrs, pai) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (pai) pai.appendChild(e);
    return e;
  }
  function texto(pai, x, y, s, cls, ancora) {
    var t = el("text", { x: x, y: y, "class": cls || "", "text-anchor": ancora || "start" }, pai);
    t.textContent = s;
    return t;
  }
  function esc(s) {
    return String(s || "").replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
  }
  function maiuscula(s) { s = s || ""; return s.charAt(0).toUpperCase() + s.slice(1); }
  var CONF_TXT = { confirmado: "confirmado", provavel: "provável", aberto: "em aberto" };
  function conf(c) { return "<span class='conf conf-" + c + "'>" + CONF_TXT[c] + "</span>"; }
  function tagEnq(k, prefixo, curto) {
    var e = ENQ[k];
    return "<span class='tag' title='" + esc(e.rotulo) + "' style='color:" + e.cor + ";background:" + e.fundo + ";border-color:" + e.cor + "55'>" +
      (prefixo || "") + esc(curto ? e.curto : e.rotulo) + "</span>";
  }
  function clicavel(g, fn) {
    g.addEventListener("click", fn);
    g.addEventListener("keydown", function (ev) { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); fn(); } });
  }

  /* ---------- encaixe: cada painel cabe na altura da tela (desktop) ---------- */
  var EMPILHA = 1020, ajustaveis = [];
  function encaixa(cont) {
    var w = cont && cont.firstElementChild;
    if (!w) return;
    if (window.innerWidth <= EMPILHA) { w.style.zoom = "1"; return; }
    if (!cont.clientHeight) return;
    w.style.zoom = "1";
    var alvo = cont.clientHeight - 6;
    var teto = parseFloat(cont.getAttribute("data-cresce")) || 1;
    if (teto > 1 && w.getBoundingClientRect().height <= alvo) {
      var bom = 1;
      for (var g = 1.04; g <= teto + 1e-9; g += 0.04) {
        w.style.zoom = String(g);
        if (w.getBoundingClientRect().height > alvo) break;
        bom = g;
      }
      w.style.zoom = String(bom);
      return;
    }
    for (var z = 1; z > 0.6 && w.getBoundingClientRect().height > alvo;) {
      z -= 0.03;
      w.style.zoom = String(z);
    }
  }
  function escreve(cont, html) {
    cont.innerHTML = "<div class='ajusta'>" + html + "</div>";
    if (ajustaveis.indexOf(cont) < 0) ajustaveis.push(cont);
    encaixa(cont);
    ligaElos(cont);
  }
  function dimensiona() {
    var palco = document.querySelector(".palco");
    if (window.innerWidth <= EMPILHA) { palco.style.height = ""; return; }
    var topo = document.querySelector("header").offsetHeight + document.querySelector("nav").offsetHeight;
    palco.style.height = Math.max(420, document.documentElement.clientHeight - topo) + "px";
  }
  function reencaixa() { dimensiona(); ajustaveis.forEach(encaixa); }
  var tempo;
  window.addEventListener("resize", function () { clearTimeout(tempo); tempo = setTimeout(reencaixa, 150); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(reencaixa);
  window.addEventListener("load", reencaixa);

  /* ---------- as quatro camadas, como capítulos ---------- */
  var VISTAS = [
    { id: "ecossistema", n: "01", rot: "Quem sustenta, quem ganha", cam: "ecossistema", perg: "Quem paga para deslocar a curva, e quem colhe o ganho?" },
    { id: "sistema", n: "02", rot: "A curva", cam: "sistema", perg: "Onde o residente aprende o TAPP, hoje e com o Hernia3D?" },
    { id: "servicos", n: "03", rot: "O que se oferece", cam: "serviços", perg: "O que o curso oferece em cada etapa, e quem paga cada parte?" },
    { id: "jornadas", n: "04", rot: "O que se vive", cam: "jornadas", perg: "O que o residente vive, e o que roda por trás?" }
  ];
  var PROXIMA = {
    ecossistema: ["sistema", "e que curva é essa que o curso desloca?"],
    sistema: ["servicos", "o que, exatamente, se oferece?"],
    servicos: ["jornadas", "como o residente vive isso, etapa por etapa?"],
    jornadas: ["ecossistema", "de volta a quem sustenta"]
  };
  var botoes = {}, vistaAtual = null;
  var nav = document.getElementById("camadas");
  VISTAS.forEach(function (v) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "f-camada"; b.setAttribute("role", "tab");
    b.innerHTML = "<span class='n'>" + v.n + "</span><span class='t'>" + v.rot + "</span><span class='c'>" + v.cam + "</span>";
    b.addEventListener("click", function () { abre(v.id); });
    nav.appendChild(b); botoes[v.id] = b;
  });
  function abre(id, item) {
    var v = VISTAS.filter(function (x) { return x.id === id; })[0] || VISTAS[0];
    vistaAtual = v.id;
    VISTAS.forEach(function (x) {
      document.getElementById("v-" + x.id).classList.toggle("on", x.id === v.id);
      botoes[x.id].classList.toggle("on", x.id === v.id);
      botoes[x.id].setAttribute("aria-selected", x.id === v.id ? "true" : "false");
    });
    document.getElementById("pergunta").textContent = v.perg;
    if (item !== undefined) seleciona(v.id, item);
    estadoNaUrl();
    reencaixa();
  }
  var selecao = { ecossistema: null, sistema: null, servicos: null, jornadas: null };
  function seleciona(vista, item) {
    if (vista === "ecossistema") selecionaEco(item);
    else if (vista === "sistema") selecionaSis(item);
    else if (vista === "servicos") selecionaServico(item);
  }
  function estadoNaUrl() {
    var q = "?vista=" + vistaAtual + (selecao[vistaAtual] ? "&item=" + encodeURIComponent(selecao[vistaAtual]) : "") +
      (vistaAtual === "sistema" && tempoAtual !== 3 ? "&tempo=" + tempoAtual : "");
    try { history.replaceState(null, "", q); } catch (e) { /* file:// em alguns navegadores */ }
  }
  function elo(vista) {
    var p = PROXIMA[vista];
    return "<button class='l-elo' data-vista='" + p[0] + "'>→ " + p[1] + "</button>";
  }
  function ligaElos(raiz) {
    Array.prototype.forEach.call(raiz.querySelectorAll(".l-elo"), function (b) {
      b.addEventListener("click", function () { abre(b.dataset.vista); });
    });
  }
  function achadosHtml(camada, tese) {
    return D.achados.filter(function (a) { return a.camada === camada; }).map(function (a, i) {
      return "<div class='achado" + (tese && i === 0 ? " tese" : "") + "'><b>" + esc(a.titulo) + "</b><span>" + esc(maiuscula(a.texto)) + ".</span></div>";
    }).join("");
  }
  function evidenciasHtml(ids) {
    var lista = ids ? D.evidencias.filter(function (e) { return ids.indexOf(e.id) >= 0; }) : D.evidencias;
    return "<ul class='evid'>" + lista.map(function (e) {
      return "<li class='c-" + e.confianca + "'><b><span>" + esc(e.estudo) + "</span><span class='tec tec-" + e.tecnica + "'>" +
        esc(e.tecnica) + "</span></b>" + esc(maiuscula(e.achado)) + ".</li>";
    }).join("") + "</ul>";
  }

  /* ================= 01 · SISTEMA: a curva deslocada =================
     Forma ilustrativa (exponenciais); só os pontos marcados vêm das fontes.
     Eixo x em duas escalas: sessões no modelo | casos no paciente.
     Conta-se em três tempos: 1 hoje (só a curva vermelha) · 2 com o Hernia3D
     (entra o modelo, classe t2) · 3 o que falta provar (entra o tracejado, t3).
     O tempo 3 é a vista completa e o padrão. */
  var svgC = document.getElementById("curva");
  var leituraSis = document.getElementById("leitura-sis");
  var TEMPOS = [["1", "Hoje"], ["2", "Com o Hernia3D"], ["3", "O que falta provar"]];
  var tempoAtual = 3, botoesTempo = [];
  (function montaTempos() {
    var div = document.createElement("div");
    div.className = "tempos"; div.setAttribute("role", "group"); div.setAttribute("aria-label", "contar em três tempos");
    div.innerHTML = "<span class='tempos-rot'>em três tempos</span>";
    TEMPOS.forEach(function (t) {
      var b = document.createElement("button");
      b.type = "button"; b.innerHTML = "<b>" + t[0] + "</b>" + t[1];
      b.addEventListener("click", function () { tempo(+t[0]); estadoNaUrl(); });
      div.appendChild(b); botoesTempo.push(b);
    });
    svgC.parentNode.insertBefore(div, svgC);
  })();
  function tempo(n) {
    tempoAtual = (n >= 1 && n <= 3) ? n : 3;
    svgC.setAttribute("class", "tempo-" + tempoAtual);
    botoesTempo.forEach(function (b, i) { b.classList.toggle("on", i + 1 === tempoAtual); });
  }
  var C = { x0: 60, xg: 330, xd: 440, x1: 880, topo: 70, plato: 400, eixo: 430 };
  var AMP = C.plato - C.topo;
  function xs(s) { return C.x0 + s * (C.xg - C.x0) / 16; }
  function xc(c) { return C.xd + c * (C.x1 - C.xd) / 45; }
  function yHoje(c) { return C.plato - AMP * Math.exp(-c / 12); }
  function yModelo(s) { return C.plato - AMP * Math.exp(-s / 3); }
  function yCom(c) { return C.plato - 0.25 * AMP * Math.exp(-c / 6); }
  function pontos(fy, fx, a, b) {
    var p = [];
    for (var i = 0; i <= 60; i++) { var t = a + (b - a) * i / 60; p.push([fx(t), fy(t)]); }
    return p;
  }
  function trilha(p) { return "M" + p.map(function (q) { return q[0].toFixed(1) + " " + q[1].toFixed(1); }).join(" L"); }
  // onde cada rótulo fica em relação à sua marca (desenho, não dado)
  var POSE = {
    risco: { curva: "hoje", dx: 12, dy: -8, a: "start" },
    plato: { curva: "hoje", dx: 0, dy: -14, a: "middle" },
    zendejas: { curva: "com", dx: 12, dy: 2, a: "start" },
    transferencia: { curva: "com", dx: 8, dy: 22, a: "start" },
    kurashima: { dx: 10, dy: -12, a: "start" },
    sessoes: { dx: -10, dy: 22, a: "end" },
    maestria: { dx: -10, dy: 4, a: "end" }
  };
  var MARCAS = {}, ESTACOES = {};
  (function montaCurva() {
    var g = el("g", {}, svgC);
    el("rect", { x: C.x0, y: 40, width: C.xd - C.x0, height: C.eixo - 40, "class": "zona-modelo t2" }, g);
    texto(g, (C.x0 + C.xd) / 2, 28, "NO MODELO", "zona-rot", "middle");
    texto(g, (C.xd + C.x1) / 2, 28, "NO PACIENTE", "zona-rot", "middle");
    // só no tempo 1: o modelo ainda não existe
    texto(g, (C.x0 + C.xd) / 2, 228, "Hoje, o modelo não existe.", "so-t1", "middle");
    texto(g, (C.x0 + C.xd) / 2, 250, "A curva inteira acontece no paciente →", "so-t1", "middle");
    // eixos e escalas
    el("line", { x1: C.x0, y1: C.eixo, x2: C.x1, y2: C.eixo, "class": "eixo" }, g);
    el("line", { x1: C.x0, y1: 40, x2: C.x0, y2: C.eixo, "class": "eixo" }, g);
    var ry = texto(g, 0, 0, "mais erro e mais risco por caso  →", "eixo-rot", "middle");
    ry.setAttribute("transform", "translate(44 " + (C.eixo + 40) / 2 + ") rotate(-90)");
    [0, 5, 10, 16].forEach(function (s) {
      el("line", { x1: xs(s), y1: C.eixo, x2: xs(s), y2: C.eixo + 4, "class": "tick-l" }, g);
      texto(g, xs(s), C.eixo + 14, s === 16 ? "16 sessões" : String(s), "tick", s === 16 ? "end" : "middle");
    });
    [0, 10, 20, 30, 40].forEach(function (c) {
      el("line", { x1: xc(c), y1: C.eixo, x2: xc(c), y2: C.eixo + 4, "class": "tick-l" }, g);
      texto(g, xc(c), C.eixo + 14, c === 40 ? "40 casos" : String(c), "tick", c === 0 ? "start" : "middle");
    });
    el("line", { x1: C.x0, y1: C.plato, x2: C.x1, y2: C.plato, "class": "plato" }, g);

    // o risco que sai do paciente: a área entre as duas curvas, no paciente
    var hoje = pontos(yHoje, xc, 0, 45), com = pontos(yCom, xc, 0, 45);
    el("path", { d: trilha(hoje) + " L" + trilha(com.slice().reverse()).slice(1) + " Z", "class": "area-risco t3" }, g);
    ["o risco", "que sai do", "paciente"].forEach(function (s, i) { texto(g, C.xd + 8, 268 + i * 18, s, "area-rot t3"); });

    // a divisa: a entrada no centro cirúrgico
    el("line", { x1: C.xd, y1: 40, x2: C.xd, y2: C.eixo, "class": "divisa" }, g);
    var rd = texto(g, 0, 0, "ENTRADA NO CENTRO CIRÚRGICO", "divisa-rot", "middle");
    rd.setAttribute("transform", "translate(" + (C.xd - 7) + " 236) rotate(-90)");
    el("line", { x1: C.xg, y1: 92, x2: C.xg, y2: C.eixo, "class": "gate-l t2" }, g);

    // as curvas
    el("path", { d: trilha(hoje), "class": "c-hoje" }, g);
    el("path", { d: trilha(pontos(yModelo, xs, 0, 16)) + " L" + C.xd + " " + yModelo(16).toFixed(1), "class": "c-modelo t2" }, g);
    el("path", { d: trilha(com), "class": "c-com t3" }, g);
    var th = texto(g, C.xd + 10, 62, "HOJE ", "curva-rot"); th.setAttribute("fill", RISCO);
    var ts = el("tspan", { "class": "curva-sub" }, th); ts.textContent = "o residente aprende o TAPP no paciente";
    var tm = texto(g, C.x0 + 10, 62, "COM HERNIA3D ", "curva-rot t2"); tm.setAttribute("fill", OURO);
    var tms = el("tspan", { "class": "curva-sub" }, tm); tms.textContent = "a parte íngreme fica no modelo";

    // as marcas, vindas de curva.csv
    D.curva.forEach(function (m) {
      var p = POSE[m.id] || { dx: 10, dy: -10, a: "start" }, x, y, cor, t = "";
      if (m.zona === "modelo") { x = xs(m.posicao); y = yModelo(m.posicao); cor = OURO; t = " t2"; }
      else if (m.zona === "limite") { x = C.xg; y = 110; cor = OURO; t = " t2"; }
      else if (p.curva === "com") { x = xc(m.posicao); y = yCom(m.posicao); cor = OURO; t = " t3"; }
      else { x = xc(m.posicao); y = yHoje(m.posicao); cor = RISCO; }
      var mg = el("g", { "class": "marca clicavel c-" + m.confianca + t, tabindex: 0, role: "button" }, g);
      el("circle", { cx: x, cy: y, r: 5.5, stroke: cor }, mg);
      texto(mg, x + p.dx, y + p.dy, m.rotulo, "", p.a);
      clicavel(mg, function () { selecionaSis(selecao.sistema === "m:" + m.id ? null : "m:" + m.id); estadoNaUrl(); });
      MARCAS[m.id] = mg;
    });

    // as estações do curso, sob o eixo (faixa fora de escala)
    var faixa = { E0: [60, 118], E1: [118, 176], E2: [176, 312], G: [312, 348], E3a: [348, 392], E3b: [392, 440], E4: [440, 880] };
    D.etapas.filter(function (e) { return e.trilho === "curso"; }).forEach(function (e) {
      var f = faixa[e.id]; if (!f) return;
      var eg = el("g", { "class": "estacao clicavel c-" + e.confianca + (e.tipo === "gate" ? " gate" : "") + (e.id === "E4" ? " paciente" : " t2"), tabindex: 0, role: "button" }, g);
      el("rect", { x: f[0] + 1, y: 450, width: f[1] - f[0] - 2, height: 34, rx: 3 }, eg);
      var cx = (f[0] + f[1]) / 2;
      if (e.tipo === "gate") { texto(eg, cx, 471, "◆", "nom", "middle"); }
      else {
        texto(eg, cx, 463, e.id, "cod", "middle");
        texto(eg, cx, 477, f[1] - f[0] > 120 ? e.nome : e.curto, f[1] - f[0] < 60 ? "nom estreito" : "nom", "middle");
      }
      clicavel(eg, function () { selecionaSis(selecao.sistema === e.id ? null : e.id); estadoNaUrl(); });
      ESTACOES[e.id] = eg;
    });
    texto(g, C.x0, 503, "Forma ilustrativa: só os pontos marcados vêm das fontes (clique neles e nas etapas). Tracejado: ainda não demonstrado no TAPP.", "nota-svg");
  })();
  function selecionaSis(item) {
    selecao.sistema = item;
    Object.keys(MARCAS).forEach(function (k) { MARCAS[k].classList.toggle("on", item === "m:" + k); });
    Object.keys(ESTACOES).forEach(function (k) { ESTACOES[k].classList.toggle("on", item === k); });
    leituraSistema(item);
  }
  function leituraSistema(item) {
    var html = "";
    if (item && item.indexOf("m:") === 0) {
      var m = D.curva.filter(function (x) { return "m:" + x.id === item; })[0];
      html += "<div class='bloco ficha'><div class='rotulo'>Na curva " + conf(m.confianca) + "</div><h3>" + esc(maiuscula(m.rotulo)) +
        "</h3><p>" + esc(maiuscula(m.texto)) + ".</p><div class='fonte'>Fonte: " + esc(m.fonte || "registro do projeto Hernia3D") + "</div></div>";
    } else if (item && ETAPA[item]) {
      var e = ETAPA[item];
      html += "<div class='bloco ficha'><div class='rotulo'>" + (e.tipo === "gate" ? "O filtro" : (e.tipo === "marco" ? "Na sequência" : "Etapa " + e.id)) + " " + conf(e.confianca) +
        "</div><h3>" + esc(e.nome) + "</h3><p>" + esc(maiuscula(e.oque)) + ".</p><dl>" +
        "<dt>Duração</dt><dd>" + esc(e.duracao) + "</dd><dt>Quem entra</dt><dd>" + esc(e.elegivel) + "</dd><dt>Consome</dt><dd>" + esc(e.recurso) + "</dd></dl>" +
        (e.tipo === "gate" ? "<ul class='criterios'>" + D.criterios.map(function (c) { return "<li><span>" + esc(c.criterio) + "</span><span>" + esc(c.valor) + "</span></li>"; }).join("") + "</ul>" : "") +
        (e.gate ? "<div class='risco'>" + esc(maiuscula(e.gate)) + ".</div>" : "") + "</div>";
    } else {
      html += "<div class='bloco'>" + achadosHtml("sistema", true) + "</div>";
    }
    html += "<div class='bloco'><div class='rotulo'>O que já está provado</div>" + evidenciasHtml(["lacuna", "zendejas", "kurashima", "curva"]) + "</div>";
    var marcos = D.etapas.filter(function (e) { return e.trilho === "sequencia"; });
    html += "<div class='bloco'><div class='rotulo'>Três coisas que não são a mesma</div><div class='sequencia'>" +
      marcos.map(function (m, i) {
        return (i ? "<span class='seq-seta'>→</span>" : "") + "<button class='seq clicavel c-" + m.confianca + (m.id === item ? " on" : "") + "' data-etapa='" + m.id + "'><b>" +
          esc(m.curto) + "</b><small>" + esc(m.duracao) + "</small></button>";
      }).join("") + "</div></div>";
    html += elo("sistema");
    escreve(leituraSis, html);
    Array.prototype.forEach.call(leituraSis.querySelectorAll("[data-etapa]"), function (b) {
      b.addEventListener("click", function () { selecionaSis(selecao.sistema === b.dataset.etapa ? null : b.dataset.etapa); estadoNaUrl(); });
    });
  }

  /* ================= 02 · ECOSSISTEMA: quem sustenta → o curso → quem ganha =================
     O arco de volta está cortado: o ganho não retorna a quem sustenta o curso. */
  var eco = document.getElementById("eco");
  var leituraEco = document.getElementById("leitura-eco");
  var W = 210, H = 46;
  var POS = {
    comprador: { x: 30, y: 100, col: 0 }, inovacao: { x: 30, y: 162, col: 0 }, industria: { x: 30, y: 224, col: 0 }, einstein: { x: 30, y: 286, col: 0 },
    residente: { x: 345, y: 100, col: 1 }, projeto: { x: 345, y: 168, col: 1, h: 56 }, preceptor: { x: 345, y: 248, col: 1 }, fornecedores: { x: 345, y: 310, col: 1 },
    paciente: { x: 660, y: 100, col: 2 }, sus: { x: 660, y: 168, col: 2 }, operadora: { x: 660, y: 236, col: 2 },
    hospital: { x: 660, y: 438, col: 3 }
  };
  var setas = [];
  (function montaEco() {
    var defs = el("defs", {}, eco);
    Object.keys(ENQ).forEach(function (k) {
      var m = el("marker", { id: "pt-" + k, viewBox: "0 0 10 10", refX: 9, refY: 5, markerWidth: 6, markerHeight: 6, orient: "auto-start-reverse" }, defs);
      el("path", { d: "M0 0 L10 5 L0 10 z", fill: ENQ[k].cor }, m);
    });
    // o arco que não fecha
    el("path", { d: "M765 66 C765 8 135 8 135 66", "class": "nao-volta" }, eco);
    el("path", { d: "M443 15 L457 29 M457 15 L443 29", "class": "nao-volta-x" }, eco);
    texto(eco, 450, 52, "o ganho não volta a quem sustenta o curso", "nao-volta-rot", "middle");
    [[135, "QUEM SUSTENTA", "põe dinheiro no curso"], [450, "O CURSO", "recebe, e entrega"], [765, "QUEM GANHA", "colhe o ganho, sem pagar o curso"]].forEach(function (c) {
      texto(eco, c[0], 78, c[1], "col-rot", "middle");
      texto(eco, c[0], 92, c[2], "col-sub", "middle");
    });
    // a faixa de baixo: o pagamento que já existe
    el("rect", { x: 20, y: 376, width: 860, height: 146, "class": "faixa" }, eco);
    texto(eco, 36, 398, "O PAGAMENTO QUE JÁ EXISTE: A CIRURGIA", "faixa-rot");
    var n1 = texto(eco, 36, 446, "−39%", "num"); n1.setAttribute("fill", ENQ.sus.cor);
    texto(eco, 36, 468, "o SUS paga menos pela hérnia operada", "num-txt");
    texto(eco, 36, 484, "por vídeo do que pela aberta", "num-txt");
    var n2 = texto(eco, 330, 446, "+115%", "num"); n2.setAttribute("fill", ENQ.suplementar.cor);
    texto(eco, 330, 468, "a operadora paga mais pela", "num-txt");
    texto(eco, 330, 484, "via laparoscópica", "num-txt");
    texto(eco, 36, 510, "No SUS, que paga a maioria dos casos, o argumento só pode ser menos complicação.", "col-sub");

    var camadaSetas = el("g", {}, eco), camadaAtores = el("g", {}, eco), camadaRot = el("g", {}, eco);
    var uso = {};
    function borda(p, lado) { return { x: lado > 0 ? p.x + W : p.x, y: p.y + (p.h || H) / 2 }; }
    D.fluxos.forEach(function (f) {
      var a = POS[f.de], b = POS[f.para];
      if (!a || !b) return;
      var n = uso[f.de + f.para] = (uso[f.de + f.para] || 0) + 1, off = (n - 1) * 8, d;
      if (b.col === 3) {
        // pagador da cirurgia → hospital, pela direita
        var s = borda(a, 1), t = borda(b, 1), dx = f.de === "sus" ? 20 : 11;
        d = "M" + s.x + " " + (s.y + off) + " C" + (s.x + dx) + " " + s.y + " " + (t.x + dx) + " " + t.y + " " + t.x + " " + (t.y + off - 6);
      } else if (a.col === b.col) {
        var lado = (f.de === "projeto" && f.para === "fornecedores") ? 1 : -1;
        var p1 = borda(a, lado), p2 = borda(b, lado), dd = lado * (26 + Math.abs(a.y - b.y) / 5) ;
        d = "M" + p1.x + " " + (p1.y + off) + " C" + (p1.x + dd) + " " + (p1.y + off) + " " + (p2.x + dd) + " " + (p2.y + off) + " " + p2.x + " " + (p2.y + off);
      } else {
        var q1 = borda(a, b.col > a.col ? 1 : -1), q2 = borda(b, b.col > a.col ? -1 : 1), mx = (q1.x + q2.x) / 2;
        d = "M" + q1.x + " " + (q1.y + off) + " C" + mx + " " + (q1.y + off) + " " + mx + " " + (q2.y + off) + " " + q2.x + " " + (q2.y + off);
      }
      var p = el("path", { d: d, "class": "seta t-" + f.tipo, stroke: ENQ[f.enquadramento].cor, "marker-end": "url(#pt-" + f.enquadramento + ")" }, camadaSetas);
      var meio = p.getTotalLength ? p.getPointAtLength(p.getTotalLength() / 2) : { x: 450, y: 260 };
      var r = texto(camadaRot, meio.x, meio.y - 5, f.id + " · " + ENQ[f.enquadramento].curto, "rot-seta", "middle");
      r.setAttribute("fill", ENQ[f.enquadramento].cor);
      setas.push({ f: f, p: p, r: r });
    });
    Object.keys(POS).forEach(function (id) {
      var a = ATOR[id], pz = POS[id], h = pz.h || H;
      var cls = "ator clicavel c-" + a.confianca + (pz.col === 1 ? " centro" : "") + (id === "projeto" ? " projeto" : "") + (pz.col === 2 ? " ganha" : "");
      var g = el("g", { "class": cls, tabindex: 0, role: "button" }, camadaAtores);
      el("rect", { x: pz.x, y: pz.y, width: W, height: h, rx: 4 }, g);
      texto(g, pz.x + 12, pz.y + h / 2 - 4, a.nome, "nome");
      texto(g, pz.x + 12, pz.y + h / 2 + 12, a.curto, "papel");
      clicavel(g, function () { selecionaEco(selecao.ecossistema === "a:" + id ? null : "a:" + id); estadoNaUrl(); });
      pz.g = g;
    });
  })();
  function selecionaEco(item) {
    selecao.ecossistema = item;
    var ator = item && item.indexOf("a:") === 0 ? item.slice(2) : null;
    var fluxo = item && item.indexOf("f:") === 0 ? item.slice(2) : null;
    Object.keys(POS).forEach(function (id) {
      var on = id === ator || (fluxo && setas.some(function (s) { return s.f.id === fluxo && (s.f.de === id || s.f.para === id); }));
      POS[id].g.classList.toggle("on", !!on);
    });
    setas.forEach(function (s) {
      var on = (ator && (s.f.de === ator || s.f.para === ator)) || (fluxo && s.f.id === fluxo);
      s.p.classList.toggle("on", !!on); s.r.classList.toggle("on", !!on);
      s.p.classList.toggle("apaga", !!item && !on);
    });
    leituraEcossistema(ator, fluxo);
  }
  function itemFluxo(f, ativo) {
    return "<li class='clicavel t-" + f.tipo + (ativo ? " on" : "") + "' tabindex='0' data-fluxo='" + f.id + "' style='border-left-color:" + ENQ[f.enquadramento].cor + "'>" +
      "<b>" + esc(ATOR[f.de].nome.toLowerCase()) + " → " + esc(ATOR[f.para].nome.toLowerCase()) + "</b>: " + esc(f.oque) + "</li>";
  }
  function leituraEcossistema(ator, fluxo) {
    var html = "";
    if (ator) {
      var a = ATOR[ator];
      var seus = D.fluxos.filter(function (f) { return f.de === ator || f.para === ator; });
      html += "<div class='bloco ficha'><div class='rotulo'>Ator " + conf(a.confianca) + "</div><h3>" + esc(maiuscula(a.nome.toLowerCase())) +
        "</h3><p>" + esc(maiuscula(a.papel)) + ".</p></div>";
      html += "<div class='bloco'><div class='rotulo'>As relações de " + esc(a.nome.toLowerCase()) + "</div><ul class='lista'>" +
        (seus.length ? seus.map(function (f) { return itemFluxo(f, false); }).join("") : "<li>Nenhuma relação de dinheiro registrada.</li>") + "</ul></div>";
    } else {
      html += "<div class='bloco'>" + achadosHtml("ecossistema", true) + "</div>";
    }
    html += "<div class='bloco'><div class='rotulo'>Como ler as setas</div><p style='margin-bottom:8px'>A cor diz <b>quem paga</b>. Linha cheia: pagamento · tracejada: <i>a confirmar</i> · pontilhada: ganho sem pagamento.</p>" +
      Object.keys(ENQ).map(function (k) { return tagEnq(k); }).join(" ") + "</div>";
    if (!ator) {
      html += "<div class='bloco'><div class='rotulo'>Todas as relações (clique para ver)</div><ul class='lista'>" +
        D.fluxos.map(function (f) { return itemFluxo(f, f.id === fluxo); }).join("") + "</ul></div>";
    }
    html += elo("ecossistema");
    escreve(leituraEco, html);
    Array.prototype.forEach.call(leituraEco.querySelectorAll("[data-fluxo]"), function (li) {
      clicavel(li, function () {
        var alvo = "f:" + li.dataset.fluxo;
        selecionaEco(selecao.ecossistema === alvo ? null : alvo); estadoNaUrl();
      });
    });
  }

  /* ================= 03 · SERVIÇOS: a matriz de cobertura =================
     Linhas: o que se oferece. Colunas: as etapas. A cor diz quem paga.
     A coluna do paciente fica vazia de propósito: lá o curso não recebe. */
  var matriz = document.getElementById("matriz");
  var leituraServ = document.getElementById("leitura-serv");
  var COLS = ["V", "E0", "E1", "E2", "E3a", "E3b", "E4"];
  (function montaMatriz() {
    var h = "<div class='mz'><div></div><div class='mz-zona antes'>ANTES</div><div class='mz-zona' style='grid-column:span 5'>NO MODELO</div><div class='mz-zona pac'>NO PACIENTE</div>";
    h += "<div class='mz-cab'></div>" + COLS.map(function (c) {
      return "<div class='mz-cab'><small>" + (c === "V" ? "ESTUDO" : c) + "</small><b>" + esc(ETAPA[c].curto) + "</b></div>";
    }).join("");
    D.servicos.forEach(function (s) {
      var e = ENQ[s.enquadramento];
      h += "<div class='mz-l clicavel c-" + s.confianca + "' data-serv='" + s.id + "' tabindex='0'><div class='mz-lin'><b>" + esc(s.nome) + "</b><div class='meta'>" +
        tagEnq(s.enquadramento, "", true) + conf(s.confianca) + "</div></div>";
      COLS.forEach(function (c, i) {
        var tem = s.etapas.indexOf(c) >= 0;
        var antes = i > 0 && s.etapas.indexOf(COLS[i - 1]) >= 0, depois = i < COLS.length - 1 && s.etapas.indexOf(COLS[i + 1]) >= 0;
        h += "<div class='mz-cel" + (c === "E4" ? " pac" : "") + (tem && !antes ? " ini" : "") + (tem && !depois ? " fim" : "") + "'>" +
          (tem ? "<i style='background-color:" + e.cor + "'></i>" : "") + "</div>";
      });
      h += "</div>";
    });
    h += "<div class='mz-rodape'><span>Clique numa linha para ver o que ela inclui.</span><span class='pac'>Nenhum serviço cobre o centro cirúrgico: é lá que o ganho aparece.</span></div></div>";
    escreve(matriz, h);
    Array.prototype.forEach.call(matriz.querySelectorAll(".mz-l"), function (l) {
      clicavel(l, function () { selecionaServico(selecao.servicos === l.dataset.serv ? null : l.dataset.serv); estadoNaUrl(); });
    });
  })();
  function selecionaServico(id) {
    selecao.servicos = id;
    Array.prototype.forEach.call(matriz.querySelectorAll(".mz-l"), function (l) { l.classList.toggle("on", l.dataset.serv === id); });
    var s = id && D.servicos.filter(function (x) { return x.id === id; })[0], html = "";
    if (s) {
      html += "<div class='bloco ficha'><div class='rotulo'>Serviço " + conf(s.confianca) + "</div><h3>" + esc(s.nome) + "</h3><p>" + esc(maiuscula(s.descricao)) + ".</p>" +
        "<dl><dt>Quem paga</dt><dd>" + tagEnq(s.enquadramento) + "</dd><dt>Etapas</dt><dd>" +
        s.etapas.map(function (e) { return esc(ETAPA[e].curto); }).join(" · ") + "</dd></dl></div>";
      html += "<div class='bloco'><div class='rotulo'>O que inclui</div><ul class='itens'>" + s.itens.map(function (i) {
        return "<li class='k-" + i.canal + " c-" + i.confianca + "'>" + esc(maiuscula(i.item)) + "</li>";
      }).join("") + "</ul><p class='canais'>◼ presencial, com o modelo · ◻ digital, na plataforma · <i>itálico</i>: provável · em vermelho: em aberto</p></div>";
    } else {
      html += "<div class='bloco'>" + achadosHtml("servicos", true) + "</div>";
      var usados = {}; D.servicos.forEach(function (x) { usados[x.enquadramento] = 1; });
      html += "<div class='bloco'><div class='rotulo'>A cor diz quem paga</div>" + Object.keys(usados).map(function (k) { return tagEnq(k); }).join(" ") +
        "<p class='dica'>Barra listrada: serviço ainda em aberto.</p></div>";
    }
    html += elo("servicos");
    escreve(leituraServ, html);
  }

  /* ================= 04 · JORNADAS: o blueprint ================= */
  (function montaBlueprint() {
    var cols = ["E0", "E1", "E2", "G", "E3a", "E3b", "E4"];
    var J = {}; D.jornada.forEach(function (j) { J[j.etapa] = j; });
    function zona(c) { return c === "G" ? " g" : (c === "E4" ? " pac" : ""); }
    function linha(rotulo, cel) {
      return "<div class='bp-lin'>" + rotulo + "</div>" + cols.map(function (c) {
        if (c === "G") return "<div class='bp-g'>" + (cel.gate || "") + "</div>";
        return cel(J[c], ETAPA[c]).replace("<div class='", "<div class='" + zona(c).trim() + " ").replace("<div>", "<div class='" + zona(c).trim() + "'>");
      }).join("");
    }
    var h = "<div class='bp'>";
    h += "<div class='bp-zona vazio'></div><div class='bp-zona' style='grid-column:span 6'>NO MODELO</div><div class='bp-zona pac'>NO PACIENTE</div>";
    h += "<div class='bp-lin'></div>" + cols.map(function (c) {
      var e = ETAPA[c];
      if (c === "G") return "<div class='bp-cab g'><small>filtro</small><b>Maestria</b><small>5 critérios</small></div>";
      return "<div class='bp-cab" + zona(c) + "'><small>" + c + "</small><b>" + esc(e.curto) + "</b><small>" + esc(J[c].quando) + "</small></div>";
    }).join("");
    var vive = function (j) { return "<div class='bp-palco" + (j.fonte === "inferencia" ? " inf" : "") + "'>" + esc(maiuscula(j.vive)) + "</div>"; };
    vive.gate = "passa, ou volta à prática";
    h += linha("O residente vive", vive);
    h += "<div class='bp-vis'><span>LINHA DE VISIBILIDADE</span></div>";
    var atua = function (j) { return "<div>" + esc(maiuscula(j.atua)) + "</div>"; }; atua.gate = "preceptor confere";
    h += linha("Quem atua", atua);
    var bast = function (j) { return "<div>" + esc(maiuscula(j.bastidor)) + "</div>"; }; bast.gate = "registro dos 5 critérios";
    h += linha("Bastidor", bast);
    var rec = function (j) { return "<div>" + esc(maiuscula(j.recurso)) + "</div>"; }; rec.gate = "";
    h += linha("Recurso", rec);
    var dec = function (j) { return "<div>" + esc(maiuscula(j.decide)) + "</div>"; }; dec.gate = "o critério";
    h += linha("Quem decide", dec);
    var paga = function (j) { return "<div class='chips'>" + j.paga.map(function (k) { return tagEnq(k, "", true); }).join("") + "</div>"; }; paga.gate = "";
    h += linha("Quem paga", paga);
    var ganha = function (j) { return "<div>" + j.ganha.map(function (a) { return esc(maiuscula(ATOR[a].nome.toLowerCase())); }).join(", ") + "</div>"; }; ganha.gate = "";
    h += linha("Quem ganha", ganha);
    var risco = function (j, e) { return "<div class='bp-risco" + (e.gate ? "" : " vazio") + "'>" + (e.gate ? esc(maiuscula(e.gate)) : "—") + "</div>"; };
    risco.gate = esc(maiuscula(ETAPA.G.gate));
    h += linha("Gate e risco", risco);
    h += "</div>";
    escreve(document.getElementById("blueprint"), h);
    // o fecho: a peça termina no que falta, não num resumo
    var fecho = D.achados.filter(function (a) { return a.camada === "fecho"; });
    escreve(document.getElementById("leitura-jor"),
      "<div class='bloco'>" + achadosHtml("jornadas", true) + "</div>" +
      "<div class='bloco'><div class='rotulo'>Outras evidências</div>" + evidenciasHtml(["dor", "barros", "shibuya", "melo"]) + "</div>" +
      "<div class='bloco fecho'><div class='rotulo'>O que falta para virar negócio</div><ol>" + fecho.map(function (a) {
        return "<li><b>" + esc(a.titulo) + "</b><span>" + esc(maiuscula(a.texto)) + ".</span></li>";
      }).join("") + "</ol></div>" + elo("jornadas"));
  })();

  /* ---------- início: estado vindo da URL ---------- */
  var q = new URLSearchParams(location.search);
  tempo(+q.get("tempo") || 3);
  leituraSistema(null);
  leituraEcossistema(null, null);
  selecionaServico(null);
  abre(q.get("vista") || "ecossistema", q.get("item") || undefined);
})();
