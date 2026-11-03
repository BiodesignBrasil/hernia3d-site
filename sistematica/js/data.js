/* GERADO por 08_sintese/dados/build_dados.py a partir dos CSVs. Não editar à mão. */
window.H3D = {
 "atores": [
  {
   "id": "residente",
   "nome": "RESIDENTE",
   "papel": "quem treina: usa a plataforma, o modelo e o kit",
   "curto": "treina no modelo e na plataforma",
   "lado": "dentro",
   "confianca": "confirmado",
   "coluna": "curso"
  },
  {
   "id": "comprador",
   "nome": "COMPRADOR DO CURSO",
   "papel": "quem compra o curso: programa de residência, hospital de ensino ou Einstein, a confirmar",
   "curto": "compra o curso · a confirmar",
   "lado": "dentro",
   "confianca": "aberto",
   "coluna": "sustenta"
  },
  {
   "id": "projeto",
   "nome": "HERNIA3D",
   "papel": "provedor: curso, modelo 3D, plataforma e protocolo",
   "curto": "curso, modelo 3D e plataforma",
   "lado": "dentro",
   "confianca": "confirmado",
   "coluna": "curso"
  },
  {
   "id": "preceptor",
   "nome": "PRECEPTOR",
   "papel": "conduz a live e o encontro presencial e decide quem passa",
   "curto": "corrige ao vivo e decide quem passa",
   "lado": "dentro",
   "confianca": "confirmado",
   "coluna": "curso"
  },
  {
   "id": "fornecedores",
   "nome": "FORNECEDORES",
   "papel": "impressão do modelo, kit laparoscópico e hospedagem",
   "curto": "impressão, kit e hospedagem",
   "lado": "fora",
   "confianca": "confirmado",
   "coluna": "curso"
  },
  {
   "id": "industria",
   "nome": "INDÚSTRIA",
   "papel": "telas e instrumental: patrocínio por turma, a explorar",
   "curto": "patrocínio por turma · a explorar",
   "lado": "fora",
   "confianca": "aberto",
   "coluna": "sustenta"
  },
  {
   "id": "einstein",
   "nome": "EINSTEIN · INFRAESTRUTURA",
   "papel": "cede espaço, torre, robótica e realidade virtual",
   "curto": "cede espaço, torre, robótica e RV",
   "lado": "fora",
   "confianca": "provavel",
   "coluna": "sustenta"
  },
  {
   "id": "hospital",
   "nome": "HOSPITAL",
   "papel": "onde a cirurgia real acontece",
   "curto": "onde a cirurgia real acontece",
   "lado": "fora",
   "confianca": "confirmado",
   "coluna": ""
  },
  {
   "id": "sus",
   "nome": "SUS",
   "papel": "paga a cirurgia na maioria dos casos",
   "curto": "paga a cirurgia na maioria dos casos",
   "lado": "fora",
   "confianca": "confirmado",
   "coluna": "ganha"
  },
  {
   "id": "operadora",
   "nome": "OPERADORA",
   "papel": "paga a cirurgia na saúde suplementar",
   "curto": "paga a cirurgia na saúde suplementar",
   "lado": "fora",
   "confianca": "confirmado",
   "coluna": "ganha"
  },
  {
   "id": "paciente",
   "nome": "PACIENTE",
   "papel": "recebe a cirurgia de quem treinou",
   "curto": "recebe a cirurgia de quem treinou",
   "lado": "fora",
   "confianca": "confirmado",
   "coluna": "ganha"
  }
 ],
 "enquadramentos": {
  "curso": {
   "rotulo": "taxa do curso · pagador a definir",
   "curto": "taxa do curso",
   "cor": "#B8860B",
   "fundo": "#FBF3E1"
  },
  "residente": {
   "rotulo": "pago pelo residente",
   "curto": "residente",
   "cor": "#7A4E9A",
   "fundo": "#F3ECF8"
  },
  "inovacao": {
   "rotulo": "verba de inovação",
   "curto": "inovação",
   "cor": "#14477A",
   "fundo": "#E6EEF7"
  },
  "custo": {
   "rotulo": "custo do projeto",
   "curto": "custo",
   "cor": "#5F6B7A",
   "fundo": "#EEF0F3"
  },
  "sus": {
   "rotulo": "SUS",
   "curto": "SUS",
   "cor": "#4B6B2E",
   "fundo": "#EEF3E6"
  },
  "suplementar": {
   "rotulo": "saúde suplementar",
   "curto": "operadora",
   "cor": "#1F7A8C",
   "fundo": "#E3F2F5"
  },
  "beneficio": {
   "rotulo": "ganho sem pagamento",
   "curto": "ganho",
   "cor": "#B3261E",
   "fundo": "#FBEAE8"
  }
 },
 "fluxos": [
  {
   "id": "F2",
   "de": "comprador",
   "para": "projeto",
   "oque": "paga a taxa do curso (tabela, com desconto por volume)",
   "tipo": "confirmar",
   "enquadramento": "curso",
   "etapas": [
    "E0",
    "E1",
    "E2",
    "E3a",
    "E3b"
   ],
   "p": [
    "P1",
    "P2"
   ]
  },
  {
   "id": "F3",
   "de": "projeto",
   "para": "fornecedores",
   "oque": "paga a impressão do modelo 3D",
   "tipo": "pagamento",
   "enquadramento": "custo",
   "etapas": [
    "E2"
   ],
   "p": [
    "P2"
   ]
  },
  {
   "id": "F4",
   "de": "residente",
   "para": "projeto",
   "oque": "aluga o kit completo (nível 1)",
   "tipo": "confirmar",
   "enquadramento": "residente",
   "etapas": [
    "E1",
    "E2"
   ],
   "p": [
    "P1",
    "P2"
   ]
  },
  {
   "id": "F5",
   "de": "residente",
   "para": "fornecedores",
   "oque": "compra o próprio kit (níveis 2 e 3)",
   "tipo": "pagamento",
   "enquadramento": "residente",
   "etapas": [
    "E1",
    "E2"
   ],
   "p": [
    "P1",
    "P2"
   ]
  },
  {
   "id": "F7",
   "de": "projeto",
   "para": "fornecedores",
   "oque": "paga hospedagem e administração da plataforma",
   "tipo": "pagamento",
   "enquadramento": "custo",
   "etapas": [
    "E0",
    "E1",
    "E2",
    "E3a"
   ],
   "p": [
    "P1",
    "P2"
   ]
  },
  {
   "id": "F8",
   "de": "sus",
   "para": "hospital",
   "oque": "paga a cirurgia, e paga 39% menos pela via laparoscópica do que pela aberta",
   "tipo": "pagamento",
   "enquadramento": "sus",
   "etapas": [
    "E4"
   ],
   "p": [
    "P3"
   ]
  },
  {
   "id": "F8b",
   "de": "operadora",
   "para": "hospital",
   "oque": "paga a cirurgia, e paga 115% mais pela via laparoscópica",
   "tipo": "pagamento",
   "enquadramento": "suplementar",
   "etapas": [
    "E4"
   ],
   "p": [
    "P3"
   ]
  },
  {
   "id": "F9",
   "de": "projeto",
   "para": "preceptor",
   "oque": "remunera a supervisão na live e no encontro presencial",
   "tipo": "confirmar",
   "enquadramento": "custo",
   "etapas": [
    "E3a",
    "E3b"
   ],
   "p": [
    "P2"
   ]
  },
  {
   "id": "F10",
   "de": "residente",
   "para": "paciente",
   "oque": "menos complicação nos primeiros casos operados",
   "tipo": "beneficio",
   "enquadramento": "beneficio",
   "etapas": [
    "E4"
   ],
   "p": [
    "P3"
   ]
  },
  {
   "id": "F10b",
   "de": "residente",
   "para": "sus",
   "oque": "menos complicação para o SUS pagar",
   "tipo": "beneficio",
   "enquadramento": "beneficio",
   "etapas": [
    "E4"
   ],
   "p": [
    "P3"
   ]
  },
  {
   "id": "F10c",
   "de": "residente",
   "para": "operadora",
   "oque": "menos complicação para a operadora pagar",
   "tipo": "beneficio",
   "enquadramento": "beneficio",
   "etapas": [
    "E4"
   ],
   "p": [
    "P3"
   ]
  },
  {
   "id": "F11",
   "de": "industria",
   "para": "projeto",
   "oque": "patrocinaria turmas do curso, a explorar: a indústria quer ver a validação publicada",
   "tipo": "confirmar",
   "enquadramento": "curso",
   "etapas": [
    "E3a",
    "E3b"
   ],
   "p": [
    "P2"
   ]
  },
  {
   "id": "F12",
   "de": "einstein",
   "para": "projeto",
   "oque": "cede espaço, torre, robótica e RV para o estudo e o encontro",
   "tipo": "beneficio",
   "enquadramento": "beneficio",
   "etapas": [
    "V",
    "E3b"
   ],
   "p": [
    "P2"
   ]
  }
 ],
 "etapas": [
  {
   "id": "E0",
   "trilho": "curso",
   "tipo": "etapa",
   "p": "P1",
   "nome": "Preparação cognitiva e pré-módulos",
   "curto": "Preparação",
   "oque": "teoria do TAPP com teste (90% para avançar) e módulos de nivelamento para quem não tem a base",
   "duracao": "2 a 3 horas, mais os pré-módulos",
   "elegivel": "todo matriculado",
   "recurso": "plataforma e pré-módulos",
   "gate": "os pré-módulos ainda não foram produzidos",
   "confianca": "provavel"
  },
  {
   "id": "V",
   "trilho": "sequencia",
   "tipo": "marco",
   "p": "",
   "nome": "Estudo de validação dual-plataforma",
   "curto": "Estudo 2.0",
   "oque": "o modelo distingue novato de especialista? Em laparoscopia e em robótica, com RV como referência",
   "duracao": "coleta em out–nov/2026",
   "elegivel": "18 novatos e 10 especialistas",
   "recurso": "torre, robótica, RV e avaliação cega por vídeo",
   "gate": "aprovação do comitê de ética antes da coleta",
   "confianca": "confirmado"
  },
  {
   "id": "E1",
   "trilho": "curso",
   "tipo": "etapa",
   "p": "P1",
   "nome": "Onboarding",
   "curto": "Onboarding",
   "oque": "primeiro contato com o modelo, guiado por vídeo de referência",
   "duracao": "1 sessão",
   "elegivel": "todo matriculado",
   "recurso": "vídeo de referência e sessão opcional em grupo",
   "gate": "",
   "confianca": "confirmado"
  },
  {
   "id": "P",
   "trilho": "sequencia",
   "tipo": "marco",
   "p": "",
   "nome": "Piloto do curso",
   "curto": "Piloto",
   "oque": "a primeira turma do curso de maestria",
   "duracao": "depois da evidência do estudo",
   "elegivel": "turma a definir",
   "recurso": "tudo o que o curso usa",
   "gate": "quem paga e a que preço",
   "confianca": "aberto"
  },
  {
   "id": "E2",
   "trilho": "curso",
   "tipo": "etapa",
   "p": "P2",
   "nome": "Prática autoguiada",
   "curto": "Prática",
   "oque": "o residente repete o TAPP no modelo, com checklist de autoavaliação, sem preceptor a cada sessão",
   "duracao": "16 sessões ou mais, 2 por semana, até 12 semanas",
   "elegivel": "todo matriculado",
   "recurso": "modelo 3D, kit e consumíveis",
   "gate": "como o residente corrige erro sem preceptor está em aberto",
   "confianca": "provavel"
  },
  {
   "id": "ECR",
   "trilho": "sequencia",
   "tipo": "marco",
   "p": "",
   "nome": "Ensaio de transferibilidade",
   "curto": "ECR",
   "oque": "o treino reduz complicação no paciente operado?",
   "duracao": "18 a 24 meses",
   "elegivel": "residentes randomizados em 3 centros",
   "recurso": "centro cirúrgico e seguimento dos pacientes",
   "gate": "é o que fecha a maior lacuna de evidência",
   "confianca": "aberto"
  },
  {
   "id": "G",
   "trilho": "curso",
   "tipo": "gate",
   "p": "P2",
   "nome": "Critério de maestria",
   "curto": "Maestria",
   "oque": "só passa quem cumpre os 5 critérios ao mesmo tempo",
   "duracao": "2 sessões seguidas",
   "elegivel": "quem completa a prática",
   "recurso": "checklist, GOALS e autoavaliação",
   "gate": "a taxa de quem chega à maestria não é conhecida",
   "confianca": "aberto"
  },
  {
   "id": "E3a",
   "trilho": "curso",
   "tipo": "etapa",
   "p": "P2",
   "nome": "Sessão de correção (live)",
   "curto": "Live",
   "oque": "o preceptor observa ao vivo e corrige o que o checklist não pega",
   "duracao": "1 sessão remota",
   "elegivel": "só quem passou na maestria",
   "recurso": "tempo do preceptor",
   "gate": "o tempo do preceptor é o recurso mais escasso do curso",
   "confianca": "provavel"
  },
  {
   "id": "E3b",
   "trilho": "curso",
   "tipo": "etapa",
   "p": "P2",
   "nome": "Encontro presencial",
   "curto": "Presencial",
   "oque": "contato próximo com o preceptor e com os pares que também chegaram",
   "duracao": "1 encontro",
   "elegivel": "quem passou pela live",
   "recurso": "tempo do preceptor, espaço e deslocamento",
   "gate": "custo de espaço e deslocamento nunca entrou em planilha",
   "confianca": "provavel"
  },
  {
   "id": "E4",
   "trilho": "curso",
   "tipo": "etapa",
   "p": "P3",
   "nome": "Centro cirúrgico",
   "curto": "Cirurgia",
   "oque": "cirurgia real, com supervisão presencial decrescente (fases A, B e C)",
   "duracao": "10 a 15 casos",
   "elegivel": "residente liberado",
   "recurso": "sala cirúrgica e preceptor de rotina",
   "gate": "transferência para o paciente não demonstrada no TAPP",
   "confianca": "aberto"
  }
 ],
 "abertura": [
  {
   "chave": "oque",
   "pergunta": "O quê",
   "resposta": "um curso de maestria em hérnia inguinal por TAPP, num simulador impresso em 3D a partir de tomografia"
  },
  {
   "chave": "porque",
   "pergunta": "Por quê",
   "resposta": "vencer a curva do TAPP leva, em mediana, 37,5 casos reais, e nessa fase o paciente tem 4,4× mais conversão para cirurgia aberta e 1,6× mais complicação"
  },
  {
   "chave": "quem",
   "pergunta": "Para quem",
   "resposta": "o residente de cirurgia geral, e o preceptor, que libera para o paciente só quem passou no critério de maestria"
  },
  {
   "chave": "onde",
   "pergunta": "Onde",
   "resposta": "no modelo, em casa ou no hospital, com o kit em três níveis · depois, uma live e um encontro presencial com o preceptor · por fim, o centro cirúrgico"
  },
  {
   "chave": "quando",
   "pergunta": "Quando",
   "resposta": "antes do primeiro TAPP no paciente: 16 sessões ou mais, 2 por semana, em até 12 semanas"
  },
  {
   "chave": "como",
   "pergunta": "Como",
   "resposta": "em três passos, os 3Ps, e clicar num deles abre a curva naquele passo"
  },
  {
   "chave": "quanto",
   "pergunta": "Quanto",
   "resposta": "a parte íngreme da curva sai do paciente: hoje, 37,5 casos no centro cirúrgico · com o Hernia3D, 16 sessões ou mais no modelo, antes do primeiro caso"
  }
 ],
 "ps": [
  {
   "sigla": "P1",
   "nome": "Preparar",
   "frase": "conhecer a anatomia e nomeá-la antes de cortar",
   "onde": "na teoria e nos pré-módulos, e depois na primeira sessão com o modelo",
   "passa": "90% ou mais no teste teórico",
   "etapas": [
    "E0",
    "E1"
   ]
  },
  {
   "sigla": "P2",
   "nome": "Praticar",
   "frase": "o TAPP inteiro no modelo, de novo, até passar",
   "onde": "no modelo, com checklist, e depois numa live e num encontro com o preceptor",
   "passa": "5 critérios ao mesmo tempo, em 2 sessões seguidas",
   "etapas": [
    "E2",
    "G",
    "E3a",
    "E3b"
   ]
  },
  {
   "sigla": "P3",
   "nome": "Proceder",
   "frase": "operar o paciente, com o preceptor cada vez mais longe",
   "onde": "no centro cirúrgico",
   "passa": "metas por fase: A, B e C",
   "etapas": [
    "E4"
   ]
  }
 ],
 "criterios": [
  {
   "criterio": "Desempenho global (GOALS)",
   "valor": "18 ou mais, de 25"
  },
  {
   "criterio": "Erros críticos (CE-1 a CE-8)",
   "valor": "nenhum"
  },
  {
   "criterio": "Etapas obrigatórias do checklist",
   "valor": "14 de 14"
  },
  {
   "criterio": "Confiança autorrelatada",
   "valor": "7 ou mais, de 10"
  },
  {
   "criterio": "Consistência",
   "valor": "2 sessões aprovadas seguidas"
  }
 ],
 "servicos": [
  {
   "id": "curso",
   "nome": "Curso de maestria em TAPP",
   "curto": "Curso",
   "descricao": "o percurso inteiro, da preparação ao encontro presencial, com o modelo 3D em comodato",
   "enquadramento": "curso",
   "confianca": "provavel",
   "grupo": "",
   "etapas": [
    "E0",
    "E1",
    "E2",
    "E3a",
    "E3b"
   ],
   "p": [
    "P1",
    "P2"
   ],
   "itens": [
    {
     "item": "Plataforma bilíngue (PT/ES) com teoria e teste",
     "canal": "digital",
     "confianca": "confirmado",
     "p": "P1"
    },
    {
     "item": "Onboarding com vídeo de referência",
     "canal": "digital",
     "confianca": "confirmado",
     "p": "P1"
    },
    {
     "item": "Modelo 3D da região inguinal, em comodato",
     "canal": "presencial",
     "confianca": "confirmado",
     "p": "P2"
    },
    {
     "item": "Prática autoguiada com checklist de erros críticos",
     "canal": "presencial",
     "confianca": "confirmado",
     "p": "P2"
    },
    {
     "item": "Sessão de correção ao vivo, para quem chega com maestria",
     "canal": "digital",
     "confianca": "confirmado",
     "p": "P2"
    },
    {
     "item": "Encontro presencial com o preceptor e os pares",
     "canal": "presencial",
     "confianca": "confirmado",
     "p": "P2"
    },
    {
     "item": "Certificado de conclusão",
     "canal": "digital",
     "confianca": "aberto",
     "p": "P2"
    }
   ]
  },
  {
   "id": "premodulos",
   "nome": "Pré-módulos de nivelamento",
   "curto": "Pré-módulos",
   "descricao": "habilidades de base para quem ainda não chega pronto ao TAPP",
   "enquadramento": "curso",
   "confianca": "aberto",
   "grupo": "",
   "etapas": [
    "E0"
   ],
   "p": [
    "P1"
   ],
   "itens": [
    {
     "item": "Fundamentos de videolaparoscopia",
     "canal": "digital",
     "confianca": "provavel",
     "p": ""
    },
    {
     "item": "Sutura e nós intracorpóreos",
     "canal": "digital",
     "confianca": "provavel",
     "p": ""
    },
    {
     "item": "Preparo cognitivo gamificado",
     "canal": "digital",
     "confianca": "provavel",
     "p": ""
    },
    {
     "item": "Manuseio de tela sem fixação mecânica",
     "canal": "digital",
     "confianca": "provavel",
     "p": ""
    }
   ]
  },
  {
   "id": "kit1",
   "nome": "Kit · nível 1 · aluguel",
   "curto": "Aluguel",
   "descricao": "o kit completo vai até o residente durante o curso",
   "enquadramento": "residente",
   "confianca": "aberto",
   "grupo": "kit",
   "etapas": [
    "E1",
    "E2"
   ],
   "p": [
    "P1",
    "P2"
   ],
   "itens": [
    {
     "item": "Box trainer, câmera USB e monitor comum",
     "canal": "presencial",
     "confianca": "confirmado",
     "p": ""
    },
    {
     "item": "Pinças e trocartes, sem torre e sem eletrocautério",
     "canal": "presencial",
     "confianca": "confirmado",
     "p": ""
    },
    {
     "item": "Envio e devolução ao fim do curso",
     "canal": "presencial",
     "confianca": "aberto",
     "p": ""
    }
   ]
  },
  {
   "id": "kit2",
   "nome": "Kit · nível 2 · liberdade guiada",
   "curto": "Guiada",
   "descricao": "o residente monta o próprio kit a partir de uma curadoria",
   "enquadramento": "residente",
   "confianca": "provavel",
   "grupo": "kit",
   "etapas": [
    "E1",
    "E2"
   ],
   "p": [
    "P1",
    "P2"
   ],
   "itens": [
    {
     "item": "Lista curada de instrumentos homologados",
     "canal": "digital",
     "confianca": "provavel",
     "p": ""
    },
    {
     "item": "Opções de importação",
     "canal": "digital",
     "confianca": "provavel",
     "p": ""
    },
    {
     "item": "Fornecedores de impressão 3D",
     "canal": "digital",
     "confianca": "provavel",
     "p": ""
    }
   ]
  },
  {
   "id": "kit3",
   "nome": "Kit · nível 3 · liberdade livre",
   "curto": "Livre",
   "descricao": "o residente compra o que preferir",
   "enquadramento": "residente",
   "confianca": "confirmado",
   "grupo": "kit",
   "etapas": [
    "E1",
    "E2"
   ],
   "p": [
    "P1",
    "P2"
   ],
   "itens": [
    {
     "item": "Compra livre, sem curadoria",
     "canal": "presencial",
     "confianca": "confirmado",
     "p": ""
    }
   ]
  },
  {
   "id": "estudo",
   "nome": "Estudo de validação 2.0",
   "curto": "Estudo",
   "descricao": "evidência de que o modelo distingue níveis de habilidade, em duas plataformas",
   "enquadramento": "inovacao",
   "confianca": "confirmado",
   "grupo": "",
   "etapas": [
    "V"
   ],
   "p": [],
   "itens": [
    {
     "item": "Estação laparoscópica",
     "canal": "presencial",
     "confianca": "confirmado",
     "p": ""
    },
    {
     "item": "Estação robótica",
     "canal": "presencial",
     "confianca": "confirmado",
     "p": ""
    },
    {
     "item": "Simulador de realidade virtual como referência",
     "canal": "presencial",
     "confianca": "confirmado",
     "p": ""
    },
    {
     "item": "Avaliação cega por vídeo (GOALS-GH e GEARS)",
     "canal": "digital",
     "confianca": "confirmado",
     "p": ""
    },
    {
     "item": "Pesquisa de atratividade com os 18 residentes",
     "canal": "presencial",
     "confianca": "provavel",
     "p": ""
    },
    {
     "item": "Aprovação do comitê de ética antes da coleta",
     "canal": "presencial",
     "confianca": "provavel",
     "p": ""
    }
   ]
  }
 ],
 "jornada": [
  {
   "etapa": "E0",
   "quando": "semana 0",
   "vive": "estuda a teoria do TAPP e faz os pré-módulos que lhe faltam",
   "atua": "plataforma",
   "bastidor": "teste com 90% para avançar · registro do progresso",
   "recurso": "plataforma e pré-módulos",
   "decide": "o próprio residente",
   "fonte": "primaria",
   "p": "P1",
   "paga": [
    "curso"
   ],
   "ganha": [
    "residente"
   ]
  },
  {
   "etapa": "E1",
   "quando": "semana 1",
   "vive": "tem o primeiro contato com o modelo, guiado por vídeo",
   "atua": "plataforma e turma",
   "bastidor": "entrega do modelo e do kit pelo nível escolhido",
   "recurso": "vídeo de referência",
   "decide": "o próprio residente",
   "fonte": "primaria",
   "p": "P1",
   "paga": [
    "curso",
    "residente"
   ],
   "ganha": [
    "residente"
   ]
  },
  {
   "etapa": "E2",
   "quando": "semanas 1 a 12",
   "vive": "repete o TAPP no modelo e se autoavalia a cada sessão",
   "atua": "o próprio residente",
   "bastidor": "troca de peças do modelo · checklist registrado na plataforma",
   "recurso": "modelo 3D, kit e consumíveis",
   "decide": "o próprio residente",
   "fonte": "primaria",
   "p": "P2",
   "paga": [
    "curso",
    "residente"
   ],
   "ganha": [
    "residente"
   ]
  },
  {
   "etapa": "E3a",
   "quando": "ao atingir a maestria",
   "vive": "é corrigido ao vivo nos detalhes que o checklist não pega",
   "atua": "preceptor",
   "bastidor": "seleção de quem cumpriu os 5 critérios",
   "recurso": "tempo do preceptor",
   "decide": "o preceptor",
   "fonte": "primaria",
   "p": "P2",
   "paga": [
    "curso"
   ],
   "ganha": [
    "residente"
   ]
  },
  {
   "etapa": "E3b",
   "quando": "depois da live",
   "vive": "encontra o preceptor e os pares que também chegaram",
   "atua": "preceptor e pares",
   "bastidor": "espaço, agenda e deslocamento",
   "recurso": "tempo do preceptor e espaço",
   "decide": "o preceptor",
   "fonte": "inferencia",
   "p": "P2",
   "paga": [
    "curso",
    "residente"
   ],
   "ganha": [
    "residente"
   ]
  },
  {
   "etapa": "E4",
   "quando": "depois da liberação",
   "vive": "opera pacientes reais, com supervisão que diminui a cada fase",
   "atua": "preceptor de rotina",
   "bastidor": "registro dos casos e das complicações",
   "recurso": "sala cirúrgica",
   "decide": "preceptor de rotina",
   "fonte": "primaria",
   "p": "P3",
   "paga": [
    "sus",
    "suplementar"
   ],
   "ganha": [
    "paciente",
    "sus",
    "operadora"
   ]
  }
 ],
 "evidencias": [
  {
   "id": "lacuna",
   "estudo": "Nenhum estudo",
   "tecnica": "TAPP",
   "mede": "transferência para o paciente",
   "achado": "nenhum ensaio de simulação em TAPP mediu complicação no paciente operado — é o que o ensaio do projeto vai medir",
   "confianca": "aberto"
  },
  {
   "id": "zendejas",
   "estudo": "Zendejas 2011 (ensaio randomizado)",
   "tecnica": "TEP",
   "mede": "complicação no paciente",
   "achado": "treino até a maestria reduziu complicação intraoperatória (29% → 7%) e pós-operatória",
   "confianca": "confirmado"
  },
  {
   "id": "dor",
   "estudo": "Zendejas 2011 (ensaio randomizado)",
   "tecnica": "TEP",
   "mede": "dor crônica",
   "achado": "a dor crônica foi medida e não diferiu entre os grupos — por isso o custo por QALY saiu da análise",
   "confianca": "confirmado"
  },
  {
   "id": "kurashima",
   "estudo": "Kurashima 2014 (ensaio randomizado)",
   "tecnica": "TEP",
   "mede": "desempenho em cirurgia real",
   "achado": "quem treinou no simulador melhorou o desempenho em cirurgia real, chegando à proficiência em ~5 sessões",
   "confianca": "confirmado"
  },
  {
   "id": "curva",
   "estudo": "Sivakumar 2023 (meta-análise, 22 estudos)",
   "tecnica": "TAPP",
   "mede": "curva de aprendizado",
   "achado": "vencer a curva do TAPP leva em mediana 37,5 casos, com 4,4× mais conversão e 1,6× mais complicação nessa fase",
   "confianca": "provavel"
  },
  {
   "id": "barros",
   "estudo": "Barros 2024",
   "tecnica": "TAPP",
   "mede": "validade de face",
   "achado": "o simulador Hernia3D foi aprovado por especialistas (5 de 5)",
   "confianca": "confirmado"
  },
  {
   "id": "shibuya",
   "estudo": "Shibuya 2024",
   "tecnica": "TAPP",
   "mede": "validade de construto",
   "achado": "outro simulador de TAPP, também de tomografia e com peritônio substituível, distingue residente de especialista",
   "confianca": "confirmado"
  },
  {
   "id": "melo",
   "estudo": "Melo Filho 2021 (Brasil)",
   "tecnica": "TAPP",
   "mede": "progresso no simulador",
   "achado": "um modelo brasileiro de baixo custo mostrou progresso em 6 sessões curtas, sem instrumento validado",
   "confianca": "provavel"
  }
 ],
 "achados": [
  {
   "camada": "ecossistema",
   "titulo": "Quem paga não é quem ganha",
   "texto": "quem compra o curso ainda está a confirmar (programa de residência, hospital de ensino ou Einstein). O ganho, a complicação evitada, volta para quem paga a cirurgia, e esse não paga o curso",
   "componente": [
    "segmentos"
   ]
  },
  {
   "camada": "sistema",
   "titulo": "A curva sai do centro cirúrgico",
   "texto": "hoje o residente aprende o TAPP no paciente, ao longo de 37,5 casos em mediana. O curso leva a parte íngreme da curva para o modelo",
   "componente": [
    "proposta"
   ]
  },
  {
   "camada": "servicos",
   "titulo": "Três portas para o kit",
   "texto": "do aluguel à compra livre, o residente não depende de infraestrutura hospitalar para treinar",
   "componente": [
    "canais"
   ]
  },
  {
   "camada": "jornadas",
   "titulo": "A etapa mais longa não tem preceptor",
   "texto": "como o residente corrige erro durante a prática autoguiada ainda é pergunta aberta",
   "componente": [
    "relacionamento"
   ]
  },
  {
   "camada": "fecho",
   "titulo": "Quem paga o curso",
   "texto": "o pagador da taxa ainda não existe: programa de residência, instituição ou o próprio residente",
   "componente": [
    "segmentos",
    "receita"
   ]
  },
  {
   "camada": "ecossistema",
   "titulo": "O maior pagador desincentiva a técnica",
   "texto": "o SUS paga 39% menos pela hérnia operada por vídeo do que pela aberta, e a saúde suplementar paga 115% mais. No SUS, o argumento só pode ser menos complicação",
   "componente": [
    "receita"
   ]
  },
  {
   "camada": "sistema",
   "titulo": "Só chega ao paciente quem passou no filtro",
   "texto": "a prática é autoguiada, e só quem cumpre os 5 critérios ao mesmo tempo segue para a live, o encontro presencial e o centro cirúrgico",
   "componente": [
    "atividades"
   ]
  },
  {
   "camada": "servicos",
   "titulo": "O estudo vem antes do curso",
   "texto": "a validação é paga por verba de inovação, não por receita, e a primeira turma espera o resultado",
   "componente": [
    "parcerias"
   ]
  },
  {
   "camada": "jornadas",
   "titulo": "O ganho aparece onde o curso não recebe",
   "texto": "a complicação evitada surge no centro cirúrgico, na última etapa, e quem colhe é o paciente e quem paga a cirurgia",
   "componente": [
    "receita"
   ]
  },
  {
   "camada": "fecho",
   "titulo": "O tempo do preceptor",
   "texto": "quantas horas de live e de presencial cabem na agenda de quem decide quem passa",
   "componente": [
    "recursos",
    "custos"
   ]
  },
  {
   "camada": "ecossistema",
   "titulo": "A indústria entra depois da prova",
   "texto": "o patrocínio por turma, de quem vende tela e instrumental, ainda é hipótese, e só se discute com a validação publicada",
   "componente": [
    "parcerias"
   ]
  },
  {
   "camada": "sistema",
   "titulo": "O limite é o tempo do preceptor",
   "texto": "nem o modelo nem o kit limitam o curso: o recurso mais escasso é o tempo de quem corrige, concentrado no fim",
   "componente": [
    "recursos",
    "custos"
   ]
  },
  {
   "camada": "fecho",
   "titulo": "A prova no TAPP",
   "texto": "o ensaio de transferibilidade, que mede complicação no paciente operado por quem treinou",
   "componente": [
    "proposta"
   ]
  }
 ],
 "curva": [
  {
   "id": "risco",
   "zona": "paciente",
   "rotulo": "4,4× conversão · 1,6× complicação",
   "texto": "na fase de aprendizado, o paciente tem 4,4× mais conversão para cirurgia aberta e 1,6× mais complicação pós-operatória",
   "confianca": "provavel",
   "posicao": 8.0,
   "fonte": "Sivakumar 2023"
  },
  {
   "id": "plato",
   "zona": "paciente",
   "rotulo": "platô em 37,5 casos",
   "texto": "vencer a curva do TAPP leva, em mediana, 37,5 casos reais (13 a 75), medidos pelo tempo cirúrgico",
   "confianca": "provavel",
   "posicao": 37.5,
   "fonte": "Sivakumar 2023"
  },
  {
   "id": "kurashima",
   "zona": "modelo",
   "rotulo": "proficiência em ~5 sessões",
   "texto": "num ensaio com simulador de TEP, a proficiência veio em 4,8 sessões, e o desempenho em cirurgia real melhorou",
   "confianca": "confirmado",
   "posicao": 5.0,
   "fonte": "Kurashima 2014"
  },
  {
   "id": "sessoes",
   "zona": "modelo",
   "rotulo": "mínimo de 16 sessões",
   "texto": "o protocolo Hernia3D exige 16 sessões ou mais antes do critério de maestria, e o respaldo direto desse número ainda está em aberto",
   "confianca": "aberto",
   "posicao": 16.0,
   "fonte": ""
  },
  {
   "id": "maestria",
   "zona": "limite",
   "rotulo": "maestria · 5 critérios",
   "texto": "só passa para o paciente quem cumpre os 5 critérios ao mesmo tempo, em 2 sessões seguidas",
   "confianca": "confirmado",
   "posicao": 0.0,
   "fonte": ""
  },
  {
   "id": "zendejas",
   "zona": "paciente",
   "rotulo": "precedente em TEP: 29% → 7%",
   "texto": "treino até a maestria reduziu a complicação intraoperatória de 29% para 7% nos primeiros casos reais, em TEP",
   "confianca": "confirmado",
   "posicao": 4.0,
   "fonte": "Zendejas 2011"
  },
  {
   "id": "transferencia",
   "zona": "paciente",
   "rotulo": "transferência no TAPP",
   "texto": "nenhum ensaio mostrou ainda que o treino em simulador de TAPP reduz complicação no paciente: é o que o ECR do projeto vai medir",
   "confianca": "aberto",
   "posicao": 20.0,
   "fonte": ""
  }
 ],
 "camadas": [
  {
   "id": "abertura",
   "n": "00",
   "rotulo": "Abertura",
   "cam": "abertura",
   "pergunta": "A curva sai do centro cirúrgico.",
   "manchete": "Os 3Ps são a progressão: preparar, praticar, proceder.",
   "elo": "quem paga para deslocar a curva?",
   "livro": "sim"
  },
  {
   "id": "ecossistema",
   "n": "01",
   "rotulo": "Quem sustenta, quem ganha",
   "cam": "ecossistema",
   "pergunta": "Quem paga para deslocar a curva, e quem colhe o ganho?",
   "manchete": "O dinheiro entra pela esquerda, o ganho sai pela direita e não volta a quem pagou.",
   "elo": "e que curva é essa que o curso desloca?",
   "livro": ""
  },
  {
   "id": "sistema",
   "n": "02",
   "rotulo": "A curva",
   "cam": "sistema",
   "pergunta": "Onde o residente aprende o TAPP, hoje e com o Hernia3D?",
   "manchete": "A parte íngreme da curva sai do paciente e vai para o modelo.",
   "elo": "o que, exatamente, se oferece?",
   "livro": ""
  },
  {
   "id": "servicos",
   "n": "03",
   "rotulo": "O que se oferece",
   "cam": "serviços",
   "pergunta": "O que entra em cada oferta, e quem paga?",
   "manchete": "Três ofertas: o curso, os pré-módulos que nivelam e o kit em três portas.",
   "elo": "como o residente vive isso, etapa por etapa?",
   "livro": ""
  },
  {
   "id": "jornadas",
   "n": "04",
   "rotulo": "O que se vive",
   "cam": "jornadas",
   "pergunta": "O que o residente vive, e o que roda por trás?",
   "manchete": "Doze semanas no modelo, sem preceptor a cada sessão: ele entra depois da maestria.",
   "elo": "o que falta definir para virar negócio?",
   "livro": ""
  },
  {
   "id": "direcao",
   "n": "05",
   "rotulo": "O que decidir",
   "cam": "direção",
   "pergunta": "O que falta definir para o curso virar negócio?",
   "manchete": "Nove blocos do modelo de negócio: em cada um, o que já temos, o que pedimos e o que falta definir.",
   "elo": "ao começo: a abertura",
   "livro": "sim"
  }
 ],
 "proposta": [
  {
   "id": "segmentos",
   "bloco": "Segmentos de clientes",
   "componente": "quem compra e quem usa",
   "cor": "#2F6FA8",
   "temos": "quem usa está claro: o residente de cirurgia geral, que hoje aprende o TAPP no paciente, sem uma trilha formal de treino no modelo",
   "preciso": "quem compra: o programa de residência, o hospital de ensino, o Einstein ou o próprio residente, e se o piloto é pago ou interno",
   "pedido": "definir quem compra o curso no piloto, e se a primeira turma é paga ou interna",
   "confianca": "aberto"
  },
  {
   "id": "proposta",
   "bloco": "Proposta de valor",
   "componente": "o que se entrega",
   "cor": "#7A4E9C",
   "temos": "um curso de maestria em TAPP: o residente repete no modelo impresso em 3D até cumprir um critério objetivo, e só então opera",
   "preciso": "a prova de que o treino no modelo reduz complicação no paciente operado por TAPP. Hoje ela existe só para a outra técnica, a TEP",
   "pedido": "apoiar o estudo de validação agora e o ensaio clínico depois, que mede a complicação no paciente operado por quem treinou",
   "confianca": "provavel"
  },
  {
   "id": "canais",
   "bloco": "Canais",
   "componente": "como o curso chega",
   "cor": "#9C8B6E",
   "temos": "a plataforma do residente, pública, em português e espanhol, e o kit que vai para casa em três portas",
   "preciso": "como o curso chega a outros programas de residência: pelas sociedades de cirurgia, pela comissão de residência ou por convite direto",
   "pedido": "ceder a sala e a torre de vídeo dos encontros presenciais, e dizer como o nome Einstein aparece na divulgação",
   "confianca": "provavel"
  },
  {
   "id": "relacionamento",
   "bloco": "Relacionamento",
   "componente": "por que o residente fica",
   "cor": "#9C8B6E",
   "temos": "o kit emprestado, não vendido · as sessões gravadas e os 5 critérios registrados · a live e o presencial com o preceptor depois da maestria · o certificado ao final",
   "preciso": "como o residente corrige erro nas sessões sem preceptor ao lado, e quantos chegam à maestria",
   "pedido": "reconhecer o certificado de maestria dentro do programa de residência",
   "confianca": "provavel"
  },
  {
   "id": "receita",
   "bloco": "Fontes de receita",
   "componente": "quem paga e como",
   "cor": "#2E6B3E",
   "temos": "a taxa do curso, por turma · o modelo e o kit viajam dentro da taxa",
   "preciso": "quem paga a taxa, o preço da trilha para o cirurgião que já opera, o patrocínio da indústria por turma e o aluguel do kit",
   "pedido": "o dado de quanto custa uma complicação de hérnia no próprio serviço: é ele que diz se o curso se paga para quem paga a cirurgia",
   "confianca": "aberto"
  },
  {
   "id": "recursos",
   "bloco": "Recursos-chave",
   "componente": "o que é escasso",
   "cor": "#2A8C8C",
   "temos": "o modelo impresso em 3D, que se imprime sob demanda · o protocolo de maestria documentado · a plataforma do residente",
   "preciso": "quanto tempo do preceptor cabe no curso. É o recurso mais escasso, porque é ele quem decide quem passa",
   "pedido": "reservar na agenda do preceptor o tempo da live e dos encontros presenciais da primeira turma",
   "confianca": "provavel"
  },
  {
   "id": "atividades",
   "bloco": "Atividades-chave",
   "componente": "o que se faz",
   "cor": "#C2672A",
   "temos": "repetir no modelo até a maestria, com 5 critérios em duas sessões seguidas · corrigir ao vivo e no presencial só quem chegou lá",
   "preciso": "quantas sessões e que critérios bastam: o mínimo de 16 sessões ainda não tem respaldo direto",
   "pedido": "convocar o painel de especialistas que fecha o número de sessões e os critérios antes do piloto",
   "confianca": "provavel"
  },
  {
   "id": "parcerias",
   "bloco": "Parcerias-chave",
   "componente": "com quem",
   "cor": "#9C8B6E",
   "temos": "o Einstein como casa do curso e do estudo, com centro de treinamento próprio · quem imprime o modelo · o comitê de ética do estudo",
   "preciso": "a infraestrutura de robótica e realidade virtual do estudo, a confirmar · o parceiro da indústria, que o kit barato e genérico deixou sem papel claro",
   "pedido": "confirmar a infraestrutura de robótica e realidade virtual do Einstein para o estudo de validação",
   "confianca": "aberto"
  },
  {
   "id": "custos",
   "bloco": "Estrutura de custos",
   "componente": "o que pesa",
   "cor": "#B8860B",
   "temos": "o modelo, os consumíveis e o kit, amortizados no preço por residente · a plataforma, de custo marginal baixo",
   "preciso": "o tempo do preceptor, que é o custo que pesa, e os pré-módulos: quais, quem produz, a que custo",
   "pedido": "dizer quem produz os pré-módulos: a equipe do curso ou uma área do Einstein",
   "confianca": "provavel"
  }
 ],
 "pendencias": [
  {
   "curto": "Quem compra o curso, e se o piloto é pago ou interno",
   "dono": "o preceptor, com quem compra",
   "prazo": "até nov/2026",
   "componente": "segmentos",
   "portao": "piloto"
  },
  {
   "curto": "Quantos programas e residentes, com dado primário",
   "dono": "a coordenação",
   "prazo": "a definir",
   "componente": "segmentos",
   "portao": "venda"
  },
  {
   "curto": "Se o treino no modelo reduz complicação no TAPP",
   "dono": "o ensaio clínico, depois do estudo de validação",
   "prazo": "18 a 24 meses",
   "componente": "proposta",
   "portao": "depois"
  },
  {
   "curto": "Preço e logística do aluguel do kit, e a lista curada",
   "dono": "a coordenação, com o fornecedor do kit",
   "prazo": "a definir",
   "componente": "canais",
   "portao": "venda"
  },
  {
   "curto": "Como o residente corrige erro sem preceptor ao lado",
   "dono": "o preceptor",
   "prazo": "a definir",
   "componente": "relacionamento",
   "portao": "piloto"
  },
  {
   "curto": "Quanto custa uma complicação para quem paga a cirurgia",
   "dono": "o preceptor, com o dado do serviço",
   "prazo": "a definir",
   "componente": "receita",
   "portao": "venda"
  },
  {
   "curto": "O preço da trilha para o cirurgião que já opera",
   "dono": "o preceptor, depois de ouvir esse público",
   "prazo": "a definir",
   "componente": "receita",
   "portao": "depois"
  },
  {
   "curto": "Quanto tempo do preceptor cabe no curso",
   "dono": "o preceptor",
   "prazo": "a definir",
   "componente": "recursos",
   "portao": "piloto"
  },
  {
   "curto": "Quantas sessões e que critérios liberam o residente",
   "dono": "o preceptor, com o painel de especialistas",
   "prazo": "antes do piloto",
   "componente": "atividades",
   "portao": "piloto"
  },
  {
   "curto": "A robótica e a realidade virtual do estudo",
   "dono": "o preceptor, com a infraestrutura do Einstein",
   "prazo": "antes da coleta do estudo",
   "componente": "parcerias",
   "portao": "piloto"
  },
  {
   "curto": "O parceiro da indústria e o patrocínio por turma",
   "dono": "a coordenação",
   "prazo": "a definir",
   "componente": "parcerias",
   "portao": "venda"
  },
  {
   "curto": "Que pré-módulos, quem os produz e a que custo",
   "dono": "o preceptor e a coordenação",
   "prazo": "a definir",
   "componente": "custos",
   "portao": "piloto"
  },
  {
   "curto": "Quanto dura e quanto custa repor o peritônio do modelo",
   "dono": "a bancada do projeto",
   "prazo": "até nov/2026",
   "componente": "custos",
   "portao": "piloto"
  }
 ],
 "nao_ouvidos": [
  {
   "grupo": "Residentes"
  },
  {
   "grupo": "Programas de residência e hospitais de ensino"
  },
  {
   "grupo": "Gestor do SUS e operadora"
  },
  {
   "grupo": "Indústria"
  },
  {
   "grupo": "Cirurgião que já opera"
  }
 ],
 "compradores": [
  {
   "nome": "Programa de residência",
   "foco": ""
  },
  {
   "nome": "Hospital de ensino",
   "foco": ""
  },
  {
   "nome": "O Einstein",
   "foco": ""
  },
  {
   "nome": "O próprio residente",
   "foco": ""
  }
 ],
 "sintese": {
  "direcao": "O curso fica de pé com três definições: quem paga, o tempo do preceptor e a prova no TAPP",
  "fator_minimo": "Quem paga o curso",
  "limite": "sobram modelo e kit, porque os modelos se imprimem sob demanda. O recurso mais escasso é o tempo do preceptor, e antes dele falta quem pague. Reforçar o que sobra não muda o resultado"
 }
};
