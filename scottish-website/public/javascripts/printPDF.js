for(let i =0;i<10;i++){
  const printForm = document.querySelector(`#printForm${i}`);
  printForm.addEventListener('submit',function windowOpen(e) {
    e.preventDefault();
    let {orderNumber,orderTime,orderMeal,orderPrice,studentRollNumber,studentClass,studentSection}=Array.from(document.querySelectorAll(`#printForm${i} input`)).reduce((acc,input)=>({
      ...acc,[input.id]:input.value}),{})
      // orderNumber=parseInt(orderNumber)+1;
      orderTime = orderTime.split('GMT')[0]
    var dd = {
      info: {
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
        { text: `${orderMeal}`, style: 'anotherStyle'},
        { text: '-----------------------------------', style: [ 'header', 'anotherStyle' ] },
        { text: `Total Price  = ${orderPrice}`, style: 'anotherStyle'},
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
  pdfMake.createPdf(dd).print();
  })
}
