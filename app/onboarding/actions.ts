"use server";

import { createClient } from "@/lib/supabase/server";
import { google } from "googleapis";
import MailComposer from "nodemailer/lib/mail-composer";
import { logErrorToSupabase } from "@/lib/utils";
/* const GITHUB_ORG = "revops-org-test";
const GITHUB_API_URL = "https://api.github.com"; */

const auth = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID!, process.env.GOOGLE_CLIENT_SECRET!);

async function createGmailUser({
    access_token,
    user_id,
    first_name,
    last_name,
    email,
}: {
    access_token: string;
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
}) {
    const supabase = await createClient();
    try {
        auth.setCredentials({ access_token });

        const service = google.admin({ version: "directory_v1", auth });
        const response = await service.users.insert({
            requestBody: {
                primaryEmail: email,
                name: {
                    givenName: first_name,
                    familyName: last_name,
                },
                password: "wvfPzp#X3109",
            },
        });

        if (response.status === 200) {
            const { data: user, error } = await supabase
                .rpc("add_access", { user_id, new_access: "gmail" })
                .single();
            if (error) throw error;

            return { success: true, message: "User successfully created.", user };
        } else {
            throw new Error(`Failed to create user`);
        }
    } catch (error: unknown) {
        await logErrorToSupabase(error, "createGmailUser");
        return { success: false, message: "Error creando usuario." };
    }
}

async function removeGmailUser({
    access_token,
    email,
    user_id,
}: {
    access_token: string;
    email: string;
    user_id: number;
}) {
    const supabase = await createClient();

    try {
        auth.setCredentials({ access_token });

        const service = google.admin({ version: "directory_v1", auth });
        const response = await service.users.delete({
            userKey: email,
        });

        if (response.status === 204) {
            const { data: user, error } = await supabase
                .rpc("remove_access", { user_id, access_to_remove: "gmail" })
                .single();
            if (error) throw error;

            return { success: true, message: "User successfully removed from Gmail organization.", user };
        } else {
            throw new Error(`Failed to delete user ${email}`);
        }
    } catch (error: unknown) {
        console.error("Error eliminando usuario de Gmail:", error);
        await logErrorToSupabase(error, "removeGmailUser");
        return { success: false, message: "Error eliminando usuario de Gmail." };
    }
}

/* async function createGithubUser({ email, user_id }: { email: string, user_id: number }) {
  const supabase = await createClient();

  const endpoint = `${GITHUB_API_URL}/orgs/${GITHUB_ORG}/invitations`;
  const payload = { email };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN!}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    console.log("response", response);
    if (response.status === 201) {
      const { data: user, error } = await supabase.rpc("add_access", { user_id, new_access: "github" }).single();
      if (error) throw error;

      const data = await response.json();
      return { success: true, message: "User successfully invited to GitHub organization.", data, user };
    } else {
      const errorData = await response.json();
      throw new Error(
        `Failed to invite user. Status: ${response.status}. Message: ${errorData.message}`
      );
    }
  } catch (error: unknown) {
    console.error("Error adding user to GitHub organization:", error);
    return { success: false, message: 'Error adding user to GitHub organization.' };
  }
}

async function removeGithubUser({ email, user_id }: { email: string; user_id: number }) {
  const supabase = await createClient();

  try {
    const userInOrg = await getGithubUserByEmail(email);
    if (userInOrg) {
      const deleteEndpoint = `${GITHUB_API_URL}/orgs/${GITHUB_ORG}/members/${userInOrg.login}`;

      const deleteResponse = await fetch(deleteEndpoint, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN!}`,
        },
      });

      if (deleteResponse.status === 204) {
        const { data: user, error } = await supabase.rpc("remove_access", { user_id, access_to_remove: "github" }).single();
        if (error) throw error;

        return { success: true, message: "User successfully removed from GitHub organization.", user };
      } else {
        const errorData = await deleteResponse.json();
        throw new Error(`Failed to remove user. Status: ${deleteResponse.status}. Message: ${errorData.message}`);
      }
    } else {
      const invitationsEndpoint = `${GITHUB_API_URL}/orgs/${GITHUB_ORG}/invitations`;

      const invitationsResponse = await fetch(invitationsEndpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN!}`,
        },
      });

      if (invitationsResponse.status === 200) {
        const invitationsData = await invitationsResponse.json();
        const pendingInvitation = invitationsData.find(
          (invitation: unknown) => invitation.email === email
        );

        if (pendingInvitation) {
          const revokeEndpoint = `${GITHUB_API_URL}/orgs/${GITHUB_ORG}/invitations/${pendingInvitation.id}`;

          const revokeResponse = await fetch(revokeEndpoint, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${process.env.GITHUB_TOKEN!}`,
            },
          });

          if (revokeResponse.status === 204) {
            const { data: user, error } = await supabase.rpc("remove_access", { user_id, access_to_remove: "github" }).single();
            if (error) throw error;

            return { success: true, message: "User successfully removed from GitHub organization.", user };
          } else {
            const errorData = await revokeResponse.json();
            throw new Error(`Failed to revoke invitation. Status: ${revokeResponse.status}. Message: ${errorData.message}`);
          }
        } else {
          throw new Error("No pending invitation found for the email provided.");
        }
      } else {
        const errorData = await invitationsResponse.json();
        throw new Error(`Failed to fetch invitations. Status: ${invitationsResponse.status}. Message: ${errorData.message}`);
      }
    }
  } catch (error: unknown) {
    console.error("Error removing user from GitHub organization:", error.message);
    return { success: false, message: error.message };
  }
} */

