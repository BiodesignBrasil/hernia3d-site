# Hernia3D — Curso TAPP e Sistemática

Protótipo navegável do **Hernia3D**: um curso de *mastery learning* em hérnia inguinal por TAPP, construído sobre um simulador físico impresso em 3D a partir de tomografia (Barros et al., *einstein* 2024). O residente pratica no modelo até atingir um critério objetivo de proficiência antes de operar paciente.

São duas peças irmãs, com link de ida e volta:

| Endereço | Peça | Para quem |
|---|---|---|
| `/` | **Plataforma do residente**, bilíngue PT/ES: pré-módulos, curso TAPP, live e encontro presencial | residente de cirurgia geral |
| `/sistematica/` | **Sistemática Hernia3D**: "a curva sai do centro cirúrgico", em quatro camadas (a curva · quem sustenta e quem ganha · o que se oferece · o que o residente vive) | quem decide sobre o curso |

## Estrutura

```
index.html              plataforma do residente (página única, HTML/CSS/JS embutidos)
sistematica/
├── index.html          as quatro camadas
├── css/styles.css
└── js/
    ├── data.js         GERADO a partir da base de dados do projeto — não editar à mão
    └── script.js       desenho e interação
```

Este repositório recebe só os fronts. A base de dados, as notas e as fontes ficam no repositório do projeto, e o pacote é montado por um script que recusa publicar se encontrar material interno.

## Como abrir

Abrir `index.html` no navegador já funciona. Para servir localmente:

```bash
python -m http.server 8080
# http://localhost:8080
```

## Avisos

- **Protótipo de trabalho**, não canal oficial de inscrição. Datas, formatos e conteúdo são de referência.
- A evidência de que treino em simulador reduz complicação em cirurgia real vem de estudos em **TEP**; no TAPP, essa transferência ainda não foi demonstrada, e a Sistemática declara isso.

Biodesign Brasil · método [Stanford Biodesign](https://biodesign.stanford.edu/).
