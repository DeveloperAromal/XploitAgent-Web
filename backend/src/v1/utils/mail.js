import nodemailer from "nodemailer";

export async function sendCredentialsEmail(
  to,
  subject,
  username,
  password,
  loginLink,
  fromEmail,
  fromPassword,
  companyLogoUrl = "https://vgvmufmldgmthuoxqrum.supabase.co/storage/v1/object/public/xploitagent-bucket//file_00000000413061f78631d52252e1aeab-removebg-preview.png"
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: fromEmail,
      pass: fromPassword,
    },
  });

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        /* Custom styles for email client compatibility and overrides */
        body {
          font-family: 'Inter', Arial, sans-serif;
          background-color: #f3f4f6; /* Light gray background */
          padding: 20px;
          color: #374151; /* Dark gray text */
          line-height: 1.6;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 30px;
          border-radius: 12px; /* More rounded corners */
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); /* Softer shadow */
        }
        .header {
          text-align: center;
          margin-bottom: 24px;
        }
        .logo {
          max-width: 180px; /* Adjust logo size */
          height: auto;
          border-radius: 8px; /* Rounded logo */
        }
        h2 {
          color: #1d4ed8; /* Darker blue for heading */
          text-align: center;
          margin-top: 20px;
          margin-bottom: 20px;
          font-size: 1.875rem; /* Tailwind text-3xl */
          font-weight: 700; /* Tailwind font-bold */
        }
        .credentials {
          background-color: #e0e7ff; /* Lighter blue background */
          padding: 20px;
          border-radius: 8px;
          margin-top: 24px;
          margin-bottom: 24px;
          font-size: 1rem;
          line-height: 1.8;
          border: 1px solid #c7d2fe; /* Subtle border */
        }
        .credentials p {
          margin: 8px 0;
        }
        .button {
          display: block; /* Make button full width */
          background-color: #3b82f6; /* Blue button */
          color: #ffffff;
          padding: 14px 28px;
          text-decoration: none;
          border-radius: 8px;
          text-align: center;
          font-weight: 600;
          transition: background-color 0.3s ease;
        }
        .button:hover {
          background-color: #2563eb; /* Darker blue on hover */
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          font-size: 0.75rem; /* Tailwind text-xs */
          color: #6b7280; /* Gray text */
        }
        .footer a {
          color: #3b82f6;
          text-decoration: none;
        }
        .footer a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Company Logo Section -->
        <div class="header">
          <img src="${companyLogoUrl}" alt="Company Logo" class="logo">
        </div>

        <h2>🔐 Your Access Credentials</h2>

        <p>Hello,</p>
        <p>Your login credentials for XploitAgent are provided below. Please keep them safe and do not share them with anyone.</p>
        
        <div class="credentials">
          <p><strong>Username:</strong> <span style="font-weight: bold; color: #1d4ed8;">${username}</span></p>
          <p><strong>Password:</strong> <span style="font-weight: bold; color: #1d4ed8;">${password}</span></p>
        </div>

        <a class="button" href="${loginLink}" target="_blank">Login Now</a>

        <p style="margin-top: 24px;">If you did not request these credentials, please ignore this email or contact support immediately.</p>

        <div class="footer">
          <p>&copy; 2025 XploitAgent | All rights reserved.</p>
          <p>This is an automated email. Please do not reply.</p>
          <p><a href="${loginLink}" target="_blank">Visit our website</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"XploitAgent" <${fromEmail}>`,
    to,
    subject,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[✓] Email sent: ${info.response}`);
  } catch (err) {
    console.error(`[!] Failed to send email:`, err);
  }
}
