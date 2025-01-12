"use client"

import {
  Button
} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import {
  Input
} from "@/components/ui/input"
import {
  PhoneInput
} from "@/components/ui/phone-input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { createClient } from "@/lib/supabase/client"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import { RotateCw } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  useState
} from "react"
import {
  useForm
} from "react-hook-form"
import {
  toast
} from "sonner"
import * as z from "zod"

const formSchema = z.object({
  first_name: z.string({ required_error: "First name is required" }).min(1, { message: "First name is required" }),
  last_name: z.string({ required_error: "Last name is required" }).min(1, { message: "Last name is required" }),
  email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email address" }),
  address: z.string({ required_error: "Address is required" }).min(1, { message: "Address is required" }),
  phone_number: z.string().min(1, { message: "Phone number is required" }),
  staff_type: z.string({ required_error: "Staff type is required" }).min(1, { message: "Staff type is required" }),
  department: z.string({ required_error: "Department is required" }).min(1, { message: "Department is required" }),
  timezone: z.string({ required_error: "Timezone is required" }).min(1, { message: "Timezone is required" }),
  availability: z.string({ required_error: "Availability is required" }).min(1, { message: "Availability is required" }),
  local_currency: z.string({ required_error: "Local currency is required" }).min(1, { message: "Local currency is required" }),
  has_uk_bank_account: z.boolean(),
  payment_mechanism: z.string({ required_error: "Payment mechanism is required" }).min(1, { message: "Payment mechanism is required" }),
});

