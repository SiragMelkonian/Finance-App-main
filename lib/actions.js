"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "./supabase/server";
import { transactionSchema } from "./validation";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function createTransaction(formData) {
  const validated = transactionSchema.safeParse(formData);
  if (!validated.success) {
    throw new Error("Invalid data");
  }

  const supabase = await createClient(); // 👈 await
  const { error } = await supabase.from("transactions").insert(formData);

  if (error) {
    throw new Error("Failed creating the transaction");
  }

  revalidatePath("/dashboard");
}

export async function updateTransaction(id, formData) {
  const validated = transactionSchema.safeParse(formData);
  if (!validated.success) {
    throw new Error("Invalid data");
  }

  const supabase = await createClient(); // 👈 await
  const { error } = await supabase
    .from("transactions")
    .update(formData)
    .eq("id", id);

  if (error) {
    throw new Error("Failed updating the transaction");
  }

  revalidatePath("/dashboard");
}

export async function fetchTransactions(range, offset = 0, limit = 10) {
  const supabase = await createClient();
  let { data, error } = await supabase.rpc("fetch_transactions", {
    limit_arg: limit,
    offset_arg: offset,
    range_arg: range,
  });
  if (error) throw new Error("We can't fetch transactions");
  return data;
}

export async function deleteTransaction(id) {
  const supabase = await createClient();
  const { error } = await supabase.from("transactions").delete().eq("id", id);
  if (error) throw new Error(`Could not delete the transaction ${id}`);
  revalidatePath("/dashboard");
}
export async function login(prevState, formData) {
  const supabase = await createClient();
  const email = formData.get("email");
  const headersList = await headers();
  const origin =
    headersList.get("origin") ??
    `http://${headersList.get("host") ?? "localhost:3000"}`;
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: `${origin}/auth/confirm?next=/dashboard`,
    },
  });
  if (error) {
    return {
      error: true,
      message: "Error uploading avatar",
    };
  }
  return {
    message: `Email sent to ${email}`,
  };
}
export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  redirect("/login");
}

export async function uploadAvatar(prevState, formData) {
  const supabase = await createClient();
  const file = formData.get("avatar");

  if (!file || file.size === 0) {
    return {
      error: true,
      message: "No file selected",
    };
  }

  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const { error } = await supabase.storage
    .from("avatar")
    .upload(fileName, file);
  if (error) {
    return {
      error: true,
      message: "Error uploading avatar",
    };
  }

  // Removing the old file
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    return {
      error: true,
      message: "Something went wrong, try again",
    };
  }

  const avatars = userData.user.user_metadata.avatars;
  if (avatars) {
    const { error } = await supabase.storage.from("avatar").remove([avatars]);

    if (error) {
      return {
        error: true,
        message: "Something went wrong, try again",
      };
    }
  }

  const { error: dataUpdateError } = await supabase.auth.updateUser({
    data: {
      avatars: fileName,
    },
  });
  if (dataUpdateError) {
    return {
      error: true,
      message: "Error associating the avatar with the user",
    };
  }

  revalidatePath("/", "layout");
  return {
    message: "Updated the user avatar",
  };
}
export async function updateSettings(prevState, formData) {
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    data: {
      fullName: formData.get("fullName"),
      defaultView: formData.get("defaultView"),
    },
  });

  if (error) {
    return {
      error: true,
      message: "Failed updating setting",
    };
  }

  revalidatePath("/", "layout");
  return {
    message: "Updated user settings",
  };
}
