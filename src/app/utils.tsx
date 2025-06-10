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
export const nationalityOptions = [
  { label: "Afghanistan", value: "Afghanistan", availableToChoose: true },
  { label: "Albania", value: "Albania", availableToChoose: true },
  { label: "Algeria", value: "Algeria", availableToChoose: true },
  { label: "Andorra", value: "Andorra", availableToChoose: true },
  { label: "Angola", value: "Angola", availableToChoose: true },
  {
    label: "Antigua and Barbuda",
    value: "Antigua and Barbuda",
    availableToChoose: true,
  },
  { label: "Argentina", value: "Argentina", availableToChoose: true },
  { label: "Armenia", value: "Armenia", availableToChoose: true },
  { label: "Australia", value: "Australia", availableToChoose: true },
  { label: "Austria", value: "Austria", availableToChoose: true },
  { label: "Azerbaijan", value: "Azerbaijan", availableToChoose: true },
  { label: "Bahamas", value: "Bahamas", availableToChoose: true },
  { label: "Bahrain", value: "Bahrain", availableToChoose: true },
  { label: "Bangladesh", value: "Bangladesh", availableToChoose: true },
  { label: "Barbados", value: "Barbados", availableToChoose: true },
  { label: "Belarus", value: "Belarus", availableToChoose: true },
  { label: "Belgium", value: "Belgium", availableToChoose: true },
  { label: "Belize", value: "Belize", availableToChoose: true },
  { label: "Benin", value: "Benin", availableToChoose: true },
  { label: "Bhutan", value: "Bhutan", availableToChoose: true },
  { label: "Bolivia", value: "Bolivia", availableToChoose: true },
  {
    label: "Bosnia and Herzegovina",
    value: "Bosnia and Herzegovina",
    availableToChoose: true,
  },
  { label: "Botswana", value: "Botswana", availableToChoose: true },
  { label: "Brazil", value: "Brazil", availableToChoose: true },
  { label: "Brunei", value: "Brunei", availableToChoose: true },
  { label: "Bulgaria", value: "Bulgaria", availableToChoose: true },
  { label: "Burkina Faso", value: "Burkina Faso", availableToChoose: true },
  { label: "Burundi", value: "Burundi", availableToChoose: true },
  { label: "Cabo Verde", value: "Cabo Verde", availableToChoose: true },
  { label: "Cambodia", value: "Cambodia", availableToChoose: true },
  { label: "Cameroon", value: "Cameroon", availableToChoose: true },
  { label: "Canada", value: "Canada", availableToChoose: true },
  {
    label: "Central African Republic",
    value: "Central African Republic",
    availableToChoose: true,
  },
  { label: "Chad", value: "Chad", availableToChoose: true },
  { label: "Chile", value: "Chile", availableToChoose: true },
  { label: "China", value: "China", availableToChoose: true },
  { label: "Colombia", value: "Colombia", availableToChoose: true },
  { label: "Comoros", value: "Comoros", availableToChoose: true },
  {
    label: "Congo (Congo-Brazzaville)",
    value: "Congo (Congo-Brazzaville)",
    availableToChoose: true,
  },
  { label: "Costa Rica", value: "Costa Rica", availableToChoose: true },
  { label: "Croatia", value: "Croatia", availableToChoose: true },
  { label: "Cuba", value: "Cuba", availableToChoose: true },
  { label: "Cyprus", value: "Cyprus", availableToChoose: true },
  { label: "Czech Republic", value: "Czech Republic", availableToChoose: true },
  {
    label: "Democratic Republic of the Congo",
    value: "Democratic Republic of the Congo",
    availableToChoose: true,
  },
  { label: "Denmark", value: "Denmark", availableToChoose: true },
  { label: "Djibouti", value: "Djibouti", availableToChoose: true },
  { label: "Dominica", value: "Dominica", availableToChoose: true },
  {
    label: "Dominican Republic",
    value: "Dominican Republic",
    availableToChoose: true,
  },
  { label: "Ecuador", value: "Ecuador", availableToChoose: true },
  { label: "Egypt", value: "Egypt", availableToChoose: true },
  { label: "El Salvador", value: "El Salvador", availableToChoose: true },
  {
    label: "Equatorial Guinea",
    value: "Equatorial Guinea",
    availableToChoose: true,
  },
  { label: "Eritrea", value: "Eritrea", availableToChoose: true },
  { label: "Estonia", value: "Estonia", availableToChoose: true },
  { label: "Eswatini", value: "Eswatini", availableToChoose: true },
  { label: "Ethiopia", value: "Ethiopia", availableToChoose: true },
  { label: "Fiji", value: "Fiji", availableToChoose: true },
  { label: "Finland", value: "Finland", availableToChoose: true },
  { label: "France", value: "France", availableToChoose: true },
  { label: "Gabon", value: "Gabon", availableToChoose: true },
  { label: "Gambia", value: "Gambia", availableToChoose: true },
  { label: "Georgia", value: "Georgia", availableToChoose: true },
  { label: "Germany", value: "Germany", availableToChoose: true },
  { label: "Ghana", value: "Ghana", availableToChoose: true },
  { label: "Greece", value: "Greece", availableToChoose: true },
  { label: "Grenada", value: "Grenada", availableToChoose: true },
  { label: "Guatemala", value: "Guatemala", availableToChoose: true },
  { label: "Guinea", value: "Guinea", availableToChoose: true },
  { label: "Guinea-Bissau", value: "Guinea-Bissau", availableToChoose: true },
  { label: "Guyana", value: "Guyana", availableToChoose: true },
  { label: "Haiti", value: "Haiti", availableToChoose: true },
  { label: "Honduras", value: "Honduras", availableToChoose: true },
  { label: "Hungary", value: "Hungary", availableToChoose: true },
  { label: "Iceland", value: "Iceland", availableToChoose: true },
  { label: "India", value: "India", availableToChoose: true },
  { label: "Indonesia", value: "Indonesia", availableToChoose: true },
  { label: "Iran", value: "Iran", availableToChoose: true },
  { label: "Iraq", value: "Iraq", availableToChoose: true },
  { label: "Ireland", value: "Ireland", availableToChoose: true },
  { label: "Israel", value: "Israel", availableToChoose: true },
  { label: "Italy", value: "Italy", availableToChoose: true },
  { label: "Ivory Coast", value: "Ivory Coast", availableToChoose: true },
  { label: "Jamaica", value: "Jamaica", availableToChoose: true },
  { label: "Japan", value: "Japan", availableToChoose: true },
  { label: "Jordan", value: "Jordan", availableToChoose: true },
  { label: "Kazakhstan", value: "Kazakhstan", availableToChoose: true },
  { label: "Kenya", value: "Kenya", availableToChoose: true },
  { label: "Kiribati", value: "Kiribati", availableToChoose: true },
  { label: "Kuwait", value: "Kuwait", availableToChoose: true },
  { label: "Kyrgyzstan", value: "Kyrgyzstan", availableToChoose: true },
  { label: "Laos", value: "Laos", availableToChoose: true },
  { label: "Latvia", value: "Latvia", availableToChoose: true },
  { label: "Lebanon", value: "Lebanon", availableToChoose: true },
  { label: "Lesotho", value: "Lesotho", availableToChoose: true },
  { label: "Liberia", value: "Liberia", availableToChoose: true },
  { label: "Libya", value: "Libya", availableToChoose: true },
  { label: "Liechtenstein", value: "Liechtenstein", availableToChoose: true },
  { label: "Lithuania", value: "Lithuania", availableToChoose: true },
  { label: "Luxembourg", value: "Luxembourg", availableToChoose: true },
  { label: "Madagascar", value: "Madagascar", availableToChoose: true },
  { label: "Malawi", value: "Malawi", availableToChoose: true },
  { label: "Malaysia", value: "Malaysia", availableToChoose: true },
  { label: "Maldives", value: "Maldives", availableToChoose: true },
  { label: "Mali", value: "Mali", availableToChoose: true },
  { label: "Malta", value: "Malta", availableToChoose: true },
  {
    label: "Marshall Islands",
    value: "Marshall Islands",
    availableToChoose: true,
  },
  { label: "Mauritania", value: "Mauritania", availableToChoose: true },
  { label: "Mauritius", value: "Mauritius", availableToChoose: true },
  { label: "Mexico", value: "Mexico", availableToChoose: true },
  { label: "Micronesia", value: "Micronesia", availableToChoose: true },
  { label: "Moldova", value: "Moldova", availableToChoose: true },
  { label: "Monaco", value: "Monaco", availableToChoose: true },
  { label: "Mongolia", value: "Mongolia", availableToChoose: true },
  { label: "Montenegro", value: "Montenegro", availableToChoose: true },
  { label: "Morocco", value: "Morocco", availableToChoose: true },
  { label: "Mozambique", value: "Mozambique", availableToChoose: true },
  { label: "Myanmar", value: "Myanmar", availableToChoose: true },
  { label: "Namibia", value: "Namibia", availableToChoose: true },
  { label: "Nauru", value: "Nauru", availableToChoose: true },
  { label: "Nepal", value: "Nepal", availableToChoose: true },
  { label: "Netherlands", value: "Netherlands", availableToChoose: true },
  { label: "New Zealand", value: "New Zealand", availableToChoose: true },
  { label: "Nicaragua", value: "Nicaragua", availableToChoose: true },
  { label: "Niger", value: "Niger", availableToChoose: true },
  { label: "Nigeria", value: "Nigeria", availableToChoose: true },
  { label: "North Korea", value: "North Korea", availableToChoose: true },
  {
    label: "North Macedonia",
    value: "North Macedonia",
    availableToChoose: true,
  },
  { label: "Norway", value: "Norway", availableToChoose: true },
  { label: "Oman", value: "Oman", availableToChoose: true },
  { label: "Pakistan", value: "Pakistan", availableToChoose: true },
  { label: "Palau", value: "Palau", availableToChoose: true },
  { label: "Palestine", value: "Palestine", availableToChoose: true },
  { label: "Panama", value: "Panama", availableToChoose: true },
  {
    label: "Papua New Guinea",
    value: "Papua New Guinea",
    availableToChoose: true,
  },
  { label: "Paraguay", value: "Paraguay", availableToChoose: true },
  { label: "Peru", value: "Peru", availableToChoose: true },
  { label: "Philippines", value: "Philippines", availableToChoose: true },
  { label: "Poland", value: "Poland", availableToChoose: true },
  { label: "Portugal", value: "Portugal", availableToChoose: true },
  { label: "Qatar", value: "Qatar", availableToChoose: true },
  { label: "Romania", value: "Romania", availableToChoose: true },
  { label: "Russia", value: "Russia", availableToChoose: true },
  { label: "Rwanda", value: "Rwanda", availableToChoose: true },
  {
    label: "Saint Kitts and Nevis",
    value: "Saint Kitts and Nevis",
    availableToChoose: true,
  },
  { label: "Saint Lucia", value: "Saint Lucia", availableToChoose: true },
  {
    label: "Saint Vincent and the Grenadines",
    value: "Saint Vincent and the Grenadines",
    availableToChoose: true,
  },
  { label: "Samoa", value: "Samoa", availableToChoose: true },
  { label: "San Marino", value: "San Marino", availableToChoose: true },
  {
    label: "Sao Tome and Principe",
    value: "Sao Tome and Principe",
    availableToChoose: true,
  },
  { label: "Saudi Arabia", value: "Saudi Arabia", availableToChoose: true },
  { label: "Senegal", value: "Senegal", availableToChoose: true },
  { label: "Serbia", value: "Serbia", availableToChoose: true },
  { label: "Seychelles", value: "Seychelles", availableToChoose: true },
  { label: "Sierra Leone", value: "Sierra Leone", availableToChoose: true },
  { label: "Singapore", value: "Singapore", availableToChoose: true },
  { label: "Slovakia", value: "Slovakia", availableToChoose: true },
  { label: "Slovenia", value: "Slovenia", availableToChoose: true },
  {
    label: "Solomon Islands",
    value: "Solomon Islands",
    availableToChoose: true,
  },
  { label: "Somalia", value: "Somalia", availableToChoose: true },
  { label: "South Africa", value: "South Africa", availableToChoose: true },
  { label: "South Korea", value: "South Korea", availableToChoose: true },
  { label: "South Sudan", value: "South Sudan", availableToChoose: true },
  { label: "Spain", value: "Spain", availableToChoose: true },
  { label: "Sri Lanka", value: "Sri Lanka", availableToChoose: true },
  { label: "Sudan", value: "Sudan", availableToChoose: true },
  { label: "Suriname", value: "Suriname", availableToChoose: true },
  { label: "Sweden", value: "Sweden", availableToChoose: true },
  { label: "Switzerland", value: "Switzerland", availableToChoose: true },
  { label: "Syria", value: "Syria", availableToChoose: true },
  { label: "Taiwan", value: "Taiwan", availableToChoose: true },
  { label: "Tajikistan", value: "Tajikistan", availableToChoose: true },
  { label: "Tanzania", value: "Tanzania", availableToChoose: true },
  { label: "Thailand", value: "Thailand", availableToChoose: true },
  { label: "Timor-Leste", value: "Timor-Leste", availableToChoose: true },
  { label: "Togo", value: "Togo", availableToChoose: true },
  { label: "Tonga", value: "Tonga", availableToChoose: true },
  {
    label: "Trinidad and Tobago",
    value: "Trinidad and Tobago",
    availableToChoose: true,
  },
  { label: "Tunisia", value: "Tunisia", availableToChoose: true },
  { label: "Turkey", value: "Turkey", availableToChoose: true },
  { label: "Turkmenistan", value: "Turkmenistan", availableToChoose: true },
  { label: "Tuvalu", value: "Tuvalu", availableToChoose: true },
  { label: "Uganda", value: "Uganda", availableToChoose: true },
  { label: "Ukraine", value: "Ukraine", availableToChoose: true },
  {
    label: "United Arab Emirates",
    value: "United Arab Emirates",
    availableToChoose: true,
  },
  { label: "United Kingdom", value: "United Kingdom", availableToChoose: true },
  { label: "United States", value: "United States", availableToChoose: true },
  { label: "Uruguay", value: "Uruguay", availableToChoose: true },
  { label: "Uzbekistan", value: "Uzbekistan", availableToChoose: true },
  { label: "Vanuatu", value: "Vanuatu", availableToChoose: true },
  { label: "Vatican City", value: "Vatican City", availableToChoose: true },
  { label: "Venezuela", value: "Venezuela", availableToChoose: true },
  { label: "Vietnam", value: "Vietnam", availableToChoose: true },
  { label: "Yemen", value: "Yemen", availableToChoose: true },
  { label: "Zambia", value: "Zambia", availableToChoose: true },
  { label: "Zimbabwe", value: "Zimbabwe", availableToChoose: true },
];

