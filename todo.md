# SportX - TODO

## Backend
- [x] Schema da base de dados (marcas, categorias, produtos, carrinho, encomendas)
- [x] Seed de produtos (Nike, Adidas, New Balance, Puma com preços €159.99–€299.99)
- [x] tRPC routers: produtos, marcas, categorias, carrinho, encomendas
- [x] Autenticação Google OAuth

## Frontend - Layout
- [x] App.tsx com rotas e ThemeProvider (claro/escuro)
- [x] Header com logo SportX, navegação por marcas com dropdowns, tema, login, carrinho
- [x] Footer com modais: Sobre, Política de Privacidade, Contactos, WhatsApp

## Frontend - Páginas
- [x] Home: hero section com "SPORTX" (Sport #660000, X #001a4d) + slogan
- [x] Catálogo por marca/categoria com filtros avançados e ordenação
- [x] Detalhe de produto com seleção de tamanho e botão adicionar ao carrinho
- [x] Drawer de carrinho lateral com quantidade, remover, total, checkout
- [x] Checkout com morada, país UE com bandeiras, pagamento, resumo
- [x] Confirmação de encomenda com número de rastreamento

## Frontend - Modais
- [x] Modal de login (email/password + Google)
- [x] Modal de registo com campos completos e países UE
- [x] Modal Sobre (missão SportX)
- [x] Modal Política de Privacidade (RGPD)
- [x] Modal Contactos (SportX@gmail.pt, 963430023, Coimbra, WhatsApp)

## Testes
- [x] Testes vitest para routers de produtos, carrinho e encomendas (17 testes passados)


## Reorganização (Nova)
- [x] Header: Logo esquerda, 4 marcas centro com dropdowns, tema/login/carrinho direita
- [x] Footer: 4 tópicos (Sobre, Contactos, Localização, Privacidade) + copyright
- [x] Testar layout responsivo e checkpoint
- [x] Substituir logo SportX por ícone azul (#001a4d)
