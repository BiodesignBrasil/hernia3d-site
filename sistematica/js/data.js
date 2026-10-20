/* GERADO por 08_sintese/dados/build_dados.py a partir dos CSVs. Não editar à mão. */
window.H3D = {
 "atores": [
  {
   "id": "residente",
   "nome": "RESIDENTE",
   "papel": "quem treina: usa a plataforma, o modelo e o kit",
   "curto": "treina no modelo e na plataforma",
   "lado": "dentro",
   "confianca": "confirmado"
  },
  {
   "id": "comprador",
   "nome": "COMPRADOR DO CURSO",
   "papel": "paga a taxa do curso: programa, Einstein ou o próprio residente",
   "curto": "paga o curso · ainda indefinido",
   "lado": "dentro",
   "confianca": "aberto"
  },
  {
   "id": "projeto",
   "nome": "HERNIA3D",
   "papel": "provedor: curso, modelo 3D, plataforma e protocolo",
   "curto": "curso, modelo 3D e plataforma",
   "lado": "dentro",
   "confianca": "confirmado"
  },
  {
   "id": "preceptor",
   "nome": "PRECEPTOR",
   "papel": "conduz a live e o encontro presencial e decide quem passa",
   "curto": "corrige ao vivo e decide quem passa",
   "lado": "dentro",
   "confianca": "confirmado"
  },
  {
   "id": "fornecedores",
   "nome": "FORNECEDORES",
   "papel": "impressão do modelo, kit laparoscópico e hospedagem",
   "curto": "impressão, kit e hospedagem",
   "lado": "fora",
   "confianca": "confirmado"
  },
  {
   "id": "industria",
   "nome": "INDÚSTRIA",
   "papel": "patrocinador potencial do kit ou da câmera",
   "curto": "patrocínio potencial do kit",
   "lado": "fora",
   "confianca": "aberto"
  },
  {
   "id": "inovacao",
   "nome": "VERBA DE INOVAÇÃO (HIAE)",
   "papel": "financia o estudo de validação",
   "curto": "financia o estudo de validação",
   "lado": "fora",
   "confianca": "confirmado"
  },
  {
   "id": "einstein",
   "nome": "EINSTEIN · INFRAESTRUTURA",
   "papel": "cede espaço, torre, robótica e realidade virtual",
   "curto": "cede espaço, torre, robótica e RV",
   "lado": "fora",
   "confianca": "provavel"
  },
  {
   "id": "hospital",
   "nome": "HOSPITAL",
   "papel": "onde a cirurgia real acontece",
   "curto": "onde a cirurgia real acontece",
   "lado": "fora",
   "confianca": "confirmado"
  },
  {
   "id": "sus",
   "nome": "SUS",
   "papel": "paga a cirurgia na maioria dos casos",
   "curto": "paga a cirurgia na maioria dos casos",
   "lado": "fora",
   "confianca": "confirmado"
  },
  {
   "id": "operadora",
   "nome": "OPERADORA",
   "papel": "paga a cirurgia na saúde suplementar",
   "curto": "paga a cirurgia na saúde suplementar",
   "lado": "fora",
   "confianca": "confirmado"
  },
  {
   "id": "paciente",
   "nome": "PACIENTE",
   "papel": "recebe a cirurgia de quem treinou",
   "curto": "recebe a cirurgia de quem treinou",
   "lado": "fora",
   "confianca": "confirmado"
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
   "id": "F1",
   "de": "inovacao",
   "para": "projeto",
   "oque": "financia o estudo de validação dual-plataforma",
   "tipo": "pagamento",
   "enquadramento": "inovacao",
   "etapas": [
    "V"
   ]
  },
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
   ]
  },
  {
   "id": "F7",
   "de": "projeto",
   "para": "fornecedores",
   "oque": "paga hospedagem de vídeo, certificação e administração",
   "tipo": "pagamento",
   "enquadramento": "custo",
   "etapas": [
    "E0",
    "E1",
    "E2",
    "E3a"
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
   ]
  },
  {
   "id": "F11",
   "de": "industria",
   "para": "projeto",
   "oque": "patrocinaria kit ou câmera numa trilha privada",
   "tipo": "confirmar",
   "enquadramento": "curso",
   "etapas": [
    "E1",
    "E2"
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
   ]
  }
 ],
 "etapas": [
  {
   "id": "E0",
   "trilho": "curso",
   "tipo": "etapa",
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
   "etapas": [
    "E0",
    "E1",
    "E2",
    "E3a",
    "E3b"
   ],
   "itens": [
    {
     "item": "Plataforma bilíngue (PT/ES) com teoria e teste",
     "canal": "digital",
     "confianca": "confirmado"
    },
    {
     "item": "Onboarding com vídeo de referência",
     "canal": "digital",
     "confianca": "confirmado"
    },
    {
     "item": "Modelo 3D da região inguinal, em comodato",
     "canal": "presencial",
     "confianca": "confirmado"
    },
    {
     "item": "Prática autoguiada com checklist de erros críticos",
     "canal": "presencial",
     "confianca": "confirmado"
    },
    {
     "item": "Sessão de correção ao vivo, para quem chega com maestria",
     "canal": "digital",
     "confianca": "confirmado"
    },
    {
     "item": "Encontro presencial com o preceptor e os pares",
     "canal": "presencial",
     "confianca": "confirmado"
    },
    {
     "item": "Certificado de conclusão",
     "canal": "digital",
     "confianca": "aberto"
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
   "etapas": [
    "E0"
   ],
   "itens": [
    {
     "item": "Fundamentos de videolaparoscopia",
     "canal": "digital",
     "confianca": "provavel"
    },
    {
     "item": "Sutura e nós intracorpóreos",
     "canal": "digital",
     "confianca": "provavel"
    },
    {
     "item": "Preparo cognitivo gamificado",
     "canal": "digital",
     "confianca": "provavel"
    },
    {
     "item": "Manuseio de tela sem fixação mecânica",
     "canal": "digital",
     "confianca": "provavel"
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
   "etapas": [
    "E1",
    "E2"
   ],
   "itens": [
    {
     "item": "Box trainer, câmera USB e monitor comum",
     "canal": "presencial",
     "confianca": "confirmado"
    },
    {
     "item": "Pinças e trocartes, sem torre e sem eletrocautério",
     "canal": "presencial",
     "confianca": "confirmado"
    },
    {
     "item": "Envio e devolução ao fim do curso",
     "canal": "presencial",
     "confianca": "aberto"
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
   "etapas": [
    "E1",
    "E2"
   ],
   "itens": [
    {
     "item": "Lista curada de instrumentos homologados",
     "canal": "digital",
     "confianca": "provavel"
    },
    {
     "item": "Opções de importação",
     "canal": "digital",
     "confianca": "provavel"
    },
    {
     "item": "Fornecedores de impressão 3D",
     "canal": "digital",
     "confianca": "provavel"
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
   "etapas": [
    "E1",
    "E2"
   ],
   "itens": [
    {
     "item": "Compra livre, sem curadoria",
     "canal": "presencial",
     "confianca": "confirmado"
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
   "etapas": [
    "V"
   ],
   "itens": [
    {
     "item": "Estação laparoscópica",
     "canal": "presencial",
     "confianca": "confirmado"
    },
    {
     "item": "Estação robótica",
     "canal": "presencial",
     "confianca": "confirmado"
    },
    {
     "item": "Simulador de realidade virtual como referência",
     "canal": "presencial",
     "confianca": "confirmado"
    },
    {
     "item": "Avaliação cega por vídeo (GOALS-GH e GEARS)",
     "canal": "digital",
     "confianca": "confirmado"
    },
    {
     "item": "Pesquisa de atratividade com os 18 residentes",
     "canal": "presencial",
     "confianca": "provavel"
    },
    {
     "item": "Aprovação do comitê de ética antes da coleta",
     "canal": "presencial",
     "confianca": "provavel"
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
   "texto": "o curso é comprado por um pagador ainda indefinido, e o ganho, a complicação evitada, volta para quem paga a cirurgia"
  },
  {
   "camada": "sistema",
   "titulo": "A curva sai do centro cirúrgico",
   "texto": "hoje o residente aprende o TAPP no paciente, ao longo de 37,5 casos em mediana. O curso leva a parte íngreme da curva para o modelo"
  },
  {
   "camada": "servicos",
   "titulo": "Três portas para o kit",
   "texto": "do aluguel à compra livre, o residente não depende de infraestrutura hospitalar para treinar"
  },
  {
   "camada": "jornadas",
   "titulo": "A etapa mais longa não tem preceptor",
   "texto": "como o residente corrige erro durante a prática autoguiada ainda é pergunta aberta"
  },
  {
   "camada": "fecho",
   "titulo": "Quem paga o curso",
   "texto": "o pagador da taxa ainda não existe: programa de residência, instituição ou o próprio residente"
  },
  {
   "camada": "ecossistema",
   "titulo": "O maior pagador desincentiva a técnica",
   "texto": "o SUS paga 39% menos pela hérnia operada por vídeo do que pela aberta, e a saúde suplementar paga 115% mais. No SUS, o argumento só pode ser menos complicação"
  },
  {
   "camada": "sistema",
   "titulo": "Só chega ao paciente quem passou no filtro",
   "texto": "a prática é autoguiada, e só quem cumpre os 5 critérios ao mesmo tempo segue para a live, o encontro presencial e o centro cirúrgico"
  },
  {
   "camada": "servicos",
   "titulo": "O estudo vem antes do curso",
   "texto": "a validação é paga por verba de inovação, não por receita, e a primeira turma espera o resultado"
  },
  {
   "camada": "jornadas",
   "titulo": "O ganho aparece onde o curso não recebe",
   "texto": "a complicação evitada surge no centro cirúrgico, na última etapa, e quem colhe é o paciente e quem paga a cirurgia"
  },
  {
   "camada": "fecho",
   "titulo": "O tempo do preceptor",
   "texto": "quantas horas de live e de presencial cabem na agenda de quem decide quem passa"
  },
  {
   "camada": "sistema",
   "titulo": "O limite é o tempo do preceptor",
   "texto": "nem o modelo nem o kit limitam o curso: o recurso mais escasso é o tempo de quem corrige, concentrado no fim"
  },
  {
   "camada": "fecho",
   "titulo": "A prova no TAPP",
   "texto": "o ensaio de transferibilidade, que mede complicação no paciente operado por quem treinou"
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
 ]
};
