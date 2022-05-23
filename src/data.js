let dogs = [
    {
      name: "Ken",
      number: 19951,
      amount: "$10,800",
      due: "12/05/1995",
      url: "https://images.dog.ceo/breeds/vizsla/n02100583_216.jpg",
    },
    {
      name: "Ken2",
      number: 20001,
      amount: "$8,000",
      due: "10/31/2000",
      url: "https://images.dog.ceo/breeds/pomeranian/n02112018_3737.jpg",
    },
    {
      name: "Ken Avenue",
      number: 20031,
      amount: "$9,500",
      due: "07/22/2003",
      url: "https://images.dog.ceo/breeds/schnauzer-miniature/n02097047_1399.jpg",
    },
    {
      name: "Ken 4",
      number: 19971,
      amount: "$14,000",
      due: "09/01/1997",
      url: "https://images.dog.ceo/breeds/buhund-norwegian/hakon3.jpg",
    },
    {
      name: "Ken KenKenKen",
      number: 19981,
      amount: "$4,600",
      due: "01/27/1998",
      url: "https://picsum.photos/200/250?grayscale",
    },
  ];
  
  export function getDogs() {
    return dogs;
  }

  export function getDog(number) {
    return dogs.find(
      (dogs) => dogs.number === number
    );
  }


  export function deleteDog(number) {
    dogs = dogs.filter(
      (dog) => dog.number !== number
    );
  }