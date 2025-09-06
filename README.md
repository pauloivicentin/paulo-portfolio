# Portfólio — Paulo Vicentin

Este é um site estático simples (HTML/CSS/JS) para publicar seu portfólio de dados.

## Como usar
1. **Edite os projetos** no arquivo `projects.json` (título, descrição, tags, link, ano, etc.).  
2. (Opcional) Substitua `assets/preview.png` por uma imagem sua (mesmas dimensões de capa recomendadas: 1200×630).
3. (Opcional) Coloque seu PDF do currículo em `assets/cv-paulo.pdf` e o botão “Baixar CV” funcionará.
4. Personalize textos das seções diretamente no `index.html`.

## Publicar (3 opções rápidas)
### 1) GitHub Pages
- Crie um repositório chamado `paulo-portfolio` (ou outro).
- Envie todos os arquivos para a **branch main**.
- Nas configurações do repo, ative **Pages** apontando para a branch `main`.  
- O site ficará disponível em `https://seuusuario.github.io/paulo-portfolio/`.

### 2) Netlify (drag & drop)
- Acesse https://app.netlify.com/drop e arraste a pasta do projeto.
- Ele gera uma URL instantânea, que você pode personalizar.

### 3) Vercel
- Instale o Vercel CLI ou use o painel web.
- Faça o deploy da pasta.

## Estrutura
```
/
├─ index.html
├─ styles.css
├─ script.js
├─ projects.json
└─ assets/
   ├─ cv-paulo.pdf        (opcional)
   ├─ preview.png         (opcional para OpenGraph)
   └─ README.txt
```

## Dicas
- Para adicionar filtros: use `tags` nos projetos (ex.: `"tags": ["power bi", "vendas"]`).
- Para destacar algo, use `"featured": true` e ele aparece primeiro quando o ordenamento é “Destaques primeiro”.
- Troque o tema com o botão **Tema** (preferência fica salva).
- Evite acentos nos nomes de arquivos.

---
Feito para você, Paulo — sucesso! 🚀
