# Bora Resumir

Landing page de resumos ilustrados, mapas mentais e revisão ativa para a área da saúde.

## Conteúdo

- Coleções de fisiologia gastrointestinal, neurofisiologia, fisiologia endócrina e sistema nervoso central.
- Capas em 3D, identidade turquesa e laranja, botões neon e animações com suporte a movimento reduzido.
- Quatro módulos de demonstração, com cinco páginas reais do Volume 1 de cada coleção e ampliação das imagens.
- Conteúdos futuros de farmacologia e patologia identificados como em desenvolvimento.
- Popup de retomada, uma vez por sessão, sem bloquear a saída ou o botão Voltar.

## Executar e publicar

O projeto é estático e não exige instalação de dependências. Publique a pasta `dist`. O arquivo `vercel.json` configura essa pasta como saída na Vercel.

## Editar as ofertas

Em `dist/config.js`, preencha `checkoutUrl` com o endereço HTTPS da oferta Hotmart ou Kiwify e `priceLabel` com o valor confirmado. Atualmente esses campos estão vazios; os botões de oferta mostram um aviso de acesso a disponibilizar.

`dist/modules.js` contém a seleção de páginas de cada prévia. `dist/app.js` controla navegação, ampliação e popup.

## Depoimentos de demonstração

Os cartões são exemplos fictícios, identificados no título da seção e em cada cartão. As fotos são ilustrativas e não representam avaliações reais das pessoas retratadas. Não há nomes, notas ou resultados verificados. Para usar depoimentos como prova social real, substitua os modelos por relatos verdadeiros autorizados, com identificação e texto conferidos.

## Dados e rastreamento

Não há formulário de coleta, pixels de anúncios nem analytics ativos. Não inclua credenciais no código ou no repositório.
