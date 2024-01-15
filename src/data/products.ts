import { CategoryId } from './categories';

export type Product = {
  id: string;
  name: string;
  featuredImageIndex: number;
  storeLink: string | null;
  description: string;
  categoryId: CategoryId;
  currentPrice: number;
  discountPrice: number | null;
  tags: string;
  productionTime: number;
  minAmount: number;
  width: number;
  height: number;
  depth: number;
  weight: number;
  isVisible: boolean;
  isFeatured: boolean;
  images: {
    large: string;
    small: string;
  }[];
};

export const products: Product[] = [
  {
    id: '6352d091d65b93c66f0c8885',
    name: 'Caixa para CD/DVD com logomarca',
    featuredImageIndex: 0,
    storeLink: 'https://www.elo7.com.br/caixa-para-cd-dvd-com-logomarca/dp/A04474',
    description:
      '<p>Caixa confeccionada em cartão Holler, revestida com papel especial de gramatura 120.&nbsp;Pode ser feita em outras cores como prata, marrom, branco perolado...&nbsp;</p><p><br></p><p>Indicada para brindes de empresas, fotógrafos, casamentos, entre outros.&nbsp;</p><p><br></p><p><strong><u>INCLUSO:</u></strong></p><p>&nbsp;</p><p>As caixas para fotos tem a altura padrão de 1,5 cm na parte interna.</p><p>O fechamento da caixa pode ser feito com elástico ou fita de cetim na cor escolhida.</p><p>Logo impresso à laser</p><p>Possui 1 borracha para prender CD/DVD na parte interna da caixa.&nbsp;</p><p><br></p><p>*Pode optar por mais uma borracha na parte interna da tampa, cabendo 2 CDs/Dvds com acréscimo R$ 0,50 por peça.)</p><p><br></p><p>----------------------------------------------------------------------------------------------------------------------------------------------------------------------</p><p>Medida interna da caixa: 14 (Diâmetro) x 1,5 (Altura).&nbsp;</p><p><br></p><p><strong>*Os</strong> CDs/DVds não acompanham o produto. O prazo de 20 dias úteis, pode variar dependendo da quantidade pedida.</p><p>** As cores entre o produto final e as fotos, podem ter leves alterações de tonalidade.</p><p><strong>*** </strong>Para peças personalizadas, o cliente deverá enviar seu logo de acordo com as especificações abaixo:&nbsp;</p><p>300 dpi com 15 cm de largura ou altura.&nbsp;</p><p>72 dpi com 60 cm de largura ou altura.&nbsp;</p><p>De preferência recortado no formato psd ou .png ou formato vetorial pelo Ilustrator.</p><p>&nbsp;</p><p><strong>**** Caso o cliente não tenha logo, o nosso diretor de arte fará como CORTESIA, uma opção de logo - pré estabelecidas (grafia do nome e a palavra FOTOGRAFIA em cor preta). Em outras situações o serviço será cobrado à parte.</strong></p>',
    currentPrice: 32,
    discountPrice: 26,
    tags: '"Cd, DVD, caixa, fotografia, brinde, brinde corporativo, casamento, "',
    productionTime: 15,
    minAmount: 6,
    width: 14,
    height: 1.5,
    depth: 14,
    weight: 140,
    isVisible: true,
    isFeatured: true,
    images: [
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1532977799362-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1532977799362-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1532978173843-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1532978173843-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1532978202700-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1532978202700-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1532978275929-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1532978275929-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1532978292734-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1532978292734-sm.jpg',
      },
    ],
    categoryId: 'papeis-especiais',
  },
  {
    id: '6352d09fd65b93c66f0c8886',
    name: 'Runas das Bruxas em madeira natural ou envelhecida',
    featuredImageIndex: 0,
    storeLink: null,
    description:
      '<p><span style="color: rgb(125, 120, 115);">Obs. quando fizer a compra informar qual a opção desejada.</span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">Runas das Bruxas</span></p><p><span style="color: rgb(125, 120, 115);">Opção madeira envelhecida com gravação em dourado</span></p><p><span style="color: rgb(125, 120, 115);">Produzidas artesanalmente através de barras de madeira, as peças são cortadas, lixadas e envelhecidas. Os 13 símbolos são gravados a fogo e depois pintados em dourado.</span></p><p><span style="color: rgb(125, 120, 115);">Tamanho de cada peça: 3 cm de comprimento, 3 cm de largura e 0,3 mm de altura.</span></p><p><span style="color: rgb(125, 120, 115);">Acompanha manual, impresso em gráfica, que conta a origem histórica das Runas das Bruxas, explica as maneiras de consultar e tem o significado dos 13 símbolos.</span></p><p><span style="color: rgb(125, 120, 115);">As 13 peças com os símbolos das Runas das Bruxas vem em saquinho de lamê dourado e com cordão para fechamento.</span></p><p><span style="color: rgb(125, 120, 115);">Opção madeira natural</span></p><p><span style="color: rgb(125, 120, 115);">Produzidas artesanalmente através de barras de madeira, as peças são cortadas, lixadas, mantendo sua cor original. Os 13 símbolos são gravados a fogo, em seguida as peças são envernizadas.</span></p><p><span style="color: rgb(125, 120, 115);">Material: Madeira</span></p><p><span style="color: rgb(125, 120, 115);">Cor: Natural</span></p><p><span style="color: rgb(125, 120, 115);">Tamanho de cada peça: 3 cm de comprimento, 3 cm de largura e 0,3 mm de altura.</span></p><p><span style="color: rgb(125, 120, 115);">Acompanha manual, impresso em gráfica, que conta a origem histórica das Runas das Bruxas, explica as maneiras de consultar e tem o significado dos 13 símbolos.</span></p><p><span style="color: rgb(125, 120, 115);">As 13 peças com os símbolos das runas vem em saquinho de lamê dourado e com cordão para fechamento.</span></p>',
    currentPrice: 55,
    discountPrice: 45,
    tags: '"oráculo, jogo de runas, runas, tarô, viking, madeira, esoterico, presente, natal, bruxas"',
    productionTime: 3,
    minAmount: 1,
    width: 20,
    height: 3,
    depth: 15,
    weight: 250,
    isVisible: true,
    isFeatured: true,
    images: [
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1600021481310-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1600021481310-sm.jpg',
      },
    ],
    categoryId: 'jogo-de-runas',
  },
  {
    id: '6352d0afd65b93c66f0c8887',
    name: 'Caixa para álbum 25x25 com logo impressa',
    featuredImageIndex: 0,
    storeLink: null,
    description:
      '<p><span style="color: rgb(125, 120, 115);">Caixa confeccionada em cartão Holler, revestida com papel especial de gramatura 120. Pode ser feita em outras cores como prata, branco perolado, etc... </span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">Caixa para álbum na medida 25 x 25 x 4 . </span></p><p><span style="color: rgb(125, 120, 115);">Indicada para fotógrafos, brindes de empresas, lembrança de casamento/padrinhos e até mesmo como caixa de presente. </span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">INCLUSO: </span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">*Fita de cetim dentro da caixa </span></p><p><span style="color: rgb(125, 120, 115);">*O fechamento da caixa pode ser feito com elástico ou fita de cetim na cor escolhida. </span></p><p><span style="color: rgb(125, 120, 115);">*Na parte interna da tampa elástico para pen drive, porta pen card em papel na mesma cor da caixa ou borracha para CD/DVD.. </span></p><p><span style="color: rgb(125, 120, 115);">*Logo impresso à laser </span></p><p><span style="color: rgb(125, 120, 115);">*importante informar tamanho do pen drive para ajuste correto do elástico. </span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">------------------------------------------------------------------------------ </span></p><p><span style="color: rgb(125, 120, 115);">PERSONALIZAÇÃO: </span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">* Aumento de altura ou comprimento até 2 cm: + R$ 1,00 </span></p><p><span style="color: rgb(125, 120, 115);">*Aumento de altura ou comprimento acima de 2 cm: + R$ 0,50 por centímetro </span></p><p><span style="color: rgb(125, 120, 115);">* Divisória vertical : + R$ 1,00 </span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">OBS: Para caixas em outros tamanhos ou formatos, favor solicitar orçamento. </span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">------------------------------------------------------------------------------- </span></p><p><span style="color: rgb(125, 120, 115);">*As fotos, pen drive, pen card ou CD/DVD não acompanham o produto. O prazo de 15 dias úteis, Pode variar dependendo da quantidade pedida. </span></p><p><span style="color: rgb(125, 120, 115);">** As cores entre o produto final e as fotos, podem ter leves alterações de tonalidade. </span></p><p><span style="color: rgb(125, 120, 115);">*** Para peças personalizadas, o cliente deverá enviar seu logo de acordo com as especificações abaixo: </span></p><p><span style="color: rgb(125, 120, 115);">300 dpi com 15 cm de largura ou altura. </span></p><p><span style="color: rgb(125, 120, 115);">72 dpi com 60 cm de largura ou altura. </span></p><p><span style="color: rgb(125, 120, 115);">De preferência recortado no formato psd ou .png ou formato vetorial pelo Ilustrator. </span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">**** Caso o cliente não tenha logo, o nosso diretor de arte fará como CORTESIA, uma opção de logo - pré estabelecidas (grafia do nome e a palavra FOTOGRAFIA em cor preta). Em outras situações o serviço será cobrado à parte. </span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">Medida da parte interna da caixa: 26(C) x 26(L) x 5 (A)</span></p>',
    currentPrice: 90,
    discountPrice: 75,
    tags: '"fotógrafos, fotografia, logomarca, caixa para fotos, casamento, álbum"',
    productionTime: 10,
    minAmount: 1,
    width: 27,
    height: 6,
    depth: 27,
    weight: 450,
    isVisible: true,
    isFeatured: false,
    images: [
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1550081635138-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1550081635138-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1569545044306-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1569545044306-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1569545080205-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1569545080205-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1694017659822-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1694017659822-sm.jpg',
      },
    ],
    categoryId: 'papeis-especiais',
  },
  {
    id: '6352d0c3d65b93c66f0c8888',
    name: 'Caixa para álbum 20x20 com logo impressa',
    featuredImageIndex: 0,
    storeLink: null,
    description:
      '<p><span style="color: rgb(125, 120, 115);">Caixa confeccionada em cartão Holler, revestida com papel especial de gramatura 120. Pode ser feita em outras cores como prata, branco perolado, etc... </span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">Caixa para álbum na medida 20 x 20 x 4 . </span></p><p><span style="color: rgb(125, 120, 115);">Indicada para fotógrafos, brindes de empresas, lembrança de casamento/padrinhos e até mesmo como caixa de presente. </span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">INCLUSO: </span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">*Fita de cetim dentro da caixa </span></p><p><span style="color: rgb(125, 120, 115);">*O fechamento da caixa pode ser feito com elástico ou fita de cetim na cor escolhida. </span></p><p><span style="color: rgb(125, 120, 115);">*Na parte interna da tampa elástico para pen drive, porta pen card em papel na mesma cor da caixa ou borracha para CD/DVD.. </span></p><p><span style="color: rgb(125, 120, 115);">*Logo impresso à laser </span></p><p><span style="color: rgb(125, 120, 115);">*importante informar tamanho do pen drive para ajuste correto do elástico. </span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">------------------------------------------------------------------------------ </span></p><p><span style="color: rgb(125, 120, 115);">PERSONALIZAÇÃO: </span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">* Aumento de altura ou comprimento até 2 cm: + R$ 1,00 </span></p><p><span style="color: rgb(125, 120, 115);">*Aumento de altura ou comprimento acima de 2 cm: + R$ 0,50 por centímetro </span></p><p><span style="color: rgb(125, 120, 115);">* Divisória vertical : + R$ 1,00 </span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">OBS: Para caixas em outros tamanhos ou formatos, favor solicitar orçamento. </span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">------------------------------------------------------------------------------- </span></p><p><span style="color: rgb(125, 120, 115);">*As fotos, pen drive, pen card ou CD/DVD não acompanham o produto. O prazo de 15 dias úteis, Pode variar dependendo da quantidade pedida. </span></p><p><span style="color: rgb(125, 120, 115);">** As cores entre o produto final e as fotos, podem ter leves alterações de tonalidade. </span></p><p><span style="color: rgb(125, 120, 115);">*** Para peças personalizadas, o cliente deverá enviar seu logo de acordo com as especificações abaixo: </span></p><p><span style="color: rgb(125, 120, 115);">300 dpi com 15 cm de largura ou altura. </span></p><p><span style="color: rgb(125, 120, 115);">72 dpi com 60 cm de largura ou altura. </span></p><p><span style="color: rgb(125, 120, 115);">De preferência recortado no formato psd ou .png ou formato vetorial pelo Ilustrator. </span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">**** Caso o cliente não tenha logo, o nosso diretor de arte fará como CORTESIA, uma opção de logo - pré estabelecidas (grafia do nome e a palavra FOTOGRAFIA em cor preta). Em outras situações o serviço será cobrado à parte. </span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">Medida da parte interna da caixa: 21(C) x 21(L) x 5 (A)</span></p>',
    currentPrice: 75,
    discountPrice: 55,
    tags: '"fotógrafos, fotografia, logomarca, caixa para fotos, casamento, álbum"',
    productionTime: 10,
    minAmount: 1,
    width: 22,
    height: 6,
    depth: 22,
    weight: 300,
    isVisible: true,
    isFeatured: false,
    images: [
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1569544272186-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1569544272186-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1569544916629-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1569544916629-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1694017728901-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1694017728901-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1694017758945-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1694017758945-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1694017790181-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1694017790181-sm.jpg',
      },
    ],
    categoryId: 'papeis-especiais',
  },
  {
    id: '6352d0cdd65b93c66f0c8889',
    name: 'Caixa para fotos (21 x 15) com logomarca',
    featuredImageIndex: 0,
    storeLink: 'https://www.elo7.com.br/caixa-para-fotos-21-x-15-com-logomarca/dp/8E1CD3',
    description:
      '<p>Caixa confeccionada em cartão Holler, revestida com papel especial de gramatura 120.&nbsp;Pode ser feita em outras cores como prata, branco perolado, etc...</p><p><br></p><p>Indicada para fotógrafos, brindes de empresas, lembrança de casamento/padrinhos e até mesmo como caixa de presente.</p><p><br></p><p><strong><u>INCLUSO:</u></strong></p><p><br></p><p>As caixas para fotos tem a altura padrão de 2,5 cm na parte interna.</p><p>Acompanham uma lingueta feita em papel para auxiliar na retirada das <strong><u>ÚLTIMAS FOTOS</u></strong> do interior da mesma.</p><p>O fechamento da caixa pode ser feito com elástico ou fita de cetim na cor escolhida.</p><p>Na parte interna da tampa elástico para pen drive, porta pen card em papel na mesma cor da caixa, ou borracha para CD.</p><p>Logo impresso à laser</p><p>*importante informar tamanho do pen drive para ajuste correto do elástico.</p><p><br></p><p>-------------------------------------------------------------------------------------------------------------------------------</p><p><strong><u>PERSONALIZAÇÃO:</u></strong></p><p class="ql-align-center"><br></p><p><br></p><p>*Fita de cetim dentro da caixa (auxilia na retirada de todas as fotos da caixa) :&nbsp;<strong>+ R$ 1,00</strong></p><p>&nbsp;* Aumento de altura ou comprimento até 2 cm: <strong>+ R$ 1,00</strong></p><p>*Aumento de altura ou comprimento acima de 2 cm: <strong>+ R$ 0,50 por centímetro</strong></p><p><strong> * </strong>Divisória vertical : <strong>+ R$ 1,00</strong></p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><strong>&nbsp;</strong></p><p class="ql-align-justify"><strong>OBS: Para caixas em outros tamanhos ou&nbsp;formatos, favor solicitar orçamento.</strong></p><p><br></p><p>---------------------------------------------------------------------------------------------------------------------------------</p><p>Medida da parte interna da caixa (espaço para as fotos): 22 (C) x 15,5 (L) x 2,5 (A)</p><p><br></p><p><strong>*</strong>As fotos, pen drive, pen card ou CD não acompanham o produto. O prazo de 20 dias úteis, pode variar dependendo da quantidade pedida.</p><p>** As cores entre o produto final e as fotos, podem ter leves alterações de tonalidade.</p><p><strong>*** </strong>Para peças personalizadas, o cliente deverá enviar seu logo de acordo com as especificações abaixo:&nbsp;</p><p>300 dpi com 15 cm de largura ou altura.&nbsp;</p><p>72 dpi com 60 cm de largura ou altura.&nbsp;</p><p>.psd ou .png</p><p>formato vetorial pelo Ilustrator.</p><p><strong>**** Caso o cliente não tenha logo, o nosso diretor de arte fará como CORTESIA, uma opção de logo - pré estabelecidas (grafia do nome e a palavra FOTOGRAFIA em cor preta). Em outras situações o serviço será cobrado à parte.</strong></p>',
    currentPrice: 35,
    discountPrice: 32,
    tags: '"casamento, padrinhos, lembrancinhas, pen drive, fotos, festa, lembracinhas, caixinhas, artesanato, color plus, brinde corporativo, fotografia, fotógrafos"',
    productionTime: 20,
    minAmount: 6,
    width: 24,
    height: 3,
    depth: 17,
    weight: 250,
    isVisible: true,
    isFeatured: true,
    images: [
      {
        large: 'https://danielak-products.s3.amazonaws.com/products/1520690292478-lg.jpg',
        small: 'https://danielak-products.s3.amazonaws.com/products/1520690292478-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1532977087389-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1532977087389-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1532977124798-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1532977124798-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1532977198459-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1532977198459-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1532977371247-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1532977371247-sm.jpg',
      },
    ],
    categoryId: 'papeis-especiais',
  },
  {
    id: '6352d0d6d65b93c66f0c888a',
    name: 'Caixa para fotos (13 x 18) com logomarca',
    featuredImageIndex: 0,
    storeLink: 'https://www.elo7.com.br/caixa-para-fotos-13-x-18-com-logomarca/dp/B49BE6',
    description:
      '<p>Caixa confeccionada em cartão Holler, revestida com papel especial de gramatura 120.&nbsp;Pode ser feita em outras cores como prata, branco perolado, etc...</p><p><br></p><p>Indicada para fotógrafos, brindes de empresas, lembrança de casamento/padrinhos e até mesmo como caixa de presente.</p><p>&nbsp;</p><p><strong><u>INCLUSO:</u></strong></p><p>&nbsp;</p><p>As caixas para fotos tem a altura padrão de 2,5 cm na parte interna.</p><p>Acompanham uma lingueta feita em papel para auxiliar na retirada das <strong><u>ÚLTIMAS FOTOS </u></strong>do interior da mesma.</p><p>O fechamento da caixa pode ser feito com elástico ou fita de cetim na cor escolhida.</p><p>Na parte interna da tampa elástico para pen drive ou porta pen card em papel na</p><p>mesma cor da caixa,</p><p>Logo impresso à laser</p><p>*importante informar tamanho do pen drive para ajuste correto do elástico.</p><p>&nbsp;</p><p>-------------------------------------------------------------------------------------------------------------------------------</p><p><strong><u>PERSONALIZAÇÃO:</u></strong></p><p class="ql-align-center">&nbsp;</p><p>&nbsp;</p><p>*Fita de cetim dentro da caixa (auxilia na retirada de todas as fotos da caixa) :&nbsp;<strong>+ R$ 1,00</strong></p><p>*Aumento de altura ou comprimento até 2 cm: <strong>+ R$ 1,00</strong></p><p>*Aumento de altura ou comprimento acima de 2 cm: <strong>+ R$ 0,50 por centímetro</strong></p><p><strong>* </strong>Divisória vertical : <strong>+ R$ 1,00</strong></p><p class="ql-align-justify">&nbsp;</p><p class="ql-align-justify"><strong>&nbsp;</strong></p><p class="ql-align-justify"><strong>OBS: Para caixas em outros tamanhos ou&nbsp;formatos, favor solicitar orçamento.</strong></p><p>&nbsp;</p><p>---------------------------------------------------------------------------------------------------------------------------------</p><p>Medida da parte interna da caixa (espaço para as fotos): <span style="color: rgb(125, 120, 115);">&nbsp;</span><strong style="color: rgb(125, 120, 115);">19 (C) x 13,5(L) x 2,5 (A)&nbsp;</strong></p><p>&nbsp;</p><p><strong>*</strong>As fotos, pen drive, pen card ou CD não acompanham o produto. O prazo de 20 dias úteis, pode variar dependendo da quantidade pedida.</p><p>** As cores entre o produto final e as fotos, podem ter leves alterações de tonalidade.</p><p><strong>*** </strong>Para peças personalizadas, o cliente deverá enviar seu logo de acordo com as especificações abaixo:&nbsp;</p><p>300 dpi com 15 cm de largura ou altura.&nbsp;</p><p>72 dpi com 60 cm de largura ou altura.&nbsp;</p><p>.psd ou .png</p><p>formato vetorial pelo Ilustrator.</p><p><br></p><p><strong>**** Caso o cliente não tenha logo, o nosso diretor de arte fará como CORTESIA, uma opção de logo - pré estabelecidas (grafia do nome e a palavra FOTOGRAFIA em cor preta). Em outras situações o serviço será cobrado à parte.</strong></p>',
    currentPrice: 30,
    discountPrice: 26.99,
    tags: '"fotógrafos, fotografia, logomarca, caixa para fotos, casamento, fotos"',
    productionTime: 15,
    minAmount: 6,
    width: 15,
    height: 3,
    depth: 20,
    weight: 245,
    isVisible: true,
    isFeatured: true,
    images: [
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1532980107644-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1532980107644-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1532980217471-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1532980217471-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1532980308315-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1532980308315-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1532980372931-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1532980372931-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1532980473605-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1532980473605-sm.jpg',
      },
    ],
    categoryId: 'papeis-especiais',
  },
  {
    id: '6352d0e1d65b93c66f0c888b',
    name: 'Caixa para álbum 31x22 com logomarca impressa',
    featuredImageIndex: 0,
    storeLink: null,
    description:
      '<p><span style="color: rgb(125, 120, 115);">Caixa confeccionada em cartão Holler (rígida, portanto aguenta peso de fotos ou álbum), revestida com papéis especiais 120g. </span></p><p><span style="color: rgb(125, 120, 115);">Pode ser feita em outras cores como prata, branco perolado, marrom (Havana), Kraft, etc... </span></p><p><span style="color: rgb(125, 120, 115);">Indicada para álbum, brindes de empresas, projetos, entre outros. </span></p><p><span style="color: rgb(125, 120, 115);">Possui espaço para álbum na medida 31 x 22 , ou folhas no tamanho A4 e elástico para pen drive ou pen card ou CD na parte interna da tampa. </span></p><p><span style="color: rgb(125, 120, 115);">Sua logomarca impressa na capa! </span></p><p><span style="color: rgb(125, 120, 115);">Fechamento com fita de cetim ou elástico na cor escolhida. </span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">PS: As fotos, álbum, pen drive, pen card ou Cd não acompanham o produto. </span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">O prazo de 10 dias úteis, pode variar dependendo da quantidade pedida. </span></p><p><span style="color: rgb(125, 120, 115);">As cores entre o produto final e as fotos, podem ter leves alterações de tonalidade. </span></p><p><span style="color: rgb(125, 120, 115);">Medida da parte interna da caixa : 32 (C) x 23 (L) x 3,0 (A).</span></p>',
    currentPrice: 130,
    discountPrice: 120,
    tags: '"fotógrafos, fotografia, logomarca, caixa para fotos, casamento, projetos, caixa personalizada, álbum fotos"',
    productionTime: 10,
    minAmount: 1,
    width: 33,
    height: 3.5,
    depth: 24,
    weight: 450,
    isVisible: true,
    isFeatured: false,
    images: [
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1555261224299-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1555261224299-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1569544157901-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1569544157901-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1569544166939-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1569544166939-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1569544178789-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1569544178789-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1569544200179-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1569544200179-sm.jpg',
      },
    ],
    categoryId: 'papeis-especiais',
  },
  {
    id: '6352d0ead65b93c66f0c888c',
    name: 'Caixa para álbum 25x20 com logo impressa',
    featuredImageIndex: 0,
    storeLink: null,
    description:
      '<p><span style="color: rgb(125, 120, 115);">Caixa confeccionada em cartão Holler, revestida com papel especial de gramatura 120. Pode ser feita em outras cores como prata, branco perolado, etc... </span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">Caixa para álbum na medida 25 x 20 x 4 . </span></p><p><span style="color: rgb(125, 120, 115);">Indicada para fotógrafos, brindes de empresas, lembrança de casamento/padrinhos e até mesmo como caixa de presente. </span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">INCLUSO: </span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">*Fita de cetim dentro da caixa </span></p><p><span style="color: rgb(125, 120, 115);">*O fechamento da caixa pode ser feito com elástico ou fita de cetim na cor escolhida. </span></p><p><span style="color: rgb(125, 120, 115);">*Na parte interna da tampa elástico para pen drive, porta pen card em papel na mesma cor da caixa ou borracha para CD/DVD.. </span></p><p><span style="color: rgb(125, 120, 115);">*Logo impresso à laser </span></p><p><span style="color: rgb(125, 120, 115);">*importante informar tamanho do pen drive para ajuste correto do elástico. </span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">------------------------------------------------------------------------------ </span></p><p><span style="color: rgb(125, 120, 115);">PERSONALIZAÇÃO: </span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">* Aumento de altura ou comprimento até 2 cm: + R$ 1,00 </span></p><p><span style="color: rgb(125, 120, 115);">*Aumento de altura ou comprimento acima de 2 cm: + R$ 0,50 por centímetro </span></p><p><span style="color: rgb(125, 120, 115);">* Divisória vertical : + R$ 1,00 </span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">OBS: Para caixas em outros tamanhos ou formatos, favor solicitar orçamento. </span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">------------------------------------------------------------------------------- </span></p><p><span style="color: rgb(125, 120, 115);">*As fotos, pen drive, pen card ou CD/DVD não acompanham o produto. O prazo de 15 dias úteis, Pode variar dependendo da quantidade pedida. </span></p><p><span style="color: rgb(125, 120, 115);">** As cores entre o produto final e as fotos, podem ter leves alterações de tonalidade. </span></p><p><span style="color: rgb(125, 120, 115);">*** Para peças personalizadas, o cliente deverá enviar seu logo de acordo com as especificações abaixo: </span></p><p><span style="color: rgb(125, 120, 115);">300 dpi com 15 cm de largura ou altura. </span></p><p><span style="color: rgb(125, 120, 115);">72 dpi com 60 cm de largura ou altura. </span></p><p><span style="color: rgb(125, 120, 115);">De preferência recortado no formato psd ou .png ou formato vetorial pelo Ilustrator. </span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">**** Caso o cliente não tenha logo, o nosso diretor de arte fará como CORTESIA, uma opção de logo - pré estabelecidas (grafia do nome e a palavra FOTOGRAFIA em cor preta). Em outras situações o serviço será cobrado à parte. </span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">Medida da parte interna da caixa: 26(C) x 21(L) x 5 (A)</span></p>',
    currentPrice: 80,
    discountPrice: 65,
    tags: '"fotógrafos, fotografia, logomarca, caixa para fotos, casamento, álbum"',
    productionTime: 10,
    minAmount: 1,
    width: 22,
    height: 6,
    depth: 27,
    weight: 350,
    isVisible: true,
    isFeatured: false,
    images: [
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1550081497664-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1550081497664-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1550081503526-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1550081503526-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1550081522768-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1550081522768-sm.jpg',
      },
    ],
    categoryId: 'papeis-especiais',
  },
  {
    id: '6352d101d65b93c66f0c888e',
    name: 'Runas-oráculo Nórdico-madeira Envelhecida C/gravação Dourada',
    featuredImageIndex: 0,
    storeLink: null,
    description:
      '<p><span style="color: rgb(102, 102, 102); background-color: rgb(255, 255, 255);">Produzidas artesanalmente através de barras de madeira, as peças são cortadas, lixadas e envelhecidas. Os 24 símbolos são gravados a fogo e depois pintados em dourado.</span></p><p><span style="color: rgb(102, 102, 102); background-color: rgb(255, 255, 255);">Tamanho de cada peça: 4 cm de comprimento, 2,5 cm de largura e 0,5 de altura.&nbsp;</span></p><p><span style="color: rgb(102, 102, 102); background-color: rgb(255, 255, 255);">Acompanha manual, impresso em gráfica, que conta a origem histórica e mitológica das Runas, explica as maneiras de consultar e tem o significado dos 25 símbolos.</span></p><p><span style="color: rgb(102, 102, 102); background-color: rgb(255, 255, 255);">As 25 peças com os símbolos das runas vem em saquinho de algodão, com estampa das runas na cor marrom e com cordão para fechamento.</span></p><p><br></p><p><br></p><p><span style="color: rgb(125, 120, 115);">﻿Valor varejo: R$ 48,00 cada</span></p><p><span style="color: rgb(125, 120, 115);">Valor atacado ( mínimo 5 peças) : Enviamos link da PAGSEGURO para pagamento em cartão ou boleto. Consultar valores.</span></p>',
    currentPrice: 64,
    discountPrice: 55,
    tags: '"oráculo, jogo de runas, runas, tarô, viking, madeira, esoterico, presente, natal"',
    productionTime: 2,
    minAmount: 1,
    width: 16,
    height: 4,
    depth: 20,
    weight: 120,
    isVisible: true,
    isFeatured: true,
    images: [
      {
        large: 'https://danielak-products.s3.amazonaws.com/products/1567354225756-lg.jpg',
        small: 'https://danielak-products.s3.amazonaws.com/products/1567354225756-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1567354243508-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1567354243508-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1567354269122-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1567354269122-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1567354285526-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1567354285526-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1567354298259-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1567354298259-sm.jpg',
      },
    ],
    categoryId: 'jogo-de-runas',
  },
  {
    id: '6352d10ad65b93c66f0c888f',
    name: 'Caixa para fotos (10 x 15) com logomarca',
    featuredImageIndex: 0,
    storeLink: 'https://www.elo7.com.br/caixa-para-fotos-10-x-15-com-logomarca/dp/88503B',
    description:
      '<p>Caixa confeccionada em cartão Holler, revestida com papel especial de gramatura 120.&nbsp;Pode ser feita em outras cores como prata, branco perolado, etc...</p><p>&nbsp;</p><p>Indicada para fotógrafos, brindes de empresas, lembrança de casamento/padrinhos e até mesmo como caixa de presente.</p><p>&nbsp;</p><p><strong><u>INCLUSO:</u></strong></p><p>&nbsp;</p><p>As caixas para fotos tem a altura padrão de 2,5 cm na parte interna.</p><p>Acompanham uma lingueta feita em papel para auxiliar na retirada das <strong><u>ÚLTIMAS FOTOS </u></strong>do interior da mesma.</p><p>O fechamento da caixa pode ser feito com elástico ou fita de cetim na cor escolhida.</p><p>Na parte interna da tampa elástico para pen drive ou porta pen card em papel na</p><p>mesma cor da caixa.</p><p>Logo impresso à laser</p><p>*importante informar tamanho do pen drive para ajuste correto do elástico.</p><p>&nbsp;</p><p>-------------------------------------------------------------------------------------------------------------------------------</p><p><strong><u>PERSONALIZAÇÃO:</u></strong></p><p class="ql-align-center">&nbsp;</p><p>&nbsp;</p><p>*Fita de cetim dentro da caixa (auxilia na retirada de todas as fotos da caixa) :&nbsp;<strong>+ R$ 1,00</strong></p><p>*Aumento de altura ou comprimento até 2 cm: <strong>+ R$ 1,00</strong></p><p>*Aumento de altura ou comprimento acima de 2 cm: <strong>+ R$ 0,50 por centímetro</strong></p><p><strong>* </strong>Divisória vertical : <strong>+ R$ 1,00</strong></p><p class="ql-align-justify">&nbsp;</p><p class="ql-align-justify"><strong>&nbsp;</strong></p><p class="ql-align-justify"><strong>OBS: Para caixas em outros tamanhos ou&nbsp;formatos, favor solicitar orçamento.</strong></p><p>&nbsp;</p><p>---------------------------------------------------------------------------------------------------------------------------------</p><p>Medida da parte interna da caixa (espaço para as fotos): 16 (C) x 10,5 (L) x 2,5 (A)</p><p>&nbsp;</p><p><strong>*</strong>As fotos, pen drive, pen card ou CD não acompanham o produto. O prazo de 20 dias úteis, pode variar dependendo da quantidade pedida.</p><p>** As cores entre o produto final e as fotos, podem ter leves alterações de tonalidade.</p><p><strong>*** </strong>Para peças personalizadas, o cliente deverá enviar seu logo de acordo com as especificações abaixo:&nbsp;</p><p>300 dpi com 15 cm de largura ou altura.&nbsp;</p><p>72 dpi com 60 cm de largura ou altura.&nbsp;</p><p>Psd ou .png</p><p>formato vetorial pelo Ilustrator.</p><p><br></p><p><strong>**** Caso o cliente não tenha logo, o nosso diretor de arte fará como CORTESIA, uma opção de logo - pré estabelecidas (grafia do nome e a palavra FOTOGRAFIA em cor preta). Em outras situações o serviço será cobrado à parte.</strong></p>',
    currentPrice: 27,
    discountPrice: 23.99,
    tags: '"fotógrafos, fotografia, logomarca, caixa para fotos, casamento"',
    productionTime: 15,
    minAmount: 6,
    width: 17,
    height: 3,
    depth: 12,
    weight: 170,
    isVisible: true,
    isFeatured: true,
    images: [
      {
        large: 'https://danielak-products.s3.amazonaws.com/products/1520689804996-lg.jpg',
        small: 'https://danielak-products.s3.amazonaws.com/products/1520689804996-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1522591563723-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1522591563723-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1522591584744-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1522591584744-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1658094386160-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1658094386160-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1658094430742-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1658094430742-sm.jpg',
      },
    ],
    categoryId: 'papeis-especiais',
  },
  {
    id: '6352d113d65b93c66f0c8890',
    name: 'Caixa para Pen drive com logomarca',
    featuredImageIndex: 0,
    storeLink: 'https://www.elo7.com.br/caixa-para-pen-drive-com-logomarca/dp/A0EC5B',
    description:
      '<p>Caixa confeccionada em cartão Holler, revestida com papel especial de gramatura 120.</p><p>Pode ser revestido em várias cores como marrom, cinza, prata...</p><p><br></p><p>Indicada para fotógrafos, arquitetos, padrinhos, casamentos, brindes de empresas entre outros.</p><p><br></p><p>Possui espaço para Pen drive preso com elástico na parte interior da caixa.</p><p>Medidas da parte interna da caixa: 8 (C) x 5 (L) x 2 (A).</p><p>A impressão não pode ser feita em cor escura, nesse caso é usada outra técnica.</p><p><br></p><p><strong>Para empresas:</strong></p><p>Sua logomarca impressa na capa! Acompanha elástico na cor escolhida.</p><p><br></p><p><br></p><p>*O Pen drive não acompanha o produto.</p><p>**O prazo de produção pode variar dependendo da quantidade pedida.</p><p>***As cores entre o produto final e as fotos, podem ter leves alterações de tonalidade.</p><p>****Para peças personalizadas, o cliente deverá enviar seu logo de acordo com as especificações abaixo:&nbsp;</p><p>300 dpi com 15 cm de largura ou altura.&nbsp;</p><p>72 dpi o tamanho deve ser 60 cm de largura ou altura.&nbsp;</p><p>.psd ou .png</p><p>formato vetorial pelo Ilustrator.</p>',
    currentPrice: 15,
    discountPrice: 12.5,
    tags: '"casamento, fotos, festa, lembracinhas, caixinhas, artesanato, color plus, brinde corporativo, fotografia, fotógrafos, pen drive, projeto arquitetura, logomarca, brinde"',
    productionTime: 15,
    minAmount: 12,
    width: 6,
    height: 3,
    depth: 9,
    weight: 50,
    isVisible: true,
    isFeatured: true,
    images: [
      {
        large: 'https://danielak-products.s3.amazonaws.com/products/1532975275490-lg.jpg',
        small: 'https://danielak-products.s3.amazonaws.com/products/1532975275490-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1532975295536-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1532975295536-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1532975685561-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1532975685561-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1532975743021-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1532975743021-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1658093977833-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1658093977833-sm.jpg',
      },
    ],
    categoryId: 'papeis-especiais',
  },
  {
    id: '6352d11cd65b93c66f0c8891',
    name: 'Caixa para Pen card com logomarca',
    featuredImageIndex: 0,
    storeLink: 'https://www.elo7.com.br/caixa-para-pen-card-com-logomarca/dp/B86D39',
    description:
      '<p><span style="color: rgb(125, 120, 115);">Caixinha confeccionada em cartão Holler, revestida com papéis especiais 120g. Pode ser revestido em várias cores como Havana ( marrom), cinza, prata,branco perolado, amarelo, etc... </span></p><p><span style="color: rgb(125, 120, 115);">Indicada para fotógrafos, arquitetos, padrinhos, casamentos, brindes de empresas entre outros. </span></p><p><span style="color: rgb(125, 120, 115);">Possui espaço para Pen card e fechamento com elástico. </span></p><p><span style="color: rgb(125, 120, 115);">A impressão não pode ser feita em cor escura, nesse caso é usada outra técnica. </span></p><p><span style="color: rgb(125, 120, 115);">Sua logomarca impressa na capa! Exclusiva! </span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">PS: O Pen card não acompanha o produto. </span></p><p><span style="color: rgb(125, 120, 115);">O prazo de produção pode variar dependendo da quantidade pedida. </span></p><p><span style="color: rgb(125, 120, 115);">As cores entre o produto final e as fotos, podem ter leves alterações de tonalidade. </span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">* Para peças personalizadas, o cliente deverá enviar seu logo de acordo com as especificações abaixo: </span></p><p><span style="color: rgb(125, 120, 115);">Mínimo: 300 dpi com 15 cm de largura ou altura. </span></p><p><span style="color: rgb(125, 120, 115);">Se for com 72 dpi o tamanho deve ser 60 cm de largura ou altura. </span></p><p><span style="color: rgb(125, 120, 115);">De preferência recortado no formato psd ou png. </span></p><p><span style="color: rgb(125, 120, 115);">Pode ser também sem formato vetorial no programa Ilustrator. </span></p><p><span style="color: rgb(125, 120, 115);">* Caso o cliente não tenha logo, o nosso diretor de arte fará como CORTESIA, 2 opções com o nome da pessoa e a palavra fotografia , em uma fonte já existente e em preto. Em outras situações o serviço será cobrado à parte pois trata-se de criação de logo. </span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">Medidas da parte interna da caixa: </span>9 (C) x 6 (L) x 2,0 (A)</p>',
    currentPrice: 15,
    discountPrice: 12.5,
    tags: '"pen card, fotógrafo, fotografia, caixa, brinde"',
    productionTime: 10,
    minAmount: 12,
    width: 7,
    height: 2.5,
    depth: 10,
    weight: 50,
    isVisible: true,
    isFeatured: true,
    images: [
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1533089719847-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1533089719847-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1533089731059-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1533089731059-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1533089738883-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1533089738883-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1550343310574-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1550343310574-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1581791867393-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1581791867393-sm.jpg',
      },
    ],
    categoryId: 'papeis-especiais',
  },
  {
    id: '6352d128d65b93c66f0c8892',
    name: 'Caixa para pendrive preta com logo metálico ou colorido',
    featuredImageIndex: 0,
    storeLink: null,
    description:
      '<p><span style="color: rgb(125, 120, 115);">Caixinha confeccionada em cartão Holler (rígido), revestida com papel Collor plus 120g. </span></p><p><span style="color: rgb(125, 120, 115);">Logomarca, nome do casal, aniversariante, etc com aplicação em Serigrafia em Prata, dourado, branco, etc. </span></p><p><span style="color: rgb(125, 120, 115);">Esse valor corresponde a 1 COR, aplicações em 2 ou mais cores, favor solicitar orçamento. </span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">OBS: Na serigrafia, o logo é aplicado em 1 cor chapada, sem nuances ou efeito. </span></p><p><span style="color: rgb(125, 120, 115);">Indicada para fotógrafos, arquitetos, padrinhos, casamentos, brindes de empresas entre outros. </span></p><p><span style="color: rgb(125, 120, 115);">Possui espaço para Pen drive preso com elástico na parte interior da caixa. </span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">Fechamento com elástico preto ou à escolha do cliente (não incluso elásticos metálicos) </span></p><p><span style="color: rgb(125, 120, 115);">PS: O Pen drive não acompanha o produto. </span></p><p><span style="color: rgb(125, 120, 115);">O prazo de produção pode variar dependendo da quantidade pedida. </span></p><p><span style="color: rgb(125, 120, 115);">As cores entre o produto final e as fotos, podem ter leves alterações de tonalidade. </span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">* Para peças personalizadas, o cliente deverá enviar seu logo Vetorizado no Corew ou Ilustrator</span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">* Caso o cliente não tenha logo, o nosso diretor de arte fará como CORTESIA, 2 opções com o nome da pessoa e tema : (EX: fotografia , 15 anos, nome do casal, etc...) em uma fonte já existente. </span></p><p><span style="color: rgb(125, 120, 115);">Em outras situações o serviço será cobrado à parte pois trata-se de criação de logo. </span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">Medidas da parte interna da caixa: 8 (C) x 5 (L) x 2 (A)</span></p>',
    currentPrice: 19,
    discountPrice: 17,
    tags: '"fotógrafos, fotografia, logomarca, caixa para fotos, casamento, pen drive, caixa personalizada"',
    productionTime: 25,
    minAmount: 50,
    width: 6,
    height: 3,
    depth: 9,
    weight: 50,
    isVisible: true,
    isFeatured: true,
    images: [
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1600020815717-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1600020815717-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1600020824148-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1600020824148-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1600020831094-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1600020831094-sm.jpg',
      },
    ],
    categoryId: 'papeis-especiais',
  },
  {
    id: '6352d12fd65b93c66f0c8893',
    name: 'Caixa para Pen drive preta com logo metálico ou colorido',
    featuredImageIndex: 0,
    storeLink: null,
    description:
      '<p><span style="color: rgb(125, 120, 115);">Caixinha confeccionada em cartão Holler (rígido), revestida com papel Collor plus 120g. </span></p><p><span style="color: rgb(125, 120, 115);">Logomarca, nome do casal, aniversariante, etc com aplicação em Serigrafia em Prata, dourado, branco, etc. </span></p><p><strong style="color: rgb(125, 120, 115);">Esse valor corresponde a 1 COR, aplicações em 2 ou mais cores, favor solicitar orçamento. </strong></p><p><br></p><p><span style="color: rgb(125, 120, 115);">OBS: Na serigrafia, o logo é aplicado em 1 cor chapada, sem nuances ou efeito. </span></p><p><span style="color: rgb(125, 120, 115);">Indicada para fotógrafos, arquitetos, padrinhos, casamentos, brindes de empresas entre outros. </span></p><p><span style="color: rgb(125, 120, 115);">Possui espaço para Pen drive preso com elástico na parte interior da caixa. </span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">Fechamento com elástico preto ou à escolha do cliente (não incluso elásticos metálicos) </span></p><p><span style="color: rgb(125, 120, 115);">PS: O Pen drive não acompanha o produto. </span></p><p><span style="color: rgb(125, 120, 115);">O prazo de produção pode variar dependendo da quantidade pedida. </span></p><p><span style="color: rgb(125, 120, 115);">As cores entre o produto final e as fotos, podem ter leves alterações de tonalidade. </span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">* Para peças personalizadas, o cliente deverá enviar seu logo em formato vetorial no programa Ilustrator ou Corew. </span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">* Caso o cliente não tenha logo, o nosso diretor de arte fará como CORTESIA, 2 opções com o nome da pessoa e tema : (EX: fotografia , 15 anos, nome do casal, etc...) em uma fonte já existente. </span></p><p><span style="color: rgb(125, 120, 115);">Em outras situações o serviço será cobrado à parte pois trata-se de criação de logo. </span></p><p><br></p><p><span style="color: rgb(125, 120, 115);">Medidas da parte interna da caixa: 8 (C) x 5 (L) x 2 (A)</span></p>',
    currentPrice: 22,
    discountPrice: 20,
    tags: '"fotógrafos, fotografia, logomarca, caixa para fotos, casamento, pen drive, caixa personalizada"',
    productionTime: 20,
    minAmount: 30,
    width: 6,
    height: 3,
    depth: 9,
    weight: 50,
    isVisible: true,
    isFeatured: true,
    images: [
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1600020623560-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1600020623560-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1600020644185-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1600020644185-sm.jpg',
      },
      {
        large: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1600020654330-lg.jpg',
        small: 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/1600020654330-sm.jpg',
      },
    ],
    categoryId: 'papeis-especiais',
  },
];
