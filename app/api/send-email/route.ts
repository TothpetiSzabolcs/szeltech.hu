import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, email, phone, message } = body;

    const { data, error } = await resend.emails.send({
      from: "SzelTech Website <onboarding@resend.dev>",
      to: ["szeligfem@gmail.com"],
      replyTo: email,
      subject: `Új ajánlatkérés: ${name}${company ? ` (${company})` : ""}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5; }
            .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #0a0b0d 0%, #1a1b21 100%); padding: 40px 30px; text-align: center; border-bottom: 3px solid #c0a060; }
            .logo { font-size: 28px; font-weight: 900; letter-spacing: 0.1em; color: #e8ecf0; text-transform: uppercase; margin: 0; }
            .logo span { color: #c0a060; }
            .content { padding: 40px 30px; }
            .title { font-size: 22px; font-weight: 700; color: #0a0b0d; margin: 0 0 24px 0; }
            .notice { background: #fff8e6; border-left: 4px solid #c0a060; padding: 16px; margin-bottom: 32px; font-size: 14px; color: #6b5d3f; }
            .field { margin-bottom: 20px; }
            .label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #8c95a0; margin-bottom: 6px; }
            .value { font-size: 15px; color: #0a0b0d; font-weight: 500; }
            .message-box { background: #f8f9fa; border: 1px solid #e0e0e0; border-radius: 6px; padding: 20px; margin-top: 24px; }
            .message-text { font-size: 15px; line-height: 1.7; color: #2a2a2a; white-space: pre-wrap; }
            .footer { background: #f8f9fa; padding: 24px 30px; text-align: center; border-top: 1px solid #e0e0e0; }
            .footer-text { font-size: 12px; color: #8c95a0; margin: 0; }
            .divider { height: 1px; background: #e0e0e0; margin: 32px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 class="logo">Szélig <span>Tech</span></h1>
            </div>
            
            <div class="content">
              <h2 class="title">Új ajánlatkérés érkezett</h2>
                            
              <div class="field">
                <div class="label">Név</div>
                <div class="value">${name}</div>
              </div>
              
              ${
                company
                  ? `
              <div class="field">
                <div class="label">Cégnév</div>
                <div class="value">${company}</div>
              </div>
              `
                  : ""
              }
              
              <div class="field">
                <div class="label">Email cím</div>
                <div class="value"><a href="mailto:${email}" style="color: #c0a060; text-decoration: none;">${email}</a></div>
              </div>
              
              ${
                phone
                  ? `
              <div class="field">
                <div class="label">Telefonszám</div>
                <div class="value"><a href="tel:${phone}" style="color: #c0a060; text-decoration: none;">${phone}</a></div>
              </div>
              `
                  : ""
              }
              
              <div class="divider"></div>
              
              <div class="label" style="margin-bottom: 12px;">Üzenet</div>
              <div class="message-box">
                <div class="message-text">${message.replace(/\n/g, "<br>")}</div>
              </div>
            </div>
            
            <div class="footer">
              <p class="footer-text">© ${new Date().getFullYear()} Szélig Tech · Precíziós CNC esztergálás és marás</p>
              <p class="footer-text" style="margin-top: 8px;">Nagykanizsa, Csengery út 111.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
