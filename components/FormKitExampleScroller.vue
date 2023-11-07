<script setup lang="ts">
import { type FormKitNode } from "@formkit/core";

const chartData = Array(50)
  .fill(0)
  .map((_, i) => ({
    at: i * 40,
    value: Math.random() * 100 + i * 2,
  }));

let zIndexCount = 999;
const exampleCardClasses = () => {
  zIndexCount--;
  return `mb-4 border border-neutral-200 p-5 rounded-xl bg-white/30 relative z-[${zIndexCount}] hover:z-[999] backdrop-blur-sm dark:bg-neutral-800/50 dark:border-neutral-900`;
};

// v-model values for inputs
const nameInput = ref("");

async function searchMovies({ search }: { search: string }) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (!search)
    // With no search value, lets just return a list of common movies.
    return [
      { label: "Saving Private Ryan", value: 857 },
      { label: "Everything Everywhere All at Once", value: 545611 },
      { label: "Gone with the Wind", value: 770 },
    ];
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${
      search || ""
    }&api_key=f48bcc9ed9cbce41f6c28ea181b67e14&language=en-US&page=1&include_adult=false`
  );
  if (res.ok) {
    const data = await res.json();
    // Iterating over results to set the required
    // `label` and `value` keys.
    return data.results.map((result: Record<any, any>) => {
      return {
        label: result.title,
        value: result.id,
      };
    });
  }
  // If the request fails, we return an empty array.
  return [];
}

const handleIconClick = (node: FormKitNode, e: Event) => {
  node.props.suffixIcon = node.props.suffixIcon === "eye" ? "eyeClosed" : "eye";
  node.props.type = node.props.type === "password" ? "text" : "password";
};

const countries = [
  { label: "Afghanistan", value: "AF" },
  { label: "Åland Islands", value: "AX" },
  { label: "Albania", value: "AL" },
  { label: "Algeria", value: "DZ" },
  { label: "American Samoa", value: "AS" },
  { label: "AndorrA", value: "AD" },
  { label: "Angola", value: "AO" },
  { label: "Anguilla", value: "AI" },
  { label: "Antarctica", value: "AQ" },
  { label: "Antigua and Barbuda", value: "AG" },
  { label: "Argentina", value: "AR" },
  { label: "Armenia", value: "AM" },
  { label: "Aruba", value: "AW" },
  { label: "Australia", value: "AU" },
  { label: "Austria", value: "AT" },
  { label: "Azerbaijan", value: "AZ" },
  { label: "Bahamas", value: "BS" },
  { label: "Bahrain", value: "BH" },
  { label: "Bangladesh", value: "BD" },
  { label: "Barbados", value: "BB" },
  { label: "Belarus", value: "BY" },
  { label: "Belgium", value: "BE" },
  { label: "Belize", value: "BZ" },
  { label: "Benin", value: "BJ" },
  { label: "Bermuda", value: "BM" },
  { label: "Bhutan", value: "BT" },
  { label: "Bolivia", value: "BO" },
  { label: "Bosnia and Herzegovina", value: "BA" },
  { label: "Botswana", value: "BW" },
  { label: "Bouvet Island", value: "BV" },
  { label: "Brazil", value: "BR" },
  { label: "British Indian Ocean Territory", value: "IO" },
  { label: "Brunei Darussalam", value: "BN" },
  { label: "Bulgaria", value: "BG" },
  { label: "Burkina Faso", value: "BF" },
  { label: "Burundi", value: "BI" },
  { label: "Cambodia", value: "KH" },
  { label: "Cameroon", value: "CM" },
  { label: "Canada", value: "CA" },
  { label: "Cape Verde", value: "CV" },
  { label: "Cayman Islands", value: "KY" },
  { label: "Central African Republic", value: "CF" },
  { label: "Chad", value: "TD" },
  { label: "Chile", value: "CL" },
  { label: "China", value: "CN" },
  { label: "Christmas Island", value: "CX" },
  { label: "Cocos (Keeling) Islands", value: "CC" },
  { label: "Colombia", value: "CO" },
  { label: "Comoros", value: "KM" },
  { label: "Congo", value: "CG" },
  { label: "Congo, The Democratic Republic of the", value: "CD" },
  { label: "Cook Islands", value: "CK" },
  { label: "Costa Rica", value: "CR" },
  { label: "Cote D'Ivoire", value: "CI" },
  { label: "Croatia", value: "HR" },
  { label: "Cuba", value: "CU" },
  { label: "Cyprus", value: "CY" },
  { label: "Czech Republic", value: "CZ" },
  { label: "Denmark", value: "DK" },
  { label: "Djibouti", value: "DJ" },
  { label: "Dominica", value: "DM" },
  { label: "Dominican Republic", value: "DO" },
  { label: "Ecuador", value: "EC" },
  { label: "Egypt", value: "EG" },
  { label: "El Salvador", value: "SV" },
  { label: "Equatorial Guinea", value: "GQ" },
  { label: "Eritrea", value: "ER" },
  { label: "Estonia", value: "EE" },
  { label: "Ethiopia", value: "ET" },
  { label: "Falkland Islands (Malvinas)", value: "FK" },
  { label: "Faroe Islands", value: "FO" },
  { label: "Fiji", value: "FJ" },
  { label: "Finland", value: "FI" },
  { label: "France", value: "FR" },
  { label: "French Guiana", value: "GF" },
  { label: "French Polynesia", value: "PF" },
  { label: "French Southern Territories", value: "TF" },
  { label: "Gabon", value: "GA" },
  { label: "Gambia", value: "GM" },
  { label: "Georgia", value: "GE" },
  { label: "Germany", value: "DE" },
  { label: "Ghana", value: "GH" },
  { label: "Gibraltar", value: "GI" },
  { label: "Greece", value: "GR" },
  { label: "Greenland", value: "GL" },
  { label: "Grenada", value: "GD" },
  { label: "Guadeloupe", value: "GP" },
  { label: "Guam", value: "GU" },
  { label: "Guatemala", value: "GT" },
  { label: "Guernsey", value: "GG" },
  { label: "Guinea", value: "GN" },
  { label: "Guinea-Bissau", value: "GW" },
  { label: "Guyana", value: "GY" },
  { label: "Haiti", value: "HT" },
  { label: "Heard Island and Mcdonald Islands", value: "HM" },
  { label: "Holy See (Vatican City State)", value: "VA" },
  { label: "Honduras", value: "HN" },
  { label: "Hong Kong", value: "HK" },
  { label: "Hungary", value: "HU" },
  { label: "Iceland", value: "IS" },
  { label: "India", value: "IN" },
  { label: "Indonesia", value: "ID" },
  { label: "Iran, Islamic Republic Of", value: "IR" },
  { label: "Iraq", value: "IQ" },
  { label: "Ireland", value: "IE" },
  { label: "Isle of Man", value: "IM" },
  { label: "Israel", value: "IL" },
  { label: "Italy", value: "IT" },
  { label: "Jamaica", value: "JM" },
  { label: "Japan", value: "JP" },
  { label: "Jersey", value: "JE" },
  { label: "Jordan", value: "JO" },
  { label: "Kazakhstan", value: "KZ" },
  { label: "Kenya", value: "KE" },
  { label: "Kiribati", value: "KI" },
  { label: "Korea, Democratic People'S Republic of", value: "KP" },
  { label: "Korea, Republic of", value: "KR" },
  { label: "Kuwait", value: "KW" },
  { label: "Kyrgyzstan", value: "KG" },
  { label: "Lao People'S Democratic Republic", value: "LA" },
  { label: "Latvia", value: "LV" },
  { label: "Lebanon", value: "LB" },
  { label: "Lesotho", value: "LS" },
  { label: "Liberia", value: "LR" },
  { label: "Libyan Arab Jamahiriya", value: "LY" },
  { label: "Liechtenstein", value: "LI" },
  { label: "Lithuania", value: "LT" },
  { label: "Luxembourg", value: "LU" },
  { label: "Macao", value: "MO" },
  { label: "Macedonia, The Former Yugoslav Republic of", value: "MK" },
  { label: "Madagascar", value: "MG" },
  { label: "Malawi", value: "MW" },
  { label: "Malaysia", value: "MY" },
  { label: "Maldives", value: "MV" },
  { label: "Mali", value: "ML" },
  { label: "Malta", value: "MT" },
  { label: "Marshall Islands", value: "MH" },
  { label: "Martinique", value: "MQ" },
  { label: "Mauritania", value: "MR" },
  { label: "Mauritius", value: "MU" },
  { label: "Mayotte", value: "YT" },
  { label: "Mexico", value: "MX" },
  { label: "Micronesia, Federated States of", value: "FM" },
  { label: "Moldova, Republic of", value: "MD" },
  { label: "Monaco", value: "MC" },
  { label: "Mongolia", value: "MN" },
  { label: "Montenegro", value: "ME" },
  { label: "Montserrat", value: "MS" },
  { label: "Morocco", value: "MA" },
  { label: "Mozambique", value: "MZ" },
  { label: "Myanmar", value: "MM" },
  { label: "Namibia", value: "NA" },
  { label: "Nauru", value: "NR" },
  { label: "Nepal", value: "NP" },
  { label: "Netherlands", value: "NL" },
  { label: "Netherlands Antilles", value: "AN" },
  { label: "New Caledonia", value: "NC" },
  { label: "New Zealand", value: "NZ" },
  { label: "Nicaragua", value: "NI" },
  { label: "Niger", value: "NE" },
  { label: "Nigeria", value: "NG" },
  { label: "Niue", value: "NU" },
  { label: "Norfolk Island", value: "NF" },
  { label: "Northern Mariana Islands", value: "MP" },
  { label: "Norway", value: "NO" },
  { label: "Oman", value: "OM" },
  { label: "Pakistan", value: "PK" },
  { label: "Palau", value: "PW" },
  { label: "Palestinian Territory, Occupied", value: "PS" },
  { label: "Panama", value: "PA" },
  { label: "Papua New Guinea", value: "PG" },
  { label: "Paraguay", value: "PY" },
  { label: "Peru", value: "PE" },
  { label: "Philippines", value: "PH" },
  { label: "Pitcairn", value: "PN" },
  { label: "Poland", value: "PL" },
  { label: "Portugal", value: "PT" },
  { label: "Puerto Rico", value: "PR" },
  { label: "Qatar", value: "QA" },
  { label: "Reunion", value: "RE" },
  { label: "Romania", value: "RO" },
  { label: "Russian Federation", value: "RU" },
  { label: "RWANDA", value: "RW" },
  { label: "Saint Helena", value: "SH" },
  { label: "Saint Kitts and Nevis", value: "KN" },
  { label: "Saint Lucia", value: "LC" },
  { label: "Saint Pierre and Miquelon", value: "PM" },
  { label: "Saint Vincent and the Grenadines", value: "VC" },
  { label: "Samoa", value: "WS" },
  { label: "San Marino", value: "SM" },
  { label: "Sao Tome and Principe", value: "ST" },
  { label: "Saudi Arabia", value: "SA" },
  { label: "Senegal", value: "SN" },
  { label: "Serbia", value: "RS" },
  { label: "Seychelles", value: "SC" },
  { label: "Sierra Leone", value: "SL" },
  { label: "Singapore", value: "SG" },
  { label: "Slovakia", value: "SK" },
  { label: "Slovenia", value: "SI" },
  { label: "Solomon Islands", value: "SB" },
  { label: "Somalia", value: "SO" },
  { label: "South Africa", value: "ZA" },
  { label: "South Georgia and the South Sandwich Islands", value: "GS" },
  { label: "Spain", value: "ES" },
  { label: "Sri Lanka", value: "LK" },
  { label: "Sudan", value: "SD" },
  { label: "Suriname", value: "SR" },
  { label: "Svalbard and Jan Mayen", value: "SJ" },
  { label: "Swaziland", value: "SZ" },
  { label: "Sweden", value: "SE" },
  { label: "Switzerland", value: "CH" },
  { label: "Syrian Arab Republic", value: "SY" },
  { label: "Taiwan, Province of China", value: "TW" },
  { label: "Tajikistan", value: "TJ" },
  { label: "Tanzania, United Republic of", value: "TZ" },
  { label: "Thailand", value: "TH" },
  { label: "Timor-Leste", value: "TL" },
  { label: "Togo", value: "TG" },
  { label: "Tokelau", value: "TK" },
  { label: "Tonga", value: "TO" },
  { label: "Trinidad and Tobago", value: "TT" },
  { label: "Tunisia", value: "TN" },
  { label: "Turkey", value: "TR" },
  { label: "Turkmenistan", value: "TM" },
  { label: "Turks and Caicos Islands", value: "TC" },
  { label: "Tuvalu", value: "TV" },
  { label: "Uganda", value: "UG" },
  { label: "Ukraine", value: "UA" },
  { label: "United Arab Emirates", value: "AE" },
  { label: "United Kingdom", value: "GB" },
  { label: "United States", value: "US" },
  { label: "United States Minor Outlying Islands", value: "UM" },
  { label: "Uruguay", value: "UY" },
  { label: "Uzbekistan", value: "UZ" },
  { label: "Vanuatu", value: "VU" },
  { label: "Venezuela", value: "VE" },
  { label: "Viet Nam", value: "VN" },
  { label: "Virgin Islands, British", value: "VG" },
  { label: "Virgin Islands, U.S.", value: "VI" },
  { label: "Wallis and Futuna", value: "WF" },
  { label: "Western Sahara", value: "EH" },
  { label: "Yemen", value: "YE" },
  { label: "Zambia", value: "ZM" },
  { label: "Zimbabwe", value: "ZW" },
];

const swatches = [
  "#000000",
  "hsla(180, 100%, 0%, 0.5)",
  "hsla(352, 98%, 41%, 1)",
  "rgb(245, 166, 35)",
  "hsl(55deg, 94%, 54.1%)",
  "#8B572A",
  "#7ED321",
  "#417505",
  "#B955CB",
  "#9013FE",
  "#4A90E2",
  "#50E3C2",
  "#B8E986",
  "#4A4A4A",
  "#9B9B9B",
  "#FFFFFF",
  "hsla(220, 30%, 100%, 0.5)",
  "rgba(233,22,155,0.5)",
  "hsla(50deg,85.5%,83.7%,0.5)",
];

const frameworks = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
];
</script>

<template>
  <div
    class="md:fixed w-full px-5 md:px-0 overflow-auto top-20 right-0 flex flex-nowrap md:overflow-visible md:w-[calc(80%-430px)] h-full shrink-0 z-[2]"
  >
    <div class="demo-container flex flex-nowrap">
      <div class="scroller-column mr-5 w-[365px] shrink-0">
        <div class="scroller-column-inner">
          <div>
            <div :class="exampleCardClasses()">
              <FormKit
                v-model="nameInput"
                type="text"
                label="Your Name"
                help="Please enter your full name"
                placeholder="John Doe"
                prefix-icon="avatarMan"
              />
            </div>
            <div :class="exampleCardClasses()">
              <FormKit
                type="range"
                label="Volume"
                min="0"
                max="11"
                help="Select your volume level."
              />
            </div>
            <div :class="exampleCardClasses()">
              <FormKit
                type="colorpicker"
                value="#8DA0C7"
                format="hsla"
                inline
              />
            </div>
            <div :class="exampleCardClasses()">
              <FormKit
                outer-class="z-10"
                type="taglist"
                :options="[
                  'Validation',
                  'Accessibility',
                  'Performance',
                  'Value Modeling',
                  'Styling',
                  'Customization',
                  'Documentation',
                  'Open Source',
                ]"
                :value="['Styling', 'Open Source']"
              />
            </div>
            <div :class="exampleCardClasses()">
              <FormKit
                type="slider"
                label="Choose your price range"
                :value="[800, 1200]"
                :tooltip-format="(v) => `&dollar;${v}`"
                tooltip="true"
                min="0"
                max="2000"
                show-input
                step="25"
                :input-attrs="{
                  floatingLabel: true,
                  prefixIcon: 'dollar',
                }"
                :min-input-attrs="{
                  label: 'Minimum',
                }"
                :max-input-attrs="{
                  label: 'Maximum',
                }"
                :marks="[
                  { at: 0, label: '$0' },
                  { at: 500, label: '$500' },
                  { at: 1000, label: '$1000' },
                  { at: 1500, label: '$1500' },
                  { at: 2000, label: '$2000' },
                ]"
                mark-labels
                :chart="chartData"
              />
            </div>
            <div :class="exampleCardClasses()">
              <FormKit
                type="radio"
                label="Preferred transportation"
                :options="[
                  'E-Bike',
                  'E-Scooter',
                  'Electric car',
                  'Walking',
                  'Space tube',
                ]"
                value="Electric car"
                help="How do you like to get around?"
              />
            </div>
            <div :class="exampleCardClasses()">
              <FormKit
                type="autocomplete"
                name="country"
                label="Target Markets"
                placeholder="Example: United States"
                :options="countries"
                :value="['US', 'CA']"
                truncate
                multiple
              />
            </div>
          </div>
        </div>
      </div>
      <div class="scroller-column mr-5 w-[365px] shrink-0">
        <div class="scroller-column-inner">
          <div>
            <div :class="exampleCardClasses()">
              <FormKit
                type="autocomplete"
                label="Which countries have you visited?"
                placheolder="Pick a country"
                :options="countries"
                multiple
                selection-appearance="option"
                :value="['FR', 'GR', 'ES']"
              />
            </div>
            <div :class="exampleCardClasses()">
              <FormKit
                type="slider"
                label="Temperature"
                value="52"
                tooltip="true"
                :marks="[
                  { at: 0, label: '0°C' },
                  { at: 20, label: '20°C' },
                  { at: 37, label: '37°C' },
                  { at: 100, label: '100°C' },
                ]"
                mark-labels
              />
            </div>
            <div :class="exampleCardClasses()">
              <FormKit
                type="mask"
                name="phone"
                mask="+1 (###) ###-####"
                label="Phone number"
                help="Please enter a phone number"
              />
            </div>
            <div :class="exampleCardClasses()">
              <FormKit
                type="colorpicker"
                label="Recent Colors"
                value="#CF021D"
                inline
                :options="swatches"
                panel-controls="false"
                panel-format="false"
              />
            </div>
            <div :class="exampleCardClasses()">
              <FormKit
                :value="['650']"
                type="checkbox"
                label="Trim extras"
                :options="{
                  500: 'Premium connectivity ($500)',
                  650: 'Heated seats ($650)',
                  1200: '22\' turbine wheels ($1,200)',
                  13250: 'Gold leaf interior ($13,250)',
                }"
                help="Configure your car’s trim options"
              />
            </div>
            <div :class="exampleCardClasses()">
              <FormKit
                type="file"
                label="Attach files"
                multiple="true"
                :value="[
                  { name: 'formkit-design-final-2.sketch' },
                  { name: 'theming-guide.docx' },
                ]"
              />
            </div>
            <div :class="exampleCardClasses()">
              <FormKit
                type="textarea"
                name="instructions"
                label="Your Essay"
                placeholder="Remember to write in complete sentences."
                validation="length:0,120"
                validation-visibility="live"
                :validation-messages="{
                  length: 'Instructions cannot be more than 120 characters.',
                }"
              />
            </div>
            <div :class="exampleCardClasses()">
              <FormKit
                type="submit"
                label="Submit Application"
                help="We will respond within 48 hours."
              />
            </div>
            <div :class="exampleCardClasses()">
              <ClientOnly>
                <FormKit
                  type="datepicker"
                  name="date"
                  label="Appointment date"
                  placeholder="Select a date"
                  help="Select a date to book your appointment."
                  overlay
                />
              </ClientOnly>
            </div>
          </div>
        </div>
      </div>
      <div class="scroller-column w-[365px] shrink-0">
        <div class="scroller-column-inner">
          <div>
            <div :class="exampleCardClasses()">
              <FormKit
                name="movie"
                type="autocomplete"
                label="Search for your favorite movie"
                placeholder="Example: Shawshank Redemption"
                :options="searchMovies"
                load-on-created
              />
            </div>
            <div :class="exampleCardClasses()">
              <FormKit
                :value="true"
                type="toggle"
                name="toggle"
                label="Airplane mode"
              />
            </div>
            <div :class="exampleCardClasses()">
              <FormKit
                type="dropdown"
                name="framework"
                label="Choose a frontend framework"
                placeholder="Example placeholder"
                :options="frameworks"
                value="vue"
                selection-removable
                open-on-remove
              />
            </div>
            <div :class="exampleCardClasses()">
              <FormKit
                type="checkbox"
                label="Terms and Conditions"
                help="Do you agree to our terms of service?"
                name="terms"
                :value="true"
                validation="accepted"
                validation-visibility="dirty"
              />
            </div>
            <div :class="exampleCardClasses()">
              <FormKit
                type="password"
                label="Password"
                value="mySecretPassword!"
                prefix-icon="password"
                suffix-icon="eyeClosed"
                @suffix-icon-click="handleIconClick"
              />
            </div>
            <div :class="exampleCardClasses()">
              <FormKit
                type="file"
                label="Application"
                accept=".pdf,.doc,.docx"
                help="Please attached your completed application."
              />
            </div>
            <div :class="exampleCardClasses()">
              <FormKit
                type="color"
                value="#8DA0C7"
                label="Select a color"
                help="Select your favorite color."
              />
            </div>
            <div :class="exampleCardClasses()">
              <FormKit
                id="repeater"
                name="users"
                type="repeater"
                label="Users"
                :value="[
                  {
                    email: 'andrew@formkit.com',
                  },
                  {
                    email: 'justin@formkit.com',
                  },
                ]"
                #default="{ index }"
              >
                <FormKit
                  type="email"
                  :label="`${(index as number) + 1}. Email`"
                  name="email"
                  validation="required|email"
                  placeholder="Add email address..."
                />
              </FormKit>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scroller-column-inner {
  width: 100%;
}

.scroller-column-inner:hover {
  animation-play-state: paused;
}

.scroller-column:deep(.formkit-outer) {
  margin-bottom: 0;
}
</style>
