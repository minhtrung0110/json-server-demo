const faker = require('faker');
const fs = require('fs');


// Set locale to use Vietnamese
faker.locale = "vi";

// random data
const randomCategoryList = (n) => {
  if (n <= 0) return [];

  const categoryList = [];

  // loop and push category
  Array.from(new Array(n)).forEach(() => {
    const category = {
      id: faker.random.uuid(),
      name: faker.commerce.department(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    categoryList.push(category);
  });

  return categoryList;
};
const randomProductList = (categoryList,n) => {
    if (n <= 0) return [];
  
    const productList = [];
  
    for( const category of categoryList){
        Array.from(new Array(n)).forEach(() => {
            const product = {
              id: faker.random.uuid(),
              name: faker.commerce.productName(),
              categoryId:category.id,
              price:faker.commerce.price(),
              color:faker.commerce.color(),
              description:faker.commerce.productDescription(),
              thumbnailUrl:faker.image.imageUrl(450,420),
              createdAt: Date.now(),
              updatedAt: Date.now(),
            };
        
            productList.push(product);
          });
    }  
    return productList;
  };
const randomCustomerList = (n) => {
    if (n <= 0) return [];
  
    const customerList = [];
  
    // loop and push category
    Array.from(new Array(n)).forEach(() => {
      const customer = {
        id: faker.random.uuid(),
        first_name: faker.name.firstName(),
        last_name:faker.name.lastName(),
        email:faker.internet.email(),
        phone:faker.phone.phoneNumber(),
        addresss:faker.address.streetAddress(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
  
      customerList.push(customer);
    });
  
    return customerList;
  };
const randomInvoiceList = (customerList,n) => {
    if (n <= 0) return [];
  
    const invoiceList = [];
  
    for(const customer of customerList) {
        Array.from(new Array(n)).forEach(() => {
            const invoice = {
              id: faker.random.uuid(),
              customerId:customer.id,
              total:faker.commerce.price(),
              createdAt: Date.now(),
              updatedAt: Date.now(),
            };
        
            invoiceList.push(invoice);
          });
        
    }
   
    return invoiceList;
  };
const randomDetailInvoiceList = (invoiceList,productList,n) => {
    if (n <= 0) return [];
  
    const detail_invoiceList = [];
    for(const invoice of invoiceList){
        for(const product of productList) {
            Array.from(new Array(n)).forEach(() => {
                const  detail_invoice = {
                  id: faker.random.uuid(),
                  invoiceId:invoice.id,
                  productId:product.id,
                  amount:faker.finance.amount(),
                  price:product.price,
                  createdAt: Date.now(),
                  updatedAt: Date.now(),
                };
            
                detail_invoiceList.push( detail_invoice);
              });
            
        }
    }
   
   
    return  detail_invoiceList;
  };


// prepare db object
//const categories=randomCategoryList(2)
const categories=[
  {
      "id": "61b7b751-6d25-4a37-83b7-ee629ddada18",
      "name": "Top",
      "createdAt": 1659277759825,
      "updatedAt": 1659277759825
  },
  {
      "id": "b2d94212-e0e4-459b-b688-5a09790db2cb",
      "name": "Bottom",
      "createdAt": 1659277759825,
      "updatedAt": 1659277759825
  },
  {
    "id": "a4r94212-e0e4-745h-a987-ee62990db2cb",
    "name": "Accessories",
    "createdAt": 1659277759825,
    "updatedAt": 1659277759825
}
]
const products=randomProductList(categories,3)
const customers=randomCustomerList(1)
const invoices=randomInvoiceList(customers,1)
const detail_invoices=randomDetailInvoiceList(invoices,products,2)
const sliders=[
  {id:1,name:'Abuta / Winter Collection 2021',description:'Get up to 30% Off New Arrivals',img:'slider_1.jpg'},
  {id:2,name:'Spring / Summer Collection 2021',description:'Get up to 20% Off New Arrivals',img:'slider_2.jpg'},
  {id:3,name:'GoGo Collection 2022',description:'Get up to 25% Off New Arrivals',img:'slider_3.jpg'},
  {id:4,name:'Summer 2022',description:'BackToSchool',img:'slider_4.jpg'},
  {id:5,name:'Hallowen',description:'Get up to 35% Off New Arrivals',img:'slider_5.jpg'}
];
const db={
    "categories": categories,
    "products": products,
    "customers":customers,
    "invoices": invoices,
    "detail_invoices": detail_invoices,
    "sliders": sliders,
  }



// write db object to db.json
  fs.writeFile("db.json",JSON.stringify(db),()=>{
    console.log("Generate data successfully")
  })