import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { createClient } from "./supabase/client";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export async function logErrorToSupabase(error: any, functionName: string) {
    try {
        const supabase = await createClient();
        let errorText = "";
        if (typeof error === "string") {
            errorText = error;
        } else if (error instanceof Error) {
            errorText = error.stack || error.message;
        } else {
            try {
                errorText = JSON.stringify(error);
            } catch {
                errorText = String(error);
            }
        }
        await supabase.from("logs").insert([{ error: errorText, function: functionName }]);
    } catch (e) {
        // Si falla el log, solo mostrar en consola
        console.error("Error al guardar log en supabase:", e);
    }
}
