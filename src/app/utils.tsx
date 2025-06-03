"use client";
import supabase from "../../supabase";

export interface PositionOption {
  label: string;
  value?: string; // Optional: not present on parent nodes
  availableToChoose: boolean;
  options?: PositionOption[]; // Recursive: children
}
interface Automation {
  uuid: string;
  automation_name: string;
  is_active: boolean;
  user_uuid: string;
}

export const footballPositions: PositionOption[] = [
  {
    label: "Goalkeeper",
    availableToChoose: false,
    options: [
      { label: "Goalkeeper (GK)", value: "GK", availableToChoose: true },
    ],
  },
  {
    label: "Defender",
    availableToChoose: false,
    options: [
      {
        label: "Defender (all)",
        value: "Def",
        availableToChoose: true,
      },
      { label: "Centre-Back (CB)", value: "CB", availableToChoose: true },
      {
        label: "Wide Defender",
        availableToChoose: false,
        options: [
          { label: "Left-Back (LB)", value: "LB", availableToChoose: true },
          { label: "Right-Back (RB)", value: "RB", availableToChoose: true },
        ],
      },
      {
        label: "Wing-Back",
        availableToChoose: false,
        options: [
          {
            label: "Left Wing-Back (LWB)",
            value: "LWB",
            availableToChoose: true,
          },
          {
            label: "Right Wing-Back (RWB)",
            value: "RWB",
            availableToChoose: true,
          },
        ],
      },
    ],
  },
  {
    label: "Midfielder",
    availableToChoose: false,
    options: [
      {
        label: "Midfielder (all)",
        value: "Mid",
        availableToChoose: true,
      },
      {
        label: "Defensive Midfielder (CDM/DM)",
        value: "CDM",
        availableToChoose: true,
      },
      {
        label: "Central Midfielder (CM)",
        value: "CM",
        availableToChoose: true,
      },
      {
        label: "Attacking Midfielder (CAM/AM)",
        value: "CAM",
        availableToChoose: true,
      },
      {
        label: "Wide Midfielder",
        availableToChoose: false,
        options: [
          {
            label: "Right Midfielder (RM)",
            value: "RM",
            availableToChoose: true,
          },
          {
            label: "Left Midfielder (LM)",
            value: "LM",
            availableToChoose: true,
          },
        ],
      },
    ],
  },
  {
    label: "Winger",
    availableToChoose: false,
    options: [
      { label: "Winger (all)", value: "Wing", availableToChoose: true },
      { label: "Right Winger (RW)", value: "RW", availableToChoose: true },
      { label: "Left Winger (LW)", value: "LW", availableToChoose: true },
    ],
  },
  {
    label: "Forward",
    availableToChoose: false,
    options: [
      {
        label: "Forward (all)",
        value: "For",
        availableToChoose: true,
      },
      {
        label: "Striker / Centre Forward (ST/CF)",
        value: "ST",
        availableToChoose: true,
      },
      { label: "Second Striker (SS)", value: "SS", availableToChoose: true },
      { label: "False Nine (F9)", value: "F9", availableToChoose: true },
    ],
  },
];

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
  automations: Automation[],
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
