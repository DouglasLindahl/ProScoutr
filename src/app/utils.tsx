"use client";
import supabase from "../../supabase";

export const checkUserSession = async (): Promise<string | null> => {
  const { data } = await supabase.auth.getSession();
  return data?.session?.user?.user_metadata?.sub ?? null;
};

export const fetchUserInfo = async (userUuid: string) => {
  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", userUuid)
    .single();

  if (error) throw new Error("Error fetching user info");
  return data;
};

export const fetchPaymentPlan = async (planId: number) => {
  const { data, error } = await supabase
    .from("payment_plans")
    .select("*")
    .eq("id", planId)
    .single();

  if (error) throw new Error("Error fetching payment plan");
  return data;
};

export const fetchUserAutomations = async (userUuid: string) => {
  const { data, count, error } = await supabase
    .from("automation")
    .select("uuid, automation_name, is_active, user_uuid", {
      count: "exact",
    })
    .eq("user_uuid", userUuid);

  if (error) throw new Error("Error fetching automations");
  return { automations: data || [], count: count || 0 };
};

export const enforceAutomationLimit = async (
  userUuid: string,
  automations: any[],
  availableLimit: number
) => {
  const activeCount = automations.filter((a) => a.is_active).length;

  if (activeCount <= availableLimit) return automations;

  const activeAutomationUuids = automations
    .filter((a) => a.is_active)
    .map((a) => a.uuid);

  const { error } = await supabase
    .from("automation")
    .update({ is_active: false })
    .in("uuid", activeAutomationUuids);

  if (error) throw new Error("Failed to deactivate automations");

  const { data, error: refetchError } = await supabase
    .from("automation")
    .select("uuid, automation_name, is_active, user_uuid")
    .eq("user_uuid", userUuid);

  if (refetchError) throw new Error("Error refetching automations");

  return data || [];
};

export const activateAutomation = async (
  automationUuid: string,
  userUuid: string,
  availableLimit: number
): Promise<{ success: boolean; message: string }> => {
  if (!automationUuid || !userUuid || availableLimit === undefined) {
    return { success: false, message: "Missing data to activate automation." };
  }

  // Get active automations count
  const { data: activeAutomations, error: fetchError } = await supabase
    .from("automation")
    .select("uuid")
    .eq("user_uuid", userUuid)
    .eq("is_active", true);

  if (fetchError) {
    return { success: false, message: "Failed to fetch active automations." };
  }

  if ((activeAutomations?.length || 0) >= availableLimit) {
    return {
      success: false,
      message: "Automation limit reached for your current plan.",
    };
  }

  // Activate the specific automation
  const { error: updateError } = await supabase
    .from("automation")
    .update({ is_active: true })
    .eq("uuid", automationUuid);

  if (updateError) {
    return { success: false, message: "Failed to activate automation." };
  }

  return { success: true, message: "Automation activated successfully." };
};

export const deactivateAutomation = async (
  automationUuid: string,
  userUuid: string
): Promise<{ success: boolean; message: string }> => {
  if (!automationUuid || !userUuid) {
    return {
      success: false,
      message: "Missing data to deactivate automation.",
    };
  }

  const { error: updateError } = await supabase
    .from("automation")
    .update({ is_active: false })
    .eq("uuid", automationUuid);

  if (updateError) {
    return { success: false, message: "Failed to deactivate automation." };
  }

  return { success: true, message: "Automation deactivated successfully." };
};
