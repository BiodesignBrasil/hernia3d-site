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
   As abas, as perguntas, as manchetes e os elos vêm de camadas.csv; a 00 e a 05 são as pontas.
   Dados: js/data.js, GERADO de 08_sintese/dados/*.csv (não editar à mão).
   Sem valores em reais nesta peça.
   Encaixe sem rolagem herdado da Sistemática Longevidade (encaixa/dimensiona), com piso de leitura: o zoom não deixa
   o menor texto abaixo de 10px, e o painel que não cabe rola. Abaixo de 1180px a página empilha; até 767px, a versão
   do celular troca os desenhos largos da Abertura e do Ecossistema por cartões e listas, e redesenha a curva. */

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
  // fecha a frase com ponto, se ela ainda não termina em pontuação (dois-pontos abrem o que vem depois)
  function ponto(s) { s = String(s || "").trim(); return /[.!?:…]$/.test(s) ? s : s + "."; }
  var CONF_TXT = { confirmado: "confirmado", provavel: "provável", aberto: "em aberto" };
  function conf(c) { return "<span class='conf conf-" + c + "'>" + CONF_TXT[c] + "</span>"; }
  /* as cores dos enquadramentos vêm dos dados e servem às linhas; como letra, ou como fundo de um número branco,
     precisam de contraste de 4,5:1. O ouro de linha vira o ouro de texto (o mesmo de --ouro-texto); as outras
     escurecem só o necessário */
  function luz(hex) {
    var c = [1, 3, 5].map(function (i) { var v = parseInt(hex.substr(i, 2), 16) / 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }
  function contraste(a, b) { var x = luz(a), y = luz(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
  function escurece(hex) {
    return "#" + [1, 3, 5].map(function (i) { return ("0" + Math.round(parseInt(hex.substr(i, 2), 16) * 0.92).toString(16)).slice(-2); }).join("");
  }
  function corLetra(cor, fundo) {
    if (/^#B8860B$/i.test(cor)) return "#8A6508";
    for (var i = 0; i < 12 && contraste(cor, fundo) < 4.5; i++) cor = escurece(cor);
    return cor;
  }
  function tagEnq(k, prefixo, curto) {
    var e = ENQ[k];
    return "<span class='tag' style='color:" + corLetra(e.cor, e.fundo) + ";background:" + e.fundo + ";border-color:" + e.cor + "55'>" +
      (prefixo || "") + esc(curto ? e.curto : e.rotulo) + "</span>";
  }
  function clicavel(g, fn) {
    g.addEventListener("click", fn);
    g.addEventListener("keydown", function (ev) { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); fn(); } });
  }
  // o leitor de tela ouve só o título da ficha que abre (uma região viva fixa, e não a leitura inteira)
  var pronto = false;
  function anuncia(s) { if (pronto) document.getElementById("anuncio").textContent = s; }

  /* ---------- encaixe: cada painel cabe na altura da tela (desktop) ----------
     O zoom encolhe o painel até caber, como nas irmãs: no desktop nada rola. Desce até o data-piso e, se ainda não
     couber, até 0,5; só abaixo disso o painel rola (classe "rola", rede de segurança do molde HDB). */
  var EMPILHA = 1180, PISO_MINIMO = 0.5, ajustaveis = [];
  function encaixa(cont) {
    var w = cont && cont.firstElementChild;
    if (!w) return;
    cont.classList.remove("rola");
    if (window.innerWidth <= EMPILHA) { w.style.zoom = "1"; return; }
    if (!cont.clientHeight) return;
    w.style.zoom = "1";
    var alvo = cont.clientHeight - 6;
    var teto = parseFloat(cont.getAttribute("data-cresce")) || 1;
    if (w.getBoundingClientRect().height <= alvo) {
      if (teto > 1) {
        var bom = 1;
        for (var g = 1.04; g <= teto + 1e-9; g += 0.04) {
          w.style.zoom = String(g);
          if (w.getBoundingClientRect().height > alvo) break;
          bom = g;
        }
        w.style.zoom = String(bom);
      }
      return;
    }
    // a Direção aceita descer mais (data-piso 0,55, como nas irmãs); se nem o piso couber, desce até 0,5 antes de rolar
    var piso = +(cont.getAttribute("data-piso") || 0.6);
    for (var z = 1; z > PISO_MINIMO && w.getBoundingClientRect().height > alvo;) {
      z = Math.max(z > piso ? piso : PISO_MINIMO, z - 0.03);
      w.style.zoom = String(z);
    }
    if (w.getBoundingClientRect().height > alvo) cont.classList.add("rola");
  }
  function escreve(cont, html) {
    cont.innerHTML = "<div class='ajusta'>" + html + "</div>";
    if (ajustaveis.indexOf(cont) < 0) ajustaveis.push(cont);
    encaixa(cont);
    ligaElos(cont);
    var t = cont.querySelector(".ficha h3");
    if (t) anuncia(t.textContent);
  }
  function dimensiona() {
    var palco = document.querySelector(".palco");
    if (window.innerWidth <= EMPILHA) { palco.style.height = ""; return; }
    var topo = document.querySelector("nav.barra").offsetHeight;
    palco.style.height = Math.max(420, document.documentElement.clientHeight - topo) + "px";
  }
  function reencaixa() { ajustaAbas(); dimensiona(); ajustaveis.forEach(encaixa); }
  // empilhada, o toque que muda uma leitura fora da vista rola até ela, logo abaixo da barra parada
  function rolaAte(alvo) {
    if (window.innerWidth > EMPILHA || !alvo) return;
    var barra = document.querySelector("nav.barra"), parada = getComputedStyle(barra).position === "sticky";
    var y = alvo.getBoundingClientRect().top + window.pageYOffset - (parada ? barra.offsetHeight : 0) - 8;
    var suave = !(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    window.scrollTo({ top: Math.max(0, y), behavior: suave ? "smooth" : "auto" });
  }
  var tempo;
  window.addEventListener("resize", function () { clearTimeout(tempo); tempo = setTimeout(reencaixa, 150); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(reencaixa);
  window.addEventListener("load", reencaixa);

  /* ---------- as seis abas, da abertura à direção, como capítulos (camadas.csv) ---------- */
  var VISTAS = D.camadas.map(function (c) {
    return { id: c.id, n: c.n, rot: c.rotulo, cam: c.cam, perg: c.pergunta, manchete: c.manchete, elo: c.elo };
  });
  // o fio: cada aba aponta para a seguinte; a última volta ao começo
  var PROXIMA = {};
  VISTAS.forEach(function (v, i) { var volta = i === VISTAS.length - 1; PROXIMA[v.id] = [VISTAS[volta ? 0 : i + 1].id, v.elo, volta]; });
  var botoes = {}, vistaAtual = null;
  var nav = document.getElementById("camadas");
  VISTAS.forEach(function (v) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "f-camada"; b.setAttribute("role", "tab");
    b.id = "aba-" + v.id; b.setAttribute("aria-controls", "v-" + v.id);
    b.innerHTML = "<small>" + v.n + "</small>" + esc(v.cam.toUpperCase()); b.title = v.rot;
    // o nome lido em voz alta separa o número do nome da aba ("00 · Abertura", e não "00Abertura")
    b.setAttribute("aria-label", v.n + " · " + maiuscula(v.cam));
    b.addEventListener("click", function () { abre(v.id); });
    nav.appendChild(b); botoes[v.id] = b;
  });
  // no padrão de abas: só a aba aberta entra no Tab; as setas, Home e End andam entre elas e já abrem
  nav.addEventListener("keydown", function (ev) {
    var ids = VISTAS.map(function (v) { return v.id; });
    var i = ids.indexOf((document.activeElement && document.activeElement.id || "").replace("aba-", "")), j = -1;
    if (i < 0) i = ids.indexOf(vistaAtual);
    if (ev.key === "ArrowRight") j = (i + 1) % ids.length;
    else if (ev.key === "ArrowLeft") j = (i - 1 + ids.length) % ids.length;
    else if (ev.key === "Home") j = 0;
    else if (ev.key === "End") j = ids.length - 1;
    if (j < 0) return;
    ev.preventDefault();
    abre(ids[j]);
    botoes[ids[j]].focus();
  });
  // as abas quebram em duas linhas de três quando não cabem numa: a barra não esconde nenhuma
  function ajustaAbas() {
    nav.classList.remove("duas");
    var b = nav.children;
    if (b.length && b[b.length - 1].getBoundingClientRect().top - b[0].getBoundingClientRect().top > 4) nav.classList.add("duas");
  }
  function abre(id, item) {
    var v = VISTAS.filter(function (x) { return x.id === id; })[0] || VISTAS[0];
    vistaAtual = v.id;
    VISTAS.forEach(function (x) {
      document.getElementById("v-" + x.id).classList.toggle("on", x.id === v.id);
      botoes[x.id].classList.toggle("on", x.id === v.id);
      botoes[x.id].setAttribute("aria-selected", x.id === v.id ? "true" : "false");
      botoes[x.id].tabIndex = x.id === v.id ? 0 : -1;
    });
    document.getElementById("pergunta").innerHTML = "<b>" + v.n + " · " + esc(v.rot) + "</b> · " + esc(v.perg);
    document.getElementById("manchete").textContent = v.manchete || "";
    if (item !== undefined) seleciona(v.id, item);
    estadoNaUrl();
    reencaixa();
    // empilhada, a página rola: quem troca de aba volta ao topo
    if (window.innerWidth <= EMPILHA && window.pageYOffset) window.scrollTo(0, 0);
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
  // cls, quando houver, diz em que arranjo o elo aparece (so-desktop ou so-empilhado)
  function elo(vista, cls) {
    var p = PROXIMA[vista];
    return "<button type='button' class='l-elo" + (cls ? " " + cls : "") + "' data-vista='" + p[0] + "'>" + (p[2] ? "← " : "→ ") + esc(p[1]) + "</button>";
  }
  function ligaElos(raiz) {
    Array.prototype.forEach.call(raiz.querySelectorAll(".l-elo"), function (b) {
      if (b.dataset.ligado) return;
      b.dataset.ligado = "1";
      // data-item, quando houver, abre a camada já no item (molde HDB); vazio, abre na leitura sem item
      // (na 02, o olhar 2 em foco, onde a leitura mostra os achados)
      b.addEventListener("click", function () { abre(b.dataset.vista, "item" in b.dataset ? b.dataset.item || null : undefined); });
    });
  }
  function achadosHtml(camada, tese) {
    return D.achados.filter(function (a) { return a.camada === camada; }).map(function (a, i) {
      return "<div class='achado" + (tese && i === 0 ? " tese" : "") + "'><b>" + esc(a.titulo) + "</b><span>" + esc(ponto(maiuscula(a.texto))) + "</span></div>";
    }).join("");
  }
  // as evidências que o build manda para a tela (evidencias.csv, tela=sim), menos as que a chamada deixa de fora
  function evidenciasHtml(fora) {
    var lista = D.evidencias.filter(function (e) { return (fora || []).indexOf(e.id) < 0; });
    return "<ul class='evid'>" + lista.map(function (e) {
      return "<li class='c-" + e.confianca + "'><b><span>" + esc(e.estudo) + "</span><span class='tec tec-" + e.tecnica.replace(/\s+/g, "-") + "'>" +
        esc(e.tecnica) + "</span></b>" + esc(ponto(maiuscula(e.achado))) + "</li>";
    }).join("") + "</ul>";
  }
  // a ressalva dos critérios de maestria: enquanto algum valor não estiver confirmado, eles são os do protocolo
  function criteriosHtml() {
    var abertos = D.criterios.some(function (c) { return c.confianca !== "confirmado"; });
    return (abertos ? "<p class='crit-nota'>Valores do protocolo, a validar pelo painel de especialistas.</p>" : "") +
      "<ul class='criterios'>" + D.criterios.map(function (c) { return "<li><span>" + esc(c.criterio) + "</span><span>" + esc(c.valor) + "</span></li>"; }).join("") + "</ul>";
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
  // o número de sessões vem da marca "sessoes" de curva.csv (ou da duração da prática); enquanto a marca não estiver
  // confirmada, ele aparece com a ressalva de que é o número do protocolo, ainda a validar
  var SESSOES = CURVA.sessoes ? CURVA.sessoes.rotulo : ETAPA.E2.duracao.split(",")[0];
  var RESSALVA = CURVA.sessoes && CURVA.sessoes.confianca === "confirmado" ? "" : "número do protocolo, a validar";
  var olharAtual = 2, comparativo = true;
  // o risco da subida vem de uma meta-análise que junta as duas técnicas por vídeo: o rótulo da marca já diz isso
  var TEMPOS = [
    [1, "Hoje, no paciente", "a subida inteira acontece no paciente: <b>" + esc(CURVA.plato.rotulo) + "</b>. Nessa fase, a cirurgia por vídeo tem " +
      esc(CURVA.risco.rotulo)],
    [2, "Com o Hernia3D, no modelo", "a parte íngreme fica no modelo, em <b>" + esc(SESSOES) + "</b>" + (RESSALVA ? " (" + RESSALVA + ")" : "") +
      ", antes do critério de maestria; no paciente, tracejado: ainda não demonstrado no TAPP"]
  ];
  temposEl.innerHTML = TEMPOS.map(function (t) {
    return "<button type='button' data-tempo='" + t[0] + "' role='tab' aria-selected='false'><b>" + t[0] + "</b><span class='tp-t'>" + t[1] + "</span><small>" + t[2] + "</small></button>";
  }).join("");
  // o cartão só põe o olhar em foco; as fichas das marcas abrem pelos botões da dobradiça
  Array.prototype.forEach.call(temposEl.querySelectorAll("button"), function (b) {
    b.addEventListener("click", function () { escolheTempo(+b.dataset.tempo); });
  });
  /* a dobradiça entre os dois olhares: onde fica a parte íngreme da curva. O número de sessões abre a ficha dele, e
     "o que falta provar", a da transferência para o paciente (o tracejado do P³), as duas no olhar 2. As setas apontam
     para os desenhos dos lados e somem quando a página empilha */
  var NUM_COM = "<b>" + esc(SESSOES) + "<span class='db-seta'> →</span></b>";
  document.getElementById("dobradica").innerHTML = "<p class='db-rot'>Onde fica a subida</p>" +
    "<p class='db-lado db-hoje'><b><span class='db-seta'>← </span>" + esc(CURVA.plato.rotulo.replace(/^platô em /, "")) + "</b>no paciente, hoje</p>" +
    "<p class='db-lado db-com'>" + (CURVA.sessoes ? "<button type='button' class='db-ver' data-item='m:sessoes' aria-label='" +
      esc(SESSOES) + ": abrir a ficha na curva'>" + NUM_COM + "</button>" : NUM_COM) + "no modelo, com o Hernia3D" +
    (RESSALVA ? "<i>(" + RESSALVA + ")</i>" : "") + "</p>" +
    "<p class='db-nota'>a parte íngreme sai do centro cirúrgico</p>" +
    (CURVA.transferencia ? "<button type='button' class='db-prova' data-item='m:transferencia'>o que falta provar →</button>" : "") +
    // no comparativo a leitura fica oculta: o elo para a 03 mora aqui, para o fio não quebrar
    elo("sistema");
  ligaElos(document.getElementById("dobradica"));
  Array.prototype.forEach.call(document.querySelectorAll("#dobradica [data-item]"), function (b) {
    b.addEventListener("click", function () { escolheTempo(olharDoItem(b.dataset.item), b.dataset.item); });
  });
  /* os dois olhares numa curva didática e sem ruído (02/11/2026): a mesma moldura (as duas zonas, os eixos, uma linha
     vertical) e uma linha só, em três trechos com o nome em serifa, cada um clicável, que abre a sua ficha na leitura.
     Olhar 1, hoje: plana e cinza no modelo (o modelo não existe), a subida em vermelho no paciente e o platô em 37,5 casos
     (a única posição com escala, de curva.csv). Olhar 2, com o Hernia3D: um trecho por P (P¹ dourado quase plano, P² azul
     que sobe no modelo, P³ vermelho tracejado, que começa no alto: a hipótese do curso). Sem marcas nem régua de estações:
     as fontes ficam na leitura, e as marcas de curva.csv abrem como ficha (os dois botões da dobradiça levam a duas
     delas). Forma ilustrativa. A nota de pé fica em texto da página, embaixo da curva em foco.
     No celular, o desenho tem um terço da largura: os rótulos crescem (CSS), os nomes das zonas descem para baixo do eixo
     e a curva é redesenhada quando a tela cruza os 767px (o mesmo corte do CSS). */
  var C = { x0: 60, xd: 440, x1: 880, eixo: 430 };
  var CEL = window.matchMedia ? window.matchMedia("(max-width:767px)") : { matches: false };
  function celular() { return !!CEL.matches; }
  var notaCurva = document.getElementById("nota-curva");
  function notaDaCurva() {
    var toque = celular() ? "Toque" : "Clique";
    // o espaço não separável em "num P." evita a letra sozinha no fim da linha
    notaCurva.textContent = olharAtual === 1 ? "Forma ilustrativa: só o platô e o risco da subida vêm das fontes. " + toque + " na subida ou no\u00a0platô." :
      "Forma ilustrativa. Tracejado: chegar ao paciente já no alto da curva é a hipótese do curso, ainda não demonstrada no TAPP. " + toque + " num\u00a0P.";
  }
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
    var cel = celular();
    el("rect", { x: C.x0, y: 40, width: C.xd - C.x0, height: C.eixo - 40, "class": "zona-modelo" }, g);
    el("rect", { x: C.xd, y: 40, width: C.x1 - C.xd, height: C.eixo - 40, "class": "zona-paciente" }, g);
    // as zonas: no alto de cada uma, com a unidade; no celular, embaixo do eixo e centradas (a unidade sai pelo CSS)
    [["NO MODELO", " · SESSÕES", C.x0, C.xd, "zr zr-modelo"], ["NO PACIENTE", " · CASOS", C.xd, C.x1, "zr zr-paciente"]].forEach(function (z) {
      var t = cel ? texto(g, (z[2] + z[3]) / 2, C.eixo + 40, z[0], z[4], "middle") : texto(g, z[2] + 12, 60, z[0], z[4]);
      el("tspan", { "class": "zr-un" }, t).textContent = z[1];
    });
    el("line", { x1: C.x0, y1: C.eixo, x2: C.x1, y2: C.eixo, "class": "eixo" }, g);
    el("line", { x1: C.x0, y1: 40, x2: C.x0, y2: C.eixo, "class": "eixo" }, g);
    var ry = texto(g, 0, 0, "domínio do TAPP  →", "eixo-rot", "middle");
    ry.setAttribute("transform", "translate(" + (cel ? 40 : 44) + " " + (C.eixo + 40) / 2 + ") rotate(-90)");
    if (cel) texto(g, C.x1 - 4, C.eixo - 12, "treino →", "eixo-rot", "end");
    else texto(g, C.x1, C.eixo + 20, "treino →", "eixo-rot", "end");
    el("line", { x1: C.xd, y1: cel ? 46 : 30, x2: C.xd, y2: C.eixo + 6, "class": "criterio-l" }, g);
    texto(g, C.xd, cel ? 34 : 22, linha, "criterio-rot", "middle");
  }
  // um trecho: a linha, uma faixa invisível mais larga para o clique e o nome em serifa (rot = [x, y, âncora]);
  // alvo, quando houver, é uma área invisível a mais para o toque, onde o trecho é curto ([x, y, largura, altura])
  function trecho(g, item, d, cls, rot, nome, sub, acao, foco, alvo) {
    var sg = el("g", { "class": "p-seg clicavel " + cls, tabindex: 0, role: "button", "aria-label": nome + " " + sub }, g);
    if (foco) sg.setAttribute("aria-pressed", "false");
    if (alvo) el("rect", { x: alvo[0], y: alvo[1], width: alvo[2], height: alvo[3], fill: "transparent" }, sg);
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
  var ROT_P = { P1: [118, 343], P2: [331, 303], P3: [671, 145] };
  function olharCom(g, acao, foco) {
    moldura(g, "critério de maestria");
    D.ps.forEach(function (p, k) {
      if (TRECHO_P[p.sigla]) trecho(g, p.sigla, TRECHO_P[p.sigla], "k" + k + (p.sigla === "P3" ? " hipotese" : ""), ROT_P[p.sigla], SUP(p.sigla), p.nome, acao, foco);
    });
  }
  function olharHoje(g, acao, foco) {
    var cel = celular();
    moldura(g, "entrada no centro cirúrgico");
    var xp = xc(CURVA.plato.posicao);
    el("path", { d: "M" + C.x0 + " 402 L" + C.xd + " 402", "class": "t-nada" }, g);
    // no celular, a frase do modelo que não existe vai em duas linhas, para caber na zona
    if (cel) {
      var nt = texto(g, (C.x0 + C.xd) / 2, 350, "", "nada-rot", "middle");
      el("tspan", { x: (C.x0 + C.xd) / 2 }, nt).textContent = "hoje, o modelo";
      el("tspan", { x: (C.x0 + C.xd) / 2, dy: 38 }, nt).textContent = "não existe";
    } else texto(g, (C.x0 + C.xd) / 2, 384, "hoje, o modelo não existe", "nada-rot", "middle");
    trecho(g, "m:risco", "M440 402 C560 398 " + (xp - 167) + " 140 " + xp + " 96", "k2", [730, 300], "A subida", "no paciente", acao, foco);
    // o platô é curto: no celular ganha uma área de toque em volta do nome
    trecho(g, "m:plato", "M" + xp + " 96 C" + (xp + 28) + " 92 " + (xp + 51) + " 89 " + C.x1 + " 87", "kh", [876, cel ? 70 : 74, "end"],
      "O platô", CURVA.plato.rotulo.replace(/^platô em /, ""), acao, foco, cel ? [744, 28, 140, 92] : null);
  }
  function montaCurva(svg, n, foco) {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    if (foco) TRECHOS = {};
    // no celular sobra altura embaixo, para os nomes das zonas
    svg.setAttribute("viewBox", "0 0 900 " + (celular() ? 490 : 470));
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
    var vinhaDoPar = comparativo;
    comparativo = false;
    olharAtual = n === 1 ? 1 : 2;
    vSistema.classList.remove("cheia");
    Array.prototype.forEach.call(temposEl.querySelectorAll("button"), function (b) {
      var on = +b.dataset.tempo === olharAtual;
      b.classList.toggle("on", on);
      b.setAttribute("aria-selected", on ? "true" : "false");
    });
    montaCurva(svgC, olharAtual, true);
    notaDaCurva();
    selecionaSis(item || null);
    estadoNaUrl();
    reencaixa();
    // empilhada, o toque num olhar do par leva até a curva em foco, logo abaixo da barra parada
    if (vinhaDoPar) rolaAte(temposEl.parentNode);
  }
  function comparar() {
    comparativo = true;
    selecao.sistema = null;
    vSistema.classList.add("cheia");
    Array.prototype.forEach.call(temposEl.querySelectorAll("button"), function (b) { b.classList.remove("on"); b.setAttribute("aria-selected", "false"); });
    estadoNaUrl();
    reencaixa();
  }
  // os dois olhares do comparativo, desenhados uma vez; um clique fora de um elemento põe o olhar em foco
  [1, 2].forEach(function (n) {
    montaCurva(DUO[n], n, false);
    DUO[n].addEventListener("click", function (ev) { if (!(ev.target.closest && ev.target.closest(".clicavel"))) escolheTempo(n); });
  });
  // quando a tela cruza os 767px, as curvas se redesenham no outro arranjo, com o mesmo olhar e o mesmo item
  function redesenhaCurvas() {
    [1, 2].forEach(function (n) { montaCurva(DUO[n], n, false); });
    if (!comparativo) { montaCurva(svgC, olharAtual, true); notaDaCurva(); selecionaSis(selecao.sistema); }
  }
  if (CEL.addEventListener) CEL.addEventListener("change", redesenhaCurvas);
  else if (CEL.addListener) CEL.addListener(redesenhaCurvas);
  function selecionaSis(item) {
    selecao.sistema = item;
    Object.keys(TRECHOS).forEach(function (k) {
      TRECHOS[k].classList.toggle("on", item === k);
      TRECHOS[k].setAttribute("aria-pressed", item === k ? "true" : "false");
    });
    leituraSistema(item);
  }
  // a volta ao lado a lado fica na linha dos cartões, acima da curva (fixa no HTML, ligada uma vez)
  vSistema.querySelector("[data-volta]").addEventListener("click", comparar);
  function leituraSistema(item) {
    var html = "";
    if (item && PASSO[item]) {
      var P = PASSO[item], k = D.ps.indexOf(P);
      html += "<div class='bloco ficha'><div class='rotulo'><span class='selo-p k" + k + "'>" + SUP(P.sigla) + "</span> um dos 3Ps</div><h3>" + esc(P.nome) +
        "</h3><p>" + esc(ponto(maiuscula(P.frase))) + "</p>" +
        "<dl><dt>Onde</dt><dd>" + esc(maiuscula(P.onde)) + "</dd><dt>Estações</dt><dd><div class='p-est'>" +
        P.etapas.map(function (id) { return "<button data-etapa='" + id + "'>" + (ETAPA[id].tipo === "gate" ? "◆ " : "") + esc(ETAPA[id].curto) + "</button>"; }).join("") +
        "</div></dd><dt>Passa quando</dt><dd>" + esc(maiuscula(P.passa)) + "</dd></dl>" +
        (P.etapas.indexOf("G") >= 0 ? criteriosHtml() : "") +
        P.etapas.filter(function (id) { return ETAPA[id].gate && ETAPA[id].tipo !== "gate"; }).map(function (id) { return "<div class='risco'>" + esc(ETAPA[id].curto) + ": " + esc(ponto(ETAPA[id].gate)) + "</div>"; }).join("") +
        "</div>";
    } else if (item && item.indexOf("m:") === 0 && CURVA[item.slice(2)]) {
      var m = CURVA[item.slice(2)];
      html += "<div class='bloco ficha'><div class='rotulo'>Na curva " + conf(m.confianca) + "</div><h3>" + esc(maiuscula(m.rotulo)) +
        "</h3><p>" + esc(ponto(maiuscula(m.texto))) + "</p><div class='fonte'>Fonte: " + esc(m.fonte || "registro do projeto Hernia3D") + "</div></div>";
    } else if (item && ETAPA[item]) {
      var e = ETAPA[item];
      // a duração que começa pelo número de sessões do protocolo leva a mesma ressalva da dobradiça
      var duracao = RESSALVA && e.duracao.indexOf(SESSOES) === 0 ? e.duracao.replace(SESSOES, SESSOES + " (" + RESSALVA + ")") : e.duracao;
      html += "<div class='bloco ficha'><div class='rotulo'>" + (e.tipo === "gate" ? "O filtro" : (e.tipo === "marco" ? "Na sequência" : "Etapa")) + " " + conf(e.confianca) +
        (e.p ? " " + seloP(e.p) : "") + "</div><h3>" + esc(e.nome) + "</h3><p>" + esc(ponto(maiuscula(e.oque))) + "</p><dl>" +
        "<dt>Duração</dt><dd>" + esc(duracao) + "</dd><dt>Quem entra</dt><dd>" + esc(e.elegivel) + "</dd><dt>Consome</dt><dd>" + esc(e.recurso) + "</dd></dl>" +
        (e.tipo === "gate" ? criteriosHtml() : "") +
        (e.gate ? "<div class='risco'>" + esc(ponto(maiuscula(e.gate))) + "</div>" : "") + "</div>";
    } else if (olharAtual === 1) {
      // no olhar 1, a fonte dos números fica numa linha: a evidência da curva diria o mesmo que o texto acima. O texto já
      // separa o que é do TAPP (o platô) do que junta as duas técnicas por vídeo (o risco); a fonte só nomeia o estudo
      var fonteHoje = D.evidencias.filter(function (e) { return e.id === "curva"; })[0];
      html += "<div class='bloco'><div class='rotulo'>Olhar 1 · hoje, no paciente</div><h3>" + esc(maiuscula(CURVA.plato.rotulo)) + "</h3><p>" +
        esc(ponto(maiuscula(CURVA.plato.texto))) + " " + esc(ponto(maiuscula(CURVA.risco.texto))) + "</p>" +
        "<p class='fonte'>Fonte: " + esc(fonteHoje ? fonteHoje.estudo : CURVA.plato.fonte) + ".</p></div>";
    } else {
      // os botões dos 3Ps só aparecem com a página empilhada: no desktop, os trechos da curva ao lado são esses botões
      html += "<div class='bloco'>" + achadosHtml("sistema", true) + "</div>" +
        "<div class='bloco so-empilhado'><div class='rotulo'>Os 3Ps, no olhar 2</div><div class='p-est'>" + D.ps.map(function (p) {
          return "<button data-passo='" + p.sigla + "'>" + SUP(p.sigla) + " " + esc(p.nome) + "</button>"; }).join("") + "</div></div>";
    }
    // com uma ficha aberta, a leitura fica só com ela (menos ruído, e o elo não sai da tela); as evidências voltam com o olhar 2
    // sem item: as que o build manda para a tela, menos a da curva de hoje, que fica no olhar 1, como fonte.
    // Antes delas, uma linha diz o que são as duas técnicas por vídeo que elas citam
    if (!item && olharAtual === 2) html += "<div class='bloco'><div class='rotulo'>O que está provado, e o que não</div>" +
      "<p class='evid-nota'>TAPP, a técnica do curso, entra no abdome; TEP, a outra técnica por vídeo, não entra.</p>" +
      evidenciasHtml(["curva"]) + "</div>";
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
    // o P¹ e o P² acontecem no modelo: o rótulo fica no meio dos dois degraus
    texto(g, (DEGRAU.P1.x + DEGRAU.P2.x + DEGRAU.P2.w) / 2, chao + 24, "NO MODELO", "lado-rot", "middle");
    texto(g, 547, chao + 24, "CRITÉRIO DE MAESTRIA", "lado-rot porta-rot", "middle");
    texto(g, 705, chao + 24, "NO PACIENTE", "lado-rot pac", "middle");
    texto(g, 40, 458, "Clique num degrau para ver o passo na curva da aba 02.", "dg-dica");
    // no celular, os degraus viram três cartões com o mesmo clique; o critério de maestria fica entre o P² e o P³
    var cartoes = document.createElement("div");
    cartoes.className = "ps-cartoes";
    cartoes.innerHTML = D.ps.map(function (p, k) {
      return "<button type='button' class='ps-cartao k" + k + "' data-p='" + p.sigla + "'><span class='ps-lado'>" +
        (p.etapas.indexOf("E4") >= 0 ? "no paciente" : "no modelo") + "</span><span class='ps-nome'><b>" + SUP(p.sigla) + "</b>" + esc(p.nome) +
        "</span><span class='ps-frase'>" + esc(ponto(maiuscula(p.frase))) + "</span></button>" +
        (p.etapas.indexOf("G") >= 0 ? "<p class='ps-criterio'><i aria-hidden='true'></i>critério de maestria</p>" : "");
    }).join("") + "<p class='ps-dica'>Toque num passo para vê-lo na curva da 02.</p>";
    svgP.parentNode.appendChild(cartoes);
    Array.prototype.forEach.call(cartoes.querySelectorAll("[data-p]"), function (b) {
      b.addEventListener("click", function () { abrePasso(b.dataset.p); });
    });
  })();
  function leituraAbertura() {
    var linhas = D.abertura.map(function (w) {
      var r = esc(ponto(maiuscula(w.resposta)));
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
  var W = 240, H = 58;
  var COL_X = { sustenta: 20, curso: 330, ganha: 640 };
  // as três colunas: o nome e o que faz quem está nela (no desenho e, no celular, nas listas)
  var COLUNAS = [["sustenta", "Quem sustenta", "paga, patrocina ou cede"], ["curso", "O curso", "recebe e entrega"],
                 ["ganha", "Quem ganha", "colheria o ganho, sem pagar o curso"]];
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
    COLUNAS.forEach(function (c) {
      texto(eco, COL_X[c[0]] + W / 2, 40, c[1].toUpperCase(), "col-rot", "middle");
      texto(eco, COL_X[c[0]] + W / 2, 58, c[2], "col-sub", "middle");
    });
    var camadaSetas = el("g", {}, eco), camadaAtores = el("g", {}, eco), camadaDiscos = el("g", {}, eco);
    // quem entra no centro entra numa altura própria da borda (molde do HDB), para as linhas não se acumularem num ponto
    var entram = D.fluxos.filter(function (f) { return f.para === "projeto" && POS[f.de] && POS[f.de].col === "sustenta"; });
    var hub = POS.projeto, entra = {};
    entram.forEach(function (f, i) { entra[f.id] = hub.y + 18 + i * (hub.h - 36) / Math.max(1, entram.length - 1); });
    var saem = D.fluxos.filter(function (f) { return POS[f.de] && POS[f.para] && POS[f.para].col === "ganha"; }), sai = {};
    saem.forEach(function (f, i) { var o = POS[f.de]; sai[f.id] = o.y + 14 + i * (o.h - 28) / Math.max(1, saem.length - 1); });
    var uso = {};
    // o disco numerado fica a 35%, 50% ou 65% do caminho, pela ordem das setas do mesmo par de atores (as do mesmo
    // par correm a 10 de distância); se ainda cair em cima de outro disco, procura outro ponto da mesma seta
    var PAR = {}, postos = [];
    D.fluxos.forEach(function (f) { if (POS[f.de] && POS[f.para]) { var k = [f.de, f.para].sort().join("|"); (PAR[k] = PAR[k] || []).push(f); } });
    function pontoDoDisco(f, p) {
      var irmas = PAR[[f.de, f.para].sort().join("|")], k = irmas.indexOf(f);
      var prim = irmas.length === 1 ? [0.5] : (irmas.length === 2 ? [[0.35, 0.65][k]] : [[0.35, 0.5, 0.65][k] || 0.5]);
      var L = p.getTotalLength(), melhor = null, folga = -1;
      prim.concat([0.5, 0.35, 0.65, 0.25, 0.75, 0.15, 0.85]).some(function (fr) {
        var pt = p.getPointAtLength(L * fr);
        var d = postos.reduce(function (m, q) { return Math.min(m, Math.hypot(q.x - pt.x, q.y - pt.y)); }, 1e9);
        if (d > folga) { folga = d; melhor = pt; }
        return d >= 26;
      });
      postos.push(melhor);
      return melhor;
    }
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
      var meio = p.getTotalLength ? pontoDoDisco(f, p) : { x: 450, y: 260 };
      var dg = el("g", { "class": "disco" }, camadaDiscos);
      // o número branco pede fundo escuro: no disco, o ouro é o de texto
      el("circle", { cx: meio.x, cy: meio.y, r: 11, fill: corLetra(ENQ[f.enquadramento].cor, "#FFFFFF"), stroke: "#fff", "stroke-width": 2 }, dg);
      var dt = texto(dg, meio.x, meio.y + 4.5, "", "");
      setas.push({ f: f, p: p, disco: dg, num: dt });
    });
    Object.keys(POS).forEach(function (id) {
      var a = ATOR[id], pz = POS[id];
      var g = el("g", { "class": "ator clicavel c-" + a.confianca + (id === "projeto" ? " projeto" : ""), tabindex: 0, role: "button", "aria-pressed": "false" }, camadaAtores);
      el("rect", { x: pz.x, y: pz.y, width: W, height: pz.h, rx: 6 }, g);
      texto(g, pz.x + 12, pz.y + pz.h / 2 - 3, a.nome, "nome");
      texto(g, pz.x + 12, pz.y + pz.h / 2 + 15, a.curto, "papel");
      clicavel(g, function () { selecionaEco(selecao.ecossistema === "a:" + id ? null : "a:" + id); estadoNaUrl(); });
      pz.g = g;
    });
    // a legenda, em duas linhas: as cores das linhas que se veem antes do clique, depois o traço (as de dentro do curso,
    // que só aparecem no clique, levam o nome de quem paga na leitura)
    texto(eco, COL_X.sustenta, 500, "Linhas: dourado = taxa do curso · azul-petróleo = patrocínio · marrom = cessão · vermelho pontilhado = ganho esperado.", "eco-legenda");
    texto(eco, COL_X.sustenta, 517, "Cheia = pagamento · tracejada = a confirmar. Clique num ator para ver as relações dele.", "eco-legenda");
    /* no celular, o desenho largo vira três listas, de cima para baixo, na ordem das colunas; o toque num ator
       faz o mesmo que o clique na caixa e leva à leitura, logo abaixo */
    var listas = document.createElement("div");
    listas.className = "eco-listas";
    listas.innerHTML = COLUNAS.map(function (c, i) {
      var ids = Object.keys(POS).filter(function (id) { return POS[id].col === c[0]; }).sort(function (x, y) { return POS[x].y - POS[y].y; });
      return (i ? "<p class='eco-seta' aria-hidden='true'>↓</p>" : "") + "<section class='eco-col'><h3 class='eco-col-rot'>" + esc(c[1]) + "</h3><p class='eco-col-sub'>" +
        esc(c[2]) + "</p><ul>" + ids.map(function (id) {
          var a = ATOR[id];
          return "<li><button type='button' class='eco-ator c-" + a.confianca + (id === "projeto" ? " projeto" : "") + "' data-ator='" + id +
            "' aria-pressed='false'><b>" + esc(a.nome) + "</b><span>" + esc(a.curto) + "</span></button></li>";
        }).join("") + "</ul></section>";
    }).join("");
    eco.parentNode.appendChild(listas);
    Array.prototype.forEach.call(listas.querySelectorAll("[data-ator]"), function (b) {
      b.addEventListener("click", function () {
        var id = "a:" + b.dataset.ator;
        selecionaEco(selecao.ecossistema === id ? null : id);
        estadoNaUrl();
        rolaAte(leituraEco);
      });
    });
  })();
  // o nome do ator na leitura: em minúscula, com os nomes próprios e as siglas no lugar
  function nomeAtor(id, inicial) {
    var n = ATOR[id].nome.toLowerCase().replace(/hernia3d/g, "Hernia3D").replace(/\bsus\b/g, "SUS").replace(/\beinstein\b/g, "Einstein");
    return inicial ? maiuscula(n) : n;
  }
  // as relações de um ator, na ordem da leitura: o número do disco é o número da lista
  function relacoesDe(ator) { return D.fluxos.filter(function (f) { return f.de === ator || f.para === ator; }); }
  function selecionaEco(item) {
    selecao.ecossistema = item;
    var ator = item && item.indexOf("a:") === 0 ? item.slice(2) : null;
    var fluxo = item && item.indexOf("f:") === 0 ? item.slice(2) : null;
    var lista = ator ? relacoesDe(ator) : (fluxo ? D.fluxos.filter(function (f) { return f.id === fluxo; }) : []);
    function par(id) { return !!item && id !== ator && lista.some(function (f) { return f.de === id || f.para === id; }); }
    Object.keys(POS).forEach(function (id) {
      POS[id].g.classList.toggle("on", id === ator);
      POS[id].g.classList.toggle("par", par(id));
      POS[id].g.setAttribute("aria-pressed", id === ator ? "true" : "false");
    });
    // as listas do celular acompanham as caixas do desenho
    Array.prototype.forEach.call(document.querySelectorAll(".eco-ator"), function (b) {
      b.classList.toggle("on", b.dataset.ator === ator);
      b.classList.toggle("par", par(b.dataset.ator));
      b.setAttribute("aria-pressed", b.dataset.ator === ator ? "true" : "false");
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
        (ator ? "<p>" + esc(ponto(maiuscula(ATOR[ator].papel))) + "</p>" : "") + "</div>";
      // no celular não há desenho: a lista diz só "As relações"
      html += "<div class='bloco'><div class='rotulo'>" + (ator ? "<span>As relações<span class='so-desenho'>, numeradas como no desenho, quando estão nele</span></span>" : "O que passa") +
        "</div><ol class='rel'>" +
        (lista.length ? lista.map(function (f, i) {
          var outro = ator ? (f.de === ator ? f.para : f.de) : null;
          var sentido = ator ? (f.de === ator ? "sai" : "chega") : "";
          return "<li><span class='n' style='background:" + corLetra(ENQ[f.enquadramento].cor, "#FFFFFF") + "'>" + (i + 1) + "</span><span>" +
            (sentido ? "<span class='sentido'>" + sentido + "</span>" : "") +
            (outro ? "<b>" + esc(nomeAtor(outro)) + "</b>: " : "") + esc(ponto(f.oque)) + tagEnq(f.enquadramento, "", true) + "</span></li>";
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
     dimensão (quem paga, uma vez por cartão e em tinta neutra; físico ou digital no quadrado; em aberto
     tracejado). Os itens do curso se agrupam pelos 3Ps (componentes.csv, coluna p); as ofertas de um mesmo grupo
     (servicos.csv, coluna grupo) dividem um cartão, como as três portas do kit. As ofertas que só tocam o P¹, curtas,
     dividem uma coluna, uma em cima da outra, entre o curso e o kit. O que não se vende, o estudo, fica fora dos
     cartões, numa linha do rodapé. Sem painel ao lado, sem eixo de estações e sem dica no mouse. O título de cada
     cartão é um botão (o teclado chega nele); o clique no resto do cartão faz o mesmo. */
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
    function psDe(c) {
      var ps = [];
      c.servs.forEach(function (s) { s.p.forEach(function (p) { if (ps.indexOf(p) < 0) ps.push(p); }); });
      return ps;
    }
    function soP1(c) { var ps = psDe(c); return ps.length === 1 && ps[0] === "P1"; }
    function titulo(t) { return "<h3><button type='button' class='pf-tit' aria-pressed='false'>" + esc(t) + "</button></h3>"; }
    function cartaoHtml(c) {
      var s0 = c.servs[0], ids = c.servs.map(function (s) { return s.id; }).join(" ");
      var ps = psDe(c);
      var abertos = c.servs.every(function (s) { return s.confianca === "aberto"; });
      var h = "<article class='pf-cartao clicavel c-" + (abertos ? "aberto" : "ok") + "' data-servs='" + ids + "'>";
      if (c.grupo) {
        h += titulo(GRUPO[c.grupo] ? GRUPO[c.grupo][0] : s0.nome) + "<p class='pf-meta'>" + ps.map(seloP).join("") + pagaHtml(s0) + "</p>" +
          "<p class='pf-desc'>" + esc(ponto(maiuscula(GRUPO[c.grupo] ? GRUPO[c.grupo][1] : s0.descricao))) + "</p>" +
          c.servs.map(function (s, k) {
            return "<p class='pf-porta'><span class='n'>" + (k + 1) + "</span>" + esc(s.curto) + conf(s.confianca) + "</p>" + itensHtml(s.itens);
          }).join("");
      } else {
        h += titulo(s0.nome) + "<p class='pf-meta'>" + ps.map(seloP).join("") + pagaHtml(s0) + conf(s0.confianca) + "</p>" +
          "<p class='pf-desc'>" + esc(ponto(maiuscula(s0.descricao))) + "</p>";
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
    }
    // as colunas da grade: um cartão por coluna, menos as ofertas só do P¹ em sequência, que dividem uma
    var colunas = [];
    cartoes.forEach(function (c) {
      var ultima = colunas[colunas.length - 1];
      if (ultima && soP1(c) && ultima.every(soP1)) ultima.push(c); else colunas.push([c]);
    });
    var html = "<div class='pf-grade'>" + colunas.map(function (col) {
      return col.length > 1 ? "<div class='pf-pilha'>" + col.map(cartaoHtml).join("") + "</div>" : cartaoHtml(col[0]);
    }).join("") + "</div>";
    var foraDos = D.servicos.filter(function (s) { return !vendido(s); });
    // o estudo ainda não rodou: a linha diz o que ele testa, não o que ele concluiu
    html += "<p class='pf-rodape'><span>◼ físico: o modelo, o kit e o encontro · ◻ digital, na plataforma · <i>itálico</i>: provável · tracejado ou em vermelho: em aberto</span>" +
      foraDos.map(function (s) { return "<span>Antes do curso, o " + esc(s.nome.charAt(0).toLowerCase() + s.nome.slice(1)) + ", pago pela " + esc(ENQ[s.enquadramento].rotulo.toLowerCase()) + ", " + esc(ponto(s.descricao)) + "</span>"; }).join("") +
      elo("servicos") + "</p>";
    escreve(portfolio, html);
    // só o clique: o Enter e o Espaço no botão do título já viram clique, que sobe até o cartão
    Array.prototype.forEach.call(portfolio.querySelectorAll(".pf-cartao"), function (c) {
      c.addEventListener("click", function () { var id = c.dataset.servs.split(" ")[0]; selecionaServico(selecao.servicos === id ? null : id); estadoNaUrl(); });
    });
  })();
  // o clique só realça o cartão; o ?item= guarda qual
  function selecionaServico(id) {
    selecao.servicos = id;
    Array.prototype.forEach.call(portfolio.querySelectorAll(".pf-cartao"), function (c) {
      var on = !!id && c.dataset.servs.split(" ").indexOf(id) >= 0;
      c.classList.toggle("on", on);
      c.querySelector(".pf-tit").setAttribute("aria-pressed", on ? "true" : "false");
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
    // o cabeçalho diz a etapa pelo nome e por quando ela acontece, sem o código
    h += "<div class='bp-lin'></div>" + cols.map(function (c) {
      var e = ETAPA[c];
      if (c === "G") return "<div class='bp-cab g'><b>" + esc(e.curto) + "</b><small>filtro · " + D.criterios.length + " critérios</small></div>";
      return "<div class='bp-cab" + zona(c) + "'><b>" + esc(e.curto) + "</b><small>" + esc(J[c].quando) + "</small></div>";
    }).join("");
    var vive = function (j) { return "<div class='bp-palco" + (j.fonte === "inferencia" ? " inf" : "") + "'>" + esc(maiuscula(j.vive)) + "</div>"; };
    vive.gate = "passa, ou volta à prática";
    h += linha("O residente vive", vive);
    h += "<div class='bp-vis'><span>LINHA DE VISIBILIDADE</span></div>";
    var atua = function (j) { return "<div>" + esc(maiuscula(j.atua)) + "</div>"; }; atua.gate = "preceptor confere";
    h += linha("Quem atua", atua);
    var bast = function (j) { return "<div>" + esc(maiuscula(j.bastidor)) + "</div>"; }; bast.gate = "registro dos " + D.criterios.length + " critérios";
    h += linha("Bastidor", bast);
    var rec = function (j) { return "<div>" + esc(maiuscula(j.recurso)) + "</div>"; }; rec.gate = "";
    h += linha("Recurso", rec);
    var dec = function (j) { return "<div>" + esc(maiuscula(j.decide)) + "</div>"; }; dec.gate = "o preceptor, pelos registros das duas sessões";
    h += linha("Quem decide", dec);
    var paga = function (j) { return "<div class='chips'>" + j.paga.map(function (k) { return tagEnq(k, "", true); }).join("") + "</div>"; }; paga.gate = "";
    h += linha("Quem paga", paga);
    var ganha = function (j) { return "<div>" + j.ganha.map(function (a) { return esc(nomeAtor(a, true)); }).join(", ") + "</div>"; }; ganha.gate = "";
    h += linha("Quem ganha", ganha);
    var risco = function (j, e) { return "<div class='bp-risco" + (e.gate ? "" : " vazio") + "'>" + (e.gate ? esc(maiuscula(e.gate)) : "—") + "</div>"; };
    risco.gate = esc(maiuscula(ETAPA.G.gate));
    h += linha("O que falta ou arrisca", risco);
    h += "</div>";
    /* o blueprint ocupa a tela inteira, como no HDB (02/11/2026), sem caixa de leitura ao lado. Os achados das Jornadas
       aparecem na Direção, a validação do modelo na 02. Fica a legenda de leitura, com o elo */
    h += "<p class='bp-pe'><span>Acima da linha, o que o residente vive; abaixo, o que roda por trás. Em itálico: leitura nossa. " +
      "Nada aqui foi observado ainda: o piloto não rodou.</span>" + elo("jornadas") + "</p>";
    escreve(document.getElementById("blueprint"), h);
  })();

  /* ================= 05 · DIREÇÃO: o que falta definir para o curso virar negócio (02/11/2026) =================
     No molde da Direção do HDB e da Longevidade. À esquerda, curta: a conclusão, as três definições (a camada fecho de
     achados.csv; a que trava primeiro vem de sintese.csv), uma linha sobre o que trava primeiro, sem números, e o BMC nas
     posições de Osterwalder (os seis blocos do encadeamento, do cliente à receita, levam número: passo n de 6). À direita,
     um cartão por bloco, todos na mesma célula da grade, para a escala não mudar entre blocos: o que pedimos à instituição ·
     o que já temos · o que ainda não está definido · o que já sabemos (achados, com título, texto e "ver em") · quem
     resolve, e até quando (pendências públicas, com o portão, quem resolve e o prazo). Listas inteiras, nada atrás do
     mouse e sem valores. Os blocos entram na página na ordem da cadeia (1 a 6, depois os outros): empilhada, a grade
     lê o caminho em ordem, e o Tab também; no desktop, cada bloco vai para a sua posição no quadro.
     Dados: proposta · pendencias · nao_ouvidos · compradores · sintese · achados. */
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
    function rot(t, qt) { return "<p class='pc-rot'>" + t + (qt !== undefined ? "<span>" + qt + "</span>" : "") + "</p>"; }
    var vazio = "<li class='pc-vazio'>nada registrado ainda</li>";
    function blocoBmc(c) {
      var n = CADEIA.indexOf(c.id) + 1;
      return "<button type='button' class='bmc-b' data-pv='" + c.id + "' aria-pressed='false' style='grid-area:" + GRADE[c.id] + ";--pv:" + c.cor + "'>" +
        "<span class='bmc-tit'>" + (n ? "<i>" + n + "</i>" : "") + esc(c.bloco).replace("Relacionamento", "Relaciona&shy;mento") + "</span></button>";
    }
    function card(c) {
      var n = CADEIA.indexOf(c.id) + 1;
      // o que já sabemos: cada achado com título e texto curto; "ver em" abre a aba do assunto na leitura dos achados
      // (data-item vazio: sem item escolhido, e na 02 o olhar 2 em foco)
      var sabe = D.achados.filter(function (a) { return a.camada !== "fecho" && a.componente.indexOf(c.id) >= 0; });
      var defs = DEF.filter(function (a) { return a.componente.indexOf(c.id) >= 0; });
      // a lista se chama "quem resolve, e até quando": cada linha diz o portão, quem resolve e o prazo, sem repetir os rótulos
      var falta = D.pendencias.filter(function (p) { return p.componente === c.id; }).map(function (p) {
        return "<li><b>" + esc(p.curto) + "</b><small>" + PORTAO[p.portao] + " · " + esc(p.dono) + " · " +
          (p.prazo === "a definir" ? "<em>prazo a definir</em>" : esc(p.prazo)) + "</small></li>";
      });
      // os compradores possíveis como pontos; enquanto nenhum estiver confirmado, todos vazados. Logo abaixo, numa linha,
      // quem ainda não ouvimos (o porquê e o como ouvir ficam fora da peça, em nao_ouvidos.csv)
      var foco = (D.compradores || []).some(function (p) { return p.foco === "sim"; });
      var pontos = c.id === "segmentos" && (D.compradores || []).length ?
        "<div class='pc-pontos" + (foco ? "" : " aberto") + "'>" + rot("Quem pode comprar · " + (foco ? "o circulado é o primeiro" : "nenhum confirmado ainda")) +
        "<ol>" + D.compradores.map(function (p) {
          return "<li" + (p.foco === "sim" ? " class='foco'" : "") + "><i></i><b>" + esc(p.nome) + "</b></li>";
        }).join("") + "</ol>" +
        ((D.nao_ouvidos || []).length ? "<p class='pc-ouvir'><b>Ainda não ouvimos:</b> " +
          D.nao_ouvidos.map(function (x) { return esc(x.grupo.charAt(0).toLowerCase() + x.grupo.slice(1)); }).join(" · ") + ".</p>" : "") +
        "</div>" : "";
      return "<header class='pc-cab'><p class='pc-eyebrow'>" + (n ? "passo " + n + " de " + CADEIA.length + ", do cliente à receita · " : "") +
        esc(c.componente) + " " + conf(c.confianca) +
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
          return "<li><b>" + esc(a.titulo) + "</b><span class='pc-sabe'>" + esc(ponto(maiuscula(a.texto))) + "</span>" +
            "<button type='button' class='l-elo pc-ver' data-vista='" + a.camada + "' data-item=''>ver em " + esc(CAM[a.camada]) + " →</button></li>";
        }).join("") || vazio) + "</ul></section>" +
        "<section>" + rot("Quem resolve, e até quando", falta.length) + "<ul class='pc-ul'>" + (falta.join("") || vazio) + "</ul></section></div>";
    }
    var PROP = {}; D.proposta.forEach(function (c) { PROP[c.id] = c; });
    var NA_ORDEM = CADEIA.filter(function (id) { return PROP[id]; }).concat(D.proposta.map(function (c) { return c.id; }).filter(function (id) { return CADEIA.indexOf(id) < 0; }));
    // o elo da aba: no desktop, no fim da coluna da esquerda; empilhada, depois do cartão (na ordem do Tab, nos dois arranjos)
    escreve(direcao,
      "<div class='bmc-dir'><div class='bmc-col'>" +
      "<div class='dc-conc'><div class='rotulo'>O que a síntese conclui</div><p class='dc-frase'>" + esc(ponto(S.direcao)) + "</p>" +
      "<ol class='dc-tres'>" + DEF.map(function (a, i) {
        var minimo = S.fator_minimo === a.titulo;
        return "<li" + (minimo ? " class='minimo'" : "") + "><button type='button' class='dc-resp' data-pv='" + a.componente[0] + "' aria-pressed='false'><i>" + (i + 1) + "</i><span>" +
          esc(a.titulo) + (minimo ? " <em class='dc-min'>trava primeiro</em>" : "") + "</span></button></li>";
      }).join("") + "</ol>" +
      (S.limite ? "<p class='dc-limite'><b>O que trava primeiro</b>" + esc(ponto(maiuscula(S.limite))) + "</p>" : "") + "</div>" +
      "<div class='rotulo'><span>O modelo de negócio · <span class='so-clique'>clique</span><span class='so-toque'>toque</span> num bloco</span></div>" +
      "<div class='bmc'>" + NA_ORDEM.map(function (id) { return blocoBmc(PROP[id]); }).join("") + "</div>" +
      elo("direcao", "so-desktop") + "</div>" +
      "<div class='pv-cards'>" + D.proposta.map(function (c) {
        return "<div class='pv-card' data-pv='" + c.id + "' style='--pv:" + c.cor + "'>" + card(c) + "</div>";
      }).join("") + "</div>" + elo("direcao", "so-empilhado") + "</div>");
    mostraBloco = function (id) {
      if (!D.proposta.some(function (c) { return c.id === id; })) id = "proposta";
      selecao.direcao = id === "proposta" ? null : id;
      Array.prototype.forEach.call(direcao.querySelectorAll(".bmc-b, .pv-card, .dc-resp"), function (x) {
        x.classList.toggle("on", x.dataset.pv === id);
        if (!x.classList.contains("pv-card")) x.setAttribute("aria-pressed", x.dataset.pv === id ? "true" : "false");
      });
    };
    // empilhada, o cartão fica logo abaixo da grade: o toque num bloco rola até ele
    Array.prototype.forEach.call(direcao.querySelectorAll(".bmc-b, .dc-resp"), function (b) {
      b.addEventListener("click", function () { mostraBloco(b.dataset.pv); estadoNaUrl(); rolaAte(direcao.querySelector(".pv-card.on")); });
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
  // daqui em diante, cada ficha que abre tem o título anunciado ao leitor de tela
  pronto = true;
})();
