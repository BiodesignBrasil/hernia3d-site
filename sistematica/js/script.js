/* Sistemática Hernia3D — "a curva sai do centro cirúrgico" (20/10/2026).
   Abre com os 3Ps (02/11/2026): P¹ Preparar · P² Praticar · P³ Proceder, e os 3Ps são a progressão.
   No molde das Sistemáticas irmãs: uma barra só; a Abertura é o símbolo e o 5W2H, sem gráfico; a comparação
   hoje × com o Hernia3D aparece uma vez só, na 02, em dois olhares lado a lado.
   Cada camada responde UMA pergunta e aponta para a seguinte (de fora para dentro, 21/10/2026):
     ecossistema — quem sustenta o curso, e quem ganha com ele (o ganho não volta)
     sistema     — a curva de aprendizado: hoje no paciente, com o Hernia3D no modelo
     serviços    — o que se oferece em cada etapa, e quem paga cada parte
     jornadas    — o que o residente vive, e o que roda por trás
     direção     — o que falta definir para o curso virar negócio (02/11/2026), no molde do HDB e da Longevidade
   As abas, as perguntas, as manchetes e os elos vêm de camadas.csv; a 00 e a 05 são as pontas, em estilo livro.
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
    return "<span class='tag' style='color:" + e.cor + ";background:" + e.fundo + ";border-color:" + e.cor + "55'>" +
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
    var piso = +(cont.getAttribute("data-piso") || 0.6);  // a Direção desce mais (0,55), como nas irmãs
    for (var z = 1; z > piso && w.getBoundingClientRect().height > alvo;) {
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
    var topo = document.querySelector("nav.barra").offsetHeight;
    palco.style.height = Math.max(420, document.documentElement.clientHeight - topo) + "px";
  }
  function reencaixa() { dimensiona(); ajustaveis.forEach(encaixa); }
  var tempo;
  window.addEventListener("resize", function () { clearTimeout(tempo); tempo = setTimeout(reencaixa, 150); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(reencaixa);
  window.addEventListener("load", reencaixa);

  /* ---------- a abertura, as quatro camadas e a direção, como capítulos (camadas.csv) ---------- */
  var VISTAS = D.camadas.map(function (c) {
    return { id: c.id, n: c.n, rot: c.rotulo, cam: c.cam, perg: c.pergunta, manchete: c.manchete, elo: c.elo, livro: c.livro === "sim" };
  });
  // o fio: cada aba aponta para a seguinte; a última volta ao começo
  var PROXIMA = {};
  VISTAS.forEach(function (v, i) { var volta = i === VISTAS.length - 1; PROXIMA[v.id] = [VISTAS[volta ? 0 : i + 1].id, v.elo, volta]; });
  var botoes = {}, vistaAtual = null;
  var nav = document.getElementById("camadas");
  VISTAS.forEach(function (v) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "f-camada" + (v.livro ? " f-livro" : ""); b.setAttribute("role", "tab");
    b.innerHTML = "<small>" + v.n + "</small>" + esc(v.livro ? maiuscula(v.cam) : v.cam.toUpperCase()); b.title = v.rot;
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
    document.getElementById("pergunta").innerHTML = "<b>" + v.n + " · " + esc(v.rot) + "</b> · " + esc(v.perg);
    document.getElementById("manchete").textContent = v.manchete || "";
    if (item !== undefined) seleciona(v.id, item);
    estadoNaUrl();
    reencaixa();
  }
  var selecao = { abertura: null, ecossistema: null, sistema: null, servicos: null, jornadas: null, direcao: null };
  function seleciona(vista, item) {
    if (vista === "ecossistema") selecionaEco(item);
    else if (vista === "sistema") escolheTempo(olharDoItem(item), item);
    else if (vista === "servicos") selecionaServico(item);
    else if (vista === "direcao") mostraBloco(item);
  }
  function estadoNaUrl() {
    var q = "?vista=" + vistaAtual + (selecao[vistaAtual] ? "&item=" + encodeURIComponent(selecao[vistaAtual]) : "") +
      (vistaAtual === "sistema" && !comparativo ? "&olhar=" + olharAtual : "");
    try { history.replaceState(null, "", q); } catch (e) { /* file:// em alguns navegadores */ }
  }
  function elo(vista) {
    var p = PROXIMA[vista];
    return "<button type='button' class='l-elo' data-vista='" + p[0] + "'>" + (p[2] ? "← " : "→ ") + esc(p[1]) + "</button>";
  }
  function ligaElos(raiz) {
    Array.prototype.forEach.call(raiz.querySelectorAll(".l-elo"), function (b) {
      if (b.dataset.ligado) return;
      b.dataset.ligado = "1";
      // data-item, quando houver, abre a camada já no item (molde HDB)
      b.addEventListener("click", function () { abre(b.dataset.vista, b.dataset.item || undefined); });
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

  /* ================= 02 · SISTEMA: a curva, em dois olhares lado a lado =================
     No molde das Sistemáticas irmãs (HDB, Teranóstica): a comparação aparece uma vez só, aqui, em dois olhares nos
     mesmos eixos. (1) Hoje, no paciente: a subida inteira acontece no paciente. (2) Com o Hernia3D, no modelo: a parte
     íngreme fica no modelo, antes do critério de maestria, numa linha em três trechos clicáveis, um por P; no paciente,
     o P³ tracejado (ainda não demonstrado no TAPP). A camada abre com os dois lado a lado; um clique põe o olhar em foco,
     com a leitura ao lado. Eixo x em duas zonas: sessões no modelo | casos no paciente. Para cima, o domínio do TAPP. */
  var svgC = document.getElementById("curva");
  var leituraSis = document.getElementById("leitura-sis");
  var vSistema = document.getElementById("v-sistema"), temposEl = document.getElementById("tempos");
  var DUO = { 1: document.getElementById("sis1"), 2: document.getElementById("sis2") };
  var CURVA = {}; D.curva.forEach(function (m) { CURVA[m.id] = m; });
  var SESSOES = ETAPA.E2.duracao.split(",")[0];
  var olharAtual = 2, comparativo = true;
  var TEMPOS = [
    [1, "Hoje, no paciente", "a subida inteira acontece no paciente: <b>" + esc(CURVA.plato.rotulo) + "</b>, com " + esc(CURVA.risco.rotulo) + " nessa fase"],
    [2, "Com o Hernia3D, no modelo", "a parte íngreme fica no modelo, em <b>" + esc(SESSOES) + "</b>, antes do critério de maestria; no paciente, tracejado: ainda não demonstrado no TAPP"]
  ];
  temposEl.innerHTML = TEMPOS.map(function (t) {
    return "<button type='button' data-tempo='" + t[0] + "' role='tab'><b>" + t[0] + "</b><span class='tp-t'>" + t[1] + "</span><small>" + t[2] + "</small></button>";
  }).join("");
  Array.prototype.forEach.call(temposEl.querySelectorAll("button"), function (b) {
    b.addEventListener("click", function () { escolheTempo(+b.dataset.tempo); });
  });
  // a dobradiça entre os dois olhares: onde fica a parte íngreme da curva
  document.getElementById("dobradica").innerHTML = "<p class='db-rot'>Onde fica a subida</p>" +
    "<p class='db-lado db-hoje'><b>← " + esc(CURVA.plato.rotulo.replace(/^platô em /, "")) + "</b>no paciente, hoje</p>" +
    "<p class='db-lado db-com'><b>" + esc(SESSOES) + " →</b>no modelo, com o Hernia3D</p>" +
    "<p class='db-nota'>a parte íngreme sai do centro cirúrgico</p>" +
    // no comparativo a leitura fica oculta: o elo para a 03 mora aqui, para o fio não quebrar
    elo("sistema");
  ligaElos(document.getElementById("dobradica"));
  /* os dois olhares no molde da curva de opcoes_palavra.html (02/11/2026; o usuário: lá é "mais didático, claro, sem
     ruído"): a mesma moldura (as duas zonas, os eixos, uma linha vertical) e uma linha só, em três trechos com o nome em
     serifa, cada um clicável, que abre a sua ficha na leitura. Olhar 1, hoje: plana e cinza no modelo (o modelo não existe),
     a subida em vermelho no paciente e o platô em 37,5 casos (a única posição com escala, de curva.csv). Olhar 2, com o
     Hernia3D: um trecho por P (P¹ dourado quase plano, P² azul que sobe no modelo, P³ vermelho tracejado, que começa no
     alto: a hipótese do curso). Sem marcas nem régua de estações: as fontes ficam na leitura. Forma ilustrativa. */
  var C = { x0: 60, xd: 440, x1: 880, eixo: 430 };
  function xc(c) { return C.xd + c * (C.x1 - C.xd) / 45; }
  var TRECHOS = {};
  // as marcas de curva.csv que são trechos do olhar 1; as outras só abrem a ficha, no olhar 2
  var MARCA_NO_HOJE = { risco: true, plato: true };
  // P1 → P¹: a sigla com o número em sobrescrito
  function SUP(sigla) { return sigla.replace(/\d/, function (d) { return "⁰¹²³"[+d]; }); }
  var P_COR = {}, PASSO = {}; D.ps.forEach(function (p, k) { P_COR[p.sigla] = "k" + k; PASSO[p.sigla] = p; });
  function seloP(sigla) { return "<span class='selo-p " + P_COR[sigla] + "'>" + SUP(sigla) + "</span>"; }
  // um item da 02 pertence a um dos olhares: a subida, o platô e o centro cirúrgico ao 1, o resto ao 2
  function olharDoItem(item) {
    if (item && item.indexOf("m:") === 0) return MARCA_NO_HOJE[item.slice(2)] ? 1 : 2;
    return item === "E4" ? 1 : 2;
  }
  function moldura(g, linha) {
    el("rect", { x: C.x0, y: 40, width: C.xd - C.x0, height: C.eixo - 40, "class": "zona-modelo" }, g);
    el("rect", { x: C.xd, y: 40, width: C.x1 - C.xd, height: C.eixo - 40, "class": "zona-paciente" }, g);
    texto(g, C.x0 + 12, 60, "NO MODELO · SESSÕES", "zr zr-modelo");
    texto(g, C.xd + 12, 60, "NO PACIENTE · CASOS", "zr zr-paciente");
    el("line", { x1: C.x0, y1: C.eixo, x2: C.x1, y2: C.eixo, "class": "eixo" }, g);
    el("line", { x1: C.x0, y1: 40, x2: C.x0, y2: C.eixo, "class": "eixo" }, g);
    var ry = texto(g, 0, 0, "domínio do TAPP  →", "eixo-rot", "middle");
    ry.setAttribute("transform", "translate(44 " + (C.eixo + 40) / 2 + ") rotate(-90)");
    texto(g, C.x1, C.eixo + 20, "treino →", "eixo-rot", "end");
    el("line", { x1: C.xd, y1: 30, x2: C.xd, y2: C.eixo + 6, "class": "criterio-l" }, g);
    texto(g, C.xd, 22, linha, "criterio-rot", "middle");
  }
  // um trecho: a linha, uma faixa invisível mais larga para o clique e o nome em serifa (rot = [x, y, âncora])
  function trecho(g, item, d, cls, rot, nome, sub, acao, foco) {
    var sg = el("g", { "class": "p-seg clicavel " + cls, tabindex: 0, role: "button", "aria-label": nome + " " + sub }, g);
    el("path", { d: d, "class": "hit" }, sg);
    el("path", { d: d, "class": "tr" }, sg);
    var t = texto(sg, rot[0], rot[1], nome, "p-rot", rot[2] || "middle");
    el("tspan", { "class": "p-rot-nome", dx: 6 }, t).textContent = sub;
    clicavel(sg, acao(item));
    if (foco) TRECHOS[item] = sg;
  }
  var TRECHO_P = {
    P1: "M60 402 C102 398 133 386 164 363",
    P2: "M164 363 C248 252 332 110 440 90",
    P3: "M440 90 C594 78 748 70 880 62"
  };
  var ROT_P = { P1: [106, 343], P2: [331, 303], P3: [671, 145] };
  function olharCom(g, acao, foco) {
    moldura(g, "critério de maestria");
    D.ps.forEach(function (p, k) {
      if (TRECHO_P[p.sigla]) trecho(g, p.sigla, TRECHO_P[p.sigla], "k" + k + (p.sigla === "P3" ? " hipotese" : ""), ROT_P[p.sigla], SUP(p.sigla), p.nome, acao, foco);
    });
    texto(g, C.x0, 470, "Forma ilustrativa. Tracejado: chegar ao paciente já no alto da curva é a hipótese do curso, ainda não demonstrada no TAPP. Clique num P.", "nota-svg");
  }
  function olharHoje(g, acao, foco) {
    moldura(g, "entrada no centro cirúrgico");
    var xp = xc(CURVA.plato.posicao);
    el("path", { d: "M" + C.x0 + " 402 L" + C.xd + " 402", "class": "t-nada" }, g);
    texto(g, (C.x0 + C.xd) / 2, 384, "hoje, o modelo não existe", "nada-rot", "middle");
    trecho(g, "m:risco", "M440 402 C560 398 " + (xp - 167) + " 140 " + xp + " 96", "k2", [730, 300], "A subida", "no paciente", acao, foco);
    trecho(g, "m:plato", "M" + xp + " 96 C" + (xp + 28) + " 92 " + (xp + 51) + " 89 " + C.x1 + " 87", "kh", [876, 74, "end"],
      "O platô", CURVA.plato.rotulo.replace(/^platô em /, ""), acao, foco);
    texto(g, C.x0, 470, "Forma ilustrativa: só o platô e o risco da subida vêm das fontes. Clique na subida ou no platô.", "nota-svg");
  }
  function montaCurva(svg, n, foco) {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    if (foco) TRECHOS = {};
    var g = el("g", {}, svg);
    // no comparativo, um clique num trecho põe o olhar em foco com aquele item; no foco, seleciona
    function acao(item) {
      return function () {
        if (foco) { selecionaSis(selecao.sistema === item ? null : item); estadoNaUrl(); }
        else escolheTempo(n, item);
      };
    }
    (n === 1 ? olharHoje : olharCom)(g, acao, foco);
  }
  function escolheTempo(n, item) {
    comparativo = false;
    olharAtual = n === 1 ? 1 : 2;
    vSistema.classList.remove("cheia");
    Array.prototype.forEach.call(temposEl.querySelectorAll("button"), function (b) { b.classList.toggle("on", +b.dataset.tempo === olharAtual); });
    montaCurva(svgC, olharAtual, true);
    selecionaSis(item || null);
    estadoNaUrl();
    reencaixa();
  }
  function comparar() {
    comparativo = true;
    selecao.sistema = null;
    vSistema.classList.add("cheia");
    Array.prototype.forEach.call(temposEl.querySelectorAll("button"), function (b) { b.classList.remove("on"); });
    estadoNaUrl();
    reencaixa();
  }
  // os dois olhares do comparativo, desenhados uma vez; um clique fora de um elemento põe o olhar em foco
  [1, 2].forEach(function (n) {
    montaCurva(DUO[n], n, false);
    DUO[n].addEventListener("click", function (ev) { if (!(ev.target.closest && ev.target.closest(".clicavel"))) escolheTempo(n); });
  });
  function selecionaSis(item) {
    selecao.sistema = item;
    Object.keys(TRECHOS).forEach(function (k) { TRECHOS[k].classList.toggle("on", item === k); });
    leituraSistema(item);
  }
  function leituraSistema(item) {
    var html = "<button class='volta-duo' type='button' data-volta>← os dois olhares, lado a lado</button>";
    if (item && PASSO[item]) {
      var P = PASSO[item], k = D.ps.indexOf(P);
      html += "<div class='bloco ficha'><div class='rotulo'><span class='selo-p k" + k + "'>" + SUP(P.sigla) + "</span> um dos 3Ps</div><h3>" + esc(P.nome) +
        "</h3><p>" + esc(maiuscula(P.frase)) + ".</p>" +
        "<dl><dt>Onde</dt><dd>" + esc(maiuscula(P.onde)) + "</dd><dt>Estações</dt><dd><div class='p-est'>" +
        P.etapas.map(function (id) { return "<button data-etapa='" + id + "'>" + (ETAPA[id].tipo === "gate" ? "◆ " : "") + esc(ETAPA[id].curto) + "</button>"; }).join("") +
        "</div></dd><dt>Passa quando</dt><dd>" + esc(maiuscula(P.passa)) + "</dd></dl>" +
        (P.etapas.indexOf("G") >= 0 ? "<ul class='criterios'>" + D.criterios.map(function (c) { return "<li><span>" + esc(c.criterio) + "</span><span>" + esc(c.valor) + "</span></li>"; }).join("") + "</ul>" : "") +
        P.etapas.filter(function (id) { return ETAPA[id].gate && ETAPA[id].tipo !== "gate"; }).map(function (id) { return "<div class='risco'>" + esc(ETAPA[id].curto) + ": " + esc(ETAPA[id].gate) + ".</div>"; }).join("") +
        "</div>";
    } else if (item && item.indexOf("m:") === 0) {
      var m = CURVA[item.slice(2)];
      html += "<div class='bloco ficha'><div class='rotulo'>Na curva " + conf(m.confianca) + "</div><h3>" + esc(maiuscula(m.rotulo)) +
        "</h3><p>" + esc(maiuscula(m.texto)) + ".</p><div class='fonte'>Fonte: " + esc(m.fonte || "registro do projeto Hernia3D") + "</div></div>";
    } else if (item && ETAPA[item]) {
      var e = ETAPA[item];
      html += "<div class='bloco ficha'><div class='rotulo'>" + (e.tipo === "gate" ? "O filtro" : (e.tipo === "marco" ? "Na sequência" : "Etapa " + e.id)) + " " + conf(e.confianca) +
        (e.p ? " " + seloP(e.p) : "") + "</div><h3>" + esc(e.nome) + "</h3><p>" + esc(maiuscula(e.oque)) + ".</p><dl>" +
        "<dt>Duração</dt><dd>" + esc(e.duracao) + "</dd><dt>Quem entra</dt><dd>" + esc(e.elegivel) + "</dd><dt>Consome</dt><dd>" + esc(e.recurso) + "</dd></dl>" +
        (e.tipo === "gate" ? "<ul class='criterios'>" + D.criterios.map(function (c) { return "<li><span>" + esc(c.criterio) + "</span><span>" + esc(c.valor) + "</span></li>"; }).join("") + "</ul>" : "") +
        (e.gate ? "<div class='risco'>" + esc(maiuscula(e.gate)) + ".</div>" : "") + "</div>";
    } else if (olharAtual === 1) {
      html += "<div class='bloco'><div class='rotulo'>Olhar 1 · hoje, no paciente</div><h3>" + esc(maiuscula(CURVA.plato.rotulo)) + "</h3><p>" +
        esc(maiuscula(CURVA.plato.texto)) + ". " + esc(maiuscula(CURVA.risco.texto)) + ".</p></div>";
    } else {
      html += "<div class='bloco'>" + achadosHtml("sistema", true) + "</div>" +
        "<div class='bloco'><div class='rotulo'>Os 3Ps, no olhar 2</div><div class='p-est'>" + D.ps.map(function (p) {
          return "<button data-passo='" + p.sigla + "'>" + SUP(p.sigla) + " " + esc(p.nome) + "</button>"; }).join("") + "</div></div>";
    }
    // com uma ficha aberta, a leitura fica só com ela (menos ruído, e o elo não sai da tela); as evidências voltam com o olhar sem item
    if (!item) html += "<div class='bloco'><div class='rotulo'>O que já está provado</div>" + evidenciasHtml(["lacuna", "zendejas", "kurashima", "curva", "barros"]) + "</div>";
    var marcos = D.etapas.filter(function (e) { return e.trilho === "sequencia"; });
    html += "<div class='bloco'><div class='rotulo'>Três coisas que não são a mesma</div><div class='sequencia'>" +
      marcos.map(function (m, i) {
        return (i ? "<span class='seq-seta'>→</span>" : "") + "<button class='seq clicavel c-" + m.confianca + (m.id === item ? " on" : "") + "' data-etapa='" + m.id + "'><b>" +
          esc(m.curto) + "</b><small>" + esc(m.duracao) + "</small></button>";
      }).join("") + "</div></div>";
    html += elo("sistema");
    escreve(leituraSis, html);
    leituraSis.querySelector("[data-volta]").addEventListener("click", comparar);
    Array.prototype.forEach.call(leituraSis.querySelectorAll("[data-etapa]"), function (b) {
      b.addEventListener("click", function () { selecionaSis(selecao.sistema === b.dataset.etapa ? null : b.dataset.etapa); estadoNaUrl(); });
    });
    Array.prototype.forEach.call(leituraSis.querySelectorAll("[data-passo]"), function (b) {
      b.addEventListener("click", function () { selecionaSis(b.dataset.passo); estadoNaUrl(); });
    });
  }

  /* ================= 00 · ABERTURA: o símbolo dos 3Ps e o 5W2H =================
     No molde das irmãs, sem gráfico (a curva fica só na 02): três degraus que sobem, P¹ Preparar e P² Praticar no
     modelo, a porta da maestria, P³ Proceder no paciente. Clicar num degrau abre a 02 naquele passo. */
  var svgP = document.getElementById("ps");
  var leituraAbe = document.getElementById("leitura-abe");
  // os degraus: x, largura e topo de cada um (desenho, não dado)
  var DEGRAU = { P1: { x: 60, w: 230, topo: 300 }, P2: { x: 290, w: 230, topo: 210 }, P3: { x: 570, w: 270, topo: 120 } };
  function quebra(s, max) {
    var linhas = [""];
    s.split(" ").forEach(function (w) {
      var l = linhas[linhas.length - 1];
      if (l && (l + " " + w).length > max) linhas.push(w); else linhas[linhas.length - 1] = l ? l + " " + w : w;
    });
    return linhas;
  }
  function abrePasso(sigla) { abre("sistema"); escolheTempo(2, sigla); }
  (function montaAbertura() {
    var g = el("g", {}, svgP), chao = 400;
    el("line", { x1: 40, y1: chao, x2: 860, y2: chao, "class": "chao" }, g);
    D.ps.forEach(function (p, k) {
      var d = DEGRAU[p.sigla];
      var dg = el("g", { "class": "dg clicavel k" + k, tabindex: 0, role: "button", "aria-label": SUP(p.sigla) + " " + p.nome + ": abrir na curva" }, g);
      el("rect", { x: d.x, y: d.topo, width: d.w, height: chao - d.topo }, dg);
      var t = texto(dg, d.x + 16, d.topo + 44, SUP(p.sigla), "dg-sig");
      el("tspan", { "class": "dg-nome", dx: 8 }, t).textContent = p.nome;
      quebra(p.frase, Math.floor(d.w / 6.6)).forEach(function (l, i, todas) { texto(dg, d.x + 4, d.topo - 12 - (todas.length - 1 - i) * 16, l, "dg-frase"); });
      clicavel(dg, function () { abrePasso(p.sigla); });
    });
    // a porta da maestria, entre o P² e o P³
    el("rect", { x: 533, y: 170, width: 28, height: chao - 170, rx: 3, "class": "porta" }, g);
    el("path", { d: "M547 146 L556 155 L547 164 L538 155 Z", "class": "porta-diamante" }, g);
    texto(g, 175, chao + 24, "NO MODELO", "lado-rot", "middle");
    texto(g, 547, chao + 24, "CRITÉRIO DE MAESTRIA", "lado-rot porta-rot", "middle");
    texto(g, 705, chao + 24, "NO PACIENTE", "lado-rot pac", "middle");
    texto(g, 40, 458, "Clique num degrau para ver o passo na curva da camada 02.", "dg-dica");
  })();
  function leituraAbertura() {
    var linhas = D.abertura.map(function (w) {
      var r = esc(maiuscula(w.resposta)) + ".";
      if (w.chave === "como") r += "<div class='w5-p'>" + D.ps.map(function (p, k) {
        return "<button type='button' class='k" + k + "' data-p='" + p.sigla + "'><b>" + SUP(p.sigla) + "</b>" + esc(p.nome) + "</button>";
      }).join("") + "</div>";
      return "<div class='w5'><dt>" + esc(w.pergunta) + "</dt><dd>" + r + "</dd></div>";
    }).join("");
    escreve(leituraAbe, "<dl class='w5h'>" + linhas + "</dl>" + elo("abertura"));
    Array.prototype.forEach.call(leituraAbe.querySelectorAll("[data-p]"), function (b) {
      b.addEventListener("click", function () { abrePasso(b.dataset.p); });
    });
  }

  /* ================= 01 · ECOSSISTEMA: quem sustenta → o curso → quem ganha =================
     No molde do HDB (atores → o centro → desfechos) e das outras irmãs: três colunas lidas de atores.csv (coluna),
     o Hernia3D como centro, e por padrão só as linhas que cruzam a borda do curso, fracas: o dinheiro que entra pela
     esquerda e o ganho que sai pela direita. As relações de dentro do curso só aparecem no clique, com um disco
     numerado na cor de quem paga, o mesmo número da leitura. Sem texto nas linhas, sem arco e sem faixa: a tese
     é a manchete. O hospital fica fora da figura; aparece na leitura do SUS e da operadora. */
  var eco = document.getElementById("eco");
  var leituraEco = document.getElementById("leitura-eco");
  var W = 230, H = 58;
  var COL_X = { sustenta: 40, curso: 335, ganha: 630 };
  // as alturas das caixas nas colunas laterais, pelo número de atores: três ficam nas mesmas alturas dos dois lados
  var FILAS = { 3: [122, 232, 342], 4: [92, 182, 272, 362] };
  var POS = {}, setas = [];
  (function montaEco() {
    // as posições, pela coluna de cada ator: o projeto é o centro alto; o residente em cima, os outros do curso embaixo
    var ordemCurso = ["residente", "projeto", "preceptor", "fornecedores"], yCurso = { residente: [92, H], projeto: [170, 150], preceptor: [340, H], fornecedores: [420, H] };
    var nCol = { sustenta: 0, ganha: 0 }, nTot = { sustenta: 0, ganha: 0 };
    D.atores.forEach(function (a) { if (a.coluna in nTot) nTot[a.coluna]++; });
    D.atores.forEach(function (a) {
      if (!a.coluna) return;
      if (a.coluna === "curso") { var yc = yCurso[a.id] || [420 + 80 * ordemCurso.length, H]; POS[a.id] = { x: COL_X.curso, y: yc[0], h: yc[1], col: "curso" }; }
      else { POS[a.id] = { x: COL_X[a.coluna], y: (FILAS[nTot[a.coluna]] || FILAS[4])[nCol[a.coluna]++], h: H, col: a.coluna }; }
    });
    var defs = el("defs", {}, eco);
    Object.keys(ENQ).forEach(function (k) {
      var m = el("marker", { id: "pt-" + k, viewBox: "0 0 10 10", refX: 5, refY: 5, markerWidth: 5, markerHeight: 5 }, defs);
      el("circle", { cx: 5, cy: 5, r: 4, fill: ENQ[k].cor }, m);
    });
    [[COL_X.sustenta + W / 2, "QUEM SUSTENTA", "põe dinheiro no curso"], [COL_X.curso + W / 2, "O CURSO", "recebe, e entrega"],
     [COL_X.ganha + W / 2, "QUEM GANHA", "colhe o ganho, sem pagar o curso"]].forEach(function (c) {
      texto(eco, c[0], 40, c[1], "col-rot", "middle");
      texto(eco, c[0], 58, c[2], "col-sub", "middle");
    });
    var camadaSetas = el("g", {}, eco), camadaAtores = el("g", {}, eco), camadaDiscos = el("g", {}, eco);
    // quem entra no centro entra numa altura própria da borda (molde do HDB), para as linhas não se acumularem num ponto
    var entram = D.fluxos.filter(function (f) { return f.para === "projeto" && POS[f.de] && POS[f.de].col === "sustenta"; });
    var hub = POS.projeto, entra = {};
    entram.forEach(function (f, i) { entra[f.id] = hub.y + 18 + i * (hub.h - 36) / Math.max(1, entram.length - 1); });
    var saem = D.fluxos.filter(function (f) { return POS[f.de] && POS[f.para] && POS[f.para].col === "ganha"; }), sai = {};
    saem.forEach(function (f, i) { var o = POS[f.de]; sai[f.id] = o.y + 14 + i * (o.h - 28) / Math.max(1, saem.length - 1); });
    var uso = {};
    D.fluxos.forEach(function (f) {
      var a = POS[f.de], b = POS[f.para];
      if (!a || !b) return;
      var d, interna = a.col === b.col;
      if (!interna) {
        var x1 = a.x + W, y1 = sai[f.id] || a.y + a.h / 2, x2 = b.x, y2 = entra[f.id] || b.y + b.h / 2, mx = (x1 + x2) / 2;
        d = "M" + x1 + " " + y1 + " C" + mx + " " + y1 + " " + mx + " " + y2 + " " + x2 + " " + y2;
      } else {
        // dentro do curso: pela direita quando sai do projeto, pela esquerda quando sai do residente
        var lado = f.de === "projeto" ? 1 : -1, n = uso[f.de + f.para] = (uso[f.de + f.para] || 0) + 1, off = (n - 1) * 10;
        var xa = lado > 0 ? a.x + W : a.x, ya = a.y + a.h / 2 + off + (lado > 0 ? a.h / 4 : 0), yb = b.y + b.h / 2 + off;
        var dd = lado * (22 + Math.abs(ya - yb) / 6);
        d = "M" + xa + " " + ya + " C" + (xa + dd) + " " + ya + " " + (xa + dd) + " " + yb + " " + xa + " " + yb;
      }
      var p = el("path", { d: d, "class": "seta t-" + f.tipo + (interna ? " interna" : ""), stroke: ENQ[f.enquadramento].cor, "marker-end": "url(#pt-" + f.enquadramento + ")" }, camadaSetas);
      var meio = p.getTotalLength ? p.getPointAtLength(p.getTotalLength() / 2) : { x: 450, y: 260 };
      var dg = el("g", { "class": "disco" }, camadaDiscos);
      el("circle", { cx: meio.x, cy: meio.y, r: 10, fill: ENQ[f.enquadramento].cor, stroke: "#fff", "stroke-width": 2 }, dg);
      var dt = texto(dg, meio.x, meio.y + 4, "", "");
      setas.push({ f: f, p: p, disco: dg, num: dt });
    });
    Object.keys(POS).forEach(function (id) {
      var a = ATOR[id], pz = POS[id];
      var g = el("g", { "class": "ator clicavel c-" + a.confianca + (id === "projeto" ? " projeto" : ""), tabindex: 0, role: "button" }, camadaAtores);
      el("rect", { x: pz.x, y: pz.y, width: W, height: pz.h, rx: 6 }, g);
      texto(g, pz.x + 14, pz.y + pz.h / 2 - 3, a.nome, "nome");
      texto(g, pz.x + 14, pz.y + pz.h / 2 + 15, a.curto, "papel");
      clicavel(g, function () { selecionaEco(selecao.ecossistema === "a:" + id ? null : "a:" + id); estadoNaUrl(); });
      pz.g = g;
    });
    texto(eco, COL_X.sustenta, 512, "Linhas: a cor diz quem paga · cheia = pagamento · tracejada = a confirmar · pontilhada = ganho sem pagamento. Clique num ator para ver as relações dele.", "eco-legenda");
  })();
  function nomeAtor(id, inicial) {
    var n = ATOR[id].nome.toLowerCase().replace(/hernia3d/g, "Hernia3D").replace(/\bsus\b/g, "SUS").replace(/\brv\b/g, "RV");
    return inicial ? maiuscula(n) : n;
  }
  // as relações de um ator, na ordem da leitura: o número do disco é o número da lista
  function relacoesDe(ator) { return D.fluxos.filter(function (f) { return f.de === ator || f.para === ator; }); }
  function selecionaEco(item) {
    selecao.ecossistema = item;
    var ator = item && item.indexOf("a:") === 0 ? item.slice(2) : null;
    var fluxo = item && item.indexOf("f:") === 0 ? item.slice(2) : null;
    var lista = ator ? relacoesDe(ator) : (fluxo ? D.fluxos.filter(function (f) { return f.id === fluxo; }) : []);
    Object.keys(POS).forEach(function (id) {
      POS[id].g.classList.toggle("on", id === ator);
      POS[id].g.classList.toggle("par", !!item && id !== ator && lista.some(function (f) { return f.de === id || f.para === id; }));
    });
    setas.forEach(function (s) {
      var i = lista.indexOf(s.f), on = i >= 0;
      s.p.classList.toggle("on", on);
      s.p.classList.toggle("apaga", !!item && !on);
      s.disco.classList.toggle("on", on);
      s.num.textContent = on ? String(i + 1) : "";
    });
    leituraEcossistema(ator, fluxo, lista);
  }
  function leituraEcossistema(ator, fluxo, lista) {
    var html = "";
    if (ator || fluxo) {
      var titulo = ator ? nomeAtor(ator, true) : nomeAtor(lista[0].de, true) + " → " + nomeAtor(lista[0].para);
      html += "<div class='bloco ficha'><button class='solta' type='button' data-solta aria-label='soltar'>×</button><div class='rotulo'>" +
        (ator ? "Ator " + conf(ATOR[ator].confianca) : "Relação") + "</div><h3>" + esc(titulo) + "</h3>" +
        (ator ? "<p>" + esc(maiuscula(ATOR[ator].papel)) + ".</p>" : "") + "</div>";
      html += "<div class='bloco'><div class='rotulo'>" + (ator ? "As relações, numeradas como no desenho" : "O que passa") + "</div><ol class='rel'>" +
        (lista.length ? lista.map(function (f, i) {
          var outro = ator ? (f.de === ator ? f.para : f.de) : null;
          var sentido = ator ? (f.de === ator ? "sai" : "chega") : "";
          return "<li><span class='n' style='background:" + ENQ[f.enquadramento].cor + "'>" + (i + 1) + "</span><span>" +
            (sentido ? "<span class='sentido'>" + sentido + "</span>" : "") +
            (outro ? "<b>" + esc(nomeAtor(outro)) + "</b>: " : "") + esc(f.oque) + "." + tagEnq(f.enquadramento, "", true) + "</span></li>";
        }).join("") : "<li><span></span><span>Nenhuma relação de dinheiro registrada.</span></li>") + "</ol></div>";
    } else {
      html += "<div class='bloco'>" + achadosHtml("ecossistema", true) + "</div>";
    }
    html += elo("ecossistema");
    escreve(leituraEco, html);
    var solta = leituraEco.querySelector("[data-solta]");
    if (solta) solta.addEventListener("click", function () { selecionaEco(null); estadoNaUrl(); });
  }

  /* ================= 03 · SERVIÇOS: o que se oferece, em cartões =================
     No molde dos portfólios irmãos (HDB, Longevidade): um cartão por oferta, o que entra à vista, uma marca por
     dimensão (quem paga, uma vez por cartão e em tinta neutra; presencial ou digital no quadrado; em aberto
     tracejado). Os itens do curso se agrupam pelos 3Ps (componentes.csv, coluna p); as ofertas de um mesmo grupo
     (servicos.csv, coluna grupo) dividem um cartão, como as três portas do kit. O que não se vende, o estudo,
     fica fora dos cartões, numa linha do rodapé. Sem painel ao lado, sem eixo de estações e sem dica no mouse. */
  var portfolio = document.getElementById("portfolio");
  var GRUPO = { kit: ["O kit, em três portas", "do aluguel à compra livre: o residente escolhe uma, e não depende de infraestrutura hospitalar para treinar"] };
  function vendido(s) { return s.etapas.some(function (e) { return ETAPA[e] && ETAPA[e].trilho === "curso"; }); }
  function itensHtml(itens) {
    return "<ul class='itens'>" + itens.map(function (i) {
      return "<li class='k-" + i.canal + " c-" + i.confianca + "'>" + esc(maiuscula(i.item)) + "</li>";
    }).join("") + "</ul>";
  }
  function pagaHtml(s) { return "<span class='pf-paga'>" + esc(maiuscula(ENQ[s.enquadramento].rotulo)) + "</span>"; }
  (function montaPortfolio() {
    var cartoes = [], porGrupo = {};
    D.servicos.filter(vendido).forEach(function (s) {
      if (s.grupo) {
        if (porGrupo[s.grupo]) { porGrupo[s.grupo].servs.push(s); return; }
        porGrupo[s.grupo] = { grupo: s.grupo, servs: [s] }; cartoes.push(porGrupo[s.grupo]);
      } else cartoes.push({ servs: [s] });
    });
    var html = "<div class='pf-grade'>" + cartoes.map(function (c) {
      var s0 = c.servs[0], ids = c.servs.map(function (s) { return s.id; }).join(" ");
      var ps = [];
      c.servs.forEach(function (s) { s.p.forEach(function (p) { if (ps.indexOf(p) < 0) ps.push(p); }); });
      var abertos = c.servs.every(function (s) { return s.confianca === "aberto"; });
      var h = "<article class='pf-cartao clicavel c-" + (abertos ? "aberto" : "ok") + "' tabindex='0' data-servs='" + ids + "'>";
      if (c.grupo) {
        h += "<h3>" + esc(GRUPO[c.grupo] ? GRUPO[c.grupo][0] : s0.nome) + "</h3><p class='pf-meta'>" + ps.map(seloP).join("") + pagaHtml(s0) + "</p>" +
          "<p class='pf-desc'>" + esc(maiuscula(GRUPO[c.grupo] ? GRUPO[c.grupo][1] : s0.descricao)) + ".</p>" +
          c.servs.map(function (s, k) {
            return "<p class='pf-porta'><span class='n'>" + (k + 1) + "</span>" + esc(s.curto) + conf(s.confianca) + "</p>" + itensHtml(s.itens);
          }).join("");
      } else {
        h += "<h3>" + esc(s0.nome) + "</h3><p class='pf-meta'>" + ps.map(seloP).join("") + pagaHtml(s0) + conf(s0.confianca) + "</p>" +
          "<p class='pf-desc'>" + esc(maiuscula(s0.descricao)) + ".</p>";
        var comP = s0.itens.filter(function (i) { return i.p; });
        if (comP.length) {
          D.ps.forEach(function (P, k) {
            var doP = s0.itens.filter(function (i) { return i.p === P.sigla; });
            if (doP.length) h += "<p class='pf-c k" + k + "'>" + SUP(P.sigla) + " " + esc(P.nome) + "</p>" + itensHtml(doP);
          });
        } else h += "<p class='pf-c'>O que entra</p>" + itensHtml(s0.itens);
        // a oferta que chega ao fim do modelo leva ao P³, que fica fora dela
        if (s0.etapas.indexOf("E3b") >= 0 && PASSO.P3) h += "<p class='pf-fecho'>Leva ao " + SUP("P3") + " " + esc(PASSO.P3.nome) +
          ": o centro cirúrgico fica fora do curso, só para quem passou na maestria.</p>";
      }
      return h + "</article>";
    }).join("") + "</div>";
    var foraDos = D.servicos.filter(function (s) { return !vendido(s); });
    html += "<p class='pf-rodape'><span>◼ presencial, com o modelo · ◻ digital, na plataforma · <i>itálico</i>: provável · tracejado ou em vermelho: em aberto</span>" +
      foraDos.map(function (s) { return "<span>Antes do curso, o " + esc(s.nome.charAt(0).toLowerCase() + s.nome.slice(1)) + ", pago pela " + esc(ENQ[s.enquadramento].rotulo.toLowerCase()) + ", valida o modelo.</span>"; }).join("") +
      elo("servicos") + "</p>";
    escreve(portfolio, html);
    Array.prototype.forEach.call(portfolio.querySelectorAll(".pf-cartao"), function (c) {
      clicavel(c, function () { var id = c.dataset.servs.split(" ")[0]; selecionaServico(selecao.servicos === id ? null : id); estadoNaUrl(); });
    });
  })();
  // o clique só realça o cartão; o ?item= guarda qual
  function selecionaServico(id) {
    selecao.servicos = id;
    Array.prototype.forEach.call(portfolio.querySelectorAll(".pf-cartao"), function (c) {
      c.classList.toggle("on", !!id && c.dataset.servs.split(" ").indexOf(id) >= 0);
    });
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
    h += "<div class='bp-lin'></div>" + cols.map(function (c, i) {
      var p = ETAPA[c].p;
      if (i > 0 && ETAPA[cols[i - 1]].p === p) return "";
      var n = 1; while (cols[i + n] && ETAPA[cols[i + n]].p === p) n++;
      var P = D.ps.filter(function (x) { return x.sigla === p; })[0];
      return "<div class='bp-p " + P_COR[p] + "' style='grid-column:span " + n + "'>" + SUP(p) + " " + esc(P.nome.toUpperCase()) + "</div>";
    }).join("");
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
    var ganha = function (j) { return "<div>" + j.ganha.map(function (a) { return esc(nomeAtor(a, true)); }).join(", ") + "</div>"; }; ganha.gate = "";
    h += linha("Quem ganha", ganha);
    var risco = function (j, e) { return "<div class='bp-risco" + (e.gate ? "" : " vazio") + "'>" + (e.gate ? esc(maiuscula(e.gate)) : "—") + "</div>"; };
    risco.gate = esc(maiuscula(ETAPA.G.gate));
    h += linha("Gate e risco", risco);
    h += "</div>";
    /* o blueprint ocupa a tela inteira, como no HDB (02/11/2026; o usuário: a caixa da direita "mais atrapalha do que ajuda").
       Os achados das Jornadas aparecem na Direção, a validação do simulador na 02. Fica a legenda de leitura, com o elo */
    h += "<p class='bp-pe'><span>Acima da linha, o que o residente vive; abaixo, o que roda por trás. Em itálico, no que o residente vive: leitura nossa, ainda não observada.</span>" + elo("jornadas") + "</p>";
    escreve(document.getElementById("blueprint"), h);
  })();

  /* ================= 05 · DIREÇÃO: o que falta definir para o curso virar negócio (02/11/2026) =================
     No molde da Direção do HDB e da Longevidade. À esquerda, curta: a conclusão, as três definições (a camada fecho de
     achados.csv; o mínimo de hoje vem de sintese.csv), uma linha da lei do mínimo, sem números, e o BMC nas posições de
     Osterwalder (os seis blocos do encadeamento, do cliente à receita, levam número). À direita, um cartão por bloco, todos
     na mesma célula da grade, para a escala não mudar entre blocos: o que pedimos à instituição · o que já temos · o que
     ainda não está definido · o que já sabemos (achados, com "ver em") · o que falta definir (pendências públicas, com o
     portão, quem resolve e o prazo). Listas inteiras, nada atrás do mouse. Sem link para a conta econômica (ela não tem link a partir desta peça) e sem
     horas do preceptor, que ficam no vault. Dados: proposta · pendencias · nao_ouvidos · compradores · sintese · achados. */
  var direcao = document.getElementById("direcao"), mostraBloco = function () {};
  (function montaDirecao() {
    if (!direcao || !(D.proposta || []).length) return;
    var GRADE = { parcerias: "1/1/3/3", atividades: "1/3/2/5", recursos: "2/3/3/5", proposta: "1/5/3/7",
                  relacionamento: "1/7/2/9", canais: "2/7/3/9", segmentos: "1/9/3/11", custos: "3/1/4/6", receita: "3/6/4/11" };
    // o encadeamento antes do BMC (06_estrategia_gtm): cliente → portfólio → atividade → recurso → custo → receita
    var CADEIA = ["segmentos", "proposta", "atividades", "recursos", "custos", "receita"];
    var PORTAO = { piloto: "para o piloto", venda: "para vender o curso", depois: "depois da primeira turma" };
    var CAM = {}; VISTAS.forEach(function (v) { CAM[v.id] = v.n + " · " + v.cam; });
    var S = D.sintese || {};
    var DEF = D.achados.filter(function (a) { return a.camada === "fecho"; });
    var DEF_DE = {}; DEF.forEach(function (a, i) { a.componente.forEach(function (id) { if (!DEF_DE[id]) DEF_DE[id] = i + 1; }); });
    function ponto(s) { s = String(s || "").trim(); return /[.!?]$/.test(s) ? s : s + "."; }
    function rot(t, qt) { return "<p class='pc-rot'>" + t + (qt !== undefined ? "<span>" + qt + "</span>" : "") + "</p>"; }
    var vazio = "<li class='pc-vazio'>nada registrado ainda</li>";
    function blocoBmc(c) {
      var n = CADEIA.indexOf(c.id) + 1;
      return "<button type='button' class='bmc-b' data-pv='" + c.id + "' style='grid-area:" + GRADE[c.id] + ";--pv:" + c.cor + "'>" +
        "<span class='bmc-tit'>" + (n ? "<i>" + n + "</i>" : "") + esc(c.bloco).replace("Relacionamento", "Relaciona&shy;mento") + "</span></button>";
    }
    function card(c) {
      var n = CADEIA.indexOf(c.id) + 1;
      var sabe = D.achados.filter(function (a) { return a.camada !== "fecho" && a.componente.indexOf(c.id) >= 0; });
      var defs = DEF.filter(function (a) { return a.componente.indexOf(c.id) >= 0; });
      var falta = D.pendencias.filter(function (p) { return p.componente === c.id; }).map(function (p) {
        return "<li><b>" + esc(p.curto) + "</b><small>" + PORTAO[p.portao] + " · quem resolve: " + esc(p.dono) + " · " +
          (p.prazo === "a definir" ? "<em>prazo a definir</em>" : "prazo: " + esc(p.prazo)) + "</small></li>";
      });
      // quem ainda não ouvimos, numa linha só; o porquê e o como ouvir ficam no vault (nao_ouvidos.csv)
      if (c.id === "segmentos" && (D.nao_ouvidos || []).length) falta.push("<li class='pc-ouvir'><b>Ouvir quem ainda não ouvimos</b><small>" +
        D.nao_ouvidos.map(function (x) { return esc(x.grupo.charAt(0).toLowerCase() + x.grupo.slice(1)); }).join(" · ") + "</small></li>");
      // os compradores possíveis como pontos; enquanto nenhum estiver confirmado, todos vazados
      var foco = (D.compradores || []).some(function (p) { return p.foco === "sim"; });
      var pontos = c.id === "segmentos" && (D.compradores || []).length ?
        "<div class='pc-pontos" + (foco ? "" : " aberto") + "'>" + rot("Quem pode comprar · " + (foco ? "o circulado é o primeiro" : "nenhum confirmado ainda")) +
        "<ol>" + D.compradores.map(function (p) {
          return "<li" + (p.foco === "sim" ? " class='foco'" : "") + "><i></i><b>" + esc(p.nome) + "</b></li>";
        }).join("") + "</ol></div>" : "";
      return "<header class='pc-cab'><p class='pc-eyebrow'>" + (n ? "elo " + n + " da cadeia · " : "") + esc(c.componente) + " " + conf(c.confianca) +
        (DEF_DE[c.id] ? " · <b class='pc-resp'>definição " + DEF_DE[c.id] + "</b>" : "") + "</p>" +
        "<h3 class='pc-tit'>" + esc(c.bloco) + "</h3></header>" +
        "<div class='pc-pede'>" + rot("O que pedimos à instituição") + "<p>" + esc(ponto(maiuscula(c.pedido))) + "</p></div>" +
        "<div class='pc-dupla'><div>" + rot("O que já temos") + "<p class='pc-txt'>" + esc(ponto(maiuscula(c.temos))) + "</p></div>" +
        "<div>" + rot("O que ainda não está definido") + "<p class='pc-txt'>" + esc(ponto(maiuscula(c.preciso))) + "</p></div></div>" +
        pontos +
        defs.map(function (a) {
          return "<p class='pc-cond'><b>Uma das três definições · " + esc(a.titulo) + ".</b> " + esc(ponto(maiuscula(a.texto))) + "</p>";
        }).join("") +
        "<div class='pc-listas'><section>" + rot("O que já sabemos", sabe.length) + "<ul class='pc-ul'>" + (sabe.map(function (a) {
          return "<li><b>" + esc(a.titulo) + "</b><button type='button' class='l-elo pc-ver' data-vista='" + a.camada + "'>ver em " + esc(CAM[a.camada]) + " →</button></li>";
        }).join("") || vazio) + "</ul></section>" +
        "<section>" + rot("O que falta definir", falta.length) + "<ul class='pc-ul'>" + (falta.join("") || vazio) + "</ul></section></div>";
    }
    escreve(direcao,
      "<div class='bmc-dir'><div class='bmc-col'>" +
      "<div class='dc-conc'><div class='rotulo'>O que a síntese conclui</div><p class='dc-frase'>" + esc(ponto(S.direcao)) + "</p>" +
      "<ol class='dc-tres'>" + DEF.map(function (a, i) {
        var minimo = S.fator_minimo === a.titulo;
        return "<li" + (minimo ? " class='minimo'" : "") + "><button type='button' class='dc-resp' data-pv='" + a.componente[0] + "'><i>" + (i + 1) + "</i><span>" +
          esc(a.titulo) + (minimo ? " <em class='dc-min'>o mínimo hoje</em>" : "") + "</span></button></li>";
      }).join("") + "</ol>" +
      (S.limite ? "<p class='dc-limite'><b>Lei do mínimo</b>" + esc(ponto(maiuscula(S.limite))) + "</p>" : "") + "</div>" +
      "<div class='rotulo'>O modelo de negócio · clique num bloco</div>" +
      "<div class='bmc'>" + D.proposta.map(blocoBmc).join("") + "</div>" +
      elo("direcao") + "</div>" +
      "<div class='pv-cards'>" + D.proposta.map(function (c) {
        return "<div class='pv-card' data-pv='" + c.id + "' style='--pv:" + c.cor + "'>" + card(c) + "</div>";
      }).join("") + "</div></div>");
    mostraBloco = function (id) {
      if (!D.proposta.some(function (c) { return c.id === id; })) id = "proposta";
      selecao.direcao = id === "proposta" ? null : id;
      Array.prototype.forEach.call(direcao.querySelectorAll(".bmc-b, .pv-card, .dc-resp"), function (x) { x.classList.toggle("on", x.dataset.pv === id); });
    };
    Array.prototype.forEach.call(direcao.querySelectorAll(".bmc-b, .dc-resp"), function (b) {
      b.addEventListener("click", function () { mostraBloco(b.dataset.pv); estadoNaUrl(); });
    });
    mostraBloco("proposta");
  })();

  /* ---------- carimbo: a meta "publicacao" (N|AAAA-MM-DD) é preenchida pelo publica_tudo.py ---------- */
  (function () {
    var m = document.querySelector('meta[name="publicacao"]'), v = m ? m.content.split("|") : [];
    document.getElementById("carimbo").textContent = (v[1] ? "Estado em " + v[1].split("-").reverse().join("/") +
      " · publicação " + v[0] : "Versão de trabalho, não publicada") + " · base: vault do projeto Hernia3D. Sem valores em reais nesta peça.";
  })();

  /* ---------- início: estado vindo da URL ---------- */
  var q = new URLSearchParams(location.search);
  leituraEcossistema(null, null);
  selecionaServico(null);
  leituraAbertura();
  // ?olhar=1|2 (o antigo ?tempo= vale como olhar: 1 é hoje, 2 e 3 são com o Hernia3D)
  var olharUrl = +(q.get("olhar") || q.get("tempo") || 0);
  abre(q.get("vista") || "abertura", q.get("item") || undefined);
  if (vistaAtual === "sistema" && olharUrl && !q.get("item")) escolheTempo(olharUrl === 1 ? 1 : 2);
})();