async function createHubspotUser({ email, user_id }: { email: string; user_id: number }) {
    const supabase = await createClient();

    const endpoint = "https://api.hubapi.com/settings/v3/users/";
    const newUserData = {
        email: email,
        sendWelcomeEmail: true,
    };

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.HUBSPOT_TOKEN!}`,
            },
            body: JSON.stringify(newUserData),
        });

        if (response.status === 201) {
            const { data: user, error } = await supabase
                .rpc("add_access", { user_id, new_access: "hubspot" })
                .single();
            if (error) throw error;

            const data = await response.json();
            return { success: true, message: "User successfully created.", data, user };
        } else {
            const errorData = await response.json();
            throw new Error(
                `Failed to create user. Status: ${response.status}. Message: ${errorData.message}`
            );
        }
    } catch (error: unknown) {
        console.error("Error creando usuario de Hubspot:", error);
        await logErrorToSupabase(error, "createHubspotUser");
        throw error;
    }
}

async function removeHubspotUser({ hubspot_user_id, user_id }: { hubspot_user_id: string; user_id: number }) {
    const supabase = await createClient();

    const endpoint = `https://api.hubapi.com/settings/v3/users/${hubspot_user_id}`;

    try {
        const response = await fetch(endpoint, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${process.env.HUBSPOT_TOKEN!}`,
            },
        });

        if (response.status === 204) {
            const { data: user, error } = await supabase
                .rpc("remove_access", { user_id, access_to_remove: "hubspot" })
                .single();
            if (error) throw error;

            return { success: true, message: "User successfully deleted.", user };
        } else {
            const errorData = await response.json();
            throw new Error(
                `Failed to delete user. Status: ${response.status}. Message: ${errorData.message}`
            );
        }
    } catch (error: unknown) {
        console.error("Error eliminando usuario de Hubspot:", error);
        await logErrorToSupabase(error, "removeHubspotUser");
        return { success: false, message: "Error eliminando usuario de Hubspot." };
    }
}

export async function getHubspotUserByEmail({ email }: { email: string }) {
    const endpoint = `https://api.hubapi.com/settings/v3/users?email}`;

    try {
        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.HUBSPOT_TOKEN!}`,
            },
        });

        if (response.status === 200) {
            const data = await response.json();
            const user = data.results.find((user: { email: string }) => user.email === email);

            if (user) {
                return user.id;
            } else {
                throw new Error(`No user found with email: ${email}`);
            }
        } else {
            const errorData = await response.json();
            throw new Error(
                `Failed to fetch user by email. Status: ${response.status}. Message: ${errorData.message}`
            );
        }
    } catch (error: unknown) {
        console.error("Error obteniendo usuario de Hubspot:", error);
        await logErrorToSupabase(error, "getHubspotUserByEmail");
        throw error;
    }
}

/* async function getGithubUserByEmail(email: string) {
  const searchEndpoint = `https://api.github.com/search/users?q=${encodeURIComponent(email)}`;
  const headers = {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN!}`,
  };

  try {
    const searchResponse = await fetch(searchEndpoint, { method: "GET", headers });

    if (searchResponse.status !== 200) {
      const errorData = await searchResponse.json();
      throw new Error(`Failed to search users. Status: ${searchResponse.status}. Message: ${errorData.message}`);
    }

    const searchData = await searchResponse.json();

    if (searchData.total_count === 0) {
      console.log(`No users found for email: ${email}`);
      return null;
    }

    for (const user of searchData.items) {
      const checkMembershipEndpoint = `https://api.github.com/orgs/${GITHUB_ORG}/members/${user.login}`;

      const membershipResponse = await fetch(checkMembershipEndpoint, { method: "GET", headers });

      if (membershipResponse.status === 204) {
        console.log(`User ${user.login} belongs to the organization.`);
        return user;
      } else if (membershipResponse.status !== 404) {
        const errorData = await membershipResponse.json();
        console.error(`Failed to check membership for ${user.login}. Message: ${errorData.message}`);
      }
    }

    console.log(`No users associated with email ${email} belong to the organization.`);
    return null;
  } catch (error: unknown) {
    console.error("Error checking user in organization by email:", error.message);
    throw error;
  }
} */

