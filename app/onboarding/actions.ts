'use server'

import { google } from "googleapis";
import keyFile from "../../lib/services/revops-447610-79dac1d76cae.json";

export async function createUser() {
  try {
    const email = "test@setandforget.io"
    const givenName = "Agustin"
    const familyName = "Delgado"

    const auth = new google.auth.GoogleAuth({
      credentials: keyFile,
      scopes: ["https://www.googleapis.com/auth/admin.directory.user"],
      clientOptions: {
        subject: "milton@setandforget.io"
      }
    });

    const service = google.admin({ version: 'directory_v1', auth });

    const response = await service.users.insert({
      requestBody: {
        primaryEmail: email,
        name: {
          givenName,
          familyName,
        },
        password: "Temporal123!",
      },
    });

    console.log("Usuario creado:", response.data);
  } catch (error) {
    console.error("Error al crear el usuario:", error);
  }
}
