'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { signIn } from "next-auth/react"

export default function SignInPage() {

  return (
    <Card className="overflow-hidden shadow-none w-[400px]">
      <CardContent className="flex flex-col p-0 items-center">
        <div className="py-4 flex flex-col border-b w-full bg-[#002B89]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-full" viewBox="0 0 202 61" fill="none">
            <g clipPath="url(#clip0_2702_6819)">
              <path d="M149.067 38.922L151.65 31.5291H152.267L154.86 38.922H154.219L152.782 34.6069C152.631 34.1713 152.49 33.7525 152.356 33.348C152.229 32.9364 152.102 32.508 151.973 32.0676H151.928C151.801 32.5104 151.67 32.9364 151.536 33.348C151.409 33.7525 151.273 34.1713 151.131 34.6069L149.672 38.922H149.067ZM150.28 36.4377V35.9423H153.614V36.4377H150.28Z" fill="white" />
              <path d="M157.818 39.0584C157.256 39.0584 156.843 38.886 156.572 38.5414C156.312 38.1968 156.18 37.675 156.18 36.9786V33.5179H156.754V36.8996C156.754 37.4549 156.847 37.8665 157.034 38.1346C157.228 38.405 157.531 38.539 157.943 38.539C158.256 38.539 158.541 38.4577 158.797 38.2925C159.05 38.1202 159.328 37.8474 159.627 37.4716V33.5179H160.21V38.9219H159.727L159.66 38.0245H159.639C159.375 38.338 159.1 38.5893 158.809 38.776C158.524 38.9626 158.194 39.056 157.821 39.056L157.818 39.0584Z" fill="white" />
              <path d="M164.142 39.0584C163.611 39.0584 163.248 38.9052 163.054 38.5965C162.86 38.2901 162.762 37.8881 162.762 37.395V34.0133H161.932V33.5634L162.786 33.5179L162.853 31.9551H163.336V33.5179H164.886V34.0133H163.336V37.4285C163.336 37.766 163.396 38.0388 163.515 38.2494C163.642 38.4601 163.886 38.563 164.245 38.563C164.35 38.563 164.463 38.5486 164.582 38.5175C164.709 38.4792 164.819 38.4385 164.907 38.393L165.053 38.8549C164.895 38.9076 164.735 38.9531 164.57 38.989C164.405 39.0344 164.264 39.056 164.144 39.056L164.142 39.0584Z" fill="white" />
              <path d="M168.449 39.0584C168.014 39.0584 167.61 38.9507 167.237 38.7329C166.871 38.5079 166.574 38.1872 166.349 37.766C166.125 37.34 166.012 36.8254 166.012 36.2271C166.012 35.6288 166.125 35.1143 166.349 34.6882C166.574 34.2622 166.868 33.9391 167.237 33.7214C167.612 33.4964 168.016 33.3839 168.449 33.3839C168.882 33.3839 169.284 33.4964 169.65 33.7214C170.025 33.9391 170.324 34.2599 170.549 34.6882C170.781 35.1143 170.898 35.6288 170.898 36.2271C170.898 36.8254 170.784 37.34 170.549 37.766C170.324 38.1848 170.025 38.5079 169.65 38.7329C169.284 38.9507 168.882 39.0584 168.449 39.0584ZM168.449 38.5534C168.801 38.5534 169.117 38.4553 169.392 38.2614C169.676 38.0676 169.896 37.7971 170.054 37.4525C170.212 37.1007 170.291 36.6914 170.291 36.2271C170.291 35.7628 170.212 35.3536 170.054 35.0018C169.896 34.65 169.676 34.3771 169.392 34.1809C169.114 33.9774 168.801 33.8769 168.449 33.8769C168.098 33.8769 167.782 33.9774 167.507 34.1809C167.23 34.3747 167.01 34.65 166.845 35.0018C166.687 35.3536 166.608 35.7628 166.608 36.2271C166.608 36.6914 166.687 37.1007 166.845 37.4525C167.01 37.7971 167.23 38.0676 167.507 38.2614C167.784 38.4553 168.098 38.5534 168.449 38.5534Z" fill="white" />
              <path d="M172.864 38.922V33.5179H173.347L173.414 34.3388H173.436C173.675 34.0684 173.941 33.8434 174.232 33.6639C174.531 33.4772 174.835 33.3839 175.141 33.3839C175.567 33.3839 175.897 33.4844 176.129 33.6879C176.361 33.8817 176.528 34.145 176.634 34.4752C176.933 34.1378 177.231 33.8721 177.533 33.6783C177.832 33.4844 178.14 33.3863 178.454 33.3863C178.999 33.3863 179.403 33.5586 179.666 33.9033C179.936 34.2479 180.07 34.7696 180.07 35.4637V38.9244H179.499V35.5426C179.499 34.9802 179.406 34.5638 179.219 34.2958C179.032 34.0253 178.736 33.8913 178.332 33.8913C178.085 33.8913 177.834 33.9727 177.581 34.1378C177.327 34.3029 177.052 34.5494 176.76 34.8797V38.9244H176.189V35.5426C176.189 34.9802 176.091 34.5638 175.897 34.2958C175.71 34.0253 175.414 33.8913 175.01 33.8913C174.546 33.8913 174.027 34.2216 173.45 34.8797V38.9244H172.867L172.864 38.922Z" fill="white" />
              <path d="M183.603 39.0584C183.319 39.0584 183.056 39.0057 182.816 38.9004C182.577 38.7879 182.386 38.6228 182.245 38.405C182.111 38.18 182.042 37.9 182.042 37.5626C182.042 36.9714 182.319 36.5167 182.871 36.2032C183.426 35.8873 184.297 35.6647 185.488 35.5283C185.495 35.2578 185.466 34.997 185.397 34.7409C185.337 34.4872 185.213 34.279 185.026 34.1234C184.847 33.9583 184.589 33.8769 184.251 33.8769C183.893 33.8769 183.567 33.9487 183.276 34.0899C182.984 34.224 182.74 34.3628 182.546 34.5064L182.288 34.0804C182.422 33.9894 182.594 33.8937 182.804 33.7884C183.015 33.6759 183.247 33.5826 183.5 33.5084C183.754 33.4246 184.029 33.3839 184.321 33.3839C184.756 33.3839 185.1 33.4772 185.354 33.6639C185.608 33.8506 185.792 34.1067 185.904 34.4274C186.016 34.7433 186.072 35.0975 186.072 35.4948V38.922H185.588L185.521 38.2255H185.5C185.23 38.4505 184.935 38.6443 184.613 38.8095C184.29 38.9746 183.955 39.056 183.603 39.056V39.0584ZM183.728 38.563C184.034 38.563 184.326 38.4912 184.603 38.35C184.88 38.2088 185.177 38.0006 185.49 37.7325V35.9567C184.78 36.0381 184.213 36.1505 183.795 36.2941C183.376 36.4282 183.077 36.6005 182.895 36.8111C182.716 37.0145 182.625 37.2538 182.625 37.5291C182.625 37.9048 182.733 38.1705 182.95 38.326C183.168 38.484 183.426 38.563 183.725 38.563H183.728Z" fill="white" />
              <path d="M189.738 39.0584C189.207 39.0584 188.843 38.9052 188.65 38.5965C188.456 38.2901 188.358 37.8881 188.358 37.395V34.0133H187.528V33.5634L188.382 33.5179L188.449 31.9551H188.932V33.5179H190.482V34.0133H188.932V37.4285C188.932 37.766 188.992 38.0388 189.111 38.2494C189.238 38.4601 189.482 38.563 189.841 38.563C189.946 38.563 190.058 38.5486 190.178 38.5175C190.305 38.4792 190.415 38.4385 190.503 38.393L190.649 38.8549C190.491 38.9076 190.331 38.9531 190.166 38.989C190.001 39.0344 189.86 39.056 189.74 39.056L189.738 39.0584Z" fill="white" />
              <path d="M194.124 39.0584C193.66 39.0584 193.237 38.9459 192.856 38.7209C192.474 38.4959 192.172 38.1752 191.948 37.754C191.723 37.328 191.61 36.8183 191.61 36.2247C191.61 35.6312 191.723 35.1358 191.948 34.7074C192.172 34.2814 192.464 33.9535 192.823 33.7309C193.189 33.4988 193.576 33.3815 193.978 33.3815C194.413 33.3815 194.782 33.482 195.09 33.6854C195.404 33.8793 195.645 34.1641 195.808 34.5399C195.98 34.9132 196.066 35.3631 196.066 35.8873C196.066 35.9543 196.061 36.0261 196.054 36.1003C196.054 36.1745 196.047 36.2463 196.033 36.3133H192.046V35.8514H195.526C195.526 35.1932 195.387 34.6978 195.109 34.3675C194.832 34.0301 194.454 33.8626 193.976 33.8626C193.684 33.8626 193.399 33.9487 193.122 34.121C192.844 34.2862 192.617 34.5446 192.438 34.8964C192.258 35.2411 192.168 35.6838 192.168 36.2223C192.168 36.7249 192.258 37.1485 192.438 37.4932C192.624 37.8378 192.868 38.1035 193.167 38.2901C193.466 38.4768 193.804 38.5701 194.177 38.5701C194.468 38.5701 194.731 38.5247 194.963 38.4361C195.195 38.3452 195.413 38.2327 195.614 38.0987L195.839 38.5151C195.621 38.6491 195.38 38.7736 195.109 38.8861C194.839 38.9985 194.511 39.0536 194.122 39.0536L194.124 39.0584Z" fill="white" />
              <path d="M199.687 39.0584C199.013 39.0584 198.47 38.8143 198.059 38.3284C197.654 37.833 197.451 37.1342 197.451 36.2271C197.451 35.6432 197.559 35.1406 197.776 34.7218C198.001 34.2957 198.293 33.9655 198.652 33.7333C199.018 33.5012 199.415 33.3839 199.843 33.3839C200.166 33.3839 200.446 33.4413 200.685 33.5514C200.931 33.6639 201.187 33.8243 201.448 34.0349L201.414 33.0584V30.8566H201.998V38.9244H201.515L201.448 38.2399H201.426C201.209 38.4577 200.955 38.6491 200.663 38.8119C200.371 38.977 200.046 39.0584 199.687 39.0584ZM199.788 38.5534C200.08 38.5534 200.357 38.4816 200.618 38.3404C200.881 38.1896 201.146 37.9742 201.414 37.6894V34.5542C201.144 34.3149 200.886 34.145 200.639 34.0492C200.4 33.9439 200.149 33.8913 199.886 33.8913C199.542 33.8913 199.231 33.9918 198.953 34.1952C198.683 34.3987 198.468 34.6787 198.303 35.0377C198.138 35.3895 198.056 35.7868 198.056 36.2295C198.056 36.9331 198.207 37.5004 198.506 37.9264C198.805 38.3452 199.231 38.5558 199.785 38.5558L199.788 38.5534Z" fill="white" />
              <path d="M71.593 38.9219L67.8716 32.4529H65.8482V38.9219H63.1958V22.7481H68.778C70.0193 22.7481 71.0645 22.9659 71.9183 23.3991C72.7865 23.8347 73.4299 24.4163 73.8484 25.1438C74.2837 25.8738 74.4989 26.6875 74.4989 27.5874C74.4989 28.6428 74.188 29.6049 73.5686 30.4737C72.9635 31.3281 72.0259 31.9096 70.7535 32.2184L74.7549 38.9219H71.5906H71.593ZM65.8482 30.3348H68.778C69.7706 30.3348 70.5144 30.0859 71.0095 29.5905C71.5213 29.0951 71.7772 28.4274 71.7772 27.5897C71.7772 26.7521 71.5285 26.1011 71.0334 25.6344C70.5383 25.1534 69.7849 24.9141 68.778 24.9141H65.8482V30.3372V30.3348Z" fill="white" />
              <path d="M88.9401 32.1968C88.9401 32.6779 88.909 33.1111 88.8468 33.5012H79.0552C79.1318 34.5255 79.512 35.3464 80.1937 35.9687C80.8753 36.5885 81.7124 36.8996 82.705 36.8996C84.1304 36.8996 85.1397 36.3013 85.7281 35.1071H88.5885C88.2011 36.287 87.4955 37.2562 86.4719 38.0173C85.465 38.7616 84.2093 39.135 82.705 39.135C81.4804 39.135 80.3802 38.8621 79.402 38.3213C78.4406 37.7636 77.68 36.9882 77.1227 35.995C76.5798 34.9874 76.3096 33.8219 76.3096 32.5032C76.3096 31.1845 76.5727 30.0285 77.1012 29.0353C77.6441 28.0277 78.3951 27.2499 79.3566 26.709C80.3324 26.1658 81.4493 25.8953 82.705 25.8953C83.9606 25.8953 84.9914 26.1586 85.9385 26.6875C86.8856 27.214 87.6199 27.9607 88.1485 28.9204C88.6746 29.8682 88.9401 30.9619 88.9401 32.2016V32.1968ZM86.1729 31.3592C86.1562 30.3827 85.8094 29.5977 85.1254 29.009C84.4437 28.4202 83.5971 28.1259 82.5902 28.1259C81.6741 28.1259 80.8921 28.4202 80.2415 29.009C79.591 29.5834 79.2035 30.366 79.0792 31.3592H86.1729Z" fill="white" />
              <path d="M95.8041 36.5478L99.4323 26.0988H102.247L97.3635 38.922H94.1993L89.3394 26.0988H92.1759L95.8041 36.5478Z" fill="white" />
              <path d="M110.927 39.0847C109.423 39.0847 108.035 38.7353 106.763 38.0364C105.507 37.3232 104.508 36.3372 103.764 35.0807C103.034 33.8075 102.671 32.3811 102.671 30.7992C102.671 29.2172 103.034 27.7956 103.764 26.5391C104.508 25.2826 105.507 24.3062 106.763 23.6073C108.035 22.8941 109.423 22.5375 110.927 22.5375C112.431 22.5375 113.835 22.8941 115.091 23.6073C116.363 24.3062 117.363 25.2826 118.09 26.5391C118.817 27.7956 119.183 29.2148 119.183 30.7992C119.183 32.3835 118.82 33.8099 118.09 35.0807C117.361 36.3372 116.361 37.3232 115.091 38.0364C113.835 38.7353 112.448 39.0847 110.927 39.0847ZM110.927 36.78C111.996 36.78 112.95 36.5406 113.787 36.0596C114.625 35.5642 115.275 34.8653 115.742 33.9655C116.222 33.0512 116.461 31.9958 116.461 30.8015C116.461 29.6073 116.22 28.559 115.742 27.6592C115.278 26.7593 114.625 26.0676 113.787 25.589C112.95 25.1079 111.996 24.8686 110.927 24.8686C109.858 24.8686 108.904 25.1079 108.067 25.589C107.229 26.07 106.569 26.7593 106.089 27.6592C105.625 28.559 105.39 29.6073 105.39 30.8015C105.39 31.9958 105.622 33.0512 106.089 33.9655C106.569 34.8653 107.229 35.5642 108.067 36.0596C108.904 36.5406 109.858 36.78 110.927 36.78Z" fill="white" />
              <path d="M123.746 27.9847C124.196 27.3959 124.808 26.8981 125.583 26.496C126.358 26.0916 127.233 25.8905 128.211 25.8905C129.328 25.8905 130.342 26.1705 131.258 26.7282C132.189 27.2715 132.918 28.0397 133.445 29.0329C133.973 30.0261 134.236 31.1653 134.236 32.4529C134.236 33.7405 133.973 34.8965 133.445 35.9208C132.918 36.9284 132.189 37.7205 131.258 38.2949C130.345 38.8526 129.328 39.1326 128.211 39.1326C127.236 39.1326 126.367 38.9387 125.607 38.551C124.846 38.1489 124.227 37.6511 123.746 37.0624V45.0224H121.096V26.1011H123.746V27.987V27.9847ZM131.538 32.4529C131.538 31.5698 131.352 30.8087 130.981 30.1721C130.625 29.5211 130.144 29.0329 129.539 28.705C128.951 28.3628 128.314 28.1929 127.633 28.1929C126.951 28.1929 126.329 28.3628 125.727 28.705C125.138 29.0473 124.657 29.5427 124.284 30.1937C123.928 30.8446 123.749 31.6129 123.749 32.4984C123.749 33.3839 123.928 34.1593 124.284 34.8247C124.657 35.4756 125.138 35.9734 125.727 36.3133C126.332 36.6555 126.968 36.8254 127.633 36.8254C128.298 36.8254 128.951 36.6555 129.539 36.3133C130.144 35.9567 130.625 35.4445 130.981 34.7768C131.352 34.1091 131.538 33.3336 131.538 32.4481V32.4529Z" fill="white" />
              <path d="M140.811 39.1326C139.804 39.1326 138.895 38.9531 138.089 38.5965C137.298 38.2231 136.671 37.7277 136.205 37.1078C135.738 36.4712 135.492 35.7652 135.461 34.9898H138.204C138.25 35.5331 138.506 35.9902 138.972 36.3635C139.453 36.7201 140.051 36.8996 140.763 36.8996C141.476 36.8996 142.081 36.7608 142.485 36.4808C142.904 36.1864 143.114 35.8131 143.114 35.3631C143.114 34.8821 142.882 34.5255 142.416 34.2933C141.966 34.0612 141.244 33.8051 140.254 33.5251C139.292 33.2618 138.51 33.0057 137.905 32.7568C137.3 32.5079 136.774 32.1274 136.324 31.6176C135.889 31.1055 135.674 30.4306 135.674 29.5929C135.674 28.9108 135.875 28.291 136.279 27.731C136.681 27.1566 137.255 26.7066 138.001 26.3811C138.761 26.0557 139.63 25.8929 140.605 25.8929C142.062 25.8929 143.234 26.2663 144.116 27.0106C145.016 27.7405 145.496 28.7409 145.559 30.0118H142.906C142.861 29.4374 142.626 28.9802 142.208 28.638C141.789 28.2958 141.223 28.1258 140.51 28.1258C139.797 28.1258 139.278 28.2575 138.905 28.5207C138.532 28.784 138.348 29.1334 138.348 29.569C138.348 29.9112 138.472 30.1984 138.721 30.4306C138.97 30.6627 139.271 30.8494 139.627 30.9882C139.984 31.1127 140.512 31.2754 141.208 31.4764C142.139 31.7253 142.899 31.9814 143.487 32.2447C144.093 32.4936 144.612 32.8645 145.047 33.3623C145.482 33.8578 145.707 34.5183 145.721 35.3416C145.721 36.0715 145.52 36.7225 145.116 37.2969C144.712 37.8713 144.138 38.3212 143.394 38.6467C142.665 38.9722 141.806 39.135 140.814 39.135L140.811 39.1326Z" fill="white" />
              <path d="M27.4256 10.0326C30.1942 10.0326 32.4386 7.78676 32.4386 5.01632C32.4386 2.24588 30.1942 0 27.4256 0C24.657 0 22.4126 2.24588 22.4126 5.01632C22.4126 7.78676 24.657 10.0326 27.4256 10.0326Z" fill="white" />
              <path d="M32.4386 5.21735H22.4126V56.1775H32.4386V5.21735Z" fill="url(#paint0_linear_2702_6819)" fillOpacity="0.3" />
              <path d="M27.5257 61C30.2943 61 32.5387 58.7541 32.5387 55.9837C32.5387 53.2132 30.2943 50.9673 27.5257 50.9673C24.7571 50.9673 22.5127 53.2132 22.5127 55.9837C22.5127 58.7541 24.7571 61 27.5257 61Z" fill="white" />
              <path d="M49.1229 23.3991C51.8915 23.3991 54.1358 21.1532 54.1358 18.3828C54.1358 15.6124 51.8915 13.3665 49.1229 13.3665C46.3543 13.3665 44.1099 15.6124 44.1099 18.3828C44.1099 21.1532 46.3543 23.3991 49.1229 23.3991Z" fill="white" />
              <path d="M46.4443 14.1383L2.34082 39.6183L7.35381 48.3069L51.4573 22.8268L46.4443 14.1383Z" fill="url(#paint1_linear_2702_6819)" fillOpacity="0.3" />
              <path d="M5.06572 48.9714C7.83432 48.9714 10.0787 46.7255 10.0787 43.955C10.0787 41.1846 7.83432 38.9387 5.06572 38.9387C2.29713 38.9387 0.0527344 41.1846 0.0527344 43.955C0.0527344 46.7255 2.29713 48.9714 5.06572 48.9714Z" fill="white" />
              <path d="M5.01299 23.0856C7.78159 23.0856 10.026 20.8397 10.026 18.0693C10.026 15.2989 7.78159 13.053 5.01299 13.053C2.24439 13.053 0 15.2989 0 18.0693C0 20.8397 2.24439 23.0856 5.01299 23.0856Z" fill="white" />
              <path d="M7.69268 13.8263L2.67969 22.5149L46.7832 47.9949L51.7962 39.3064L7.69268 13.8263Z" fill="url(#paint2_linear_2702_6819)" fillOpacity="0.3" />
              <path d="M49.1756 48.4807C51.9442 48.4807 54.1886 46.2349 54.1886 43.4644C54.1886 40.694 51.9442 38.4481 49.1756 38.4481C46.407 38.4481 44.1626 40.694 44.1626 43.4644C44.1626 46.2349 46.407 48.4807 49.1756 48.4807Z" fill="white" />
            </g>
            <defs>
              <linearGradient id="paint0_linear_2702_6819" x1="27.4256" y1="5.21735" x2="27.4256" y2="56.1775" gradientUnits="userSpaceOnUse">
                <stop offset="0.56" stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="paint1_linear_2702_6819" x1="48.9508" y1="18.4825" x2="4.83059" y2="43.9384" gradientUnits="userSpaceOnUse">
                <stop offset="0.56" stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="paint2_linear_2702_6819" x1="5.18411" y1="18.1694" x2="49.3043" y2="43.6253" gradientUnits="userSpaceOnUse">
                <stop offset="0.56" stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <clipPath id="clip0_2702_6819">
                <rect width="202" height="61" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <form className="p-8 pt-4 w-full">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-left">
              <h1 className="text-[25px] font-light">Welcome back</h1>
              <p className="text-[14px] font-light">
                Login to your account
              </p>
            </div>
            <Button
              className="w-full"
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/onboarding" })}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Sign in with Google
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}