export const preferredFootOptions = [
  {
    label: "Right",
    value: "right",
    availableToChoose: true,
  },
  {
    label: "Left",
    value: "left",
    availableToChoose: true,
  },
];

export const playingStyleOptions = [
  {
    label: "Deep-Lying Playmaker",
    value: "deep_lying_playmaker",
    availableToChoose: true,
  },
  {
    label: "Box-to-Box Midfielder",
    value: "box_to_box_midfielder",
    availableToChoose: true,
  },
  {
    label: "Mezzala",
    value: "mezzala",
    availableToChoose: true,
  },
  {
    label: "Trequartista",
    value: "trequartista",
    availableToChoose: true,
  },
  {
    label: "Inverted Winger",
    value: "inverted_winger",
    availableToChoose: true,
  },
  {
    label: "Inside Forward",
    value: "inside_forward",
    availableToChoose: true,
  },
  {
    label: "Target Man",
    value: "target_man",
    availableToChoose: true,
  },
  {
    label: "Poacher",
    value: "poacher",
    availableToChoose: true,
  },
  {
    label: "Sweeper",
    value: "sweeper",
    availableToChoose: true,
  },
];

export const genderOptions = [
  {
    label: "Male",
    value: "male",
    availableToChoose: true,
  },
  {
    label: "Female",
    value: "female",
    availableToChoose: true,
  },
];

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

export const fetchPaymentPlans = async () => {
  const { data, error } = await supabase.from("payment_plans").select("*");

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
