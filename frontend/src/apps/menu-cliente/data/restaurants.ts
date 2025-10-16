export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  priceRange: 1 | 2 | 3 | 4;
  deliveryTime: string;
  address: string;
  cuisine: string;
  isOpen: boolean;
  menuItems?: MenuItem[];
}

export const restaurantData: Record<string, Restaurant[]> = {
  "Lanchonetes": [
    {
      id: "1",
      name: "Burger Prime",
      description: "Os melhores hambúrgueres artesanais da cidade com ingredientes selecionados",
      imageUrl: "https://images.unsplash.com/photo-1722125680299-783f98369451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjByZXN0YXVyYW50JTIwZm9vZHxlbnwxfHx8fDE3NTg3NTc0MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.8,
      reviewCount: 2847,
      priceRange: 3,
      deliveryTime: "25-35",
      address: "Rua Augusta, 123",
      cuisine: "Hamburgueria",
      isOpen: true,
      menuItems: [
        {
          id: "burger-prime-1",
          name: "Prime Classic",
          description: "Hambúrguer artesanal 180g, queijo cheddar, alface, tomate",
          price: 32.90,
          imageUrl: "https://images.unsplash.com/photo-1722125680299-783f98369451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          category: "Hambúrgueres"
        },
        {
          id: "burger-prime-2", 
          name: "Prime Bacon",
          description: "Hambúrguer 180g, bacon crocante, queijo, cebola caramelizada",
          price: 38.90,
          imageUrl: "https://images.unsplash.com/photo-1722125680299-783f98369451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          category: "Hambúrgueres"
        },
        {
          id: "burger-prime-3",
          name: "Batata Premium", 
          description: "Batatas rústicas com queijo cheddar e bacon",
          price: 18.90,
          imageUrl: "https://images.unsplash.com/photo-1722125680299-783f98369451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          category: "Acompanhamentos"
        },
        {
          id: "burger-prime-4",
          name: "Refrigerante 2L",
          description: "Coca-Cola, Guaraná, Fanta ou Sprite - garrafa de 2 litros",
          price: 12.90,
          imageUrl: "https://images.unsplash.com/photo-1599232674010-a741278c47ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2RhJTIwYm90dGxlJTIwZHJpbmtzJTIwcmVmcmlnZXJhbnR8ZW58MXx8fHwxNzU4ODMwNjQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          category: "Bebidas"
        }
      ]
    },
    {
      id: "2", 
      name: "Subway Gourmet",
      description: "Sanduíches frescos e saudáveis preparados na hora",
      imageUrl: "https://images.unsplash.com/photo-1604467707321-70d5ac45adda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW5kd2ljaCUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzU4ODI5MjQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.5,
      reviewCount: 1523,
      priceRange: 2,
      deliveryTime: "15-25",
      address: "Av. Paulista, 456",
      cuisine: "Sanduicheria",
      isOpen: true
    },
    {
      id: "3",
      name: "Hot Dog do Zé",
      description: "Hot dogs tradicionais e especiais com molhos exclusivos",
      imageUrl: "https://images.unsplash.com/photo-1558985250-95d24f66df1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3QlMjBkb2clMjBzdHJlZXQlMjBmb29kfGVufDF8fHx8MTc1ODgyOTI0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.3,
      reviewCount: 892,
      priceRange: 1,
      deliveryTime: "20-30",
      address: "Rua da Consolação, 789",
      cuisine: "Lanches",
      isOpen: false
    }
  ],
  
  "Pizzarias": [
    {
      id: "4",
      name: "Nonna Bella",
      description: "Pizzas artesanais no forno à lenha com receitas tradicionais italianas",
      imageUrl: "https://images.unsplash.com/photo-1651978595428-ce1c3b3cc493?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMHJlc3RhdXJhbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTg3NTY5NjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.9,
      reviewCount: 3254,
      priceRange: 3,
      deliveryTime: "35-45",
      address: "Rua Bela Vista, 321",
      cuisine: "Italiana",
      isOpen: true,
      menuItems: [
        {
          id: "nonna-bella-1",
          name: "Pizza Margherita",
          description: "Molho de tomate, mussarela de búfala, manjericão fresco",
          price: 45.90,
          imageUrl: "https://images.unsplash.com/photo-1651978595428-ce1c3b3cc493?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          category: "Pizzas"
        },
        {
          id: "nonna-bella-2",
          name: "Pizza Quattro Stagioni", 
          description: "Presunto, cogumelos, alcachofras, azeitonas",
          price: 52.90,
          imageUrl: "https://images.unsplash.com/photo-1651978595428-ce1c3b3cc493?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          category: "Pizzas"
        },
        {
          id: "nonna-bella-3",
          name: "Tiramisù",
          description: "Sobremesa italiana tradicional com café e mascarpone",
          price: 22.90,
          imageUrl: "https://images.unsplash.com/photo-1651978595428-ce1c3b3cc493?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          category: "Sobremesas"
        },
        {
          id: "nonna-bella-4",
          name: "Refrigerante 2L",
          description: "Coca-Cola, Guaraná, Fanta ou Sprite - garrafa de 2 litros",
          price: 12.90,
          imageUrl: "https://images.unsplash.com/photo-1599232674010-a741278c47ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2RhJTIwYm90dGxlJTIwZHJpbmtzJTIwcmVmcmlnZXJhbnR8ZW58MXx8fHwxNzU4ODMwNjQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          category: "Bebidas"
        }
      ]
    },
    {
      id: "5",
      name: "Pizza Express",
      description: "Pizzas rápidas e saborosas para toda família",
      imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      rating: 4.4,
      reviewCount: 1876,
      priceRange: 2,
      deliveryTime: "25-35",
      address: "Av. Rebouças, 654",
      cuisine: "Pizzaria",
      isOpen: true
    },
    {
      id: "6",
      name: "Margherita Gourmet",
      description: "Pizzas gourmet com ingredientes premium e massa fermentada",
      imageUrl: "https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      rating: 4.7,
      reviewCount: 2195,
      priceRange: 4,
      deliveryTime: "40-50",
      address: "Rua Oscar Freire, 987",
      cuisine: "Gourmet",
      isOpen: true
    }
  ],

  "Comida Saudável": [
    {
      id: "7",
      name: "Green Life",
      description: "Saladas, bowls e pratos veganos frescos e nutritivos",
      imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      rating: 4.6,
      reviewCount: 1432,
      priceRange: 3,
      deliveryTime: "20-30",
      address: "Rua dos Jardins, 159",
      cuisine: "Vegana",
      isOpen: true,
      menuItems: [
        {
          id: "green-life-1",
          name: "Bowl Tropical",
          description: "Quinoa, abacate, manga, tomate cereja, folhas verdes",
          price: 28.90,
          imageUrl: "https://images.unsplash.com/photo-1627279001674-4c7dbd9edb88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwYm93bCUyMHNhbGFkfGVufDF8fHx8MTc1ODgyOTcyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          category: "Bowls"
        },
        {
          id: "green-life-2",
          name: "Salada Power",
          description: "Mix de folhas, grão de bico, castanhas, molho tahine",
          price: 24.90,
          imageUrl: "https://images.unsplash.com/photo-1627279001674-4c7dbd9edb88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwYm93bCUyMHNhbGFkfGVufDF8fHx8MTc1ODgyOTcyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          category: "Saladas"
        },
        {
          id: "green-life-3",
          name: "Suco Detox",
          description: "Couve, maçã verde, gengibre, limão e hortelã",
          price: 12.90,
          imageUrl: "https://images.unsplash.com/photo-1627279001674-4c7dbd9edb88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwYm93bCUyMHNhbGFkfGVufDF8fHx8MTc1ODgyOTcyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          category: "Bebidas"
        },
        {
          id: "green-life-4",
          name: "Refrigerante 2L",
          description: "Coca-Cola, Guaraná, Fanta ou Sprite - garrafa de 2 litros",
          price: 12.90,
          imageUrl: "https://images.unsplash.com/photo-1599232674010-a741278c47ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2RhJTIwYm90dGxlJTIwZHJpbmtzJTIwcmVmcmlnZXJhbnR8ZW58MXx8fHwxNzU4ODMwNjQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          category: "Bebidas"
        }
      ]
    },
    {
      id: "8",
      name: "Fit Food",
      description: "Marmitas fitness balanceadas para seus objetivos",
      imageUrl: "https://images.unsplash.com/photo-1546793665-c74683f339c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      rating: 4.4,
      reviewCount: 987,
      priceRange: 2,
      deliveryTime: "30-40",
      address: "Av. Faria Lima, 753",
      cuisine: "Fitness",
      isOpen: true
    }
  ],

  "Bares e Drinks": [
    {
      id: "9",
      name: "Rooftop Bar",
      description: "Drinks autorais e petiscos gourmet com vista panorâmica",
      imageUrl: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      rating: 4.8,
      reviewCount: 2341,
      priceRange: 4,
      deliveryTime: "45-60",
      address: "Rua Haddock Lobo, 428",
      cuisine: "Drinks",
      isOpen: true
    },
    {
      id: "10",
      name: "Boteco do Chico",
      description: "Bar tradicional com porções fartas e chopp gelado",
      imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      rating: 4.5,
      reviewCount: 1876,
      priceRange: 2,
      deliveryTime: "30-45",
      address: "Vila Madalena, 852",
      cuisine: "Boteco",
      isOpen: false
    }
  ],

  "Confeitarias": [
    {
      id: "11",
      name: "Doce Encanto",
      description: "Bolos artesanais, docinhos e sobremesas irresistíveis",
      imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      rating: 4.7,
      reviewCount: 1654,
      priceRange: 3,
      deliveryTime: "25-35",
      address: "Rua Pamplona, 741",
      cuisine: "Confeitaria",
      isOpen: true
    },
    {
      id: "12",
      name: "Padaria Real",
      description: "Pães frescos, doces caseiros e café da manhã completo",
      imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      rating: 4.3,
      reviewCount: 1287,
      priceRange: 1,
      deliveryTime: "15-25",
      address: "Rua Vergueiro, 963",
      cuisine: "Padaria",
      isOpen: true
    }
  ],

  "Cafeterias": [
    {
      id: "13",
      name: "Coffee House",
      description: "Cafés especiais, brunchs e ambiente aconchegante",
      imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      rating: 4.6,
      reviewCount: 2147,
      priceRange: 3,
      deliveryTime: "20-30",
      address: "Rua da Consolação, 147",
      cuisine: "Café",
      isOpen: true
    },
    {
      id: "14",
      name: "Espresso & Cia",
      description: "Café artesanal torrado na casa e sanduíches naturais",
      imageUrl: "https://images.unsplash.com/photo-1493857671505-72967e2e2760?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      rating: 4.4,
      reviewCount: 892,
      priceRange: 2,
      deliveryTime: "15-25",
      address: "Av. Ipiranga, 258",
      cuisine: "Cafeteria",
      isOpen: true
    }
  ]
};