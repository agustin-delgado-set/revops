import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"


export default function SignInError() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-[#002B89] p-6 md:p-10">
      <Card className="shadow-none w-[400px] relative">
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
                <h1 className="text-[25px] font-light">
                  Unauthorized
                </h1>
                <p className="text-[14px] font-light">
                  Verify your email address to access this page
                </p>
              </div>
              <Button
                asChild
              >
                <Link href="/sign-in">
                  Go back
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}