import { Users } from "./components/columns";

function getAppImageUrl(appType: string) {
  const imageUrls = {
    gmail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png',
    slack: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png',
    hubspot: 'https://w7.pngwing.com/pngs/578/43/png-transparent-hubspot-hd-logo-thumbnail.png'
  };

  return imageUrls[appType as keyof typeof imageUrls] || 'https://placeholder.svg?height=165&width=165';
}

function getAppColor(appType: string) {
  const colors = {
    gmail: '#D44638',
    slack: '#4A154B',
    hubspot: '#FF7A59'
  };

  return colors[appType as keyof typeof colors] || '#000000';
}

export function generateEmailTemplate(user: Users) {
  const hasGmailAccess = user.access.includes('gmail');
  const emailToUse = hasGmailAccess ? user.email : user.personal_email;

  const defaultPassword = 'wvfPzp#X3109';

  const slackInviteLink = 'https://join.slack.com/t/revopsautomated/shared_invite/zt-1p21q2j6f-itcIWN8LS1RwjUogXrUDug';

  const hubspotLink = 'https://app.hubspot.com/login';

  const appCards: {
    name: string;
    img: string;
    link: string;
    details: string;
    color: string;
  }[] = [];

  user.access.forEach(accessType => {
    let appInfo = {
      name: '',
      img: '',
      link: '',
      details: '',
      color: ''
    };

    switch (accessType) {
      case 'gmail':
        appInfo.name = 'Gmail';
        appInfo.link = 'https://mail.google.com';
        appInfo.img = getAppImageUrl(accessType);
        appInfo.color = getAppColor(accessType);
        appInfo.details = `
          <div style="margin-top: 10px; text-align: left;">
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Password:</strong> ${defaultPassword}</p>
          </div>
        `;
        break;
      case 'slack':
        appInfo.name = 'Slack';
        appInfo.link = slackInviteLink;
        appInfo.color = getAppColor(accessType);
        appInfo.img = getAppImageUrl(accessType);
        break;
      case 'hubspot':
        appInfo.name = 'Hubspot';
        appInfo.link = hubspotLink;
        appInfo.color = getAppColor(accessType);
        appInfo.img = getAppImageUrl(accessType);
        appInfo.details = `
          <div style="margin-top: 10px; text-align: left;">
            <p><strong>Email:</strong> ${emailToUse}</p>
          </div>
        `;
        break;
    }

    appCards.push(appInfo);
  });

  // Generate HTML for app cards
  const appCardsHtml = appCards.map(app => `
    <tr>
      <td align="center" style="padding:20px 20px 10px 20px;">
        <table cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px; border-radius: 8px; border: 1px solid #e0e0e0; box-shadow: 0 2px 5px rgba(0,0,0,0.05); background-color: #ffffff;">
          <tr>
            <td style="border-bottom: 3px solid ${app.color}; border-radius: 8px 8px 0 0; padding: 15px; background-color: #f9f9f9;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="60" align="center" valign="middle">
                    <img 
                      src="${app.img}"
                      alt="${app.name}" 
                      style="display:block; border:0; width:50px; height:50px; object-fit:contain;" 
                    >
                  </td>
                  <td style="padding-left: 15px;">
                    <h3 style="margin:0; font-family:'Space Grotesk', sans-serif; font-size:20px; color:#333333;">${app.name}</h3>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 15px;">
              ${app.details ? `
              <div style="margin-bottom: 15px;">
                ${app.details}
              </div>
              ` : ''}
              <div style="text-align: center; margin-top: 10px;">
                <a href="${app.link}"
                  target="_blank"
                  style="background-color: ${app.color}; color: #FFFFFF; font-family:'Space Grotesk', sans-serif; font-size:14px; display:inline-block; border-radius:4px; text-decoration:none; padding:8px 20px; font-weight:500;"
                >Access ${app.name}</a>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `).join('');

  // Generate the complete HTML email template
  const emailTemplate = `<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office"
  style="font-family:arial, 'helvetica neue', helvetica, sans-serif">

<head>
  <meta charset="UTF-8">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta content="telephone=no" name="format-detection">
  <title>Welcome to RevopsAutomated</title>
  <!--[if (mso 16)]>
<style type="text/css">
a {text-decoration: none;}
</style>
<![endif]-->
  <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
  <!--[if gte mso 9]>
<xml>
<o:OfficeDocumentSettings>
<o:AllowPNG></o:AllowPNG>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
<![endif]-->
  <!--[if !mso]><!-- -->
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk&display=swap" rel="stylesheet">
  <!--<![endif]-->
  <!--[if !mso]><!-- -->
  <link href="https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i" rel="stylesheet">
  <!--<![endif]-->
  <style type="text/css">
    #outlook a {
      padding: 0;
    }

    .es-button {
      mso-style-priority: 100 !important;
      text-decoration: none !important;
    }

    a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }

    .es-desk-hidden {
      display: none;
      float: left;
      overflow: hidden;
      width: 0;
      max-height: 0;
      line-height: 0;
      mso-hide: all;
    }

    @media only screen and (max-width:600px) {

      p,
      ul li,
      ol li,
      a {
        line-height: 150% !important
      }

      h1,
      h2,
      h3,
      h1 a,
      h2 a,
      h3 a {
        line-height: 120%
      }

      h1 {
        font-size: 40px !important;
        text-align: left
      }

      h2 {
        font-size: 32px !important;
        text-align: left
      }

      h3 {
        font-size: 24px !important;
        text-align: left
      }

      .es-header-body h1 a,
      .es-content-body h1 a,
      .es-footer-body h1 a {
        font-size: 40px !important;
        text-align: left
      }

      .es-header-body h2 a,
      .es-content-body h2 a,
      .es-footer-body h2 a {
        font-size: 32px !important;
        text-align: left
      }

      .es-header-body h3 a,
      .es-content-body h3 a,
      .es-footer-body h3 a {
        font-size: 24px !important;
        text-align: left
      }

      .es-menu td a {
        font-size: 14px !important
      }

      .es-header-body p,
      .es-header-body ul li,
      .es-header-body ol li,
      .es-header-body a {
        font-size: 14px !important
      }

      .es-content-body p,
      .es-content-body ul li,
      .es-content-body ol li,
      .es-content-body a {
        font-size: 14px !important
      }

      .es-footer-body p,
      .es-footer-body ul li,
      .es-footer-body ol li,
      .es-footer-body a {
        font-size: 12px !important
      }

      .es-infoblock p,
      .es-infoblock ul li,
      .es-infoblock ol li,
      .es-infoblock a {
        font-size: 12px !important
      }

      *[class="gmail-fix"] {
        display: none !important
      }

      .es-m-txt-c,
      .es-m-txt-c h1,
      .es-m-txt-c h2,
      .es-m-txt-c h3 {
        text-align: center !important
      }

      .es-m-txt-r,
      .es-m-txt-r h1,
      .es-m-txt-r h2,
      .es-m-txt-r h3 {
        text-align: right !important
      }

      .es-m-txt-l,
      .es-m-txt-l h1,
      .es-m-txt-l h2,
      .es-m-txt-l h3 {
        text-align: left !important
      }

      .es-m-txt-r img,
      .es-m-txt-c img,
      .es-m-txt-l img {
        display: inline !important
      }

      .es-button-border {
        display: inline-block !important
      }

      a.es-button,
      button.es-button {
        font-size: 16px !important;
        display: inline-block !important
      }

      .es-adaptive table,
      .es-left,
      .es-right {
        width: 100% !important
      }

      .es-content table,
      .es-header table,
      .es-footer table,
      .es-content,
      .es-footer,
      .es-header {
        width: 100% !important;
        max-width: 600px !important
      }

      .es-adapt-td {
        display: block !important;
        width: 100% !important
      }

      .adapt-img {
        width: 100% !important;
        height: auto !important
      }

      .es-m-p0 {
        padding: 0 !important
      }

      .es-m-p0r {
        padding-right: 0 !important
      }

      .es-m-p0l {
        padding-left: 0 !important
      }

      .es-m-p0t {
        padding-top: 0 !important
      }

      .es-m-p0b {
        padding-bottom: 0 !important
      }

      .es-m-p20b {
        padding-bottom: 20px !important
      }

      .es-mobile-hidden,
      .es-hidden {
        display: none !important
      }

      tr.es-desk-hidden,
      td.es-desk-hidden,
      table.es-desk-hidden {
        width: auto !important;
        overflow: visible !important;
        float: none !important;
        max-height: inherit !important;
        line-height: inherit !important
      }

      tr.es-desk-hidden {
        display: table-row !important
      }

      table.es-desk-hidden {
        display: table !important
      }

      td.es-desk-menu-hidden {
        display: table-cell !important
      }

      .es-menu td {
        width: 1% !important
      }

      table.es-table-not-adapt,
      .esd-block-html table {
        width: auto !important
      }

      table.es-social {
        display: inline-block !important
      }

      table.es-social td {
        display: inline-block !important
      }

      .es-desk-hidden {
        display: table-row !important;
        width: auto !important;
        overflow: visible !important;
        max-height: inherit !important
      }

      .es-m-p5 {
        padding: 5px !important
      }

      .es-m-p5t {
        padding-top: 5px !important
      }

      .es-m-p5b {
        padding-bottom: 5px !important
      }

      .es-m-p5r {
        padding-right: 5px !important
      }

      .es-m-p5l {
        padding-left: 5px !important
      }

      .es-m-p10 {
        padding: 10px !important
      }

      .es-m-p10t {
        padding-top: 10px !important
      }

      .es-m-p10b {
        padding-bottom: 10px !important
      }

      .es-m-p10r {
        padding-right: 10px !important
      }

      .es-m-p10l {
        padding-left: 10px !important
      }

      .es-m-p15 {
        padding: 15px !important
      }

      .es-m-p15t {
        padding-top: 15px !important
      }

      .es-m-p15b {
        padding-bottom: 15px !important
      }

      .es-m-p15r {
        padding-right: 15px !important
      }

      .es-m-p15l {
        padding-left: 15px !important
      }

      .es-m-p20 {
        padding: 20px !important
      }

      .es-m-p20t {
        padding-top: 20px !important
      }

      .es-m-p20r {
        padding-right: 20px !important
      }

      .es-m-p20l {
        padding-left: 20px !important
      }

      .es-m-p25 {
        padding: 25px !important
      }

      .es-m-p25t {
        padding-top: 25px !important
      }

      .es-m-p25b {
        padding-bottom: 25px !important
      }

      .es-m-p25r {
        padding-right: 25px !important
      }

      .es-m-p25l {
        padding-left: 25px !important
      }

      .es-m-p30 {
        padding: 30px !important
      }

      .es-m-p30t {
        padding-top: 30px !important
      }

      .es-m-p30b {
        padding-bottom: 30px !important
      }

      .es-m-p30r {
        padding-right: 30px !important
      }

      .es-m-p30l {
        padding-left: 30px !important
      }

      .es-m-p35 {
        padding: 35px !important
      }

      .es-m-p35t {
        padding-top: 35px !important
      }

      .es-m-p35b {
        padding-bottom: 35px !important
      }

      .es-m-p35r {
        padding-right: 35px !important
      }

      .es-m-p35l {
        padding-left: 35px !important
      }

      .es-m-p40 {
        padding: 40px !important
      }

      .es-m-p40t {
        padding-top: 40px !important
      }

      .es-m-p40b {
        padding-bottom: 40px !important
      }

      .es-m-p40r {
        padding-right: 40px !important
      }

      .es-m-p40l {
        padding-left: 40px !important
      }

      .h-auto {
        height: auto !important
      }
    }
  </style>
</head>

<body
  style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
  <div class="es-wrapper-color" style="background-color:#FFFFFF">
    <!--[if gte mso 9]>
<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
<v:fill type="tile" color="#ffffff"></v:fill>
</v:background>
<![endif]-->
    <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0"
      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FFFFFF">
      <tr>
        <td valign="top" style="padding:0;Margin:0">
          <table cellpadding="0" cellspacing="0" class="es-header" align="center"
            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
            <tr>
              <td align="center" style="padding:0;Margin:0">
                <table bgcolor="#ffffff" class="es-header-body" align="center" cellpadding="0" cellspacing="0"
                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                  <tr>
                    <td class="es-m-p0b" align="left"
                      style="Margin:0;padding-top:15px;padding-bottom:15px;padding-left:20px;padding-right:20px">
                      <!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:270px" valign="top"><![endif]-->
                      <table cellpadding="0" cellspacing="0" class="es-left" align="left"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                        <tr>
                          <td class="es-m-p0r es-m-p20b" valign="top" align="center"
                            style="padding:0;Margin:0;width:270px">
                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tr>
                                <td align="left" style="padding:0;Margin:0">
                                  <h2
                                    style="Margin:0;line-height:43px;mso-line-height-rule:exactly;font-family:'Space Grotesk', sans-serif;font-size:36px;font-style:normal;font-weight:normal;color:#2a25ab">
                                    <strong>RevOps Automated</strong><span style="font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif"></span>
                                  </h2>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      <!--[if mso]></td><td style="width:20px"></td><td style="width:270px" valign="top"><![endif]-->
                      <table cellpadding="0" cellspacing="0" class="es-right" align="right"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                        <tr class="es-mobile-hidden">
                          <td align="left" style="padding:0;Margin:0;width:270px">
                            <table cellpadding="0" cellspacing="0" width="100%"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tr>
                                <td align="center" style="padding:0;Margin:0;display:none"></td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      <!--[if mso]></td></tr></table><![endif]-->
                    </td>
                  </tr>
                  <tr>
                    <td align="left" style="padding:0;Margin:0">
                      <table cellpadding="0" cellspacing="0" width="100%"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr>
                          <td align="center" valign="top" style="padding:0;Margin:0;width:600px">
                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tr>
                                <td align="center"
                                  style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;font-size:0">
                                  <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0"
                                    role="presentation"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                    <tr>
                                      <td
                                        style="padding:0;Margin:0;border-bottom:2px solid #0b5394;background:unset;height:1px;width:100%;margin:0px">
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <table class="es-content" cellspacing="0" cellpadding="0" align="center"
            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
            <tr>
              <td align="center" style="padding:0;Margin:0">
                <table class="es-content-body"
                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#ffffff;width:600px"
                  cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                  <tr>
                    <td align="left"
                      style="Margin:0;padding-left:20px;padding-right:20px;padding-bottom:30px;padding-top:40px">
                      <table cellpadding="0" cellspacing="0" width="100%"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr>
                          <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tr>
                                <td align="left" style="padding:0;Margin:0">
                                  <h2
                                    style="Margin:0;line-height:43px;mso-line-height-rule:exactly;font-family:'Space Grotesk', sans-serif;font-size:36px;font-style:normal;font-weight:normal;color:#051923">
                                    Hello <strong>${user.first_name} ${user.last_name},</strong></h2>
                                  <p
                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#1F1F1F;font-size:16px">
                                    <br>
                                  </p>
                                  <p
                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#1F1F1F;font-size:16px">
                                    I'm delighted to welcome you to RevOps Automated! We're thrilled to have you on board
                                    as our newest incorporation and look forward to the contributions you'll make to our
                                    growing team.</p>
                                  <p
                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#1F1F1F;font-size:16px">
                                    <br>
                                  </p>
                                  <h2
                                    style="Margin:0;line-height:43px;mso-line-height-rule:exactly;font-family:'Space Grotesk', sans-serif;font-size:36px;font-style:normal;font-weight:normal;color:#051923">
                                    Here is the access to the tools that you will be using:
                                  </h2>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <table cellpadding="0" cellspacing="0" class="es-content" align="center"
            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
            <tr>
              <td align="center" style="padding:0;Margin:0">
                <table class="es-content-body"
                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px"
                  cellspacing="0" cellpadding="0" align="center">
                  <!-- apps to render -->
                  ${appCardsHtml}
                  <!--  -->
                  <tr>
                    <td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px;padding-top:30px">
                      <table cellpadding="0" cellspacing="0" width="100%"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr>
                          <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tr>
                                <td align="center" style="padding:20px;Margin:0;font-size:0">
                                  <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0"
                                    role="presentation"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                    <tr>
                                      <td
                                        style="padding:0;Margin:0;border-bottom:2px solid #0b5394;background:unset;height:1px;width:100%;margin:0px">
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td align="center" class="es-m-txt-l" style="padding:0;Margin:0">
                                  <h2
                                    style="Margin:0;line-height:43px;mso-line-height-rule:exactly;font-family:'Space Grotesk', sans-serif;font-size:36px;font-style:normal;font-weight:normal;color:#051923">
                                    Natalie Furness</h2>
                                </td>
                              </tr>
                              <tr>
                                <td align="center" class="es-m-txt-l" style="padding:0;Margin:0;padding-top:5px">
                                  <p
                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#1F1F1F;font-size:16px">
                                    CEO &amp; Founder</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td align="left"
                      style="Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;padding-bottom:40px">
                      <table cellspacing="0" cellpadding="0" align="center" class="es-left"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr>
                          <td class="es-m-p0r" valign="top" align="center" style="padding:0;Margin:0">
                            <table width="100%" cellspacing="0" cellpadding="0" role="presentation"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tr>
                                <td align="left" class="es-m-txt-l" style="padding:0;Margin:0;font-size:0px"><a
                                    target="_blank"
                                    href="https://revopsautomated.com"
                                    style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#00A6FB;font-size:16px"><img src="https://zqqdfw.stripocdn.email/content/guids/CABINET_7d9888f43dab4e72e9b99bec907adaefb34493f3dcb586d18c3938b0105d30e3/images/download.jpeg" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="90"></a>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td class="es-hidden" style="padding:0;Margin:0;width:5px"></td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <table cellpadding="0" cellspacing="0" class="es-footer" align="center"
            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
            <tr>
              <td align="center" style="padding:0;Margin:0">
                <table bgcolor="#ffffff" class="es-footer-body" align="center" cellpadding="0" cellspacing="0"
                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                  <tr>
                    <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px">
                      <table cellpadding="0" cellspacing="0" width="100%"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr>
                          <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tr>
                                <td align="center"
                                  style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px;font-size:0">
                                  <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0"
                                    role="presentation"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                    <tr>
                                      <td
                                        style="padding:0;Margin:0;border-bottom:2px solid #0b5394;background:unset;height:1px;width:100%;margin:0px">
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td align="left"
                      style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:30px">
                      <table cellpadding="0" cellspacing="0" width="100%"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr>
                          <td align="left" style="padding:0;Margin:0;width:560px">
                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tr>
                                <td align="center" style="padding:0;Margin:0">
                                  <p
                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:20px;color:#1F1F1F;font-size:13px">
                                    <a target="_blank"
                                      style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#1F1F1F;font-size:12px"
                                      href=""></a><a target="_blank"
                                      style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#1F1F1F;font-size:12px"
                                      href="https://revopsautomated.com/privacy">Privacy Policy</a><a target="_blank"
                                      style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#1F1F1F;font-size:13px"
                                      href=""></a> • <a target="_blank"
                                      style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#1F1F1F;font-size:12px"
                                      href="https://revopsautomated.com/unsubscribe">Unsubscribe</a>
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td align="center" style="padding:0;Margin:0;padding-top:20px">
                                  <p
                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:18px;color:#1F1F1F;font-size:12px">
                                    <a target="_blank" href=""
                                      style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#1F1F1F;font-size:12px"></a>Copyright
                                    ©${new Date().getFullYear()} RevOps Automated<a target="_blank" href=""
                                      style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#1F1F1F;font-size:12px"></a>
                                  </p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</body>

</html>`;

  return emailTemplate;
}