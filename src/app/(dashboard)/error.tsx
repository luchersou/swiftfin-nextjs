"use client"

import { ErrorMessage } from "@/components/shared/ErrorMessage"

export default function Error({ reset }: { reset: () => void }) {
  return <ErrorMessage reset={reset} />
}