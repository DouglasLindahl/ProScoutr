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
export const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
export const freePlayerSuggestionsHtml = `<table style="width:100%; border-collapse:collapse;">
  <tr>
    <!-- Player 1 -->
    <td style="width:50%; padding:10px; border:1px solid #ccc; vertical-align:top;">
      <strong>Full Name:</strong> Cristian Portugués Manzanera (Portu)<br>
      <strong>Age:</strong> 32<br>
      <strong>Nationality:</strong> Spain<br>
      <strong>Current Team:</strong> Girona FC<br>
      <strong>1st Position:</strong> Right Winger (RW)<br>
      <strong>Alternate Position:</strong> Striker / Centre Forward (ST/CF)<br>
      <strong>Height:</strong> 169 cm<br>
      <strong>Weight:</strong> 65 kg<br>
      <strong>Preferred Foot:</strong> Right<br>
      <strong>Playing Style:</strong> Direct dribbler, high intensity presser<br>
      <strong>League:</strong> La Liga<br>
      <strong>VISA Eligibility:</strong> EU (Eligible for UK/EU work permit)<br>
      <small><em>Notes: Slight mismatch on height (1 cm below minimum), age slightly over preferred max (32). Still a strong match in role and performance level.</em></small>
    </td>

    <!-- Player 2 -->
    <td style="width:50%; padding:10px; border:1px solid #ccc; vertical-align:top;">
      <strong>Full Name:</strong> Jonathan Bamba<br>
      <strong>Age:</strong> 28<br>
      <strong>Nationality:</strong> France<br>
      <strong>Current Team:</strong> Celta Vigo<br>
      <strong>1st Position:</strong> Right Winger (RW)<br>
      <strong>Alternate Position:</strong> Striker / Centre Forward (ST/CF)<br>
      <strong>Height:</strong> 175 cm<br>
      <strong>Weight:</strong> 72 kg<br>
      <strong>Preferred Foot:</strong> Right<br>
      <strong>Playing Style:</strong> Pacy inverted winger, cuts inside<br>
      <strong>League:</strong> La Liga<br>
      <strong>VISA Eligibility:</strong> EU (Eligible for UK/EU work permit)<br>
      <small><em>Notes: Matches all key criteria. Good combination of pace, experience, and European eligibility.</em></small>
    </td>
  </tr>
  <tr>
    <!-- Player 3 -->
    <td style="width:50%; padding:10px; border:1px solid #ccc; vertical-align:top;">
      <strong>Full Name:</strong> Ricardo Horta<br>
      <strong>Age:</strong> 29<br>
      <strong>Nationality:</strong> Portugal<br>
      <strong>Current Team:</strong> SC Braga<br>
      <strong>1st Position:</strong> Right Winger (RW)<br>
      <strong>Alternate Position:</strong> Striker / Centre Forward (ST/CF)<br>
      <strong>Height:</strong> 173 cm<br>
      <strong>Weight:</strong> 66 kg<br>
      <strong>Preferred Foot:</strong> Right<br>
      <strong>Playing Style:</strong> Technical creator, quick link-up play<br>
      <strong>League:</strong> Liga Portugal<br>
      <strong>VISA Eligibility:</strong> EU (Eligible for UK/EU work permit)<br>
      <small><em>Notes: Excellent match across all requested parameters. High goal involvement and creativity.</em></small>
    </td>

    <!-- Player 4 -->
    <td style="width:50%; padding:10px; border:1px solid #ccc; vertical-align:top;">
      <strong>Full Name:</strong> Jony Rodríguez<br>
      <strong>Age:</strong> 30<br>
      <strong>Nationality:</strong> Spain<br>
      <strong>Current Team:</strong> Sporting Gijón<br>
      <strong>1st Position:</strong> Right Winger (RW)<br>
      <strong>Alternate Position:</strong> Striker / Centre Forward (ST/CF)<br>
      <strong>Height:</strong> 179 cm<br>
      <strong>Weight:</strong> 71 kg<br>
      <strong>Preferred Foot:</strong> Left<br>
      <strong>Playing Style:</strong> Wide dribbler, early crosser<br>
      <strong>League:</strong> Segunda División (Spain)<br>
      <strong>VISA Eligibility:</strong> EU (Eligible for UK/EU work permit)<br>
      <small><em>Notes: Left-footed (no preference specified). Plays in second division but still a relevant profile.</em></small>
    </td>
  </tr>
</table>
`;
export const headerHtml = `
  <div style="padding: 20px; background-color: #f2f2f2; text-align: center;">
    <h2 style="margin: 0; font-family: sans-serif;">Scouting Report from ProScoutr</h2>
  </div>
`;

