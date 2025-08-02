'use client'

import { DesktopPages } from "@/components";

export default function RequestPage() {
  return (
    <>
      <DesktopPages typeOfLists={"vendor"} query={'active=true'} title={'Vendors'}/>
    </>
  )
}