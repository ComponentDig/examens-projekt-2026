import nodemailer from 'nodemailer';

// kopplingen till mejlservern
// om uppgifter finns i env så används som annars fallback inställingar
const getTransporter = async () => {
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST || 'smtp.office365.com',
            port: parseInt(process.env.EMAIL_PORT || '587'),
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }

    // genererar ett testkonto - fick det inte att funka med vanlig mejl - Gemini hjälpte till med hur detta ska funka
    console.log("Genererar ett temporärt test-mejl konto...");
    const testAccount = await nodemailer.createTestAccount();

    // returnerar en transporter - testkontots genererade uppgifter
    return nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    });
};

export const sendResetPasswordEmail = async (userEmail, resetToken) => {
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;

    // Hämta transporter
    const transporter = await getTransporter();

    // mejl som skickas till användaren
    const mailOption = {
        from: `"Hemma På Tuna" <${transporter.options.auth.user}>`,
        to: userEmail,
        subject: "Återställ ditt lösenord - Hemma På Tuna",
        html: `
            <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 30px; border: 1px solid #E3D5CA; border-radius: 16px; background-color: #FEF6E9;">
                <h2 style="color: #6B5E4C; margin-bottom: 16px;">Hej!</h2>
                <p style="color: #4A4A4A; line-height: 1.6;">Vi har tagit emot en förfrågan om att återställa lösenordet för ditt konto på Hemma På Tuna.</p>
                <p style="color: #4A4A4A; line-height: 1.6;">Klicka på knappen nedan för att välja ett nytt lösenord.</p>
                <div style="margin: 30px 0; text-align: center;">
                    <a href="${resetUrl}" style="background-color: #A89F91; color: #FFFFFF; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 25px; display: inline-block;">
                        Återställ lösenord
                    </a>
                </div>
            </div>
        `
    };

    try {
        const info = await transporter.sendMail(mailOption);
        console.log(`Återställningsmejl skickat till ${userEmail}`);

        // ett testkonto, får en url där man kan se mailet i webbläsaren
        if (info.to && info.to.includes('ethereal.email') || info.messageId) {
            console.log(`👉 Se mailet live här: ${nodemailer.getTestMessageUrl(info)}`);
        }
        return true;
    } catch (error) {
        console.error("Fel vid sändning av mejl:", error);
        throw new Error("Kunde inte skicka epost");
    }
};