export default function OnboardingForm() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      address: "",
      phone_number: "",
      staff_type: "",
      department: "",
      timezone: "",
      availability: "",
      local_currency: "",
      has_uk_bank_account: false,
      payment_mechanism: "",
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const supabase = createClient();

    setLoading(true);
    try {
      const formattedEmail = values.first_name.toLowerCase() + values.last_name.toLowerCase() + "@setandforget.io";

      const { error } = await supabase.from("users").insert([{ ...values, email: formattedEmail, personal_email: values.email, access: [] }]);

      if (error) {
        console.error("Form submission error", error);
        toast.error("Failed to submit the form. Please try again.");
        return;
      }

      router.push("/welcome");

      document.cookie = "onboarding=1; max-age=31536000; path=/";

    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8 overflow-hidden">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-3xl mx-auto bg-background rounded-xl p-8 flex flex-col relative">

          <div className="absolute top-[-130px] left-[850px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="424" height="482" viewBox="0 0 424 482" fill="none">
              <rect width="120" height="431" transform="matrix(0.731354 0.681998 0.682585 -0.730807 42 356.845)" fill="url(#paint0_linear_2418_11172)" fillOpacity="0.6" />
              <g opacity="0.8" filter="url(#filter0_f_2418_11172)">
                <circle cx="60" cy="60" r="60" transform="matrix(0.731354 0.681998 0.682585 -0.730807 16 382.845)" fill="#0FC2AD" />
              </g>
              <circle cx="60" cy="60" r="60" transform="matrix(0.731354 0.681998 0.682585 -0.730807 1 399.845)" fill="#0FC2AD" />
              <rect width="42" height="349" transform="matrix(0.731354 0.681998 0.686266 -0.727351 46.999 253.846)" fill="url(#paint1_linear_2418_11172)" fillOpacity="0.6" />
              <g opacity="0.8" filter="url(#filter1_f_2418_11172)">
                <circle cx="21" cy="21" r="21" transform="matrix(0.731354 0.681998 0.686266 -0.727351 38 262.846)" fill="#AFCFFF" />
              </g>
              <circle cx="21" cy="21" r="21" transform="matrix(0.731354 0.681998 0.686266 -0.727351 33 268.846)" fill="#AFCFFF" />
              <defs>
                <filter id="filter0_f_2418_11172" x="0.8125" y="279.941" width="200.048" height="199.952" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feGaussianBlur stdDeviation="20" result="effect1_foregroundBlur_2418_11172" />
                </filter>
                <filter id="filter1_f_2418_11172" x="6.70898" y="200.955" width="122.122" height="121.877" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feGaussianBlur stdDeviation="20" result="effect1_foregroundBlur_2418_11172" />
                </filter>
                <linearGradient id="paint0_linear_2418_11172" x1="60" y1="0" x2="60" y2="431" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0FC2AD" />
                  <stop offset="0.707025" stopColor="#0FC2AD" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="paint1_linear_2418_11172" x1="21" y1="0" x2="21" y2="349" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#AFCFFF" />
                  <stop offset="0.707025" stopColor="#AFCFFF" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="absolute bottom-[50px] left-[-600px]">
            <svg xmlns="http://www.w3.org/2000/svg" className="relative top-[660px]" width="503" height="503" viewBox="0 0 503 503" fill="none">
              <rect opacity="0.5" width="160" height="493" transform="matrix(-0.707107 -0.707107 -0.706677 0.707536 462 154)" fill="url(#paint0_linear_3310_19701)" />
              <g opacity="0.8" filter="url(#filter0_f_3310_19701)">
                <circle cx="80" cy="80" r="80" transform="matrix(-0.731354 -0.681998 -0.681554 0.731767 496 117)" fill="#F2C226" />
              </g>
              <circle cx="80" cy="80" r="80" transform="matrix(1 0 -0.000606827 -1 325.016 178.981)" fill="#F2C226" />
              <defs>
                <filter id="filter0_f_3310_19701" x="262.991" y="0.957031" width="239.952" height="240.049" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feGaussianBlur stdDeviation="20" result="effect1_foregroundBlur_3310_19701" />
                </filter>
                <linearGradient id="paint0_linear_3310_19701" x1="80" y1="0" x2="80" y2="493" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F2C226" />
                  <stop offset="0.707025" stopColor="#F2C226" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="452" height="451" viewBox="0 0 452 451" fill="none">
              <rect opacity="0.4" width="92" height="489" transform="matrix(-0.707107 -0.707107 -0.706819 0.707394 411 105)" fill="url(#paint0_linear_2553_21063)" />
              <g opacity="0.8" filter="url(#filter0_f_2553_21063)">
                <circle cx="46" cy="46" r="46" transform="matrix(-0.731354 -0.681998 -0.681701 0.731631 431 84)" fill="#FF857A" />
              </g>
              <circle cx="46" cy="46" r="46" transform="matrix(1 0 -0.000405999 -1 332.018 119.283)" fill="#FF857A" />
              <defs>
                <filter id="filter0_f_2553_21063" x="280.009" y="0.273682" width="171.982" height="172.019" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feGaussianBlur stdDeviation="20" result="effect1_foregroundBlur_2553_21063" />
                </filter>
                <linearGradient id="paint0_linear_2553_21063" x1="46" y1="0" x2="46" y2="489" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FF857A" />
                  <stop offset="0.707025" stopColor="#FF857A" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="mb-2">
            <h1 className="text-[25px] font-light">Welcome to RevOps!</h1>
            <span className="text-[14px] font-light">Let's get started by setting up your profile.</span>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">First name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Austin"
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Post"
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Personal email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="jhondoe@gmail.com"

                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="1234 Main St, City, State, 12345"
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel>Phone number</FormLabel>
                <FormControl className="w-full">
                  <PhoneInput
                    placeholder="(555) 555-5555"
                    {...field}
                    defaultCountry="AR"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="staff_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Staff type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a staff type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="project-based-consultant">Project-based consultant</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a department" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="implementation">Implementation</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="timezone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Timezone</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a timezone" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="est">EST</SelectItem>
                        <SelectItem value="cet">CET</SelectItem>
                        <SelectItem value="gmt">GMT</SelectItem>
                        <SelectItem value="ist">IST</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Availability per week (Hrs)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="40"
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="local_currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Local currency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ars">ARS</SelectItem>
                        <SelectItem value="usd">USD</SelectItem>
                        <SelectItem value="eur">EUR</SelectItem>
                        <SelectItem value="gbp">GBP</SelectItem>
                        <SelectItem value="inr">INR</SelectItem>
                        <SelectItem value="brl">BRL</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="payment_mechanism"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred payment mechanism</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="bank-transfer">Bank transfer</SelectItem>
                        <SelectItem value="paypal">Paypal</SelectItem>
                        <SelectItem value="stripe">Stripe</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="has_uk_bank_account"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between border px-3 py-2 !mt-6 shadow-sm">
                <FormLabel className="font-normal">Do you have a UK bank account?</FormLabel>
                <FormControl>
                  <Switch
                    className="!m-0 rounded-sm"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            className="!mt-8 ml-auto min-w-[97px]"
            type="submit"
            disabled={loading}
          >
            {loading ? <RotateCw className="animate-spin" /> : "Im ready!"}
          </Button>
        </form>
      </Form>
    </div>
  )
}