import Booking from "../models/booking.model.js";
import Package from "../models/package.model.js";
import { PDFDocument } from "pdf-lib";

export const submitBooking = async (req, res) => {
  try {
    const {
      packageId,
      customerName,
      email,
      phoneNumber,
      numberOfTravelers,
      specialRequests,
    } = req.body;
    const pkg = await Package.findById(packageId);
    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }
    const totalPrice = pkg.price * numberOfTravelers;

    const newBooking = new Booking({
      packageId,
      customerName,
      email,
      phoneNumber,
      numberOfTravelers,
      specialRequests,
      totalPrice,
    });

    await newBooking.save();

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    page.drawText(
      `Invoice\n\nCustomer: ${customerName}\nEmail: ${email}\nPackage: ${pkg.title}\nTravelers: ${numberOfTravelers}\nTotal Price: $${totalPrice}`,
      { x: 50, y: 350 }
    );

    const pdfBytes = await pdfDoc.save();

    res.setHeader("Content-Disposition", 'attachment; filename="invoice.pdf"');
    res.setHeader("Content-Type", "application/pdf");
    res.send(Buffer.from(pdfBytes));
  } catch (err) {
    console.error("error in submitBooking controller ", err.message);
    res.status(500).json({ messge: "Internal server error" });
  }
};
