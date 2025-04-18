"use client";

import { SessionProvider } from 'next-auth/react';
import React from 'react'

function NextAuthProvider({children}) {
  return(
    <SessionProvider>{children}</SessionProvider>  //shares session across components
  )
}

export default NextAuthProvider;
