interface SendSMSProps {
  to: string;
  subject: string;
  html: string;
}

class SMSService {
  //   private transporter: Transporter;

  //   constructor() {
  //     this.transporter = nodemailer.createTransport({
  //       host: process.env.SMTP_HOST as string,
  //       port: parseInt(process.env.SMTP_PORT || "587", 10),
  //       secure: process.env.SMTP_SECURE === "true",
  //       auth: {
  //         user: process.env.SMTP_USER as string,
  //         pass: process.env.SMTP_PASS as string,
  //       },
  //       tls: { rejectUnauthorized: false },
  //     });
  //   }

  // Sending an email
  async sendEmail({ to, subject, html }: SendSMSProps): Promise<void> {
    try {
      const text: string = "This is a plain text version of the email content.";

      const info = await "";
      console.log(`✅ Email sent successfully: hihi`);
    } catch (error) {
      console.error("❌ Error sending email:", error);
      throw error;
    }
  }

  //01 Sending a Welcome email
  async sendWelcomeEmail(to: string, name: string): Promise<void> {
    // const subject = EMAIL_SUBJECTS.WELCOME;
    // const html = EMAIL_BODIES.WELCOME(name);
    // await this.sendEmail({ to, subject, html });
  }

  async sendOtp(phone: string, otp: string): Promise<void> {
    console.log(otp);
    // const subject = EMAIL_SUBJECTS.VERIFY_EMAIL;
    // const html = EMAIL_BODIES.VERIFY_EMAIL(name, link);
    // await this.sendEmail({ to, subject, html });
  }
}

export default SMSService;
