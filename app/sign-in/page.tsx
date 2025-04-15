'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LoaderCircle } from "lucide-react"
import { signIn } from "next-auth/react"
import { useState } from "react"

export default function SignInPage() {
  const [loading, setLoading] = useState(false)

  return (
    <Card className="shadow-none w-[400px] relative">
      <div className="absolute top-[-430px] left-[600px]">
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

      <div className="absolute bottom-[-300px] left-[-700px]">
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

      <CardContent className="flex flex-col p-0 items-center">
        <div className="p-8 pt-4 w-full">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10" width="55" height="61" viewBox="0 0 55 61" fill="none">
                <path d="M27.4256 10.0326C30.1942 10.0326 32.4386 7.78676 32.4386 5.01632C32.4386 2.24588 30.1942 0 27.4256 0C24.657 0 22.4126 2.24588 22.4126 5.01632C22.4126 7.78676 24.657 10.0326 27.4256 10.0326Z" fill="#002B89" />
                <path d="M32.4386 5.21735H22.4126V56.1775H32.4386V5.21735Z" fill="url(#paint0_linear_2001_70)" fillOpacity="0.3" />
                <path d="M27.5257 61C30.2943 61 32.5387 58.7541 32.5387 55.9837C32.5387 53.2132 30.2943 50.9673 27.5257 50.9673C24.7571 50.9673 22.5127 53.2132 22.5127 55.9837C22.5127 58.7541 24.7571 61 27.5257 61Z" fill="#002B89" />
                <path d="M49.1229 23.3991C51.8915 23.3991 54.1358 21.1532 54.1358 18.3828C54.1358 15.6124 51.8915 13.3665 49.1229 13.3665C46.3543 13.3665 44.1099 15.6124 44.1099 18.3828C44.1099 21.1532 46.3543 23.3991 49.1229 23.3991Z" fill="#002B89" />
                <path d="M46.4443 14.1383L2.34082 39.6183L7.35381 48.3069L51.4573 22.8268L46.4443 14.1383Z" fill="url(#paint1_linear_2001_70)" fillOpacity="0.3" />
                <path d="M5.06572 48.9714C7.83432 48.9714 10.0787 46.7255 10.0787 43.955C10.0787 41.1846 7.83432 38.9387 5.06572 38.9387C2.29713 38.9387 0.0527344 41.1846 0.0527344 43.955C0.0527344 46.7255 2.29713 48.9714 5.06572 48.9714Z" fill="#002B89" />
                <path d="M5.01299 23.0856C7.78159 23.0856 10.026 20.8397 10.026 18.0693C10.026 15.2989 7.78159 13.053 5.01299 13.053C2.24439 13.053 0 15.2989 0 18.0693C0 20.8397 2.24439 23.0856 5.01299 23.0856Z" fill="#002B89" />
                <path d="M7.69268 13.8263L2.67969 22.5149L46.7832 47.9949L51.7962 39.3064L7.69268 13.8263Z" fill="url(#paint2_linear_2001_70)" fillOpacity="0.3" />
                <path d="M49.1756 48.4807C51.9442 48.4807 54.1886 46.2349 54.1886 43.4644C54.1886 40.694 51.9442 38.4481 49.1756 38.4481C46.407 38.4481 44.1626 40.694 44.1626 43.4644C44.1626 46.2349 46.407 48.4807 49.1756 48.4807Z" fill="#002B89" />
                <defs>
                  <linearGradient id="paint0_linear_2001_70" x1="27.4256" y1="5.21735" x2="27.4256" y2="56.1775" gradientUnits="userSpaceOnUse">
                    <stop offset="0.56" stopColor="#002B89" />
                    <stop offset="1" stopColor="#002B89" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="paint1_linear_2001_70" x1="48.9508" y1="18.4825" x2="4.83058" y2="43.9384" gradientUnits="userSpaceOnUse">
                    <stop offset="0.56" stopColor="#002B89" />
                    <stop offset="1" stopColor="#002B89" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="paint2_linear_2001_70" x1="5.18411" y1="18.1694" x2="49.3043" y2="43.6253" gradientUnits="userSpaceOnUse">
                    <stop offset="0.56" stopColor="#002B89" />
                    <stop offset="1" stopColor="#002B89" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              <h1 className="text-[25px] font-light">Welcome back</h1>
              <p className="text-[14px] font-light">
                Use your company account to sign in
              </p>
            </div>
            <Button
              className="w-full bg-[#002B89]"
              type="button"
              disabled={loading}
              onClick={() => {
                setLoading(true)
                signIn("google", { callbackUrl: "/onboarding" })
              }}
            >
              {loading ?
                <LoaderCircle className="animate-spin" />
                :
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
              }
              Sign in with Google
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}