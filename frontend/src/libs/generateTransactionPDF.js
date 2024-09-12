import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generateTransactionPDF = (transactions, userName) => {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(18);
  doc.text('Transaction Report', 14, 22);

  // Add user name and date
  doc.setFontSize(12);
  doc.text(`User: ${userName}`, 14, 32);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 38);

  // Define the columns for the table
  const columns = [
    { header: 'Date', dataKey: 'date' },
    { header: 'Category', dataKey: 'category' },
    { header: 'Amount', dataKey: 'amount' },
    { header: 'Description', dataKey: 'description' }
  ];

  // Prepare the data for the table
  const data = transactions.map(t => ({
    date: new Date(t.date).toLocaleDateString(),
    category: t.category,
    amount: `$${t.amount.toFixed(2)}`,
    description: t.description
  }));

  // Generate the table
  doc.autoTable({
    startY: 45,
    columns: columns,
    body: data,
  });

  // Save the PDF
  doc.save('transaction_report.pdf');
};

export default generateTransactionPDF;