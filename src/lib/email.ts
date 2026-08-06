import { Resend } from "resend";

/**
 * HTML-escape a string value. Use on ALL dynamic content interpolated into
 * HTML email templates, including subject lines and URLs (unless already
 * passed through encodeURIComponent).
 */
function escapeHtml(value: string | number | boolean | null | undefined): string {
  const str = String(value ?? "");
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Site origin used in email links. Override via NEXT_PUBLIC_SITE_URL. */
function getEmailSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://susanatelier.com").replace(/\/+$/, "");
}

/**
 * Retry a Resend API call with exponential backoff.
 */
async function sendWithRetry(
  payload: any,
  maxRetries = 2,
): Promise<void> {
  let lastError: Error | null = null;
  const client = new Resend(process.env.RESEND_API_KEY || "re_mock_key_for_static_build");
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await client.emails.send(payload);
      return; // success
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (attempt < maxRetries) {
        // Linear backoff: 1s, 2s
        await new Promise((r) => setTimeout(r, attempt * 1000));
      }
    }
  }
  throw lastError ?? new Error("Failed to send email after retries");
}

function capitalizeLabel(label: string): string {
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export async function sendReferralNotification(
  email: string,
  data: {
    refereeName: string;
    refereeTier: "founding" | "custodian" | "observer";
    inherited: boolean;
    pointsEarned: number;
    referrerLoyaltyTotal: number;
    referrerCode: string;
  },
) {
  const siteUrl = getEmailSiteUrl();
  const tierLabel = capitalizeLabel(data.refereeTier);
  const safeRefereeName = escapeHtml(data.refereeName);
  const safeTierLabel = escapeHtml(tierLabel);
  const safeRefCode = escapeHtml(data.referrerCode);

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: 'Cormorant Garamond', Georgia, serif; background: #F5EAE1; margin: 0; padding: 40px 20px; color: #3B2412;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto;">
        <tr>
          <td style="padding: 40px 30px; background: #FFFFFF; border: 1px solid #E4D3B8; border-radius: 8px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="text-align: center; padding-bottom: 30px; border-bottom: 1px solid #E4D3B8;">
                  <img src="${siteUrl}/logos/trans/Susan_Atelier_Logo_WordmarkLockup-trans.png" alt="Susan Atelier" style="width: 200px; height: auto;" />
                </td>
              </tr>
              <tr>
                <td style="padding: 40px 30px 20px;">
                  <h1 style="font-family: 'Playfair Display', Georgia, serif; font-size: 28px; color: #3B2412; margin: 0 0 20px; line-height: 1.3;">
                    <span style="font-family: 'Alex Brush', cursive; font-size: 32px; color: #B89A7C;">Dear Custodian,</span>
                  </h1>

                  <p style="font-size: 18px; line-height: 1.7; color: #3B2412; margin: 0 0 24px;">
                    <strong style="color: #3B2412;">${safeRefereeName}</strong> has joined the circle as a <strong style="color: #8A6324;">${safeTierLabel} Custodian</strong>.
                  </p>

                  ${data.inherited ? `
                    <div style="background: #FBF6F0; border: 1px solid #E4D3B8; border-radius: 6px; padding: 20px; margin: 24px 0; text-align: center;">
                      <p style="margin: 0; color: #8A6324; font-style: italic;">
                        They inherited your Founding tier through your referral — trust transferred.
                      </p>
                    </div>
                  ` : ""}

                  <div style="background: #3B2412; color: #F5EAE1; border-radius: 6px; padding: 24px; text-align: center; margin: 30px 0;">
                    <p style="margin: 0 0 8px; font-size: 14px; color: #E4D3B8;">YOU'VE EARNED</p>
                    <p style="font-family: 'Playfair Display', Georgia, serif; font-size: 48px; font-weight: 700; color: #8A6324; margin: 0 0 8px; letter-spacing: 2px;">+${escapeHtml(data.pointsEarned)}</p>
                    <p style="margin: 8px 0 0; font-size: 14px; color: #E4D3B8;">Loyalty Points</p>
                  </div>

                  <p style="font-size: 16px; line-height: 1.7; color: #3B2412; margin: 24px 0 0;">
                    Your total: <strong style="color: #8A6324;">${escapeHtml(data.referrerLoyaltyTotal)} points</strong>
                  </p>

                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top: 36px;">
                    <tr>
                      <td style="text-align: center;">
                        <a href="${siteUrl}/custodian/loyalty?ref=${encodeURIComponent(data.referrerCode)}" style="display: inline-block; background: #3B2412; color: #F5EAE1; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 16px; font-weight: 600; text-decoration: none; padding: 16px 32px; border-radius: 4px; letter-spacing: 0.5px;">
                          View Your Loyalty Dashboard
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding: 30px; text-align: center; border-top: 1px solid rgba(232, 211, 184, 0.5);">
                  <p style="margin: 0; font-size: 12px; color: #B89A7C; line-height: 1.7;">
                    Made in India · Artisan wages transparent · Genuine MRP, no fake discounts<br>
                    Susan Atelier · Made by named hands, worn for years
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

  await sendWithRetry({
    from: "Susan Atelier <noreply@susanatelier.com>",
    to: email,
    subject: `${escapeHtml(data.refereeName)} joined as ${escapeHtml(tierLabel)} Custodian`,
    html,
  });
}

export async function sendApplicationAccepted(
  email: string,
  data: {
    applicantName: string;
    tier: "founding" | "custodian" | "observer";
    score: number;
    referralCode: string;
  },
) {
  const siteUrl = getEmailSiteUrl();
  const tierLabel = capitalizeLabel(data.tier);
  const safeApplicantName = escapeHtml(data.applicantName);
  const safeTierLabel = escapeHtml(tierLabel);
  const safeReferralCode = escapeHtml(data.referralCode);

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: 'Cormorant Garamond', Georgia, serif; background: #F5EAE1; margin: 0; padding: 40px 20px; color: #3B2412;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto;">
        <tr>
          <td style="padding: 40px 30px; background: #FFFFFF; border: 1px solid #E4D3B8; border-radius: 8px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="text-align: center; padding-bottom: 30px; border-bottom: 1px solid #E4D3B8;">
                  <img src="${siteUrl}/logos/trans/Susan_Atelier_Logo_WordmarkLockup-trans.png" alt="Susan Atelier" style="width: 200px; height: auto;" />
                </td>
              </tr>
              <tr>
                <td style="padding: 40px 30px 20px;">
                  <h1 style="font-family: 'Playfair Display', Georgia, serif; font-size: 32px; color: #3B2412; margin: 0 0 16px; line-height: 1.2;">
                    Welcome to the Circle
                  </h1>

                  <p style="font-size: 18px; line-height: 1.7; color: #3B2412; margin: 0 0 24px;">
                    Dear <strong>${safeApplicantName}</strong>,
                  </p>

                  <p style="font-size: 18px; line-height: 1.7; color: #3B2412; margin: 0 0 24px;">
                    You've been accepted as a <strong style="color: #8A6324;">${safeTierLabel} Custodian</strong> (Score: ${escapeHtml(data.score)}/100).
                  </p>

                  <div style="background: #3B2412; color: #F5EAE1; border-radius: 6px; padding: 24px; text-align: center; margin: 30px 0;">
                    <p style="margin: 0 0 8px; font-size: 14px; color: #E4D3B8;">YOUR REFERRAL CODE</p>
                    <p style="font-family: 'Playfair Display', Georgia, serif; font-size: 28px; font-weight: 700; color: #8A6324; margin: 0; letter-spacing: 4px;">${safeReferralCode}</p>
                    <p style="margin: 12px 0 0; font-size: 13px; color: #E4D3B8;">Share this to invite others to the circle</p>
                  </div>

                  <p style="font-size: 16px; line-height: 1.7; color: #3B2412; margin: 24px 0 0;">
                    Your referral code is permanent. When someone you invite joins, you'll earn loyalty points — and if their values align with your tier, they may inherit it.
                  </p>

                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top: 36px;">
                    <tr>
                      <td style="text-align: center;">
                        <a href="${siteUrl}/custodian/dashboard" style="display: inline-block; background: #3B2412; color: #F5EAE1; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 16px; font-weight: 600; text-decoration: none; padding: 16px 32px; border-radius: 4px; letter-spacing: 0.5px;">
                          Access Your Custodian Dashboard
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding: 30px; text-align: center; border-top: 1px solid rgba(232, 211, 184, 0.5);">
                  <p style="margin: 0; font-size: 12px; color: #B89A7C; line-height: 1.7;">
                    Made in India · Artisan wages transparent · Genuine MRP, no fake discounts<br>
                    Susan Atelier · Made by named hands, worn for years
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

  await sendWithRetry({
    from: "Susan Atelier <noreply@susanatelier.com>",
    to: email,
    subject: `Welcome to the Circle — You're a ${safeTierLabel} Custodian`,
    html,
  });
}
