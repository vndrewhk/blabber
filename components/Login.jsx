import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";

function Login(props) {
  return (
    <div className="flex flex-col justify-center mt-[10%] items-center">
      <div className="flex justify-center items-center">
        <Image
          src="https://rb.gy/ogau5a"
          alt="twitter-logo"
          width={150}
          height={150}
          objectFit="contain"
        ></Image>
      </div>
      <div className="flex justify-center items-center mt-[5%]">
        {Object.values(props.providers).map((provider) => (
          // https://devdojo.com/tailwindcss/buttons
          <div key={provider.name} className="text-white">
            <button
            // callback url redirects u afterwards
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              href="#_"
              class="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
            >
              <span class="w-48 h-48 rounded rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
              <span class="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                Sign in with {provider.name}
              </span>
            </button>
            {/* <signIn>Sign in with {provider.name}</signIn> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Login;