async function createSlackUser({ user_id }: { user_id: number }) {
    const supabase = await createClient();

    try {
        const { data: user, error } = await supabase
            .rpc("add_access", { user_id, new_access: "slack" })
            .single();
        if (error) throw error;

        return { success: true, message: "User successfully created.", user };
    } catch (error: unknown) {
        console.error("Error creando usuario de Slack:", error);
        await logErrorToSupabase(error, "createSlackUser");
        return { success: false, message: "Error creando usuario de Slack." };
    }
}

async function removeSlackUser({ user_id }: { user_id: number }) {
    const supabase = await createClient();
    try {
        const { data: user, error } = await supabase
            .rpc("remove_access", { user_id, access_to_remove: "slack" })
            .single();
        if (error) throw error;

        return { success: true, message: "User successfully deleted.", user };
    } catch (error: unknown) {
        console.error("Error eliminando usuario de Slack:", error);
        await logErrorToSupabase(error, "removeSlackUser");
        return { success: false, message: "Error eliminando usuario de Slack." };
    }
}

export async function createUser({
    access_token,
    access,
    email,
    user_id,
    first_name,
    last_name,
}: {
    access_token?: string;
    access: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    user_id: number;
}) {
    if (access === "gmail") {
        if (!access_token) return { success: false, message: "No access_token provided" };
        if (!user_id) return { success: false, message: "No user_id provided" };
        if (!email) return { success: false, message: "No email provided" };
        if (!first_name) return { success: false, message: "No first name provided" };
        if (!last_name) return { success: false, message: "No last name provided" };

        return await createGmailUser({ access_token, user_id, first_name, last_name, email });
    }

    if (access === "hubspot") {
        if (!email) throw new Error("No email provided");
        return await createHubspotUser({ email, user_id });
    }

    /*   if (access === "github") {
      if (!email) throw new Error("No email provided");
      return await createGithubUser({ email, user_id });
    } */

    if (access === "slack") {
        if (!email) throw new Error("No email provided");
        return await createSlackUser({ user_id });
    }
}

export async function removeUser({
    access,
    email,
    hubspot_user_id,
    user_id,
    access_token,
}: {
    access: string;
    access_token?: string;
    email?: string;
    hubspot_user_id?: string;
    user_id: number;
}) {
    if (access === "gmail") {
        if (!email) return { success: false, message: "No email provided" };
        if (!access_token) return { success: false, message: "No access_token provided" };
        if (!user_id) return { success: false, message: "No user_id provided" };

        return await removeGmailUser({ access_token, email, user_id });
    }

    if (access === "hubspot") {
        if (!hubspot_user_id) throw new Error("No hubspot_user_id provided");
        return await removeHubspotUser({ hubspot_user_id, user_id });
    }

    /*   if (access === "github") {
      if (!email) throw new Error("No email provided");
      return await removeGithubUser({ email, user_id });
    } */

    if (access === "slack") {
        if (!email) throw new Error("No email provided");
        return await removeSlackUser({ user_id });
    }
}

export async function sendEmailFromUser(
    accessToken: string,
    fromEmail: string,
    toEmail: string,
    subject: string,
    body: string
) {
    auth.setCredentials({ access_token: accessToken });

    const gmail = google.gmail({ version: "v1", auth });

    const mail = new MailComposer({
        to: toEmail,
        from: fromEmail,
        subject: subject,
        html: body,
        textEncoding: "base64",
        headers: { "X-Laziness-level": "1000" },
    }).compile();

    const encodedMessage = await new Promise<string>((resolve, reject) => {
        mail.build((err, message) => {
            if (err) reject(err);
            else {
                const encoded = message
                    .toString("base64")
                    .replace(/\+/g, "-")
                    .replace(/\//g, "_")
                    .replace(/=+$/, "");
                resolve(encoded);
            }
        });
    });

    const response = await gmail.users.messages.send({
        userId: "me",
        requestBody: {
            raw: encodedMessage,
        },
    });

    return response.data;
}
