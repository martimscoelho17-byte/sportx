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
- [x] Testes vitest para múltiplas imagens de produtos (12 testes passados)
- [x] Testes vitest para features (desconto, envio, IVA, total, favoritos, carrinho) (16 testes passados)
- [x] Total: 45 testes passados


## Reorganização (Nova)
- [x] Header: Logo esquerda, 4 marcas centro com dropdowns, tema/login/carrinho direita
- [x] Footer: 4 tópicos (Sobre, Contactos, Localização, Privacidade) + copyright
- [x] Testar layout responsivo e checkpoint
- [x] Substituir logo SportX por ícone azul (#001a4d)
- [x] Página principal: hero com SportX + slogan (sem marcas por baixo)
- [x] Ordem das marcas: Nike, Adidas, New Balance, Puma

## Múltiplas Imagens de Produtos (Nova)
- [x] Criar tabela productImages para armazenar múltiplas imagens por produto
- [x] Migrar esquema com `pnpm db:push`
- [x] Adicionar função getProductWithImages() em server/db.ts
- [x] Atualizar router de produtos para usar getProductWithImages()
- [x] Popular base de dados com 10 chuteiras reais de 4 marcas
- [x] Atualizar ProductDetail.tsx para exibir galeria de imagens
- [x] Implementar navegação entre imagens (anterior/próximo)
- [x] Corrigir navegação para detalhe do produto (sem dupla barra)
- [x] Criar testes vitest para validar produtos e imagens (12 testes passados)


## Novas Funcionalidades (Implementadas)
- [x] Alterar ícone de carrinho no header
- [x] Adicionar ícone de favoritos (coração) no header entre login e carrinho
- [x] Implementar sistema de favoritos funcional (guardar/remover produtos favoritos)
- [x] Implementar carrinho de compras funcional (adicionar/remover/atualizar quantidade)
- [x] Implementar desconto de 10% no checkout
- [x] Implementar cálculo de envio (grátis para pedidos >= 100€)
- [x] Implementar página de checkout com resumo de pedido
- [x] Implementar sistema de pagamento (4 métodos: Cartão, MB Way, Transferência, Multibanco)
- [x] Implementar página de confirmação de pedido com número de rastreamento
- [x] Testar fluxo completo: adicionar ao carrinho → favoritos → checkout → pagamento → confirmação
- [x] Criar testes vitest para validar desconto, envio, IVA, total (16 testes passados)


## Melhorias (Implementadas)
- [x] Atualizar página de Favoritos com mensagem centrada quando vazia

## Ajustes (Implementados)
- [x] Alterar texto do botão de "Ir para checkout" para "Finalizar compra"
- [x] Alterar CartDrawer para mostrar desconto (10%) em vez de IVA
