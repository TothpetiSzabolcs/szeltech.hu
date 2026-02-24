import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, company, email, phone, message } = await request.json();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const emailHtml = `
      <!DOCTYPE html>
<html lang="hu">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Új üzenet - SzelTech</title>
  </head>
  <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #0A0E12 0%, #1a1f26 50%, #0A0E12 100%); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
      <tr>
        <td align="center" style="padding: 60px 20px;">
          <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);">
            
            <!-- Header -->
<tr>
  <td align="center" style="background: linear-gradient(135deg, #0A0E12 0%, #1F2937 100%); padding: 50px 40px;">
    <h1 style="margin: 0; color: #E8E8E8; font-size: 38px; font-weight: 900; letter-spacing: 0.15em; text-transform: uppercase;">
      SZEL<span style="color: #C0A060;">TECH</span>
    </h1>
    <div style="width: 100px; height: 4px; background: linear-gradient(90deg, #C0A060 0%, #D4B574 50%, #C0A060 100%); margin: 24px auto 0; border-radius: 2px;"></div>
  </td>
</tr>

<!-- Gradient Border Strip -->
<tr>
  <td style="height: 6px; background: linear-gradient(90deg, #0A0E12 0%, #1F2937 20%, #C0A060 50%, #1F2937 80%, #0A0E12 100%); padding: 0;"></td>
</tr>

            <!-- Title -->
            <tr>
              <td align="center" style="padding: 48px 40px 36px; background-color: #ffffff;">
                <h2 style="margin: 0 0 14px; color: #0A0E12; font-size: 28px; font-weight: 900; letter-spacing: -0.02em;">
                  Új kapcsolatfelvételi üzenet
                </h2>
                <p style="margin: 0; color: #6B7280; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em;">
                  szeltech.hu weboldalról
                </p>
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding: 0 40px 48px;">
                
                <!-- Name -->
                <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
                  <tr>
                    <td align="center" style="padding-bottom: 32px; border-bottom: 2px solid #F3F4F6;">
                      <p style="margin: 0 0 12px; color: #0A0E12; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.25em;">
                        NÉV
                      </p>
                      <p style="margin: 0; color: #C0A060; font-size: 20px; font-weight: 800;">
                        ${name}
                      </p>
                    </td>
                  </tr>
                </table>

                <!-- Company (if provided) -->
                ${
                  company
                    ? `
                <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
                  <tr>
                    <td align="center" style="padding-bottom: 32px; border-bottom: 2px solid #F3F4F6;">
                      <p style="margin: 0 0 12px; color: #0A0E12; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.25em;">
                        CÉGNÉV
                      </p>
                      <p style="margin: 0; color: #C0A060; font-size: 20px; font-weight: 800;">
                        ${company}
                      </p>
                    </td>
                  </tr>
                </table>
                `
                    : ""
                }

                <!-- Email -->
                <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
                  <tr>
                    <td align="center" style="padding-bottom: 32px; border-bottom: 2px solid #F3F4F6;">
                      <p style="margin: 0 0 12px; color: #0A0E12; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.25em;">
                        E-MAIL CÍM
                      </p>
                      <p style="margin: 0;">
                        <a href="mailto:${email}" style="color: #C0A060; font-size: 18px; font-weight: 800; text-decoration: none;">
                          ${email}
                        </a>
                      </p>
                    </td>
                  </tr>
                </table>

                <!-- Phone (if provided) -->
                ${
                  phone
                    ? `
                <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
                  <tr>
                    <td align="center" style="padding-bottom: 32px; border-bottom: 2px solid #F3F4F6;">
                      <p style="margin: 0 0 12px; color: #0A0E12; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.25em;">
                        TELEFONSZÁM
                      </p>
                      <p style="margin: 0;">
                        <a href="tel:${phone.replace(/\s+/g, "")}" style="color: #C0A060; font-size: 19px; font-weight: 800; text-decoration: none; letter-spacing: 0.08em;">
                          ${phone.includes("+36") ? phone.replace(/\+36\s?(\d{2})\s?(\d{3})\s?(\d{4})/, "+36 ($1) $2-$3") : phone}
                        </a>
                      </p>
                    </td>
                  </tr>
                </table>
                `
                    : ""
                }

                <!-- Message Box -->
                <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 36px;">
                  <tr>
                    <td style="background: linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%); border-left: 6px solid #C0A060; padding: 32px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);">
                      <p style="margin: 0 0 16px; color: #0A0E12; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.25em; text-align: center;">
                        ÜZENET
                      </p>
                      <p style="margin: 0; color: #1F2937; font-size: 15px; line-height: 1.8; text-align: left; white-space: pre-wrap;">
${message}
                      </p>
                    </td>
                  </tr>
                </table>

                <!-- CTA Button -->
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td align="center">
                      <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #C0A060 0%, #D4B574 100%); color: #0A0E12; padding: 18px 48px; font-size: 13px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.15em; text-decoration: none; border-radius: 10px; box-shadow: 0 8px 24px rgba(192, 160, 96, 0.4);">
                        ✉️ VÁLASZ KÜLDÉSE
                      </a>
                    </td>
                  </tr>
                </table>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="background: linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%); padding: 36px 40px; border-top: 1px solid #E5E7EB;">
                <p style="margin: 0 0 12px; color: #6B7280; font-size: 13px; line-height: 1.7;">
                  Ez az üzenet automatikusan generált a <strong style="color: #0A0E12;">szeltech.hu</strong> weboldalról.
                </p>
                <p style="margin: 0; color: #9CA3AF; font-size: 12px; font-weight: 700;">
                  © ${new Date().getFullYear()} SzelTech · Szélig Zoltán E.V.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
    `;

    await transporter.sendMail({
      from: `"SzelTech Website" <${process.env.SMTP_FROM}>`,
      to: process.env.SMTP_TO,
      replyTo: email,
      subject: `🔔 Új üzenet: ${name}${company ? ` (${company})` : ""}`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
