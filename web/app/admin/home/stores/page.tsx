'use client'

import { DesktopPages } from "@/components";

export default function RequestPage() {
  return (
    <>
      <DesktopPages typeOfLists={"store"} query={'active=true'} title={'Stores'}/>
    </>
  )
}