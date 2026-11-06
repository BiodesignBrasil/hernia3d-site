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
   "papel": "quem compra o curso: o programa de residência, o hospital de ensino, o Einstein ou o próprio residente, a confirmar",
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
   "papel": "cederia sala e torre de vídeo para o encontro presencial, a confirmar",
   "curto": "sala e torre de vídeo · a confirmar",
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
  },
  "infraestrutura": {
   "rotulo": "cessão de infraestrutura",
   "curto": "cessão",
   "cor": "#7A5230",
   "fundo": "#F4ECE3"
  },
  "patrocinio": {
   "rotulo": "patrocínio da indústria · a explorar",
   "curto": "patrocínio",
   "cor": "#2A8C8C",
   "fundo": "#E3F2F2"
  }
 },
 "fluxos": [
  {
   "id": "F2",
   "de": "comprador",
   "para": "projeto",
   "oque": "paga a taxa do curso, por residente, com desconto por volume",
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
   "oque": "aluga o kit completo (porta 1)",
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
   "oque": "compra o próprio kit (portas 2 e 3)",
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
   "oque": "menos complicação esperada nos primeiros casos operados (a redução só foi demonstrada na outra técnica, a TEP)",
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
   "oque": "menos complicação esperada para o SUS pagar",
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
   "oque": "menos complicação esperada para a operadora pagar",
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
   "enquadramento": "patrocinio",
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
   "oque": "cederia sala e torre de vídeo para o encontro presencial (a confirmar)",
   "tipo": "confirmar",
   "enquadramento": "infraestrutura",
   "etapas": [
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
   "nome": "Preparação: teoria, teste e pré-módulos",
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
   "nome": "Estudo de validação em laparoscopia e em robótica",
   "curto": "Estudo 2.0",
   "oque": "a versão nova do modelo, a do curso, distingue novato de especialista? Nas duas plataformas, com um simulador de realidade virtual como referência",
   "duracao": "coleta após a aprovação ética, data a confirmar",
   "elegivel": "18 novatos e 10 especialistas",
   "recurso": "torre de vídeo, robótica, realidade virtual e avaliação cega por vídeo",
   "gate": "aprovação do comitê de ética antes da coleta",
   "confianca": "provavel"
  },
  {
   "id": "E1",
   "trilho": "curso",
   "tipo": "etapa",
   "p": "P1",
   "nome": "Primeira sessão",
   "curto": "Primeira sessão",
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
   "confianca": "confirmado"
  },
  {
   "id": "ECR",
   "trilho": "sequencia",
   "tipo": "marco",
   "p": "",
   "nome": "Ensaio de transferência para o paciente",
   "curto": "Ensaio clínico",
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
   "oque": "só passa quem cumpre os 5 critérios de maestria",
   "duracao": "2 sessões seguidas",
   "elegivel": "quem completa a prática",
   "recurso": "checklist, escala de desempenho (GOALS) e autoavaliação",
   "gate": "a taxa de quem chega à maestria não é conhecida",
   "confianca": "confirmado"
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
   "confianca": "confirmado"
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
   "gate": "o custo de espaço e deslocamento ainda não foi calculado",
   "confianca": "confirmado"
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
   "confianca": "confirmado"
  }
 ],
 "abertura": [
  {
   "chave": "oque",
   "pergunta": "O quê",
   "resposta": "um curso de maestria em hérnia inguinal por TAPP (correção da hérnia por vídeo, por dentro do abdome), num modelo impresso em 3D a partir de tomografia"
  },
  {
   "chave": "porque",
   "pergunta": "Por quê",
   "resposta": "vencer a curva do TAPP leva, em mediana, 37,5 casos reais. Na cirurgia de hérnia por vídeo (TEP e TAPP juntas), a fase de aprendizado tem 4,4× mais conversão para cirurgia aberta e 1,6× mais complicação (evidência de baixa certeza)"
  },
  {
   "chave": "quem",
   "pergunta": "Para quem",
   "resposta": "o residente de cirurgia geral, e o preceptor, que libera para o paciente só quem passou no critério de maestria"
  },
  {
   "chave": "onde",
   "pergunta": "Onde",
   "resposta": "no modelo, em casa ou no hospital, com o kit em três portas · depois, uma live e um encontro presencial com o preceptor · por fim, o centro cirúrgico"
  },
  {
   "chave": "quando",
   "pergunta": "Quando",
   "resposta": "antes do primeiro TAPP no paciente: 16 sessões ou mais (número do protocolo, a validar), 2 por semana, em até 12 semanas"
  },
  {
   "chave": "como",
   "pergunta": "Como",
   "resposta": "progressão por proficiência: só avança quem cumpre o critério, não quem cumpre o tempo · em três passos:"
  },
  {
   "chave": "quanto",
   "pergunta": "Quanto",
   "resposta": "em definição (ver a síntese)"
  }
 ],
 "ps": [
  {
   "sigla": "P1",
   "nome": "Preparar",
   "frase": "conhecer a anatomia e nomeá-la antes de cortar",
   "onde": "na teoria e nos pré-módulos, e depois na primeira sessão com o modelo",
   "passa": "90% ou mais no teste teórico",
   "verbo": "nivela",
   "mede": "o teste teórico",
   "entrega": "a base nivelada",
   "etapas": [
    "E0",
    "E1"
   ]
  },
  {
   "sigla": "P2",
   "nome": "Praticar",
   "frase": "o TAPP inteiro no modelo, de novo, até passar",
   "onde": "no modelo, com checklist, por 16 sessões ou mais (número do protocolo, a validar) · depois, numa live e num encontro com o preceptor",
   "passa": "os 5 critérios de maestria",
   "verbo": "repete e mede",
   "mede": "cada sessão, pelo checklist",
   "entrega": "as sessões medidas",
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
   "verbo": "acompanha",
   "mede": "as metas de cada fase",
   "entrega": "autonomia, fase a fase",
   "etapas": [
    "E4"
   ]
  }
 ],
 "criterios": [
  {
   "criterio": "Desempenho global (escala GOALS)",
   "valor": "18 ou mais, de 25",
   "confianca": "aberto"
  },
  {
   "criterio": "Erros críticos",
   "valor": "nenhum dos 8 tipos",
   "confianca": "aberto"
  },
  {
   "criterio": "Etapas obrigatórias do checklist",
   "valor": "14 de 14",
   "confianca": "aberto"
  },
  {
   "criterio": "Confiança autorrelatada",
   "valor": "7 ou mais, de 10",
   "confianca": "aberto"
  },
  {
   "criterio": "Consistência",
   "valor": "2 sessões aprovadas seguidas",
   "confianca": "aberto"
  }
 ],
 "servicos": [
  {
   "id": "kit1",
   "nome": "Kit · porta 1 · aluguel",
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
     "item": "Caixa de treino, câmera USB e monitor comum",
     "canal": "presencial",
     "confianca": "confirmado",
     "p": ""
    },
    {
     "item": "Pinças e trocartes, sem torre de vídeo e sem eletrocautério",
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
   "nome": "Kit · porta 2 · liberdade guiada",
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
     "item": "Lista curada de instrumentos regularizados",
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
   "nome": "Kit · porta 3 · por sua conta",
   "curto": "Por sua conta",
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
     "item": "Manuseio de tela sem fixação mecânica",
     "canal": "digital",
     "confianca": "provavel",
     "p": ""
    }
   ]
  },
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
     "item": "Primeira sessão com vídeo de referência",
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
     "item": "Certificado de maestria",
     "canal": "digital",
     "confianca": "aberto",
     "p": "P2"
    }
   ]
  },
  {
   "id": "estudo",
   "nome": "Estudo de validação 2.0",
   "curto": "Estudo",
   "descricao": "testa se a versão nova do modelo, a do curso, distingue novato de especialista, em laparoscopia e em robótica",
   "enquadramento": "inovacao",
   "confianca": "provavel",
   "grupo": "",
   "etapas": [
    "V"
   ],
   "p": [],
   "itens": []
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
   "bastidor": "entrega do modelo em comodato · o kit chega pela porta escolhida",
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
   "decide": "o próprio residente (autoavaliação)",
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
   "bastidor": "espaço, data e deslocamento",
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
   "achado": "nenhum ensaio de simulação em TAPP mediu complicação no paciente operado: é o que um ensaio planejado pelo projeto, ainda sem data, quer medir",
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
   "id": "kurashima",
   "estudo": "Kurashima 2014 (ensaio randomizado)",
   "tecnica": "TEP",
   "mede": "desempenho em cirurgia real",
   "achado": "quem treinou no simulador melhorou o desempenho em cirurgia real, chegando à proficiência em ~5 sessões",
   "confianca": "confirmado"
  },
  {
   "id": "curva",
   "estudo": "Sivakumar 2023 (meta-análise, 22 estudos, 6 de TAPP)",
   "tecnica": "TEP e TAPP",
   "mede": "curva de aprendizado",
   "achado": "a curva do TAPP leva em mediana 37,5 casos (13 a 75) · na cirurgia de hérnia por vídeo (TEP e TAPP juntas), a fase de aprendizado tem 4,4× mais conversão e 1,6× mais complicação (evidência de baixa certeza)",
   "confianca": "confirmado"
  },
  {
   "id": "barros",
   "estudo": "Barros 2024",
   "tecnica": "TAPP",
   "mede": "validade de face",
   "achado": "28 cirurgiões avaliaram a primeira versão do modelo: utilidade 5 de 5, realismo e anatomia 4 de 5 (medianas)",
   "confianca": "confirmado"
  }
 ],
 "achados": [
  {
   "camada": "ecossistema",
   "titulo": "Quem paga não é quem ganha",
   "texto": "quem compra o curso não colhe o ganho: o ganho esperado fica com o paciente e com quem paga a cirurgia, que não paga o curso",
   "componente": [
    "segmentos"
   ]
  },
  {
   "camada": "sistema",
   "titulo": "Só chega ao paciente quem passou no filtro",
   "texto": "a prática é autoguiada, e só quem cumpre os 5 critérios de maestria segue para a live, o encontro presencial e o centro cirúrgico",
   "componente": [
    "atividades"
   ]
  },
  {
   "camada": "servicos",
   "titulo": "Três portas para o kit",
   "texto": "do aluguel à compra livre, o residente paga o kit e não depende de infraestrutura hospitalar para treinar",
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
   "texto": "ainda não há quem pague a taxa: nenhum dos quatro compradores possíveis está confirmado",
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
   "titulo": "A curva sai do centro cirúrgico",
   "texto": "hoje a curva de aprendizado do TAPP acontece no paciente, ao longo de 37,5 casos em mediana. O método leva a parte íngreme para o modelo, antes do critério de maestria",
   "componente": [
    "proposta"
   ]
  },
  {
   "camada": "servicos",
   "titulo": "O estudo vem antes do curso",
   "texto": "a validação vem primeiro, paga fora da receita do curso",
   "componente": [
    "proposta"
   ]
  },
  {
   "camada": "jornadas",
   "titulo": "O ganho aparece onde o curso não recebe",
   "texto": "a complicação que se espera evitar está no centro cirúrgico, a última etapa: o ganho ficaria com o paciente e com quem paga a cirurgia",
   "componente": [
    "receita"
   ]
  },
  {
   "camada": "fecho",
   "titulo": "O tempo do preceptor",
   "texto": "quanto tempo de live e de encontro presencial cabe na rotina de quem decide quem passa",
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
   "titulo": "No curso, o recurso escasso é o tempo do preceptor",
   "texto": "o modelo se imprime sob demanda, mas a frota do piloto ainda precisa ser paga, e o kit fica por conta do residente. O que pesa é o tempo de quem corrige, concentrado no fim do curso",
   "componente": [
    "recursos",
    "custos"
   ]
  },
  {
   "camada": "fecho",
   "titulo": "A prova no TAPP",
   "texto": "o ensaio clínico que vai medir se o paciente operado por quem treinou no modelo tem menos complicação",
   "componente": [
    "proposta"
   ]
  }
 ],
 "curva": [
  {
   "id": "risco",
   "zona": "paciente",
   "rotulo": "4,4× mais conversão e 1,6× mais complicação (TEP e TAPP juntas, baixa certeza)",
   "texto": "na cirurgia de hérnia por vídeo (TEP e TAPP juntas), a fase de aprendizado tem 4,4× mais conversão para cirurgia aberta e 1,6× mais complicação (evidência de baixa certeza)",
   "confianca": "confirmado",
   "posicao": 8.0,
   "fonte": "Sivakumar 2023"
  },
  {
   "id": "plato",
   "zona": "paciente",
   "rotulo": "platô em 37,5 casos",
   "texto": "vencer a curva do TAPP leva, em mediana, 37,5 casos reais (13 a 75), medidos pelo tempo cirúrgico",
   "confianca": "confirmado",
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
   "rotulo": "16 sessões ou mais",
   "texto": "o Hernia3D pede 16 sessões ou mais antes do critério de maestria: é o número do protocolo, ainda a validar pelo painel de especialistas",
   "confianca": "aberto",
   "posicao": 16.0,
   "fonte": ""
  },
  {
   "id": "maestria",
   "zona": "limite",
   "rotulo": "maestria · 5 critérios",
   "texto": "só passa para o paciente quem cumpre os 5 critérios de maestria",
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
   "texto": "nenhum ensaio mostrou ainda que o treino em simulador de TAPP reduz complicação no paciente: é o que um ensaio planejado pelo projeto, ainda sem data, quer medir",
   "confianca": "aberto",
   "posicao": 20.0,
   "fonte": ""
  }
 ],
 "camadas": [
  {
   "id": "abertura",
   "n": "",
   "rotulo": "Abertura",
   "cam": "abertura",
   "pergunta": "A curva sai do centro cirúrgico.",
   "manchete": "Os 3Ps são a progressão: preparar, praticar, proceder.",
   "elo": "quem paga para deslocar a curva?",
   "livro": "sim"
  },
  {
   "id": "ecossistema",
   "n": "",
   "rotulo": "Quem sustenta, quem ganha",
   "cam": "ecossistema",
   "pergunta": "Quem paga para deslocar a curva, e quem colhe o ganho?",
   "manchete": "O dinheiro entra pela esquerda, o ganho esperado sai pela direita e não volta a quem pagou.",
   "elo": "e como o método torna isso seguro?",
   "livro": ""
  },
  {
   "id": "sistema",
   "n": "",
   "rotulo": "O método",
   "cam": "sistema",
   "pergunta": "Como se chega ao paciente com segurança, hoje e com o Hernia3D?",
   "manchete": "O erro sai do paciente e vai para o modelo: só opera quem cumpriu o critério de maestria.",
   "elo": "por que as áreas vêm nesta ordem?",
   "livro": ""
  },
  {
   "id": "ancora",
   "n": "",
   "rotulo": "A âncora",
   "cam": "âncora",
   "pergunta": "Por que as áreas vêm nesta ordem?",
   "manchete": "A segurança é a âncora: ela pousa no como, e cada área depende da anterior.",
   "elo": "como o método acontece, etapa por etapa?",
   "livro": ""
  },
  {
   "id": "jornadas",
   "n": "1",
   "rotulo": "Como: a operação",
   "cam": "como",
   "pergunta": "Como o método acontece, etapa por etapa, e o que roda por trás?",
   "manchete": "Até doze semanas no modelo, sem preceptor a cada sessão: ele entra depois da maestria.",
   "elo": "o que o curso entrega?",
   "livro": ""
  },
  {
   "id": "servicos",
   "n": "2",
   "rotulo": "O que: o portfólio",
   "cam": "o que",
   "pergunta": "O que o curso entrega, e quem paga cada parte?",
   "manchete": "Três ofertas, na ordem em que o residente as encontra: o kit em três portas, os pré-módulos que nivelam e o curso.",
   "elo": "quem vive o curso, e quem compra?",
   "livro": ""
  },
  {
   "id": "plataforma",
   "n": "3",
   "rotulo": "Quem: o residente, na plataforma",
   "cam": "quem",
   "pergunta": "Quem vive o curso, e quem compra?",
   "manchete": "O curso na voz do residente, estação por estação. Quem compra ainda está em aberto.",
   "elo": "quanto custa, e quem paga a soma?",
   "livro": ""
  },
  {
   "id": "economico",
   "n": "4",
   "rotulo": "Quanto: o caso econômico",
   "cam": "quanto",
   "pergunta": "Quanto custa, e quem paga a soma?",
   "manchete": "O curso se paga quando uma complicação custa, a quem paga a cirurgia, mais do que o curso gasta para evitar cada uma.",
   "elo": "o que falta definir para virar negócio?",
   "livro": ""
  },
  {
   "id": "direcao",
   "n": "",
   "rotulo": "A síntese",
   "cam": "síntese",
   "pergunta": "O que falta definir para o curso virar negócio?",
   "manchete": "Quatro áreas, amarradas na segurança, com as travas de cada uma.",
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
   "preciso": "quem compra primeiro, entre os quatro possíveis, e quantos programas e residentes há, com dado primário",
   "pedido": "dizer se o Einstein compra a primeira turma ou a oferece como interna",
   "confianca": "aberto"
  },
  {
   "id": "proposta",
   "bloco": "Proposta de valor",
   "componente": "o que se entrega",
   "cor": "#7A4E9C",
   "temos": "um curso de maestria em TAPP · o que se vende é o treino repetido até um critério de maestria, não o modelo",
   "preciso": "a prova de que o treino no modelo reduz complicação no paciente operado por TAPP. Hoje ela existe só para a outra técnica, a TEP",
   "pedido": "apoiar o estudo de validação agora e o ensaio clínico depois, que vai medir a complicação no paciente operado por quem treinou",
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
   "temos": "o modelo em comodato, não vendido · os registros das sessões e dos 5 critérios de maestria · a live e o presencial com o preceptor depois da maestria",
   "preciso": "como o residente corrige erro nas sessões sem preceptor ao lado, e quantos chegam à maestria",
   "pedido": "reconhecer o certificado de maestria dentro do programa de residência",
   "confianca": "provavel"
  },
  {
   "id": "receita",
   "bloco": "Fontes de receita",
   "componente": "quem paga e como",
   "cor": "#2E6B3E",
   "temos": "a taxa do curso, por residente, com desconto por volume · a taxa cobre o modelo, em comodato · o residente paga o kit à parte, em três portas",
   "preciso": "quem paga a taxa, o preço da trilha para o cirurgião que já opera, o patrocínio da indústria por turma e o aluguel do kit · medir quanto residentes, programas e hospitais aceitam pagar antes de fechar o preço",
   "pedido": "o dado de quanto custa uma complicação de hérnia no próprio serviço: é ele que diz se o curso se paga para quem paga a cirurgia",
   "confianca": "aberto"
  },
  {
   "id": "recursos",
   "bloco": "Recursos-chave",
   "componente": "o que é escasso",
   "cor": "#2A8C8C",
   "temos": "o modelo, que se imprime sob demanda · o protocolo de maestria documentado · a plataforma do residente",
   "preciso": "quem paga a frota de modelos e kits do piloto, e quanto tempo do preceptor cabe no curso: o recurso mais escasso, porque só o preceptor decide quem passa",
   "pedido": "reservar o tempo do preceptor para a live e os encontros presenciais da primeira turma",
   "confianca": "provavel"
  },
  {
   "id": "atividades",
   "bloco": "Atividades-chave",
   "componente": "o que se faz",
   "cor": "#C2672A",
   "temos": "repetir no modelo até cumprir os 5 critérios de maestria · corrigir ao vivo e no presencial só quem chegou lá",
   "preciso": "quantas sessões e que critérios bastam: as 16 sessões ou mais são o número do protocolo, a validar",
   "pedido": "convocar o painel de especialistas que fecha o número de sessões e os critérios antes do piloto",
   "confianca": "provavel"
  },
  {
   "id": "parcerias",
   "bloco": "Parcerias-chave",
   "componente": "com quem",
   "cor": "#9C8B6E",
   "temos": "o Einstein como casa do estudo, com centro de treinamento próprio (o encontro presencial, a confirmar) · quem imprime o modelo · o comitê de ética, com a aprovação pendente",
   "preciso": "a infraestrutura de robótica e realidade virtual do estudo, a confirmar · o papel do parceiro da indústria no curso",
   "pedido": "confirmar a infraestrutura de robótica e realidade virtual do Einstein para o estudo de validação",
   "confianca": "aberto"
  },
  {
   "id": "custos",
   "bloco": "Estrutura de custos",
   "componente": "o que pesa",
   "cor": "#B8860B",
   "temos": "o modelo, em comodato, e os consumíveis, dentro do preço por residente · o kit, pago pelo residente à parte · a plataforma, que custa pouco a cada residente a mais",
   "preciso": "o tempo do preceptor, que é o custo que pesa, e os pré-módulos: quais, quem produz, a que custo",
   "pedido": "dizer quem produz os pré-módulos: a equipe do curso ou uma área do Einstein",
   "confianca": "provavel"
  }
 ],
 "pendencias": [
  {
   "curto": "Quem compra o curso, e se o piloto é pago ou interno",
   "dono": "o responsável clínico do projeto, com quem compra",
   "prazo": "até nov/2026",
   "componente": "segmentos",
   "portao": "piloto"
  },
  {
   "curto": "Quantos programas e residentes, com dado primário",
   "dono": "a coordenação do projeto",
   "prazo": "a definir",
   "componente": "segmentos",
   "portao": "venda"
  },
  {
   "curto": "Se o treino no modelo reduz complicação no TAPP",
   "dono": "o responsável clínico do projeto, pelo ensaio clínico",
   "prazo": "18 a 24 meses, depois do estudo de validação",
   "componente": "proposta",
   "portao": "depois"
  },
  {
   "curto": "Preço e logística do aluguel do kit, e a lista curada",
   "dono": "a coordenação do projeto, com o fornecedor do kit",
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
   "curto": "A que preço o curso fecha para cada comprador",
   "dono": "a coordenação do projeto",
   "prazo": "antes do piloto",
   "componente": "receita",
   "portao": "piloto"
  },
  {
   "curto": "Quanto custa uma complicação para quem paga a cirurgia",
   "dono": "o responsável clínico do projeto, com o dado do serviço",
   "prazo": "a definir",
   "componente": "receita",
   "portao": "venda"
  },
  {
   "curto": "O preço da trilha para o cirurgião que já opera",
   "dono": "o responsável clínico do projeto, depois de ouvir esse público",
   "prazo": "a definir",
   "componente": "receita",
   "portao": "depois"
  },
  {
   "curto": "Quanto tempo do preceptor cabe no curso",
   "dono": "o responsável clínico do projeto",
   "prazo": "a definir",
   "componente": "recursos",
   "portao": "piloto"
  },
  {
   "curto": "Quantos modelos e kits o piloto precisa, e quem paga a frota",
   "dono": "a coordenação do projeto",
   "prazo": "antes do piloto",
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
   "dono": "o responsável clínico do projeto, com a infraestrutura do Einstein",
   "prazo": "antes da coleta do estudo",
   "componente": "parcerias",
   "portao": "piloto"
  },
  {
   "curto": "O parceiro da indústria e o patrocínio por turma",
   "dono": "a coordenação do projeto",
   "prazo": "a definir",
   "componente": "parcerias",
   "portao": "venda"
  },
  {
   "curto": "Que pré-módulos, quem os produz e a que custo",
   "dono": "o responsável clínico e a coordenação do projeto",
   "prazo": "a definir",
   "componente": "custos",
   "portao": "piloto"
  },
  {
   "curto": "Quanto dura e quanto custa repor as peças que se trocam no modelo",
   "dono": "a coordenação do projeto, em testes com o modelo",
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
  "gargalo": "Uma restrição por vez: hoje, o estudo de validação. Até ele fechar, as outras áreas esperam",
  "ancora": "a segurança",
  "ancora_porque": "É o que diferencia o curso do que se faz hoje. Sem ela provada, nada do resto se sustenta",
  "ancora_pousa": "A segurança não se promete, se produz. Quem a produz é o método, e quem a prova é o estudo de validação",
  "promessa": "O curso promete a maestria no modelo. A prova no paciente operado por TAPP depende do ensaio clínico"
 },
 "gargalo": [
  {
   "id": "estudo",
   "lado": "frente",
   "aduela": "Estudo de validação",
   "oque": "o estudo no Einstein que testa a versão nova do modelo com residentes e cirurgiões: se ele distingue quem já domina a técnica de quem está aprendendo",
   "fluxo": "do protótipo à evidência que o comprador pede para aprovar o piloto",
   "alavanca": "a aprovação ética e a coleta com os residentes do estudo",
   "quem": "o responsável clínico do projeto, com o comitê de ética",
   "prazo": "coleta depois da aprovação ética, data a confirmar",
   "confianca": "provavel",
   "area": "como",
   "altura": 8
  },
  {
   "id": "modelo",
   "lado": "tras",
   "aduela": "Modelo 3D em comodato",
   "oque": "o modelo impresso da região inguinal, emprestado ao residente durante o curso",
   "fluxo": "",
   "alavanca": "",
   "quem": "",
   "prazo": "",
   "confianca": "confirmado",
   "area": "como",
   "altura": 100
  },
  {
   "id": "comprador",
   "lado": "frente",
   "aduela": "Quem compra",
   "oque": "quem paga a taxa do curso: o programa de residência, o hospital de ensino, o Einstein ou o próprio residente · hoje, nenhum confirmado",
   "fluxo": "de zero a uma turma de 6",
   "alavanca": "uma carta de intenção de um programa, com valor e rubrica",
   "quem": "a coordenação do projeto, com quem compra",
   "prazo": "antes do piloto",
   "confianca": "aberto",
   "area": "quem",
   "altura": 15
  },
  {
   "id": "protocolo",
   "lado": "tras",
   "aduela": "Protocolo de maestria",
   "oque": "o protocolo de maestria: repetir no modelo até cumprir os cinco critérios",
   "fluxo": "",
   "alavanca": "",
   "quem": "",
   "prazo": "",
   "confianca": "confirmado",
   "area": "como",
   "altura": 100
  },
  {
   "id": "preceptor",
   "lado": "frente",
   "aduela": "Formato do preceptor",
   "oque": "como o preceptor entra no curso: quatro encontros por ano, com a live e o presencial só para quem chegou à maestria · é o recurso mais escasso",
   "fluxo": "de uma turma a 45 aprovados por ano",
   "alavanca": "o preceptor confirma os quatro encontros por ano, com a live e o presencial só para quem chega à maestria",
   "quem": "o responsável clínico do projeto",
   "prazo": "antes do piloto",
   "confianca": "provavel",
   "area": "como",
   "altura": 55
  },
  {
   "id": "ps",
   "lado": "tras",
   "aduela": "Os 3Ps do curso",
   "oque": "o desenho do curso em três passos: preparar, praticar, proceder",
   "fluxo": "",
   "alavanca": "",
   "quem": "",
   "prazo": "",
   "confianca": "confirmado",
   "area": "oque",
   "altura": 100
  },
  {
   "id": "entrada",
   "lado": "frente",
   "aduela": "Entrada em casa",
   "oque": "o que o residente precisa para começar a treinar em casa: o modelo emprestado, o kit de instrumental numa das três portas e os pré-módulos de nivelamento",
   "fluxo": "a turma inteira treinando já na primeira semana",
   "alavanca": "o aluguel do kit com preço e logística, e os três pré-módulos de nivelamento prontos",
   "quem": "a coordenação do projeto, com o fornecedor do kit",
   "prazo": "antes do piloto",
   "confianca": "aberto",
   "area": "oque",
   "altura": 30
  },
  {
   "id": "einstein",
   "lado": "tras",
   "aduela": "Einstein, casa do estudo",
   "oque": "a casa do estudo de validação, com centro de treinamento próprio",
   "fluxo": "",
   "alavanca": "",
   "quem": "",
   "prazo": "",
   "confianca": "confirmado",
   "area": "como",
   "altura": 100
  },
  {
   "id": "frota",
   "lado": "frente",
   "aduela": "Frota de modelos",
   "oque": "quantos modelos impressos o piloto precisa, e quem paga por eles: o modelo se imprime sob demanda, mas a frota do piloto ainda não tem dono",
   "fluxo": "8 modelos para 45 aprovados por ano · 13 com o modelo doze semanas em casa",
   "alavanca": "definir quem paga os modelos e os kits do piloto",
   "quem": "a coordenação do projeto",
   "prazo": "antes do piloto",
   "confianca": "aberto",
   "area": "quanto",
   "altura": 30
  },
  {
   "id": "prova",
   "lado": "frente",
   "aduela": "Prova no paciente",
   "oque": "o ensaio clínico que vai medir se o paciente operado por quem treinou no modelo tem menos complicação · hoje a prova existe só para a outra técnica, a TEP",
   "fluxo": "do programa que compra a quem paga a cirurgia: o SUS e as operadoras",
   "alavanca": "o ensaio clínico de transferência, depois do estudo de validação",
   "quem": "o responsável clínico do projeto, pelo ensaio clínico",
   "prazo": "18 a 24 meses depois do estudo de validação",
   "confianca": "aberto",
   "area": "oque",
   "altura": 20
  },
  {
   "id": "plataforma",
   "lado": "frente",
   "aduela": "Plataforma do residente",
   "oque": "o site onde o residente acompanha o curso: hoje mostra o caminho e os critérios, mas ainda não registra as sessões de cada um",
   "fluxo": "de uma turma a muitas: cada residente com o seu registro de sessões e de critérios",
   "alavanca": "o registro das sessões e dos cinco critérios dentro da própria plataforma, antes da segunda turma",
   "quem": "a coordenação do projeto",
   "prazo": "depois da primeira turma",
   "confianca": "provavel",
   "area": "quem",
   "altura": 60
  }
 ],
 "cadeia": [
  {
   "area": "como",
   "nome": "como",
   "vira": "o método que torna seguro",
   "porque": "a segurança depende do método",
   "porque_ordem": "A âncora pousa aqui: o método produz a segurança, e o estudo de validação a prova. Sem isso, não há o que prometer",
   "entregavel": "a operação, etapa por etapa",
   "porque_aba": "É onde se vê quem faz o quê, com o quê e em que ordem: onde o critério barra e onde o preceptor entra",
   "aba": "jornadas",
   "blocos": [
    "atividades",
    "recursos",
    "parcerias"
   ]
  },
  {
   "area": "oque",
   "nome": "o que",
   "vira": "o curso que a prova permite",
   "porque": "a promessa depende da prova",
   "porque_ordem": "Só se promete o que o método provou. O que entra no curso, e o que fica de fora, sai do que ele garante",
   "entregavel": "o portfólio",
   "porque_aba": "A promessa só existe como oferta: o kit, os pré-módulos e o curso, cada um com o que entrega e quem paga",
   "aba": "servicos",
   "blocos": [
    "proposta"
   ]
  },
  {
   "area": "quem",
   "nome": "quem",
   "vira": "quem usa e quem compra",
   "porque": "a venda depende da promessa",
   "porque_ordem": "É a oferta definida que se leva a alguém: só com ela se sabe quem usa, quem compra e por onde o curso chega",
   "entregavel": "a plataforma do residente",
   "porque_aba": "É o curso na voz de quem o vive: por onde chega e o que faz continuar. Quem compra ainda está em aberto",
   "aba": "plataforma",
   "blocos": [
    "segmentos",
    "canais",
    "relacionamento"
   ]
  },
  {
   "area": "quanto",
   "nome": "quanto",
   "vira": "quem paga a soma",
   "porque": "a conta depende de quem compra",
   "porque_ordem": "A conta confere tudo o que veio antes, e só fecha quando se sabe quem compra",
   "entregavel": "o caso econômico",
   "porque_aba": "Os valores ficam numa peça própria, com a conta de cada número: o custo, o preço e o retorno",
   "aba": "economico",
   "blocos": [
    "receita",
    "custos"
   ]
  }
 ],
 "pecas": {
  "plataforma": {
   "botao": "abrir a plataforma",
   "pe": ""
  },
  "economico": {
   "botao": "abrir o caso econômico",
   "pe": "a janela é o próprio caso econômico, com os valores em reais: cada número sublinhado abre a sua conta e diz de onde vem"
  }
 },
 "estacoes": [
  {
   "id": "kit",
   "p": "",
   "nome": "Kit",
   "titulo": "Kit de instrumentos: três formas de montar o seu",
   "faz": "recebe o modelo 3D emprestado com o curso e escolhe como ter o instrumental para treinar em casa",
   "aberto": "preço, envio e devolução do aluguel",
   "porta": false,
   "encontra": [
    "Aluguel do kit completo",
    "Liberdade guiada, com lista curada",
    "Por sua conta"
   ]
  },
  {
   "id": "preparacao",
   "p": "P1",
   "nome": "Preparação",
   "titulo": "Antes da prática: a teoria, a primeira sessão e, se faltar base, os pré-módulos",
   "faz": "estuda a teoria do TAPP e precisa de 90% no teste, com tentativas ilimitadas. Depois faz a primeira sessão no modelo, que não vale nota",
   "aberto": "os três pré-módulos de nivelamento estão em produção",
   "porta": false,
   "encontra": [
    "A teoria do TAPP, com teste",
    "A primeira sessão no modelo",
    "A anatomia que vai nomear",
    "Três pré-módulos de nivelamento"
   ]
  },
  {
   "id": "curso",
   "p": "P2",
   "nome": "Curso TAPP",
   "titulo": "Hérnia inguinal por videolaparoscopia (TAPP)",
   "faz": "repete o TAPP no modelo, 16 sessões ou mais, 2 por semana, em até 12 semanas, e se autoavalia a cada sessão. A meta são os 5 critérios de maestria",
   "aberto": "o número de sessões e os critérios ainda vão ao painel de especialistas",
   "porta": true,
   "encontra": [
    "A sequência até o centro cirúrgico",
    "Os 5 critérios de maestria",
    "As cinco macroetapas do TAPP",
    "O checklist dos 8 erros críticos"
   ]
  },
  {
   "id": "live",
   "p": "P2",
   "nome": "Live",
   "titulo": "Sessão de correção técnica com o preceptor",
   "faz": "só entra quem chegou à maestria. O preceptor corrige ao vivo, à distância, o que o checklist não pega",
   "aberto": "data a definir",
   "porta": false,
   "encontra": [
    "Quem participa",
    "A próxima edição",
    "O formato da sessão"
   ]
  },
  {
   "id": "presencial",
   "p": "P2",
   "nome": "Presencial",
   "titulo": "Encontro presencial",
   "faz": "quem passou pela live encontra o preceptor e os pares: discussão de casos e acompanhamento individual",
   "aberto": "data e local a confirmar",
   "porta": false,
   "encontra": [
    "Quem participa",
    "O que o encontro inclui",
    "Data e local"
   ]
  },
  {
   "id": "cirurgia",
   "p": "P3",
   "nome": "Centro cirúrgico",
   "titulo": "Centro cirúrgico",
   "faz": "só chega quem tem o certificado de maestria. Opera os primeiros 10 a 15 casos com supervisão que diminui por fase",
   "aberto": "o ensaio que mede o efeito no paciente ainda não tem data",
   "porta": false,
   "encontra": [
    "As zonas de perigo, no paciente",
    "A supervisão em três fases",
    "O que ainda não se sabe"
   ]
  }
 ],
 "conta": [
  {
   "id": "residente",
   "nome": "Residente",
   "pergunta": "O que o curso muda para cada residente treinado?",
   "diz": "quem treina no modelo até a maestria chega aos primeiros casos com 2,24 complicações a menos. Como 80% chegam à maestria e todos pagam, a conta é feita por matrícula",
   "conta": "taxa do curso ÷ complicações evitadas por matrícula = quanto custa evitar cada uma",
   "falta": "se o efeito se repete no TAPP: ele foi medido na TEP, a outra técnica por vídeo"
  },
  {
   "id": "pagador",
   "nome": "Quem paga",
   "pergunta": "Quem paga o curso, e quem fica com a economia?",
   "diz": "quem compra o curso paga a taxa e não recebe de volta: a economia fica com quem paga a cirurgia. Conforme o custo de uma complicação, ela cobre 46% da taxa, iguala a taxa ou chega a 2,4 vezes a taxa",
   "conta": "complicações evitadas por matrícula × custo de uma complicação = economia de quem paga a cirurgia",
   "falta": "quanto custa uma complicação para quem paga a cirurgia: é o dado que decide se o curso se paga"
  },
  {
   "id": "empresa",
   "nome": "Quem entrega",
   "pergunta": "Quem entrega o curso se sustenta?",
   "diz": "a taxa paga a entrega com folga. Dentro dela estão o modelo em comodato, os consumíveis, a plataforma e o tempo do preceptor, que é o que mais pesa",
   "conta": "taxa − custo de entregar − operação e impostos = o que sobra para quem entrega",
   "falta": "a que preço o curso fecha para cada comprador, e quem produz os pré-módulos"
  },
  {
   "id": "escala",
   "nome": "Escala",
   "pergunta": "Quantos o curso forma por ano, e o que limita?",
   "diz": "na agenda de hoje, o curso forma até 45 por ano, em 4 encontros, com 8 modelos. O teto é a agenda do preceptor, e não o modelo. No Brasil entram 1.537 novos residentes por ano",
   "conta": "tempo do preceptor no ano ÷ tempo por aprovado = aprovados por ano",
   "falta": "quem paga os modelos e os kits do piloto"
  }
 ]
};
