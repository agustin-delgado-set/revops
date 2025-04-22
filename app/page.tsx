// File: components/OnboardingForm.tsx
"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import moment from "moment-timezone"
import currencyCodes from "currency-codes"
import { countries } from "country-data"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PhoneInput } from "@/components/ui/phone-input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Check, ChevronsUpDown, RotateCw } from "lucide-react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem
} from "@/components/ui/command"

const timeZoneListRaw = moment.tz.names()

function getFlagEmoji(alpha2: string): string {
  return alpha2
    .toUpperCase()
    .replace(/./g, char =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    )
}

const currencyList = currencyCodes.codes().map(code => {
  const country = countries.all.find((c) =>
    Array.isArray(c.currencies) && c.currencies.includes(code)
  )
  return {
    code,
    flag: country ? getFlagEmoji(country.alpha2) : ""
  }
})

const popularTimeZones = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles"
]
const popularCurrencies = ["USD", "EUR", "GBP", "ARS"]

const formSchema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  address: z.string().min(1, { message: "Address is required" }),
  phone_number: z.string().min(1, { message: "Phone number is required" }),
  staff_type: z.enum(["full-time", "project-based-consultant"], {
    required_error: "Staff type is required"
  }),
  department: z.enum(
    ["development", "implementation", "sales", "marketing"],
    { required_error: "Department is required" }
  ),
  timezone: z.string().min(1, { message: "Timezone is required" }),
  availability: z.string().min(1, { message: "Availability is required" }),
  local_currency: z.string().min(1, { message: "Local currency is required" }),
  has_uk_bank_account: z.boolean(),
  payment_mechanism: z.string().min(1, { message: "Payment mechanism is required" })
})

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
      staff_type: "full-time",
      department: "development",
      timezone: "",
      availability: "",
      local_currency: "",
      has_uk_bank_account: false,
      payment_mechanism: ""
    }
  })

  const selectedStaffType = form.watch("staff_type")

  const tzOptions = useMemo(
    () =>
      timeZoneListRaw.map(tz => {
        const offsetMin = moment.tz(tz).utcOffset()
        const sign = offsetMin >= 0 ? "+" : "-"
        const absMin = Math.abs(offsetMin)
        const hours = Math.floor(absMin / 60)
        const minutes = absMin % 60
        const offset = `${sign}${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
        return { label: `(GMT${offset}) ${tz}`, value: tz }
      }),
    []
  )

  const [tzQuery, setTzQuery] = useState("")
  const filteredTimeZones = useMemo(
    () =>
      tzOptions.filter(item =>
        item.label.toLowerCase().includes(tzQuery.toLowerCase())
      ),
    [tzOptions, tzQuery]
  )
  const displayedTimeZones = tzQuery
    ? filteredTimeZones
    : tzOptions.filter(opt => popularTimeZones.includes(opt.value))

  const [currencyQuery, setCurrencyQuery] = useState("")
  const filteredCurrencies = useMemo(
    () =>
      currencyList.filter(item =>
        item.code.toLowerCase().includes(currencyQuery.toLowerCase())
      ),
    [currencyQuery]
  )
  const displayedCurrencies = currencyQuery
    ? filteredCurrencies
    : currencyList.filter(c => popularCurrencies.includes(c.code))

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const supabase = createClient()
    setLoading(true)
    try {
      const formattedEmail = `${values.first_name
        .toLowerCase()
        .trim()}${values.last_name.toLowerCase().trim()}@revopsautomated.com`
      const { error } = await supabase
        .from("users")
        .insert([
          {
            ...values,
            email: formattedEmail,
            personal_email: values.email,
            access: []
          }
        ])

      if (error) {
        console.error("Submission error", error)
        toast.error("Failed to submit the form. Please try again.")
        return
      }

      document.cookie = "onboarding=1; max-age=31536000; path=/"
      router.push("/welcome")
    } catch (err) {
      console.error("Submission error", err)
      toast.error("Failed to submit the form. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 overflow-hidden">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 max-w-3xl mx-auto bg-background rounded-xl p-8"
        >
          <h1 className="text-2xl font-light">Welcome to RevOps!</h1>
          <p className="text-sm font-light mb-4">
            Let&apos;s get started by setting up your profile.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Austin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Post" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="jhondoe@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-2">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="1234 Main St, City, State, 12345"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-2">
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <PhoneInput
                        placeholder="(555) 555-5555"
                        defaultCountry="AR"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="staff_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Staff Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Staff Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">
                            Full-time
                          </SelectItem>
                          <SelectItem value="project-based-consultant">
                            Project-based Consultant
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="development">
                            Development
                          </SelectItem>
                          <SelectItem value="implementation">
                            Implementation
                          </SelectItem>
                          <SelectItem value="sales">Sales</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="timezone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Timezone</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between rounded-none font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? tzOptions.find(opt => opt.value === field.value)
                                ?.label
                              : "Select Timezone"}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[300px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search Timezone..."
                            onValueChange={setTzQuery}
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No timezones found.</CommandEmpty>
                            <CommandGroup>
                              {displayedTimeZones.map(opt => (
                                <CommandItem
                                  key={opt.value}
                                  value={opt.value}
                                  onSelect={() =>
                                    form.setValue("timezone", opt.value)
                                  }
                                >
                                  {opt.label}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      opt.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Availability per week (Hrs)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 40" {...field} />
                    </FormControl>
                    <FormMessage />
                    {selectedStaffType !== "full-time" && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        The number of hours will be determined by the signed
                        agreement.
                      </p>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="local_currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Local Currency</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between rounded-none font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? `${currencyList.find(
                                c => c.code === field.value
                              )?.flag} ${field.value}`
                              : "Select Currency"}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[300px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search Currency..."
                            onValueChange={setCurrencyQuery}
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No currencies found.</CommandEmpty>
                            <CommandGroup>
                              {displayedCurrencies.map(({ code, flag }) => (
                                <CommandItem
                                  key={code}
                                  value={code}
                                  onSelect={() =>
                                    form.setValue("local_currency", code)
                                  }
                                >
                                  <span className="mr-2">{flag}</span>
                                  {code}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      code === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="payment_mechanism"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Payment Mechanism</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Payment Mechanism" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bank-transfer">
                            Bank Transfer
                          </SelectItem>
                          <SelectItem value="paypal">Paypal</SelectItem>
                          <SelectItem value="stripe">Stripe</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-2">
              <FormField
                control={form.control}
                name="has_uk_bank_account"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between border px-3 py-2 shadow-sm">
                    <FormLabel>Do you have a UK bank account?</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="mt-6 ml-auto bg-[#002B89]"
          >
            {loading ? <RotateCw className="animate-spin" /> : "I'm ready!"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