export const footerHtml = `
  <div style="padding: 20px; background-color: #f9f9f9; text-align: center; font-size: 12px; color: #666;">
    <p>Thanks for using <strong>ProScoutr</strong>!</p>
<p>For more insights or support, visit <a href="https://proscoutr.com" target="_blank" rel="noopener noreferrer">proscoutr.com</a></p>

  </div>
`;

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

export const leagueOptions = [
  {
    label: "England",
    availableToChoose: false,
    options: [
      {
        label: "Premier League",
        value: "eng_premier_league",
        availableToChoose: true,
      },
      {
        label: "English Football League",
        availableToChoose: false,
        options: [
          {
            label: "Championship",
            value: "eng_championship",
            availableToChoose: true,
          },
          {
            label: "League One",
            value: "eng_league_one",
            availableToChoose: true,
          },
          {
            label: "League Two",
            value: "eng_league_two",
            availableToChoose: true,
          },
        ],
      },
      {
        label: "National League System",
        availableToChoose: false,
        options: [
          {
            label: "National League",
            value: "eng_national_league",
            availableToChoose: true,
          },
          {
            label: "National League North",
            value: "eng_national_league_north",
            availableToChoose: true,
          },
          {
            label: "National League South",
            value: "eng_national_league_south",
            availableToChoose: true,
          },
        ],
      },
    ],
  },
  {
    label: "Spain",
    availableToChoose: false,
    options: [
      {
        label: "La Liga (Primera División)",
        value: "esp_la_liga",
        availableToChoose: true,
      },
      {
        label: "Segunda División",
        value: "esp_segunda_division",
        availableToChoose: true,
      },
      {
        label: "Primera Federación",
        value: "esp_primera_federacion",
        availableToChoose: true,
      },
      {
        label: "Segunda Federación",
        value: "esp_segunda_federacion",
        availableToChoose: true,
      },
      {
        label: "Tercera Federación",
        value: "esp_tercera_federacion",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Italy",
    availableToChoose: false,
    options: [
      { label: "Serie A", value: "ita_serie_a", availableToChoose: true },
      { label: "Serie B", value: "ita_serie_b", availableToChoose: true },
      { label: "Serie C", value: "ita_serie_c", availableToChoose: true },
      { label: "Serie D", value: "ita_serie_d", availableToChoose: true },
      {
        label: "Eccellenza",
        value: "ita_eccellenza",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Germany",
    availableToChoose: false,
    options: [
      {
        label: "Bundesliga",
        value: "ger_bundesliga",
        availableToChoose: true,
      },
      {
        label: "2. Bundesliga",
        value: "ger_2_bundesliga",
        availableToChoose: true,
      },
      { label: "3. Liga", value: "ger_3_liga", availableToChoose: true },
      {
        label: "Regionalliga",
        value: "ger_regionalliga",
        availableToChoose: true,
      },
      { label: "Oberliga", value: "ger_oberliga", availableToChoose: true },
    ],
  },
  {
    label: "France",
    availableToChoose: false,
    options: [
      { label: "Ligue 1", value: "fra_ligue_1", availableToChoose: true },
      { label: "Ligue 2", value: "fra_ligue_2", availableToChoose: true },
      {
        label: "Championnat National",
        value: "fra_national",
        availableToChoose: true,
      },
      {
        label: "National 2",
        value: "fra_national_2",
        availableToChoose: true,
      },
      {
        label: "National 3",
        value: "fra_national_3",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Japan",
    availableToChoose: false,
    options: [
      { label: "J1 League", value: "jpn_j1_league", availableToChoose: true },
      { label: "J2 League", value: "jpn_j2_league", availableToChoose: true },
      { label: "J3 League", value: "jpn_j3_league", availableToChoose: true },
      {
        label: "Japan Football League",
        value: "jpn_jfl",
        availableToChoose: true,
      },
      {
        label: "Regional Leagues",
        value: "jpn_regional_leagues",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Brazil",
    availableToChoose: false,
    options: [
      {
        label: "Brasileirão Série A",
        value: "bra_serie_a",
        availableToChoose: true,
      },
      {
        label: "Brasileirão Série B",
        value: "bra_serie_b",
        availableToChoose: true,
      },
      {
        label: "Brasileirão Série C",
        value: "bra_serie_c",
        availableToChoose: true,
      },
      {
        label: "Brasileirão Série D",
        value: "bra_serie_d",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Argentina",
    availableToChoose: false,
    options: [
      {
        label: "Primera División",
        value: "arg_primera_division",
        availableToChoose: true,
      },
      {
        label: "Primera Nacional",
        value: "arg_primera_nacional",
        availableToChoose: true,
      },
      {
        label: "Primera B Metropolitana",
        value: "arg_primera_b_metropolitana",
        availableToChoose: true,
      },
      {
        label: "Torneo Federal A",
        value: "arg_torneo_federal_a",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Netherlands",
    availableToChoose: false,
    options: [
      {
        label: "Eredivisie",
        value: "ned_eredivisie",
        availableToChoose: true,
      },
      {
        label: "Eerste Divisie",
        value: "ned_eerste_divisie",
        availableToChoose: true,
      },
      {
        label: "Tweede Divisie",
        value: "ned_tweede_divisie",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Portugal",
    availableToChoose: false,
    options: [
      {
        label: "Primeira Liga",
        value: "prt_primeira_liga",
        availableToChoose: true,
      },
      {
        label: "Liga Portugal 2",
        value: "prt_liga_portugal_2",
        availableToChoose: true,
      },
      {
        label: "Campeonato de Portugal",
        value: "prt_campeonato_de_portugal",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Russia",
    availableToChoose: false,
    options: [
      {
        label: "Russian Premier League",
        value: "rus_premier_league",
        availableToChoose: true,
      },
      {
        label: "Russian Football National League",
        value: "rus_football_national_league",
        availableToChoose: true,
      },
      {
        label: "Russian Professional Football League",
        value: "rus_professional_football_league",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Mexico",
    availableToChoose: false,
    options: [
      { label: "Liga MX", value: "mex_liga_mx", availableToChoose: true },
      {
        label: "Liga Expansión MX",
        value: "mex_liga_expansion_mx",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Turkey",
    availableToChoose: false,
    options: [
      { label: "Süper Lig", value: "tur_super_lig", availableToChoose: true },
      {
        label: "TFF First League",
        value: "tur_tff_first_league",
        availableToChoose: true,
      },
      {
        label: "TFF Second League",
        value: "tur_tff_second_league",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Australia",
    availableToChoose: false,
    options: [
      {
        label: "A-League Men",
        value: "aus_a_league_men",
        availableToChoose: true,
      },
      {
        label: "National Premier Leagues",
        value: "aus_national_premier_leagues",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Belgium",
    availableToChoose: false,
    options: [
      {
        label: "Belgian First Division A",
        value: "bel_first_division_a",
        availableToChoose: true,
      },
      {
        label: "Belgian First Division B",
        value: "bel_first_division_b",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "United States",
    availableToChoose: false,
    options: [
      {
        label: "Major League Soccer (MLS)",
        value: "usa_mls",
        availableToChoose: true,
      },
      {
        label: "USL Championship",
        value: "usa_usl_championship",
        availableToChoose: true,
      },
      {
        label: "USL League One",
        value: "usa_usl_league_one",
        availableToChoose: true,
      },
      {
        label: "USL League Two",
        value: "usa_usl_league_two",
        availableToChoose: true,
      },
      {
        label: "National Independent Soccer Association (NISA)",
        value: "usa_nisa",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Canada",
    availableToChoose: false,
    options: [
      {
        label: "Canadian Premier League",
        value: "can_cpl",
        availableToChoose: true,
      },
      {
        label: "League1 Ontario",
        value: "can_league1_ontario",
        availableToChoose: true,
      },
      {
        label: "Ligue1 Québec",
        value: "can_ligue1_quebec",
        availableToChoose: true,
      },
      {
        label: "League1 British Columbia",
        value: "can_league1_bc",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Sweden",
    availableToChoose: false,
    options: [
      {
        label: "Allsvenskan",
        value: "swe_allsvenskan",
        availableToChoose: true,
      },
      { label: "Superettan", value: "swe_superettan", availableToChoose: true },
      {
        label: "Ettan Norra",
        value: "swe_ettan_norra",
        availableToChoose: true,
      },
      {
        label: "Ettan Södra",
        value: "swe_ettan_sodra",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Norway",
    availableToChoose: false,
    options: [
      {
        label: "Eliteserien",
        value: "nor_eliteserien",
        availableToChoose: true,
      },
      {
        label: "OBOS-ligaen",
        value: "nor_obos_ligaen",
        availableToChoose: true,
      },
      {
        label: "PostNord-ligaen",
        value: "nor_postnord_ligaen",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Denmark",
    availableToChoose: false,
    options: [
      { label: "Superliga", value: "den_superliga", availableToChoose: true },
      {
        label: "1st Division",
        value: "den_1st_division",
        availableToChoose: true,
      },
      {
        label: "2nd Division",
        value: "den_2nd_division",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Finland",
    availableToChoose: false,
    options: [
      {
        label: "Veikkausliiga",
        value: "fin_veikkausliiga",
        availableToChoose: true,
      },
      { label: "Ykkönen", value: "fin_ykkonen", availableToChoose: true },
      { label: "Kakkonen", value: "fin_kakkonen", availableToChoose: true },
    ],
  },
  {
    label: "Poland",
    availableToChoose: false,
    options: [
      {
        label: "Ekstraklasa",
        value: "pol_ekstraklasa",
        availableToChoose: true,
      },
      { label: "I liga", value: "pol_i_liga", availableToChoose: true },
      { label: "II liga", value: "pol_ii_liga", availableToChoose: true },
      { label: "III liga", value: "pol_iii_liga", availableToChoose: true },
    ],
  },
  {
    label: "South Korea",
    availableToChoose: false,
    options: [
      { label: "K League 1", value: "kor_k_league_1", availableToChoose: true },
      { label: "K League 2", value: "kor_k_league_2", availableToChoose: true },
      { label: "K3 League", value: "kor_k3_league", availableToChoose: true },
      { label: "K4 League", value: "kor_k4_league", availableToChoose: true },
    ],
  },
  {
    label: "China",
    availableToChoose: false,
    options: [
      {
        label: "Chinese Super League",
        value: "chn_super_league",
        availableToChoose: true,
      },
      {
        label: "China League One",
        value: "chn_league_one",
        availableToChoose: true,
      },
      {
        label: "China League Two",
        value: "chn_league_two",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Nigeria",
    availableToChoose: false,
    options: [
      {
        label: "Nigeria Premier Football League",
        value: "nga_npfl",
        availableToChoose: true,
      },
      {
        label: "Nigeria National League",
        value: "nga_nnl",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Egypt",
    availableToChoose: false,
    options: [
      {
        label: "Egyptian Premier League",
        value: "egy_premier_league",
        availableToChoose: true,
      },
      {
        label: "Egyptian Second Division",
        value: "egy_second_division",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Morocco",
    availableToChoose: false,
    options: [
      { label: "Botola Pro", value: "mar_botola_pro", availableToChoose: true },
      { label: "Botola 2", value: "mar_botola_2", availableToChoose: true },
    ],
  },
  {
    label: "Ghana",
    availableToChoose: false,
    options: [
      {
        label: "Ghana Premier League",
        value: "gha_premier_league",
        availableToChoose: true,
      },
      {
        label: "Ghana Division One League",
        value: "gha_division_one",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "South Africa",
    availableToChoose: false,
    options: [
      {
        label: "Premier Soccer League (PSL)",
        value: "rsa_psl",
        availableToChoose: true,
      },
      {
        label: "National First Division",
        value: "rsa_nfd",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Colombia",
    availableToChoose: false,
    options: [
      {
        label: "Categoría Primera A",
        value: "col_primera_a",
        availableToChoose: true,
      },
      {
        label: "Categoría Primera B",
        value: "col_primera_b",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Chile",
    availableToChoose: false,
    options: [
      {
        label: "Primera División",
        value: "chl_primera_division",
        availableToChoose: true,
      },
      { label: "Primera B", value: "chl_primera_b", availableToChoose: true },
      {
        label: "Segunda División",
        value: "chl_segunda_division",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Uruguay",
    availableToChoose: false,
    options: [
      {
        label: "Primera División",
        value: "uru_primera_division",
        availableToChoose: true,
      },
      {
        label: "Segunda División",
        value: "uru_segunda_division",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Paraguay",
    availableToChoose: false,
    options: [
      {
        label: "Primera División",
        value: "par_primera_division",
        availableToChoose: true,
      },
      {
        label: "División Intermedia",
        value: "par_division_intermedia",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Peru",
    availableToChoose: false,
    options: [
      { label: "Liga 1", value: "per_liga_1", availableToChoose: true },
      { label: "Liga 2", value: "per_liga_2", availableToChoose: true },
    ],
  },
  {
    label: "Greece",
    availableToChoose: false,
    options: [
      {
        label: "Super League 1",
        value: "grc_super_league_1",
        availableToChoose: true,
      },
      {
        label: "Super League 2",
        value: "grc_super_league_2",
        availableToChoose: true,
      },
      {
        label: "Gamma Ethniki",
        value: "grc_gamma_ethniki",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Austria",
    availableToChoose: false,
    options: [
      { label: "Bundesliga", value: "aut_bundesliga", availableToChoose: true },
      { label: "2. Liga", value: "aut_2_liga", availableToChoose: true },
      {
        label: "Regionalliga",
        value: "aut_regionalliga",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Greece",
    availableToChoose: false,
    options: [
      {
        label: "Super League 1",
        value: "grc_super_league_1",
        availableToChoose: true,
      },
      {
        label: "Super League 2",
        value: "grc_super_league_2",
        availableToChoose: true,
      },
      {
        label: "Gamma Ethniki",
        value: "grc_gamma_ethniki",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Austria",
    availableToChoose: false,
    options: [
      { label: "Bundesliga", value: "aut_bundesliga", availableToChoose: true },
      { label: "2. Liga", value: "aut_2_liga", availableToChoose: true },
      {
        label: "Regionalliga",
        value: "aut_regionalliga",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Switzerland",
    availableToChoose: false,
    options: [
      {
        label: "Swiss Super League",
        value: "sui_super_league",
        availableToChoose: true,
      },
      {
        label: "Swiss Challenge League",
        value: "sui_challenge_league",
        availableToChoose: true,
      },
      {
        label: "Promotion League",
        value: "sui_promotion_league",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Czech Republic",
    availableToChoose: false,
    options: [
      {
        label: "Czech First League",
        value: "cze_first_league",
        availableToChoose: true,
      },
      {
        label: "Czech National Football League",
        value: "cze_national_football_league",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Hungary",
    availableToChoose: false,
    options: [
      {
        label: "Nemzeti Bajnokság I",
        value: "hun_nb_i",
        availableToChoose: true,
      },
      {
        label: "Nemzeti Bajnokság II",
        value: "hun_nb_ii",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Ukraine",
    availableToChoose: false,
    options: [
      {
        label: "Ukrainian Premier League",
        value: "ukr_premier_league",
        availableToChoose: true,
      },
      {
        label: "Ukrainian First League",
        value: "ukr_first_league",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Romania",
    availableToChoose: false,
    options: [
      { label: "Liga I", value: "rou_liga_i", availableToChoose: true },
      { label: "Liga II", value: "rou_liga_ii", availableToChoose: true },
    ],
  },
  {
    label: "Scotland",
    availableToChoose: false,
    options: [
      {
        label: "Scottish Premiership",
        value: "sco_premiership",
        availableToChoose: true,
      },
      {
        label: "Scottish Championship",
        value: "sco_championship",
        availableToChoose: true,
      },
      {
        label: "Scottish League One",
        value: "sco_league_one",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Wales",
    availableToChoose: false,
    options: [
      {
        label: "Cymru Premier",
        value: "wal_cymru_premier",
        availableToChoose: true,
      },
      {
        label: "Cymru North",
        value: "wal_cymru_north",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Northern Ireland",
    availableToChoose: false,
    options: [
      {
        label: "NIFL Premiership",
        value: "nir_premiership",
        availableToChoose: true,
      },
      {
        label: "NIFL Championship",
        value: "nir_championship",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Republic of Ireland",
    availableToChoose: false,
    options: [
      {
        label: "League of Ireland Premier Division",
        value: "irl_premier_division",
        availableToChoose: true,
      },
      {
        label: "League of Ireland First Division",
        value: "irl_first_division",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Israel",
    availableToChoose: false,
    options: [
      {
        label: "Ligat Ha'Al",
        value: "isr_ligat_haal",
        availableToChoose: true,
      },
      {
        label: "Liga Leumit",
        value: "isr_liga_leumit",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "New Zealand",
    availableToChoose: false,
    options: [
      {
        label: "New Zealand Football Championship",
        value: "nzl_nzfc",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "India",
    availableToChoose: false,
    options: [
      {
        label: "Indian Super League",
        value: "ind_isl",
        availableToChoose: true,
      },
      { label: "I-League", value: "ind_i_league", availableToChoose: true },
    ],
  },
  {
    label: "Thailand",
    availableToChoose: false,
    options: [
      {
        label: "Thai League 1",
        value: "tha_league_1",
        availableToChoose: true,
      },
      {
        label: "Thai League 2",
        value: "tha_league_2",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Malaysia",
    availableToChoose: false,
    options: [
      {
        label: "Malaysia Super League",
        value: "mas_super_league",
        availableToChoose: true,
      },
      {
        label: "Malaysia Premier League",
        value: "mas_premier_league",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Indonesia",
    availableToChoose: false,
    options: [
      { label: "Liga 1", value: "idn_liga_1", availableToChoose: true },
      { label: "Liga 2", value: "idn_liga_2", availableToChoose: true },
    ],
  },
  {
    label: "Vietnam",
    availableToChoose: false,
    options: [
      { label: "V.League 1", value: "vnm_vleague_1", availableToChoose: true },
      { label: "V.League 2", value: "vnm_vleague_2", availableToChoose: true },
    ],
  },
  {
    label: "Saudi Arabia",
    availableToChoose: false,
    options: [
      {
        label: "Saudi Professional League",
        value: "sau_pro_league",
        availableToChoose: true,
      },
      {
        label: "Saudi First Division League",
        value: "sau_first_division",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "United Arab Emirates",
    availableToChoose: false,
    options: [
      {
        label: "UAE Pro League",
        value: "uae_pro_league",
        availableToChoose: true,
      },
      {
        label: "UAE First Division League",
        value: "uae_first_division",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Qatar",
    availableToChoose: false,
    options: [
      {
        label: "Qatar Stars League",
        value: "qat_stars_league",
        availableToChoose: true,
      },
      {
        label: "Qatar Second Division",
        value: "qat_second_division",
        availableToChoose: true,
      },
    ],
  },
  {
    label: "Algeria",
    availableToChoose: false,
    options: [
      {
        label: "Ligue Professionnelle 1",
        value: "dza_ligue1",
        availableToChoose: true,
      },
      {
        label: "Ligue Professionnelle 2",
        value: "dza_ligue2",
        availableToChoose: true,
      },
    ],
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

export const automationsHardLimit = 25;

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

export const fetchUserAutomationsCount = async (userUuid: string) => {
  const { count, error } = await supabase
    .from("automation")
    .select("*", { count: "exact", head: true })
    .eq("user_uuid", userUuid);

  if (error) throw new Error("Error fetching automation count");

  return count || 0;
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
