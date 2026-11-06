/* Sistemática Hernia3D — "a curva sai do centro cirúrgico" (20/10/2026).
   Abre com os 3Ps (02/11/2026): P¹ Preparar · P² Praticar · P³ Proceder, e os 3Ps são a progressão.
   Desde 05/11/2026 a barra é o mapa do site, pela ordem de escoramento do método de amarração (Prancha 02): a âncora
   é a segurança, e cada área do modelo de negócio se escora na anterior. Oito abas, cada uma com UMA pergunta, e cada
   uma aponta para a seguinte:
     panorama, sem número
       abertura    — os 3Ps e o 5W2H, sem gráfico
       ecossistema — quem sustenta o curso, e quem ganha com ele (o ganho não volta)
       sistema     — o método: como se chega ao paciente com segurança, hoje e com o Hernia3D. Aqui a âncora é nomeada
     as quatro áreas, com o número da ordem (cadeia.csv)
       1 como      — o portfólio (a antiga Serviços): o que entra em cada oferta, e quem paga cada parte
       2 o que     — a porta da plataforma do residente (outra peça do site)
       3 quem      — a jornada: o que o residente vive, e o que roda por trás
       4 quanto    — a porta do caso econômico (outra peça do site; os valores ficam lá)
     síntese       — o BMC macro em quatro áreas, com as travas de cada uma (gargalo.csv); os nove blocos, um clique abaixo
   Os identificadores internos das abas não mudaram (servicos, jornadas, direcao): os endereços antigos continuam valendo.
   As abas, as perguntas, as manchetes e os elos vêm de camadas.csv.
   Dados: js/data.js, GERADO de 08_sintese/dados/*.csv (não editar à mão).
   Valores em reais, só na janela do caso econômico (aba 4ª): os textos e os dados desta peça continuam sem nenhum.
   Encaixe sem rolagem herdado da Sistemática Longevidade (encaixa/dimensiona), com piso de leitura: o zoom não deixa
   o menor texto abaixo de 10px, e o painel que não cabe rola. Abaixo de 1180px a página empilha; até 767px, a versão
   do celular troca os desenhos largos da Abertura e do Ecossistema por cartões e listas, e redesenha o Sistema. */

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
  // o número de uma área vai à tela como ordinal: 1ª, 2ª, 3ª, 4ª (a primária, a secundária…). As travas levam 1.1, 1.2
  function ord(n) { return n ? n + "ª" : ""; }
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
    // a Síntese aceita descer mais (data-piso 0,55, como nas irmãs); se nem o piso couber, desce até 0,5 antes de rolar
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

  /* ---------- as nove abas (camadas.csv): o panorama, a âncora, as quatro áreas numeradas e a síntese ---------- */
  var VISTAS = D.camadas.map(function (c) {
    return { id: c.id, n: c.n, rot: c.rotulo, cam: c.cam, perg: c.pergunta, manchete: c.manchete, elo: c.elo };
  });
  // o fio: cada aba aponta para a seguinte; a última volta ao começo
  var PROXIMA = {};
  VISTAS.forEach(function (v, i) { var volta = i === VISTAS.length - 1; PROXIMA[v.id] = [VISTAS[volta ? 0 : i + 1].id, v.elo, volta]; });
  var botoes = {}, vistaAtual = null;
  var nav = document.getElementById("camadas");
  // só as áreas levam número, o da ordem de escoramento; a âncora leva o losango (o mesmo da porta da maestria, no
  // Sistema): na barra lê-se a cadeia inteira, a âncora, 1, 2, 3, 4 e a síntese. Uma quebra separa o panorama e a
  // âncora do resto: só vale quando a barra não cabe numa linha (no celular, sempre)
  VISTAS.forEach(function (v, i) {
    if (v.n && !(VISTAS[i - 1] || {}).n) {
      var quebra = document.createElement("span");
      quebra.className = "nav-quebra"; quebra.setAttribute("aria-hidden", "true");
      nav.appendChild(quebra);
    }
    var b = document.createElement("button");
    b.type = "button"; b.className = "f-camada" + (v.n ? " area" : ""); b.setAttribute("role", "tab");
    b.id = "aba-" + v.id; b.setAttribute("aria-controls", "v-" + v.id);
    b.innerHTML = (v.n ? "<i>" + ord(v.n) + "</i>" : v.id === "ancora" ? "<i class='nav-los' aria-hidden='true'></i>" : "") + esc(v.cam.toUpperCase()); b.title = v.rot;
    // o nome lido em voz alta separa o número do nome da aba ("1 · Como", e não "1Como")
    b.setAttribute("aria-label", (v.n ? ord(v.n) + " · " : "") + maiuscula(v.cam));
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
  // as abas quebram em duas linhas quando não cabem numa (o panorama em cima): a barra não esconde nenhuma
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
    document.getElementById("pergunta").innerHTML = "<b>" + (v.n ? ord(v.n) + " · " : "") + esc(v.rot) + "</b> · " + esc(v.perg);
    if (item !== undefined) seleciona(v.id, item);
    // o botão que abre a outra peça, ao lado do subtítulo: só aparece na aba que a mostra por dentro
    Array.prototype.forEach.call(document.querySelectorAll(".topo .pd-abre"), function (a) { a.hidden = a.id !== "porta-" + v.id; });
    // a manchete da Síntese diz a restrição de hoje (sintese.csv)
    document.getElementById("manchete").textContent = v.id === "direcao" ? mancheteSintese(v) : (v.manchete || "");
    estadoNaUrl();
    reencaixa();
    // empilhada, a página rola: quem troca de aba volta ao topo
    if (window.innerWidth <= EMPILHA && window.pageYOffset) window.scrollTo(0, 0);
  }
  var selecao = { abertura: null, ecossistema: null, sistema: null, ancora: null, servicos: null, plataforma: null, jornadas: null, economico: null, direcao: null };
  function seleciona(vista, item) {
    if (vista === "ecossistema") selecionaEco(item);
    else if (vista === "sistema") escolheTempo(olharDoItem(item), item);
    else if (vista === "servicos") selecionaServico(item);
    // um item da Síntese é uma área do BMC macro ou um dos nove blocos
    else if (vista === "direcao") mostraNaSintese(item);
    // nas abas que mostram outra peça por dentro, o item é um passo: uma estação da plataforma, uma tela da conta
    else if (PECA[vista]) PECA[vista](item);
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
      // (no Sistema, o olhar 2 em foco, onde a leitura mostra os achados)
      b.addEventListener("click", function () { if (b.dataset.vista) abre(b.dataset.vista, "item" in b.dataset ? b.dataset.item || null : undefined); });
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

  /* ================= SISTEMA: o método, em dois olhares lado a lado =================
     No molde das Sistemáticas irmãs (HDB, Teranóstica): a comparação aparece uma vez só, aqui, em dois olhares na
     mesma moldura. Desde 05/11/2026 a aba segue a lógica do método, e não a ótica do residente, que fica na 04; o que
     diferencia o Hernia3D é a segurança, como no HDB é o tempo, e a segurança é a âncora do projeto (a Síntese se
     amarra nela). O desenho é a solução em operação, e não a curva de aprendizado de uma pessoa: (1) Hoje, ver um,
     fazer um: nenhuma operação antes do paciente, a entrada sem critério, e o erro acontece no paciente. (2) Com o
     Hernia3D, os 3Ps: uma banda por P, com o verbo do método, o losango do critério na porta, e o erro acontece no
     modelo; no paciente, tracejado, o que falta provar no TAPP. A camada abre com os dois lado a lado; um clique põe
     o olhar em foco, com a leitura ao lado. */
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
    [1, "Hoje · ver um, fazer um", "o método é operar: o paciente é o campo de treino, e <b>não há critério de entrada</b>. Nessa fase, a cirurgia por vídeo tem " +
      esc(CURVA.risco.rotulo)],
    [2, "Com o Hernia3D · os 3Ps", "preparar, praticar no modelo <b>até o critério de maestria</b>, e só então proceder: o erro acontece no modelo. " +
      "No paciente, tracejado: ainda não demonstrado no TAPP"]
  ];
  temposEl.innerHTML = TEMPOS.map(function (t) {
    return "<button type='button' data-tempo='" + t[0] + "' role='tab' aria-selected='false'><b>" + t[0] + "</b><span class='tp-t'>" + t[1] + "</span><small>" + t[2] + "</small></button>";
  }).join("");
  // o cartão só põe o olhar em foco; as fichas das marcas abrem pelos botões da dobradiça
  Array.prototype.forEach.call(temposEl.querySelectorAll("button"), function (b) {
    b.addEventListener("click", function () { escolheTempo(+b.dataset.tempo); });
  });
  /* a dobradiça entre os dois olhares é a segurança (05/11/2026), como o relógio do HDB é o tempo: o gancho da
     diferenciação. O símbolo é o losango da porta da maestria; de um lado, o erro cai no paciente; do outro, no modelo,
     com dois dos critérios de maestria (nenhum erro crítico, em sessões seguidas), lidos de criterios_maestria.csv.
     "O que falta provar" abre a ficha da transferência para o paciente (o tracejado do olhar 2). A segurança é a
     âncora do projeto (sintese.csv): a Prancha 02 manda parar no Sistema e nomear a âncora, e é o que a nota faz; o
     elo leva à aba seguinte, a da âncora, que diz por que as áreas vêm naquela ordem. As setas apontam para os
     desenhos dos lados e somem quando a página empilha. O ritmo do residente (o número de sessões) fica na jornada */
  var critDe = function (re) { return D.criterios.filter(function (c) { return re.test(c.criterio); })[0]; };
  var cErro = critDe(/erro/i), cSeguidas = critDe(/consist/i);
  var PORTA = cErro && cSeguidas ? "erros críticos: " + cErro.valor + " · " + cSeguidas.valor : "os " + D.criterios.length + " critérios de maestria";
  document.getElementById("dobradica").innerHTML = "<p class='db-rot'>A segurança</p>" +
    "<svg class='db-losango' viewBox='0 0 48 48' role='img' aria-label='o critério de maestria, a porta entre o modelo e o paciente'><path d='M24 5 L43 24 L24 43 L5 24 Z'/></svg>" +
    "<p class='db-lado db-hoje'><b><span class='db-seta'>← </span>no paciente</b>cai o erro, hoje</p>" +
    "<p class='db-lado db-com'><b>no modelo<span class='db-seta'> →</span></b>cai o erro, com o Hernia3D<i>" + esc(PORTA) + ", antes do primeiro paciente</i></p>" +
    "<p class='db-nota'>é a âncora do projeto: o critério de maestria é a porta</p>" +
    (CURVA.transferencia ? "<button type='button' class='db-prova' data-item='m:transferencia'>o que falta provar →</button>" : "") +
    // no comparativo a leitura fica oculta: o elo para a aba seguinte mora aqui, para o fio não quebrar
    elo("sistema");
  ligaElos(document.getElementById("dobradica"));
  Array.prototype.forEach.call(document.querySelectorAll("#dobradica [data-item]"), function (b) {
    b.addEventListener("click", function () { escolheTempo(olharDoItem(b.dataset.item), b.dataset.item); });
  });
  /* os dois olhares como o método em operação (05/11/2026): a mesma moldura (as duas zonas e a linha da porta), as
     operações como bandas, na ordem em que acontecem, e embaixo a régua da segurança, onde o erro acontece.
     Olhar 1, hoje: nenhuma operação antes do paciente, a entrada sem critério, uma banda só (operar: aprende-se
     operando) e os erros na zona do paciente, até o platô de 37,5 casos (a única posição com escala, de curva.csv).
     Olhar 2, com o Hernia3D: uma banda por P, com o verbo do método (ps.csv: nivela, repete e mede, acompanha), o
     losango do critério na porta e os erros na zona do modelo; no paciente, tracejado, o que falta provar. Cada banda
     é clicável e abre a sua ficha na leitura; com o olhar em foco, a banda diz também o que o método mede e o que
     entrega. Forma ilustrativa: as marcas de erro são desenho, e a nota de pé fica em texto da página.
     No celular, o desenho tem um terço da largura: as bandas ficam só com a sigla, os nomes das zonas descem para
     baixo, e o desenho é refeito quando a tela cruza os 767px (o mesmo corte do CSS). */
  var C = { x0: 60, xd: 440, x1: 880 };
  var CEL = window.matchMedia ? window.matchMedia("(max-width:767px)") : { matches: false };
  function celular() { return !!CEL.matches; }
  var notaCurva = document.getElementById("nota-curva");
  function notaDaCurva() {
    var toque = celular() ? "Toque" : "Clique";
    // o espaço não separável em "num P." evita a letra sozinha no fim da linha
    notaCurva.textContent = olharAtual === 1 ? "Forma ilustrativa: só o platô e o risco da fase de aprendizado vêm das fontes. " + toque + " na banda ou no\u00a0platô." :
      "Forma ilustrativa. Tracejado: a segurança no paciente é a hipótese do curso, ainda não demonstrada no TAPP. " + toque + " num\u00a0P.";
  }
  function xc(c) { return C.xd + c * (C.x1 - C.xd) / 45; }
  var TRECHOS = {};
  // as marcas de curva.csv que são itens do olhar 1; as outras só abrem a ficha, no olhar 2
  var MARCA_NO_HOJE = { risco: true, plato: true };
  // P1 → P¹: a sigla com o número em sobrescrito
  function SUP(sigla) { return sigla.replace(/\d/, function (d) { return "⁰¹²³"[+d]; }); }
  var P_COR = {}, PASSO = {}; D.ps.forEach(function (p, k) { P_COR[p.sigla] = "k" + k; PASSO[p.sigla] = p; });
  function seloP(sigla) { return "<span class='selo-p " + P_COR[sigla] + "'>" + SUP(sigla) + "</span>"; }
  // um item da 02 pertence a um dos olhares: o risco, o platô e o centro cirúrgico ao 1, o resto ao 2
  function olharDoItem(item) {
    if (item && item.indexOf("m:") === 0) return MARCA_NO_HOJE[item.slice(2)] ? 1 : 2;
    return item === "E4" ? 1 : 2;
  }
  // as medidas verticais: a base das zonas, a fileira das bandas (bt a bb) e a régua (o título, o trilho rt a rb, a
  // legenda). No celular as letras crescem, e sobra altura embaixo para os nomes das zonas
  function medidas() {
    return celular() ? { cel: true, base: 430, bt: 58, bb: 236, rot: 286, rt: 302, rb: 394 } :
      { cel: false, base: 452, bt: 78, bb: 262, rot: 304, rt: 318, rb: 388, leg: 420 };
  }
  function moldura(g, linha) {
    var M = medidas();
    el("rect", { x: C.x0, y: 40, width: C.xd - C.x0, height: M.base - 40, "class": "zona-modelo" }, g);
    el("rect", { x: C.xd, y: 40, width: C.x1 - C.xd, height: M.base - 40, "class": "zona-paciente" }, g);
    // as zonas: no alto de cada uma; no celular, embaixo e centradas
    [["NO MODELO", C.x0, C.xd, "zr zr-modelo"], ["NO PACIENTE", C.xd, C.x1, "zr zr-paciente"]].forEach(function (z) {
      if (M.cel) texto(g, (z[1] + z[2]) / 2, M.base + 40, z[0], z[3], "middle"); else texto(g, z[1] + 12, 62, z[0], z[3]);
    });
    // a régua da segurança: um trilho que atravessa as duas zonas
    texto(g, C.x0 + 12, M.rot, "ONDE O ERRO ACONTECE", "regua-rot");
    el("rect", { x: C.x0 + 8, y: M.rt, width: C.x1 - C.x0 - 16, height: M.rb - M.rt, rx: (M.rb - M.rt) / 2, "class": "regua-trilho" }, g);
    el("line", { x1: C.xd, y1: M.cel ? 46 : 30, x2: C.xd, y2: M.base + 6, "class": "criterio-l" }, g);
    texto(g, C.xd, M.cel ? 34 : 22, linha, "criterio-rot", "middle");
    return M;
  }
  // as marcas de erro na régua (desenho, não dado): pontos a partir de x0, cada vez menores, mais claros e mais
  // raros. No celular são maiores, e cabem menos
  function marcasErro(g, x0, M, cls) {
    var y = (M.rt + M.rb) / 2;
    var ds = M.cel ? [24, 72, 122, 176, 234, 296] : [18, 52, 86, 122, 162, 206, 256, 312];
    var r0 = M.cel ? 21 : 13.5, r1 = M.cel ? 9 : 4.5;
    ds.forEach(function (d, i) {
      var f = i / (ds.length - 1);
      el("circle", { cx: x0 + d, cy: y, r: (r0 + (r1 - r0) * f).toFixed(1), "fill-opacity": (1 - 0.6 * f).toFixed(2), "class": "erro-p " + cls }, g);
    });
  }
  // um item clicável do desenho: o grupo com o papel de botão; com o olhar em foco, entra na lista dos selecionáveis
  function itemG(g, item, cls, rotulo, acao, foco) {
    var sg = el("g", { "class": "p-seg clicavel " + cls, tabindex: 0, role: "button", "aria-label": rotulo }, g);
    if (foco) { sg.setAttribute("aria-pressed", "false"); TRECHOS[item] = sg; }
    clicavel(sg, acao(item));
    return sg;
  }
  // uma banda: a caixa, o nome em serifa e o verbo do método; com o olhar em foco, as linhas de detalhe (o que mede,
  // o que entrega). No par, o nome e o verbo ficam no meio da caixa; no celular, só a sigla
  function banda(g, item, x, w, M, cls, sigla, nome, verbo, detalhes, acao, foco) {
    var sg = itemG(g, item, "banda " + cls, sigla + " " + nome + ": " + verbo, acao, foco);
    el("rect", { x: x, y: M.bt, width: w, height: M.bb - M.bt, rx: 9, "class": "bd" }, sg);
    if (M.cel) { texto(sg, x + w / 2, (M.bt + M.bb) / 2 + 13, sigla, "p-rot", "middle"); return sg; }
    var y0 = foco ? M.bt + 42 : (M.bt + M.bb) / 2 - 12;
    var t = texto(sg, x + 11, y0, sigla, "p-rot");
    el("tspan", { "class": "p-rot-nome", dx: 6 }, t).textContent = nome;
    texto(sg, x + 11, y0 + 34, verbo, "b-verbo");
    if (foco) {
      var linhas = [], cabe = Math.floor((w - 22) / 7.1);
      detalhes.forEach(function (d) { linhas = linhas.concat(quebra(d, cabe)); });
      linhas.forEach(function (l, i) { texto(sg, x + 11, y0 + 66 + i * 19, l, "b-det"); });
    }
    return sg;
  }
  // x e largura de cada banda dos 3Ps: o P¹ e o P² no modelo, o P³ no paciente (o losango da porta fica entre os dois)
  var BANDA_P = { P1: [70, 172], P2: [250, 172], P3: [460, 408] };
  function olharCom(g, acao, foco) {
    var M = moldura(g, "critério de maestria"), meio = (M.bt + M.bb) / 2;
    D.ps.forEach(function (p, k) {
      var b = BANDA_P[p.sigla];
      if (b) banda(g, p.sigla, b[0], b[1], M, "k" + k + (p.sigla === "P3" ? " hipotese" : ""), SUP(p.sigla), p.nome, p.verbo,
        ["mede: " + p.mede, "→ " + p.entrega], acao, foco);
    });
    // a passagem do P¹ ao P²
    el("path", { d: "M243 " + (meio - 7) + " L250 " + meio + " L243 " + (meio + 7) + " Z", "class": "b-seta" }, g);
    // a porta: o losango do critério de maestria, que abre a ficha do filtro
    var s = M.cel ? 24 : 17;
    var pg = itemG(g, "G", "porta-g kg", "Critério de maestria: " + ETAPA.G.oque, acao, foco);
    el("rect", { x: C.xd - s - 3, y: meio - s - 3, width: 2 * s + 6, height: 2 * s + 6, fill: "transparent" }, pg);
    el("path", { d: "M" + C.xd + " " + (meio - s) + " L" + (C.xd + s) + " " + meio + " L" + C.xd + " " + (meio + s) + " L" + (C.xd - s) + " " + meio + " Z", "class": "bd" }, pg);
    // a régua: os erros acontecem no modelo, e rareiam até a porta; no paciente, o que falta provar
    marcasErro(g, C.x0 + 26, M, "em-modelo");
    if (!M.cel) texto(g, C.x0 + 12, M.leg, "erros no modelo", "regua-leg em-modelo");
    if (CURVA.transferencia) {
      var fg = itemG(g, "m:transferencia", "prova-g ka", "No paciente: ainda não demonstrado no TAPP", acao, foco);
      el("rect", { x: C.xd + 14, y: M.rt + 8, width: C.x1 - C.xd - 30, height: M.rb - M.rt - 16, rx: (M.rb - M.rt - 16) / 2, "class": "bd" }, fg);
      texto(fg, (C.xd + C.x1) / 2, (M.rt + M.rb) / 2 + (M.cel ? 12 : 5), M.cel ? "a provar" : "ainda não demonstrado no TAPP", "b-prova", "middle");
    }
  }
  function olharHoje(g, acao, foco) {
    var M = moldura(g, "entrada no centro cirúrgico, sem critério"), meio = (M.bt + M.bb) / 2;
    var xp = xc(CURVA.plato.posicao), xm = (BANDA_P.P1[0] + BANDA_P.P2[0] + BANDA_P.P2[1]) / 2;
    // no modelo, nada: a caixa vazia, tracejada, do tamanho das duas bandas do olhar 2
    el("rect", { x: BANDA_P.P1[0], y: M.bt, width: BANDA_P.P2[0] + BANDA_P.P2[1] - BANDA_P.P1[0], height: M.bb - M.bt, rx: 9, "class": "bd-nada" }, g);
    var nt = texto(g, xm, meio - (M.cel ? 6 : 4), "", "nada-rot", "middle");
    el("tspan", { x: xm }, nt).textContent = "nenhuma operação";
    el("tspan", { x: xm, dy: M.cel ? 38 : 24 }, nt).textContent = "antes do paciente";
    // no paciente, uma operação só: aprende-se operando. Abre a ficha do risco da fase de aprendizado
    banda(g, "m:risco", BANDA_P.P3[0], BANDA_P.P3[1], M, "k2", "Operar", "no paciente", "aprende-se operando",
      ["nessa fase: " + CURVA.risco.rotulo], acao, foco);
    // a régua: os erros acontecem no paciente, até o platô (a única posição com escala)
    marcasErro(g, C.xd + 18, M, "em-paciente");
    if (!M.cel) texto(g, C.xd + 12, M.leg, "erros no paciente", "regua-leg em-paciente");
    var casos = CURVA.plato.rotulo.replace(/^platô em /, "");
    var lg = itemG(g, "m:plato", "plato-g kh", "O platô: " + casos, acao, foco);
    el("rect", { x: xp - 10, y: M.rot - (M.cel ? 34 : 24), width: C.x1 - xp + 10, height: M.rb - M.rot + (M.cel ? 44 : 34), fill: "transparent" }, lg);
    el("line", { x1: xp, y1: M.rt - 5, x2: xp, y2: M.rb + 5, "class": "plato-l" }, lg);
    if (M.cel) texto(lg, C.x1 - 4, M.rot, casos, "p-rot", "end");
    else { var pt = texto(lg, C.x1 - 4, M.rot, "O platô", "p-rot", "end"); el("tspan", { "class": "p-rot-nome", dx: 6 }, pt).textContent = casos; }
  }
  function montaCurva(svg, n, foco) {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    if (foco) TRECHOS = {};
    // no celular sobra altura embaixo, para os nomes das zonas
    svg.setAttribute("viewBox", "0 0 900 " + (celular() ? 490 : 470));
    var g = el("g", {}, svg);
    // no comparativo, um clique numa banda põe o olhar em foco com aquele item; no foco, seleciona
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
    // empilhada, o toque num olhar do par leva até o desenho em foco, logo abaixo da barra parada
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
  // quando a tela cruza os 767px, os desenhos se refazem no outro arranjo, com o mesmo olhar e o mesmo item
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
  // a volta ao lado a lado fica na linha dos cartões, acima do desenho (fixa no HTML, ligada uma vez)
  vSistema.querySelector("[data-volta]").addEventListener("click", comparar);
  function leituraSistema(item) {
    var html = "";
    if (item && PASSO[item]) {
      var P = PASSO[item], k = D.ps.indexOf(P);
      html += "<div class='bloco ficha'><div class='rotulo'><span class='selo-p k" + k + "'>" + SUP(P.sigla) + "</span> um dos 3Ps</div><h3>" + esc(P.nome) +
        "</h3><p>" + esc(ponto(maiuscula(P.frase))) + "</p>" +
        "<dl><dt>O método</dt><dd>" + esc(maiuscula(P.verbo)) + "</dd><dt>Mede</dt><dd>" + esc(maiuscula(P.mede)) + "</dd><dt>Entrega</dt><dd>" + esc(maiuscula(P.entrega)) +
        "</dd><dt>Onde</dt><dd>" + esc(maiuscula(P.onde)) + "</dd><dt>Estações</dt><dd><div class='p-est'>" +
        P.etapas.map(function (id) { return "<button data-etapa='" + id + "'>" + (ETAPA[id].tipo === "gate" ? "◆ " : "") + esc(ETAPA[id].curto) + "</button>"; }).join("") +
        "</div></dd><dt>Passa quando</dt><dd>" + esc(maiuscula(P.passa)) + "</dd></dl>" +
        (P.etapas.indexOf("G") >= 0 ? criteriosHtml() : "") +
        P.etapas.filter(function (id) { return ETAPA[id].gate && ETAPA[id].tipo !== "gate"; }).map(function (id) { return "<div class='risco'>" + esc(ETAPA[id].curto) + ": " + esc(ponto(ETAPA[id].gate)) + "</div>"; }).join("") +
        "</div>";
    } else if (item && item.indexOf("m:") === 0 && CURVA[item.slice(2)]) {
      var m = CURVA[item.slice(2)];
      html += "<div class='bloco ficha'><div class='rotulo'>O que se sabe " + conf(m.confianca) + "</div><h3>" + esc(maiuscula(m.rotulo)) +
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
      // no olhar 1, a fonte dos números fica numa linha: a evidência do platô diria o mesmo que o texto acima. O texto já
      // separa o que é do TAPP (o platô) do que junta as duas técnicas por vídeo (o risco); a fonte só nomeia o estudo
      var fonteHoje = D.evidencias.filter(function (e) { return e.id === "curva"; })[0];
      html += "<div class='bloco'><div class='rotulo'>Olhar 1 · hoje, ver um, fazer um</div><h3>O erro cai no paciente</h3><p>" +
        esc(ponto(maiuscula(CURVA.risco.texto))) + " " + esc(ponto(maiuscula(CURVA.plato.texto))) + "</p>" +
        "<p class='fonte'>Fonte: " + esc(fonteHoje ? fonteHoje.estudo : CURVA.plato.fonte) + ".</p></div>";
    } else {
      // os botões dos 3Ps só aparecem com a página empilhada: no desktop, as bandas do desenho ao lado são esses botões
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

  /* ================= ABERTURA: o símbolo dos 3Ps e o 5W2H =================
     No molde das irmãs, sem gráfico (o método fica no Sistema): três degraus que sobem, P¹ Preparar e P² Praticar no
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
      var dg = el("g", { "class": "dg clicavel k" + k, tabindex: 0, role: "button", "aria-label": SUP(p.sigla) + " " + p.nome + ": abrir no método, na aba Sistema" }, g);
      el("rect", { x: d.x, y: d.topo, width: d.w, height: chao - d.topo }, dg);
      var t = texto(dg, d.x + 16, d.topo + 44, SUP(p.sigla), "dg-sig");
      el("tspan", { "class": "dg-nome", dx: 8 }, t).textContent = p.nome;
      quebra(p.frase, Math.floor(d.w / 6.6)).forEach(function (l, i, todas) { texto(dg, d.x + 4, d.topo - 12 - (todas.length - 1 - i) * 16, l, "dg-frase"); });
      clicavel(dg, function () { abrePasso(p.sigla); });
    });
    // a porta da maestria, entre o P² e o P³
    el("rect", { x: 533, y: 170, width: 28, height: chao - 170, rx: 3, "class": "ps-coluna" }, g);
    el("path", { d: "M547 146 L556 155 L547 164 L538 155 Z", "class": "porta-diamante" }, g);
    // o P¹ e o P² acontecem no modelo: o rótulo fica no meio dos dois degraus
    texto(g, (DEGRAU.P1.x + DEGRAU.P2.x + DEGRAU.P2.w) / 2, chao + 24, "NO MODELO", "lado-rot", "middle");
    texto(g, 547, chao + 24, "CRITÉRIO DE MAESTRIA", "lado-rot porta-rot", "middle");
    texto(g, 705, chao + 24, "NO PACIENTE", "lado-rot pac", "middle");
    texto(g, 40, 458, "Clique num degrau para ver o passo no método, na aba Sistema.", "dg-dica");
    // no celular, os degraus viram três cartões com o mesmo clique; o critério de maestria fica entre o P² e o P³
    var cartoes = document.createElement("div");
    cartoes.className = "ps-cartoes";
    cartoes.innerHTML = D.ps.map(function (p, k) {
      return "<button type='button' class='ps-cartao k" + k + "' data-p='" + p.sigla + "'><span class='ps-lado'>" +
        (p.etapas.indexOf("E4") >= 0 ? "no paciente" : "no modelo") + "</span><span class='ps-nome'><b>" + SUP(p.sigla) + "</b>" + esc(p.nome) +
        "</span><span class='ps-frase'>" + esc(ponto(maiuscula(p.frase))) + "</span></button>" +
        (p.etapas.indexOf("G") >= 0 ? "<p class='ps-criterio'><i aria-hidden='true'></i>critério de maestria</p>" : "");
    }).join("") + "<p class='ps-dica'>Toque num passo para vê-lo no método, na aba Sistema.</p>";
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

  /* ================= ECOSSISTEMA: quem sustenta → o curso → quem ganha =================
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

  /* ================= 2 · O QUE: o portfólio (a antiga Serviços), em cartões =================
     No molde dos portfólios irmãos (HDB, Longevidade): um cartão por oferta, o que entra à vista, uma marca por
     dimensão (quem paga, uma vez por cartão e em tinta neutra; físico ou digital no quadrado; em aberto
     tracejado). Os itens do curso se agrupam pelos 3Ps (componentes.csv, coluna p); as ofertas de um mesmo grupo
     (servicos.csv, coluna grupo) dividem um cartão, como as três portas do kit. Os cartões seguem a ordem de servicos.csv,
     que é a do residente, do início para o fim (04/11/2026): o kit, os pré-módulos, o curso. As ofertas que só tocam o
     P¹, curtas, dividem uma coluna, uma em cima da outra. O que não se vende, o estudo, fica fora dos
     cartões e desta aba: é a trava do como, e abre a aba da operação. No rodapé, o limite da promessa (sintese.csv). Sem painel ao lado, sem eixo de estações e sem dica no mouse. O título de cada
     cartão é um botão (o teclado chega nele); o clique no resto do cartão faz o mesmo. */
  var portfolio = document.getElementById("portfolio");
  var GRUPO = { kit: ["O kit, em três portas", "do aluguel à compra livre: o residente escolhe uma, e não depende de infraestrutura hospitalar para treinar"] };
  function vendido(s) { return s.etapas.some(function (e) { return ETAPA[e] && ETAPA[e].trilho === "curso"; }); }
  // o que não se vende e vem antes do curso, o estudo de validação: a frase diz o que ele testa, não o que concluiu
  // (ainda não rodou). É a trava do como: abre a aba da operação
  function notaAntesDoCurso() {
    return D.servicos.filter(function (s) { return !vendido(s); }).map(function (s) {
      return "Antes do curso, o " + esc(s.nome.charAt(0).toLowerCase() + s.nome.slice(1)) + ", pago pela " + esc(ENQ[s.enquadramento].rotulo.toLowerCase()) + ", " + esc(ponto(s.descricao));
    });
  }
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
    // o limite da promessa: o que o curso promete hoje, e o que ainda depende da prova no paciente
    var promessa = (D.sintese || {}).promessa;
    html += "<p class='pf-rodape'><span>◼ físico: o modelo, o kit e o encontro · ◻ digital, na plataforma · <i>itálico</i>: provável · tracejado ou em vermelho: em aberto</span>" +
      (promessa ? "<span>" + esc(ponto(promessa)) + "</span>" : "") +
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

  /* ================= 1 · COMO: a operação, etapa por etapa (o blueprint) =================
     É o instrumento do como na Prancha 02: quem faz o quê, em que ordem, com que folga. Uma linha acima da linha de
     visibilidade (o que o residente vive) e, abaixo dela, o que roda por trás. No alto, a trava da área: o estudo */
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
    var antes = notaAntesDoCurso();
    var h = (antes.length ? "<p class='bp-topo'>" + antes.join(" ") + "</p>" : "") + "<div class='bp'>";
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
       aparecem na Síntese, a validação do modelo no Sistema. Fica a legenda de leitura, com o elo */
    h += "<p class='bp-pe'><span>Acima da linha, o que o residente vive; abaixo, o que roda por trás. Em itálico: leitura nossa. " +
      "Nada aqui foi observado ainda: o piloto não rodou.</span>" + elo("jornadas") + "</p>";
    escreve(document.getElementById("blueprint"), h);
  })();

  /* ================= 3ª · QUEM e 4ª · QUANTO: as outras duas peças do site, por dentro (06/11/2026) =================
     A plataforma do residente e o caso econômico são páginas próprias. Antes, a aba era só a porta, e quem clicava
     saía da Sistemática. Agora a aba mostra a peça por dentro, num molde só: os passos em botões, o palco e a leitura
     ao lado; no pé, o que é da área e o elo. Um clique num passo troca o palco e a leitura. O botão que abre a peça
     fica no alto, ao lado do subtítulo, e só aparece nestas duas abas.
     - Quem: os passos são as seis estações da plataforma (estacoes.csv); o palco é a própria plataforma, numa
       moldura, aberta na estação escolhida, sem o cabeçalho e o rodapé; no pé, quem pode comprar (compradores.csv).
     - Quanto: os passos são as quatro perguntas do caso econômico (conta.csv); o palco é o próprio painel, numa
       moldura, na tela do passo escolhido, sem a barra. É a única parte desta peça que mostra valores em reais.
     O botão é o link escrito no index.html, com o endereço do vault (o publicador o troca pelo do site): o script
     acrescenta o passo escolhido, para abrir a peça já na estação ou na tela. Os palcos e as leituras
     ficam todos na mesma célula, para a escala não mudar de um passo para outro */
  var PECA = {};
  (function montaPecas() {
    var P = D.pecas || {};
    // palcoUnico, quando houver, é um palco só para todos os passos (a moldura da plataforma), e aoMostrar o atualiza
    function monta(vista, passos, rotuloPassos, botao, entre, palcoDe, leituraDe, peHtml, sufixo, cls, palcoUnico, aoMostrar) {
      var painel = document.getElementById("peca-" + vista), porta = document.getElementById("porta-" + vista);
      if (!painel || !passos.length) return;
      var base = porta ? porta.getAttribute("href") : "", padrao = passos[0].id;
      escreve(painel, "<div class='pd'>" +
        "<div class='pd-passos' role='group' aria-label='" + rotuloPassos + "'>" + passos.map(function (p, i) {
          return (i ? entre(passos[i - 1]) : "") + "<button type='button' class='pd-passo' data-pd='" + p.id + "' aria-pressed='false'>" + botao(p, i) + "</button>";
        }).join("") + "</div>" +
        "<div class='pd-corpo" + (cls ? " " + cls : "") + "'><div class='pd-palcos'>" + (palcoUnico ? "<div class='pd-palco on'>" + palcoUnico + "</div>" :
          passos.map(function (p, i) { return "<div class='pd-palco' data-pd='" + p.id + "'>" + palcoDe(p, i) + "</div>"; }).join("")) +
        "</div><div class='pd-leituras'>" + passos.map(function (p, i) {
          return leituraDe(p, i);
        }).join("") + "</div></div>" +
        "<div class='pd-pe'>" + peHtml + elo(vista) + "</div></div>");
      if (porta && P[vista]) document.getElementById("porta-" + vista + "-botao").textContent = P[vista].botao;
      function mostra(id) {
        if (!passos.some(function (p) { return p.id === id; })) id = padrao;
        selecao[vista] = id === padrao ? null : id;
        Array.prototype.forEach.call(painel.querySelectorAll("[data-pd]"), function (x) {
          var on = x.dataset.pd === id;
          x.classList.toggle("on", on);
          if (x.hasAttribute("aria-pressed")) x.setAttribute("aria-pressed", on ? "true" : "false");
        });
        if (porta) porta.setAttribute("href", base + sufixo(id));
        if (aoMostrar) aoMostrar(id, painel, base);
      }
      Array.prototype.forEach.call(painel.querySelectorAll(".pd-passo"), function (b) {
        b.addEventListener("click", function () {
          mostra(b.dataset.pd);
          estadoNaUrl();
          reencaixa();
          var t = painel.querySelector(".pd-leitura.on .pd-tit");
          if (t) anuncia(t.textContent);
          rolaAte(painel.querySelector(".pd-corpo"));
        });
      });
      PECA[vista] = mostra;
      mostra(padrao);
    }
    function olho(txt) { return "<p class='pd-olho'>" + txt + "</p>"; }
    function rot(t) { return "<p class='rotulo'>" + t + "</p>"; }

    // ---- 3ª · quem: a plataforma, estação por estação
    var EST = D.estacoes || [];
    var foco = (D.compradores || []).some(function (c) { return c.foco === "sim"; });
    monta("plataforma", EST, "as seis estações da plataforma do residente",
      function (e) { return (e.p ? "<small>" + SUP(e.p) + "</small>" : "") + esc(e.nome); },
      // depois da estação que leva à maestria, o losango do critério
      function (antes) { return antes.porta ? "<i class='pd-los' role='img' aria-label='critério de maestria'></i>" : "<span class='pd-seta' aria-hidden='true'>→</span>"; },
      null,
      function (e, i) {
        return "<article class='pd-leitura " + (e.p ? P_COR[e.p] : "") + "' data-pd='" + e.id + "'>" +
          olho((e.p ? seloP(e.p) : "") + "estação " + (i + 1) + " de " + EST.length) +
          // o título da leitura é o nome da estação: o da tela já está na imagem ao lado
          "<h3 class='pd-tit'>" + esc(e.nome) + "</h3>" +
          rot("O que o residente faz") + "<p class='pd-txt'>" + esc(ponto(maiuscula(e.faz))) + "</p>" +
          rot("O que ele encontra") + "<p class='pd-txt'>" + e.encontra.map(esc).join(" · ") + ".</p>" +
          rot("O que ainda está em aberto") + "<p class='pd-aberto'>" + esc(ponto(maiuscula(e.aberto))) + "</p></article>";
      },
      (D.compradores || []).length ? "<div class='pd-compra'>" + rot("Quem pode comprar · " + (foco ? "o circulado é o primeiro" : "nenhum confirmado ainda")) +
        "<div class='pc-pontos" + (foco ? "" : " aberto") + "'><ol>" + D.compradores.map(function (c) {
          return "<li" + (c.foco === "sim" ? " class='foco'" : "") + "><i></i><b>" + esc(c.nome) + "</b></li>";
        }).join("") + "</ol></div></div>" : "",
      // a coluna do palco fica do tamanho da moldura, e a leitura com o resto
      function (id) { return "#" + id; }, "tela",
      // o palco é a própria plataforma, numa moldura, aberta na estação escolhida: em moldura, ela esconde o cabeçalho, a
      // faixa dos 3Ps e o rodapé. Trocar de estação só muda o fim do endereço, e a página não recarrega. O endereço sai
      // do botão do alto, que o publicador já reescreveu. Só carrega quando a aba aparece
      "<div class='pd-moldura'><iframe title='A plataforma do residente, na estação escolhida' loading='lazy'></iframe></div>",
      function (id, painel, base) {
        var f = painel.querySelector(".pd-moldura iframe"), e = EST.filter(function (x) { return x.id === id; })[0];
        f.setAttribute("src", base + (base.indexOf("?") < 0 ? "?" : "&") + "moldura=1#" + id);
        if (e) f.setAttribute("title", "A plataforma do residente, na estação " + e.nome);
      });

    // ---- 4ª · quanto: o caso econômico, numa moldura, na tela do passo escolhido
    var CONTA = D.conta || [];
    monta("economico", CONTA, "os quatro passos da conta do caso econômico",
      function (c, i) { return "<small>" + (i + 1) + "</small>" + esc(c.nome); },
      function () { return "<span class='pd-seta' aria-hidden='true'>→</span>"; },
      null,
      function (c, i) {
        return "<article class='pd-leitura' data-pd='" + c.id + "'>" + olho("passo " + (i + 1) + " de " + CONTA.length) +
          "<h3 class='pd-tit'>" + esc(c.pergunta) + "</h3>" +
          rot("O que a conta diz") + "<p class='pd-txt'>" + esc(ponto(maiuscula(c.diz))) + "</p>" +
          rot("Como a conta é feita") + "<p class='pd-formula'>" + esc(c.conta) + "</p>" +
          rot("O que falta") + "<p class='pd-aberto'>" + esc(ponto(maiuscula(c.falta))) + "</p></article>";
      },
      P.economico && P.economico.pe ? "<p class='pd-nota'>" + esc(ponto(maiuscula(P.economico.pe))) + "</p>" : "",
      function (id) { return "?vista=" + id; }, "tela",
      // o palco é o próprio painel do caso econômico, numa moldura, na tela do passo: em moldura, ele esconde a barra. É a
      // única parte desta peça que mostra valores em reais. A tela vai no endereço, e trocar de passo recarrega a moldura
      "<div class='pd-moldura'><iframe title='O caso econômico, na tela do passo escolhido' loading='lazy'></iframe></div>",
      function (id, painel, base) {
        var f = painel.querySelector(".pd-moldura iframe"), c = CONTA.filter(function (x) { return x.id === id; })[0];
        f.setAttribute("src", base + (base.indexOf("?") < 0 ? "?" : "&") + "moldura=1&vista=" + id);
        if (c) f.setAttribute("title", "O caso econômico, na tela " + c.nome);
      });
  })();

  /* ================= SÍNTESE: o BMC macro, com as travas de cada área (05/11/2026) =================
     O método de amarração da Prancha 02: a âncora (sintese.csv), a segurança, pousa na área 1, e cada área seguinte
     se escora na anterior (cadeia.csv). À esquerda, a conclusão e o modelo de negócio em quatro caixas, nas posições
     de Osterwalder (como, o que, quem; embaixo, quanto), cada uma com o número da ordem e as suas travas (o porquê da ordem fica antes, na aba da âncora, no mesmo quadro): o número da
     trava é o da área e a ordem dentro dela (1.1, 1.2: a primeira é a que limita antes), a barra é o quanto está resolvida, e a restrição de hoje vai em vermelho
     (gargalo.csv, que nasceu como o barril de Liebig; o barril saiu da tela, a lógica ficou). O portão fica depois da
     área da trava mais baixa. À direita, um cartão por vez, todos na mesma célula, para a escala não mudar: o da área
     (as fichas das travas, o que já está de pé, a aba que detalha a área e os blocos dela) e, um clique abaixo, o de
     cada um dos nove blocos (o que pedimos à instituição · o que já temos · o que ainda não está definido · o que já
     sabemos · quem resolve, e até quando), com a volta para a área. Sem valores.
     Dados: cadeia · gargalo · sintese · proposta · pendencias · achados · compradores · nao_ouvidos. */
  var direcao = document.getElementById("direcao"), mostraNaSintese = function () {};
  var CAD = D.cadeia || [], AREA = {}, AREA_DO = {};
  CAD.forEach(function (a, i) { a.n = i + 1; AREA[a.area] = a; a.blocos.forEach(function (b) { AREA_DO[b] = a; }); });
  var COR_AREA = { como: "#B8860B", oque: "#14477A", quem: "#2A8C8C", quanto: "#6B6A64" };
  // as travas, na ordem em que limitam (a primeira é a restrição de hoje), e o que já está de pé
  var TRAVAS = (D.gargalo || []).filter(function (x) { return x.lado !== "tras"; });
  var DE_PE = (D.gargalo || []).filter(function (x) { return x.lado === "tras"; });
  function minuscula(s) { return s.charAt(0).toLowerCase() + s.slice(1); }
  function mancheteSintese(v) { return (D.sintese || {}).gargalo || v.manchete || ""; }
  /* A ÂNCORA (06/11/2026): por que as áreas vêm nesta ordem, e por que cada uma se detalha no entregável da sua aba.
     É a etapa "BMC ancorado" da Prancha 02, entre o Sistema, que nomeia a âncora, e as abas numeradas. O quadro é o
     mesmo da Síntese, de propósito: como, o que e quem em cima, quanto embaixo, com as mesmas cores e os mesmos
     números. No alto, a âncora (sintese.csv), com os dois porquês dela (por que é a âncora, por que pousa na área 1)
     e o fio que desce até essa área. Em cada área (cadeia.csv), três camadas: a relação (primária a quaternária), o que
     ela vira e do que depende; por que está naquela posição da ordem; e o entregável que a detalha, com o porquê dele
     (o instrumento que a prancha dá a cada área). Depois, os blocos do BMC que moram nela e a porta da aba. No fim, a
     Síntese traz o mesmo quadro com as travas. As setas e o fio só entram quando a ordem é como → o que → quem →
     quanto (a do desenho) */
  (function montaAncora() {
    var painel = document.getElementById("ancora");
    if (!painel || !CAD.length) return;
    var GRADE = { como: "1/1/2/2", oque: "1/2/2/3", quem: "1/3/2/4", quanto: "2/1/3/4" };
    var REL = ["primária", "secundária", "terciária", "quaternária"], S = D.sintese || {};
    var BLOCO = {}; (D.proposta || []).forEach(function (c) { BLOCO[c.id] = c.bloco; });
    var ABA = {}; VISTAS.forEach(function (v) { ABA[v.id] = v; });
    var fluxo = CAD.map(function (a) { return a.area; }).join() === "como,oque,quem,quanto";
    function razao(rotulo, txt, tag) {
      return txt ? "<" + tag + " class='anc-razao'><small>" + rotulo + "</small>" + esc(ponto(txt)) + "</" + tag + ">" : "";
    }
    // o rótulo do primeiro porquê muda com a posição da área na ordem
    function rotuloOrdem(i) {
      return i === 0 ? "Por que é a primeira" : i === CAD.length - 1 ? "Por que é a última" :
        "Por que vem depois da " + ord(CAD[i - 1].n) + " · " + esc(CAD[i - 1].nome);
    }
    escreve(painel,
      "<div class='anc" + (fluxo ? " fluxo" : "") + "'>" +
      "<div class='anc-topo'><p class='anc-marca'><i class='anc-los' aria-hidden='true'></i><span>a âncora</span><b>" + esc(S.ancora || "") + "</b></p>" +
      "<div class='anc-pqs'>" + razao("Por que é a âncora", S.ancora_porque, "p") +
      razao("Por que pousa no " + esc(CAD[0].nome), S.ancora_pousa, "p") + "</div></div>" +
      "<div class='anc-quadro'>" + CAD.map(function (a, i) {
        var v = ABA[a.aba], nomes = a.blocos.map(function (id) { return BLOCO[id]; }).filter(Boolean)
          // "Atividades-chave" vira "Atividades": no quadro, o nome curto do bloco, sem quebra no meio
          .map(function (n) { return "<span>" + esc(n.replace(/-chave$/, "")) + "</span>"; });
        return "<button type='button' class='anc-area' data-a='" + a.area + "' data-vista='" + a.aba + "' style='grid-area:" + GRADE[a.area] +
          ";--pv:" + COR_AREA[a.area] + "'>" +
          "<span class='anc-a'><span class='anc-cab'><i>" + ord(a.n) + "</i><b>" + esc(a.nome) + "</b><em>" + (REL[i] || "") + "</em></span>" +
          "<span class='anc-vira'>" + esc(a.vira) + "</span><span class='anc-pq'>" + esc(a.porque || "") + "</span></span>" +
          "<span class='anc-m'>" + razao(rotuloOrdem(i), a.porque_ordem, "span") +
          razao("O entregável · " + esc(a.entregavel || ""), a.porque_aba, "span") + "</span>" +
          "<span class='anc-b'><span class='anc-blocos'><small>no modelo de negócio</small>" + nomes.join(" · ") + "</span>" +
          (v ? "<span class='anc-abre'>ver " + ord(a.n) + " · " + esc(minuscula(v.rot)) + " →</span>" : "") + "</span></button>";
      }).join("") + "</div>" +
      "<div class='anc-pe'><p class='anc-leg'><i>1ª</i> o número da área é a ordem em que elas se apoiam; " +
      "na síntese, cada trava leva o número da sua área: 1.1, 1.2</p>" +
      "<button type='button' class='anc-sint' data-vista='direcao'>no fim, a síntese: o mesmo quadro, com as travas →</button>" +
      elo("ancora") + "</div></div>");
    Array.prototype.forEach.call(painel.querySelectorAll("button[data-vista]:not(.l-elo)"), function (b) {
      b.addEventListener("click", function () { abre(b.dataset.vista); });
    });
  })();
  (function montaSintese() {
    if (!direcao || !(D.proposta || []).length || !CAD.length) return;
    // a posição de cada área no quadro: as de Osterwalder, no macro
    var GRADE = { como: "1/1/2/2", oque: "1/2/2/3", quem: "1/3/2/4", quanto: "2/1/3/4" };
    var PORTAO = { piloto: "para o piloto", venda: "para vender o curso", depois: "depois da primeira turma" };
    var CAM = {}, ROT = {}; VISTAS.forEach(function (v) { CAM[v.id] = (v.n ? ord(v.n) + " · " : "") + v.cam; ROT[v.id] = v.rot; });
    var S = D.sintese || {};
    var DEF = D.achados.filter(function (a) { return a.camada === "fecho"; });
    var DEF_DE = {}; DEF.forEach(function (a, i) { a.componente.forEach(function (id) { if (!DEF_DE[id]) DEF_DE[id] = i + 1; }); });
    var PROP = {}; D.proposta.forEach(function (c) { PROP[c.id] = c; });
    function rot(t, qt) { return "<p class='pc-rot'>" + t + (qt !== undefined ? "<span>" + qt + "</span>" : "") + "</p>"; }
    var vazio = "<li class='pc-vazio'>nada registrado ainda</li>";
    function travasDa(a) { return TRAVAS.filter(function (x) { return x.area === a.area; }); }
    // o número de uma trava: o da área e a ordem dentro dela (1.1, 1.2, 2.1…). A ordem geral (gargalo.csv) fica nos dados:
    // ordena as travas dentro da área e diz qual é a restrição de hoje
    function numTrava(x) {
      var a = AREA[x.area];
      return a ? a.n + "." + (travasDa(a).indexOf(x) + 1) : String(TRAVAS.indexOf(x) + 1);
    }
    // a área da restrição de hoje: é nela que a Síntese abre, e é depois dela que fica o portão
    var aHoje = TRAVAS.length && AREA[TRAVAS[0].area] ? AREA[TRAVAS[0].area] : CAD[0];
    var PADRAO = aHoje.area;
    function nivel(x) { return "<em class='bm-nivel'><u style='width:" + x.altura + "%'></u></em>"; }
    function caixaArea(a) {
      var tr = travasDa(a);
      return "<button type='button' class='bm-area" + (a === aHoje && a.n < CAD.length ? " portao" : "") + "' data-sx='" + a.area + "' aria-pressed='false' style='grid-area:" +
        GRADE[a.area] + ";--pv:" + COR_AREA[a.area] + "' aria-label='Área " + a.n + ", " + esc(a.nome) + ": " +
        (tr.length ? tr.map(function (x) { return esc(x.aduela); }).join(", ") : "sem trava hoje") + "'>" +
        "<span class='bm-cab'><i>" + ord(a.n) + "</i><b>" + esc(a.nome) + "</b></span>" +
        "<span class='bm-travas'>" + (tr.map(function (x) {
          var k = TRAVAS.indexOf(x) + 1;
          return "<span class='bm-tr" + (k === 1 ? " hoje" : "") + "'><i>" + numTrava(x) + "</i><span class='bm-nome'>" + esc(x.aduela) + "</span>" + nivel(x) + "</span>";
        }).join("") || "<span class='bm-sem'>sem trava hoje</span>") + "</span></button>";
    }
    // a ficha de uma trava, no formato aprovado no barril: o que é, o que destrava, a alavanca, quem e até quando
    function fichaTrava(x, aberta) {
      var k = TRAVAS.indexOf(x) + 1;
      return "<li class='sx-trava" + (k === 1 ? " hoje" : "") + (aberta ? " aberta" : "") + "'>" +
        "<button type='button' class='sx-tr' aria-expanded='" + (aberta ? "true" : "false") + "'><i>" + numTrava(x) + "</i><span class='sx-nome'>" + esc(x.aduela) + "</span>" +
        (k === 1 ? "<b class='sx-hoje'>a restrição de hoje</b>" : "") + nivel(x) + "</button>" +
        "<dl class='g-dl'><dt>O que é</dt><dd>" + esc(ponto(maiuscula(x.oque))) + "</dd>" +
        "<dt>O que destrava</dt><dd>" + esc(ponto(maiuscula(x.fluxo))) + "</dd>" +
        "<dt>A alavanca</dt><dd>" + esc(ponto(maiuscula(x.alavanca))) + "</dd>" +
        "<dt>Quem, até quando</dt><dd>" + esc(maiuscula(x.quem)) + " · " + esc(ponto(x.prazo)) + "</dd></dl></li>";
    }
    function cardArea(a) {
      var tr = travasDa(a), pe = DE_PE.filter(function (x) { return x.area === a.area; });
      var blocos = a.blocos.filter(function (id) { return PROP[id]; });
      return "<header class='pc-cab'><p class='pc-eyebrow'><span class='pc-area'><i>" + ord(a.n) + "</i><b>área " + a.n + " de " + CAD.length + "</b></span></p>" +
        "<h3 class='pc-tit'>" + esc(maiuscula(a.nome)) + "</h3></header>" +
        "<section>" + rot("As travas desta área", tr.length) +
        (tr.length ? "<ul class='sx-travas'>" + tr.map(function (x, i) { return fichaTrava(x, i === 0); }).join("") + "</ul>" :
          "<p class='pc-txt'>Nenhuma trava aberta nesta área hoje.</p>") + "</section>" +
        (pe.length ? "<p class='sx-pe'><b>Já está de pé:</b> " + pe.map(function (x) { return esc(x.aduela); }).join(" · ") + ".</p>" : "") +
        "<section class='sx-baixo'><div>" + rot("Os blocos desta área", blocos.length) + "<p class='sx-blocos'>" + blocos.map(function (id) {
          return "<button type='button' class='sx-bloco' data-sx='" + id + "'>" + esc(PROP[id].bloco) + "</button>";
        }).join("") + "</p></div>" +
        (ROT[a.aba] ? "<button type='button' class='l-elo sx-detalhe' data-vista='" + a.aba + "'>ver o detalhe: " + esc(CAM[a.aba]) + ", " +
          esc(minuscula(ROT[a.aba].replace(/^[^:]+:\s*/, ""))) + " →</button>" : "") + "</section>";
    }
    function card(c) {
      var a = AREA_DO[c.id];
      // o que já sabemos: cada achado com título e texto curto; "ver em" abre a aba do assunto na leitura dos achados
      // (data-item vazio: sem item escolhido, e no Sistema o olhar 2 em foco)
      var sabe = D.achados.filter(function (x) { return x.camada !== "fecho" && x.componente.indexOf(c.id) >= 0; });
      var defs = DEF.filter(function (x) { return x.componente.indexOf(c.id) >= 0; });
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
          D.nao_ouvidos.map(function (x) { return esc(minuscula(x.grupo)); }).join(" · ") + ".</p>" : "") +
        "</div>" : "";
      // a área do bloco, no alto do cartão, é a volta para o cartão da área
      var volta = a ? "<button type='button' class='pc-area pc-volta' data-sx='" + a.area + "'>←<i>" + ord(a.n) + "</i><b>área " + a.n + " de " + CAD.length + " · " + esc(a.nome) + "</b></button>" : "";
      return "<header class='pc-cab'><p class='pc-eyebrow'>" + volta + "<span>" +
        esc(c.componente) + "</span> " + conf(c.confianca) +
        (DEF_DE[c.id] ? " · <b class='pc-resp'>definição " + DEF_DE[c.id] + "</b>" : "") + "</p>" +
        "<h3 class='pc-tit'>" + esc(c.bloco) + "</h3></header>" +
        "<div class='pc-pede'>" + rot("O que pedimos à instituição") + "<p>" + esc(ponto(maiuscula(c.pedido))) + "</p></div>" +
        "<div class='pc-dupla'><div>" + rot("O que já temos") + "<p class='pc-txt'>" + esc(ponto(maiuscula(c.temos))) + "</p></div>" +
        "<div>" + rot("O que ainda não está definido") + "<p class='pc-txt'>" + esc(ponto(maiuscula(c.preciso))) + "</p></div></div>" +
        pontos +
        defs.map(function (x) {
          return "<p class='pc-cond'><b>Uma das três definições · " + esc(x.titulo) + ".</b> " + esc(ponto(maiuscula(x.texto))) + "</p>";
        }).join("") +
        "<div class='pc-listas'><section>" + rot("O que já sabemos", sabe.length) + "<ul class='pc-ul'>" + (sabe.map(function (x) {
          return "<li><b>" + esc(x.titulo) + "</b><span class='pc-sabe'>" + esc(ponto(maiuscula(x.texto))) + "</span>" +
            "<button type='button' class='l-elo pc-ver' data-vista='" + x.camada + "' data-item=''>ver em " + esc(CAM[x.camada]) + " →</button></li>";
        }).join("") || vazio) + "</ul></section>" +
        "<section>" + rot("Quem resolve, e até quando", falta.length) + "<ul class='pc-ul'>" + (falta.join("") || vazio) + "</ul></section></div>";
    }
    // o elo da aba: no desktop, no fim da coluna da esquerda; empilhada, depois do cartão (na ordem do Tab, nos dois arranjos).
    // As áreas entram na página na ordem da cadeia: empilhada, lê-se o caminho em ordem; no desktop, cada uma vai para a sua posição
    escreve(direcao,
      "<div class='bmc-dir'><div class='bmc-col'>" +
      "<div class='dc-conc'><div class='rotulo'>O que a síntese conclui</div><p class='dc-frase'>" + esc(ponto(S.direcao)) + "</p></div>" +
      "<div class='rotulo'><span>O modelo de negócio · <span class='so-clique'>clique</span><span class='so-toque'>toque</span> numa área</span></div>" +
      (S.ancora ? "<p class='cad-anc'><i aria-hidden='true'></i>âncora · <b>" + esc(S.ancora) + "</b></p>" : "") +
      "<div class='bmc-macro'>" + CAD.map(caixaArea).join("") + "</div>" +
      "<p class='bmc-leg'><span><i>1ª</i> a ordem em que as áreas se escoram</span><span><i class='leg-tr'>1.1</i> a trava, na ordem dentro da área</span><span><em class='bm-nivel'><u style='width:45%'></u></em> o quanto a trava está resolvida</span>" +
      (TRAVAS.length ? "<span><em class='cad-barras' aria-hidden='true'></em> o portão de hoje: " + esc(minuscula(TRAVAS[0].aduela)) + "</span>" : "") + "</p>" +
      elo("direcao", "so-desktop") + "</div>" +
      "<div class='pv-cards'>" + CAD.map(function (a) {
        return "<div class='pv-card pv-area' data-sx='" + a.area + "' style='--pv:" + COR_AREA[a.area] + "'>" + cardArea(a) + "</div>";
      }).join("") + D.proposta.map(function (c) {
        return "<div class='pv-card' data-sx='" + c.id + "' style='--pv:" + (AREA_DO[c.id] ? COR_AREA[AREA_DO[c.id].area] : c.cor) + "'>" + card(c) + "</div>";
      }).join("") + "</div>" + elo("direcao", "so-empilhado") + "</div>");
    mostraNaSintese = function (id) {
      if (!AREA[id] && !PROP[id]) id = PADRAO;
      selecao.direcao = id === PADRAO ? null : id;
      var a = AREA[id] || AREA_DO[id];
      Array.prototype.forEach.call(direcao.querySelectorAll(".pv-card"), function (x) { x.classList.toggle("on", x.dataset.sx === id); });
      Array.prototype.forEach.call(direcao.querySelectorAll(".bm-area"), function (x) {
        var on = !!a && x.dataset.sx === a.area;
        x.classList.toggle("on", on);
        x.setAttribute("aria-pressed", on ? "true" : "false");
      });
    };
    // empilhada, o cartão fica logo abaixo do quadro: o toque numa área rola até ele
    function abreNaSintese(id) {
      mostraNaSintese(id);
      estadoNaUrl();
      reencaixa();
      var tit = direcao.querySelector(".pv-card.on .pc-tit");
      if (tit) anuncia(tit.textContent);
      rolaAte(direcao.querySelector(".pv-card.on"));
    }
    Array.prototype.forEach.call(direcao.querySelectorAll(".bm-area, .sx-bloco, .pc-volta"), function (b) {
      b.addEventListener("click", function () { abreNaSintese(b.dataset.sx); });
    });
    // as fichas das travas de uma área abrem uma por vez; a que está aberta fecha com outro clique
    Array.prototype.forEach.call(direcao.querySelectorAll(".sx-tr"), function (b) {
      b.addEventListener("click", function () {
        var li = b.parentNode, abrir = !li.classList.contains("aberta");
        Array.prototype.forEach.call(li.parentNode.children, function (x) {
          x.classList.remove("aberta");
          x.querySelector(".sx-tr").setAttribute("aria-expanded", "false");
        });
        if (abrir) { li.classList.add("aberta"); b.setAttribute("aria-expanded", "true"); }
        reencaixa();
      });
    });
    mostraNaSintese(PADRAO);
  })();

  /* ---------- carimbo: a meta "publicacao" (N|AAAA-MM-DD) é preenchida pelo publica_tudo.py ---------- */
  (function () {
    var m = document.querySelector('meta[name="publicacao"]'), v = m ? m.content.split("|") : [];
    document.getElementById("carimbo").textContent = (v[1] ? "Estado em " + v[1].split("-").reverse().join("/") +
      " · publicação " + v[0] : "Versão de trabalho, não publicada") + " · base: vault do projeto Hernia3D. Valores em reais, só na janela do caso econômico (aba 4ª).";
  })();

  /* ---------- início: estado vindo da URL ---------- */
  var q = new URLSearchParams(location.search);
  leituraEcossistema(null, null);
  selecionaServico(null);
  leituraAbertura();
  // a Síntese abre na área da restrição de hoje; ?item= abre outra área ou um bloco. O antigo ?modo= é ignorado
  // ?olhar=1|2 (o antigo ?tempo= vale como olhar: 1 é hoje, 2 e 3 são com o Hernia3D)
  var olharUrl = +(q.get("olhar") || q.get("tempo") || 0);
  abre(q.get("vista") || "abertura", q.get("item") || undefined);
  if (vistaAtual === "sistema" && olharUrl && !q.get("item")) escolheTempo(olharUrl === 1 ? 1 : 2);
  // daqui em diante, cada ficha que abre tem o título anunciado ao leitor de tela
  pronto = true;
})();
