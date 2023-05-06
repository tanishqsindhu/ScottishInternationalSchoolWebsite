
const orderFrom = document.querySelector(`#orderForm`);
orderFrom.addEventListener('submit',async function form(e) {
  e.preventDefault();
  let {orderNumber,orderTime,studentRollNumber,studentClass,studentSection,studentBalance}=Array.from(document.querySelectorAll(`#printForm input`)).reduce((acc,input)=>({
    ...acc,[input.id]:input.value}),{});
  let orderDetails=Array.from(document.querySelectorAll(`#orderForm select`)).reduce((acc,input)=>({
    ...acc,[input.id]:input.value}),{});
  orderTime = orderTime.split('GMT')[0]
  let orderMeal=[];
  let j=0;
  let mealPrice=0;
  // orderMeal[0]=`Item Name :      Price\n\n`;
  const orderItem=Object.keys(orderDetails);
  const orderValues = Object.values(orderDetails);
  for(i=0;i<orderItem.length;i++){
      if(!parseInt(orderValues[i])=='0'){
          mealPrice+=parseInt(orderValues[i]);
          orderMeal[j]=`${orderItem[i]} :₹${orderValues[i]} `;
          j++;
      }
  }
  if(parseInt(studentBalance)-mealPrice>=0){
    var dd = {
      info: {
          filename:`Recipt for order number ${orderNumber}`,
          title: `Recipt for order number ${orderNumber}`,
          author: 'purva',
          subject: 'Order Reciept',
          keywords: `Recipt for order number ${orderNumber}`,
        },
        pageOrientation: 'portrait',
        pageSize: {
          //1 mm = 2.83505156
          //width = 45mm
          width: 127.57732 ,
          height: 'auto'
        },
      pageMargins: [ 10, 6 ],
      header: 'Scottish Mess',
      content: [
        { text: 'Blissfull Bites', style: 'header' },
        { text: `Order Number: ${orderNumber}`, style: 'orderNumber' },
        { text: `${orderTime}`, style: 'extraDetails'},
        { text: '-----------------------------------', style: [ 'header', 'anotherStyle' ] },
        { text: `Order Details :-`, style: 'anotherStyle'},
        // {
        //   type: 'none',
        //   ol:[
        //   orderMeal
        //   ],style: 'anotherStyle'
        // },
        { text: `${orderMeal}`, style: 'anotherStyle'},
        { text: '-----------------------------------', style: [ 'header', 'anotherStyle' ] },
        { text: `Total Price  = ${mealPrice}`, style: 'anotherStyle'},
        { qr: `student Roll Number:${studentRollNumber} student Class:${studentClass} Section:${studentSection}`,fit: '60',margin: [0, 3],eccLevel:'H' }
      ],
      styles: {
        header: {
          fontSize: 17,
          bold: true,
          alignment: 'center'
        },
        anotherStyle: {
          fontSize: 9,
          alignment: 'justify'
        },
        extraDetails: {
          fontSize: 7,
          alignment: 'center'
        },
        orderNumber: {
          fontSize: 12,
          alignment: 'center',
          bold: true
        }
      }
    }
    await pdfMake.createPdf(dd).print();
  }
  orderFrom.submit();
})
