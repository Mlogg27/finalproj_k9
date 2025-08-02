'use client'

import { DesktopPages } from "@/components";

export default function RequestPage() {
  return (
    <>
      <DesktopPages typeOfLists={"driver"} query={'active=true'} title={'Drivers'}/>
    </>
  )
}